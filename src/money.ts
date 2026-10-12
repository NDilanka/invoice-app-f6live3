export type Line = { amount: number };
export function decimalsFor(currency: string): number {
  return new Intl.NumberFormat("en", { style: "currency", currency })
    .resolvedOptions().maximumFractionDigits ?? 2;
}
export function formatTotal(lines: Line[], currency: string): string {
  const sum = lines.reduce((total, line) => total + line.amount, 0);
  return sum.toFixed(decimalsFor(currency));
}
