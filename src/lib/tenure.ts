export const JOIN_DATE = new Date("2024-02-01T00:00:00Z");

export function computeTenure(
  from: Date = JOIN_DATE,
  to: Date = new Date(),
): { years: number; months: number } {
  const months =
    (to.getFullYear() - from.getFullYear()) * 12 +
    (to.getMonth() - from.getMonth());
  return { years: Math.floor(months / 12), months: months % 12 };
}

export function formatTenureLong(
  from: Date = JOIN_DATE,
  to: Date = new Date(),
): string {
  const { years, months } = computeTenure(from, to);
  const y = years > 0 ? `${years} ${years === 1 ? "yr" : "yrs"}` : "";
  const m = months > 0 ? `${months} ${months === 1 ? "mo" : "mos"}` : "";
  return [y, m].filter(Boolean).join(" ") || "0 mos";
}

export function formatTenureYears(
  from: Date = JOIN_DATE,
  to: Date = new Date(),
): string {
  const { years, months } = computeTenure(from, to);
  return (years + months / 12).toFixed(1);
}

export function formatTenureShort(
  from: Date = JOIN_DATE,
  to: Date = new Date(),
): string {
  const { years, months } = computeTenure(from, to);
  return `${years}y ${months}m`;
}
