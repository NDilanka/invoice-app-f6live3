export type Line = { amount: number };

/**
 * Minor-unit exponent classes of the ISO 4217 standard: every currency's
 * total must be rounded to the number of decimal places its minor unit
 * defines (0, 2, 3 or 4), not to a fixed default.
 *
 * Exponent 0 — no minor unit:
 *   BIF CLP DJF GNF ISK JPY KMF KRW PYG RWF UGX UYI VND VUV XAF XOF XPF
 * Exponent 3 — thousandths of the major unit:
 *   BHD IQD JOD KWD LYD OMR TND
 * Exponent 4:
 *   CLF UYW
 * All other ISO 4217 currencies have exponent 2.
 */
const ZERO_DIGIT_CURRENCIES = new Set([
  'BIF', 'CLP', 'DJF', 'GNF', 'ISK', 'JPY', 'KMF', 'KRW', 'PYG', 'RWF',
  'UGX', 'UYI', 'VND', 'VUV', 'XAF', 'XOF', 'XPF',
]);
const THREE_DIGIT_CURRENCIES = new Set([
  'BHD', 'IQD', 'JOD', 'KWD', 'LYD', 'OMR', 'TND',
]);
const FOUR_DIGIT_CURRENCIES = new Set(['CLF', 'UYW']);

/**
 * Number of decimal places to round a monetary total to for the given
 * ISO 4217 currency code. Codes the standard does not define (or that
 * are not valid) fall back to 2, the exponent of most currencies.
 */
function minorUnitDigits(currency: string): number {
  const code = currency.toUpperCase();
  if (ZERO_DIGIT_CURRENCIES.has(code)) return 0;
  if (THREE_DIGIT_CURRENCIES.has(code)) return 3;
  if (FOUR_DIGIT_CURRENCIES.has(code)) return 4;
  return 2;
}

export function formatTotal(lines: Line[], currency: string): string {
  const sum = lines.reduce((total, line) => total + line.amount, 0);
  return sum.toFixed(minorUnitDigits(currency));
}
