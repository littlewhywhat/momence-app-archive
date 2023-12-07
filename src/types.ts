export const CurrencyCode = {
  AUD: 'AUD',
  BRL: 'BRL',
  BGN: 'BGN',
  CAD: 'CAD',
  CNY: 'CNY',
  DKK: 'DKK',
  EUR: 'EUR',
  HKD: 'HKD',
  HUF: 'HUF',
  ISK: 'ISK',
  XDR: 'XDR',
  INR: 'INR',
  IDR: 'IDR',
  ILS: 'ILS',
  JPY: 'JPY',
  MYR: 'MYR',
  MXN: 'MXN',
  NZD: 'NZD',
  NOK: 'NOK',
  PHP: 'PHP',
  PLN: 'PLN',
  RON: 'RON',
  SGD: 'SGD',
  ZAR: 'ZAR',
  KRW: 'KRW',
  SEK: 'SEK',
  CHF: 'CHF',
  THB: 'THB',
  TRY: 'TRY',
  GBP: 'GBP',
  USD: 'USD',
  CZK: 'CZK',
} as const;
export type CurrencyCode = keyof typeof CurrencyCode;

export const isCurrencyCode = (code: string): code is CurrencyCode =>
  (Object.values(CurrencyCode) as string[]).includes(code);

export const CountryName = {
  Australia: 'Australia',
  Brazil: 'Brazil',
  Bulgaria: 'Bulgaria',
  Canada: 'Canada',
  China: 'China',
  Denmark: 'Denmark',
  EMU: 'EMU',
  Hongkong: 'Hongkong',
  Hungary: 'Hungary',
  Iceland: 'Iceland',
  IMF: 'IMF',
  India: 'India',
  Indonesia: 'Indonesia',
  Israel: 'Israel',
  Japan: 'Japan',
  Malaysia: 'Malaysia',
  Mexico: 'Mexico',
  ['New Zealand']: 'New Zealand',
  Norway: 'Norway',
  Philippines: 'Philippines',
  Poland: 'Poland',
  Romania: 'Romania',
  Singapore: 'Singapore',
  ['South Africa']: 'South Africa',
  ['South Korea']: 'South Korea',
  Sweden: 'Sweden',
  Switzerland: 'Switzerland',
  Thailand: 'Thailand',
  Turkey: 'Turkey',
  ['United Kingdom']: 'United Kingdom',
  USA: 'USA',
} as const;
export type CountryName = keyof typeof CountryName;

export const isCountryName = (
  countryName: string,
): countryName is CountryName =>
  (Object.values(CountryName) as string[]).includes(countryName);

export type CurrencyRate = {
  amount: number;
  country: CountryName;
  code: CurrencyCode;
  currencyName: string;
  rateToCzk: number;
};

export type Conversion = {
  czkAmount: number;
  result: number;
  currencyRate: CurrencyRate;
};
