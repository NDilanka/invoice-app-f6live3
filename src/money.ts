export type Line = { amount: number };

/**
 * Minor-unit digits (exponent) per ISO 4217 for currencies that do not
 * have the default 2 digits:
 *
 * - 0 digits: currencies with no decimal subdivision.
 * - 3 digits: "decimal" currencies such as the Kuwaiti dinar (1000 fils = 1 KWD).
 * - 4 digits: CLF (Unidad de Fomento) and UYW (Unidad Previsional).
 *
 * Every other ISO 4217 currency has an exponent of 2.
 */
const MINOR_UNITS: Record<string, number> = {
  // 0 digits
  BIF: 0, CLP: 0, DJF: 0, GNF: 0, ISK: 0, JPY: 0, KMF: 0, KRW: 0,
  PYG: 0, RWF: 0, UGX: 0, UYI: 0, VND: 0, VUV: 0, XAF: 0, XOF: 0, XPF: 0,
  // 3 digits
  BHD: 3, IQD: 3, JOD: 3, KWD: 3, LYD: 3, OMR: 3, TND: 3,
  // 4 digits
  CLF: 4, UYW: 4,
};

const DEFAULT_MINOR_UNITS = 2;

function minorUnitsFor(currency: string): number {
  return MINOR_UNITS[currency.toUpperCase()] ?? DEFAULT_MINOR_UNITS;
}

export function formatTotal(lines: Line[], currency: string): string {
  const digits = minorUnitsFor(currency);
  const sum = lines.reduce((total, line) => total + line.amount, 0);
  // Work in integer minor units so binary-fraction artifacts in the float
  // sum (e.g. 10.125 * 1000 = 10124.999...) are removed by rounding.
  const scale = 10 ** digits;
  const units = Math.round(Math.abs(sum) * scale);
  const sign = sum < 0 && units !== 0 ? '-' : '';
  const whole = Math.floor(units / scale);
  const fraction = units % scale;
  const fractionPart = digits > 0 ? '.' + String(fraction).padStart(digits, '0') : '';
  return sign + String(whole) + fractionPart;
}
