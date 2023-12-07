export class CurrencyRateParseError extends Error {
  constructor(message: string, line: string) {
    super(
      `Failed to parse line from api. Error: '${message}', line: '${line}'`,
    );

    Object.setPrototypeOf(this, new.target.prototype);
  }
}

export class InvalidLineFormatParseError extends CurrencyRateParseError {
  constructor(line: string) {
    super('Invalid number of tokens', line);

    Object.setPrototypeOf(this, new.target.prototype);
  }
}

export class InvalidCountryParseError extends CurrencyRateParseError {
  constructor(line: string) {
    super('Invalid country', line);

    Object.setPrototypeOf(this, new.target.prototype);
  }
}

export class InvalidCurrencyCodeParseError extends CurrencyRateParseError {
  constructor(line: string) {
    super('Invalid currency code', line);

    Object.setPrototypeOf(this, new.target.prototype);
  }
}

export class InvalidNumberOfLinesParseError extends Error {
  constructor() {
    super('Invalid number of lines');

    Object.setPrototypeOf(this, new.target.prototype);
  }
}

export class HeaderParseError extends Error {
  constructor(message: string, header: string) {
    super(
      `Failed to parse header from api. Error: '${message}', header: '${header}'`,
    );

    Object.setPrototypeOf(this, new.target.prototype);
  }
}

export class InvalidHeaderFormatParseError extends HeaderParseError {
  constructor(header: string) {
    super('Invalid format', header);

    Object.setPrototypeOf(this, new.target.prototype);
  }
}

export class InvalidHeaderDateParseError extends HeaderParseError {
  constructor(date: string, header: string) {
    super(`Invalid date '${date}'`, header);

    Object.setPrototypeOf(this, new.target.prototype);
  }
}
