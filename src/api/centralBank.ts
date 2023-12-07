import axios from 'axios';
import {CurrencyRate, isCountryName, isCurrencyCode} from '../types';
import {
  InvalidCountryParseError,
  InvalidCurrencyCodeParseError,
  InvalidHeaderDateParseError,
  InvalidHeaderFormatParseError,
  InvalidLineFormatParseError,
  InvalidNumberOfLinesParseError,
} from './types';
import {DateTime} from 'luxon';

const EXCHANGE_URL =
  'https://www.cnb.cz/en/financial-markets/foreign-exchange-market/central-bank-exchange-rate-fixing/central-bank-exchange-rate-fixing/daily.txt';

const LINE_REGEX = /^[a-zA-z ]+\|[a-zA-z ]+\|\d+\|[A-Z]{3}\|\d+\.\d{3}$/;

export const convertLineToCurrencyRate = (line: string): CurrencyRate => {
  if (!line.match(LINE_REGEX)) {
    throw new InvalidLineFormatParseError(line);
  }
  const tokens = line.split('|');
  if (tokens.length < 5) {
    throw new InvalidLineFormatParseError(line);
  }

  // Country|Currency|Amount|Code|Rate
  const country = tokens[0];
  const currencyName = tokens[1];
  const amount = Number(tokens[2]);
  const code = tokens[3];
  const rateToCzk = Number(tokens[4]);

  if (!isCurrencyCode(code)) {
    throw new InvalidCurrencyCodeParseError(line);
  }
  if (!isCountryName(country)) {
    throw new InvalidCountryParseError(line);
  }

  return {
    code,
    country,
    currencyName,
    amount,
    rateToCzk,
  };
};

// docs has . in the example in date?
const HEADER_REGEX = /^\d{1,2}(\.[A-Z][a-z]{2}\.| [A-Z][a-z]{2} )\d{4} #\d+$/;

export const parseDate = (rawHeader: string): DateTime => {
  if (!rawHeader.match(HEADER_REGEX)) {
    throw new InvalidHeaderFormatParseError(rawHeader);
  }
  const dateString = rawHeader.split('#')[0].replaceAll('.', ' ').trimEnd();
  const date = DateTime.fromFormat(dateString, 'dd MMM yyyy', {
    zone: 'Europe/Prague',
  });
  if (!date.isValid) {
    throw new InvalidHeaderDateParseError(dateString, rawHeader);
  }
  return date;
};

export const getCurrenciesRates = async (): Promise<{
  rates: CurrencyRate[];
  date: DateTime;
}> => {
  const response = await axios.get<string>(EXCHANGE_URL, {
    timeout: 5000,
    headers: {'Cache-Control': 'no-cache', Pragma: 'no-cache', Expires: '0'},
  });

  const responseLines = response.data.split('\n');

  if (responseLines.length < 4) {
    throw new InvalidNumberOfLinesParseError();
  }
  const date = parseDate(responseLines[0]);

  // slice header and last empty line
  const currenciesLines = responseLines.slice(2, -1);
  return {
    date,
    rates: currenciesLines.map(line => convertLineToCurrencyRate(line)),
  };
};
