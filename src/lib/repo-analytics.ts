export type RepoStat = { name: string; seconds: number; percent: number; color: string };
export type DayStat = { date: string; total: number; projects: RepoStat[] };
export type ReposData = {
  updatedAt?: string;
  start?: string;
  end?: string;
  repos: RepoStat[];
  daily: DayStat[];
};

export const PALETTE = [
  "oklch(0.92 0.09 230)",
  "oklch(0.88 0.11 230)",
  "oklch(0.84 0.13 230)",
  "oklch(0.8 0.14 230)",
  "oklch(0.76 0.14 230)",
  "oklch(0.72 0.14 230)",
  "oklch(0.68 0.13 230)",
  "oklch(0.64 0.12 230)",
  "oklch(0.6 0.11 230)",
  "oklch(0.56 0.1 230)",
  "oklch(0.52 0.09 230)",
];

export function colorFor(_repo: RepoStat, index: number): string {
  const i = index % PALETTE.length;
  const half = Math.floor(i / 2);
  return i % 2 === 0 ? PALETTE[half] : PALETTE[PALETTE.length - 1 - half];
}

export function humanize(seconds: number): string {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  if (h === 0 && m === 0) return "<1m";
  return `${h}h ${m}m`;
}
