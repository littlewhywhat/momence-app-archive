import {DateTime} from 'luxon';
import {CurrencyRate} from './types';

// @todo write unit test
const roundToHundreds = (num: number): number => Math.trunc(num * 100) / 100;

export const convertToCurrency = (
  czkAmount: number,
  currencyRate: CurrencyRate,
): number =>
  roundToHundreds((czkAmount / currencyRate.rateToCzk) * currencyRate.amount);

export const isUpToDate = (date: DateTime) =>
  DateTime.now().startOf('day').toMillis() === date.startOf('day').toMillis();
