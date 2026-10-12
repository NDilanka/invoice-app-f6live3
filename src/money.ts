export type Line = { amount: number };

// ISO 4217 defines a minor unit (exponent) for every currency: the number of
// decimal digits its amounts carry. The standard's default exponent is 2;
// the currencies below are the complete list of exceptions. Anything else
// active in ISO 4217 is a 2-digit currency.
const ISO_4217_MINOR_UNIT_EXCEPTIONS: Record<string, number> = {
  // Currencies with no minor unit (0 digits).
  BIF: 0,
  CLP: 0,
  DJF: 0,
  GNF: 0,
  ISK: 0,
  JPY: 0,
  KMF: 0,
  KRW: 0,
  PYG: 0,
  RWF: 0,
  UGX: 0,
  UYI: 0,
  UYW: 0,
  VUV: 0,
  VND: 0,
  XAF: 0,
  XOF: 0,
  XPF: 0,
  // Currencies with 3 minor unit digits.
  BHD: 3,
  IQD: 3,
  JOD: 3,
  KWD: 3,
  LYD: 3,
  OMR: 3,
  TND: 3,
  // Currencies with 4 minor unit digits.
  CLF: 4,
};

// Number of decimal digits defined by ISO 4217 for a currency code.
// Unknown or non-standard codes fall back to the standard's 2-digit default.
export function minorUnitDigits(currency: string): number {
  return ISO_4217_MINOR_UNIT_EXCEPTIONS[currency.toUpperCase()] ?? 2;
}

export function formatTotal(lines: Line[], currency: string): string {
  const digits = minorUnitDigits(currency);
  const sum = lines.reduce((total, line) => total + line.amount, 0);
  // Round to the currency's minor unit to neutralize floating-point drift
  // from summing binary floats (e.g. 0.1 + 0.2 = 0.30000000000000004).
  const scale = 10 ** digits;
  return (Math.round(sum * scale) / scale).toFixed(digits);
}
