import {it, describe, expect} from '@jest/globals';
import {convertLineToCurrencyRate, parseDate} from './centralBank';
import {CountryName, CurrencyCode, CurrencyRate} from '../types';
import {
  InvalidCountryParseError,
  InvalidCurrencyCodeParseError,
  InvalidLineFormatParseError,
} from './types';

describe('convertLineToCurrencyRate', () => {
  it('converts line correctly', () => {
    expect(
      convertLineToCurrencyRate('New Zealand|dollar|1|NZD|13.878'),
    ).toEqual({
      code: CurrencyCode.NZD,
      country: CountryName['New Zealand'],
      currencyName: 'dollar',
      rateToCzk: 13.878,
      amount: 1,
    } satisfies CurrencyRate);
  });

  it('fails if line has a wrong format', () => {
    const line = 'New Zealand%dollar|1|NZD|13.878';
    expect(() => convertLineToCurrencyRate(line)).toThrow(
      new InvalidLineFormatParseError(line),
    );
  });

  it('fails if line has a wrong country', () => {
    const line = 'NewZealand|dollar|1|NZD|13.878';
    expect(() => convertLineToCurrencyRate(line)).toThrow(
      new InvalidCountryParseError(line),
    );
  });

  it('fails if line has a wrong currency code', () => {
    const line = 'New Zealand|dollar|1|NNN|13.878';
    expect(() => convertLineToCurrencyRate(line)).toThrow(
      new InvalidCurrencyCodeParseError(line),
    );
  });
});

describe('parse', () => {
  it('parses CZ date from header correctly', () => {
    expect(parseDate('14 Dec 2023 #34').toString()).toBe(
      '2023-12-14T00:00:00.000+01:00',
    );
  });
});
