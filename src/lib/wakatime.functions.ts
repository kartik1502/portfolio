export type { WakaStats, WakaLang } from "./wakatime-types";

const VALID_RANGES = ["last_7_days", "last_30_days", "last_6_months"] as const;
type Range = (typeof VALID_RANGES)[number];

export function isValidRange(r: string | undefined): r is Range {
  return r !== undefined && (VALID_RANGES as readonly string[]).includes(r);
}

export function parseRange(data: { range?: string } | undefined): Range {
  const r = data?.range;
  return r && isValidRange(r) ? r : "last_7_days";
}
