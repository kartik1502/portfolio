import type { WakaStats } from "./wakatime-types";

const USERNAME = "kartik1502";

export const WAKA_RANGES = ["last_7_days", "last_30_days", "last_6_months"] as const;
export type WakaRange = (typeof WAKA_RANGES)[number];

const endpointFor = (range: WakaRange) =>
  `https://wakatime.com/api/v1/users/${USERNAME}/stats/${range}`;

// TTLs
const FRESH_MS = 30 * 60 * 1000; // 30 min — serve from cache without refetch
const STALE_MS = 24 * 60 * 60 * 1000; // 24 h — serve stale on error / 429
const MIN_REFETCH_MS = 60 * 1000; // don't hammer origin more than 1x/min

type CacheEntry = { data: WakaStats; fetchedAt: number };

// Module-level cache. On Cloudflare Workers this lives for the isolate lifetime,
// which naturally coalesces bursts across concurrent requests.
const g = globalThis as unknown as {
  __wakaCacheV2?: Record<string, CacheEntry | undefined>;
  __wakaInflightV2?: Record<string, Promise<WakaStats> | null | undefined>;
  __wakaLastAttemptV2?: Record<string, number | undefined>;
  __wakaRateLimitedUntilV2?: number;
};

function humanize(seconds: number): string {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  return `${h}h ${m}m`;
}

async function fetchFromWakatime(range: WakaRange): Promise<WakaStats> {
  const res = await fetch(endpointFor(range), { headers: { Accept: "application/json" } });

  if (res.status === 429) {
    const retryAfter = Number(res.headers.get("retry-after")) || 300;
    g.__wakaRateLimitedUntilV2 = Date.now() + retryAfter * 1000;
    throw new Error(`WakaTime rate-limited (retry after ${retryAfter}s)`);
  }
  // WakaTime free-tier public stats only expose last_7_days; other ranges → 400.
  if (res.status === 400 || res.status === 403) {
    return {
      weekTotal: "—",
      dailyAvg: "—",
      topLang: "—",
      topPercent: 0,
      languages: [],
      updatedAt: new Date().toISOString(),
      unavailable: true,
    };
  }
  if (!res.ok) {
    throw new Error(`WakaTime request failed: ${res.status}`);
  }

  const json = (await res.json()) as {
    data: {
      total_seconds?: number;
      daily_average?: number;
      human_readable_total?: string;
      human_readable_daily_average?: string;
      languages?: Array<{ name: string; percent: number }>;
      modified_at?: string;
    };
  };
  const d = json.data;
  const languages = (d.languages ?? []).map((l) => ({
    name: l.name,
    percent: l.percent,
  }));
  const top = languages[0];
  return {
    weekTotal: d.human_readable_total ?? humanize(d.total_seconds ?? 0),
    dailyAvg: d.human_readable_daily_average ?? humanize(d.daily_average ?? 0),
    topLang: top?.name ?? "—",
    topPercent: top?.percent ?? 0,
    languages,
    updatedAt: d.modified_at ?? new Date().toISOString(),
  };
}

export async function loadWakatimeStats(
  range: WakaRange = "last_7_days",
): Promise<WakaStats> {
  const now = Date.now();
  const cacheMap = (g.__wakaCacheV2 ??= {});
  const inflightMap = (g.__wakaInflightV2 ??= {});
  const lastAttemptMap = (g.__wakaLastAttemptV2 ??= {});
  const cache = cacheMap[range];

  // 1) Fresh cache → return immediately
  if (cache && now - cache.fetchedAt < FRESH_MS) {
    return cache.data;
  }

  // 2) Currently rate-limited → serve stale if we have it
  if (g.__wakaRateLimitedUntilV2 && now < g.__wakaRateLimitedUntilV2 && cache) {
    return cache.data;
  }

  // 3) Coalesce concurrent refetches
  const existing = inflightMap[range];
  if (existing) {
    try {
      return await existing;
    } catch {
      if (cache) return cache.data;
      throw new Error("WakaTime unavailable");
    }
  }

  // 4) Throttle refetch attempts
  const lastAttempt = lastAttemptMap[range];
  if (cache && lastAttempt && now - lastAttempt < MIN_REFETCH_MS) {
    return cache.data;
  }

  lastAttemptMap[range] = now;
  const inflight = fetchFromWakatime(range)
    .then((data) => {
      cacheMap[range] = { data, fetchedAt: Date.now() };
      g.__wakaRateLimitedUntilV2 = 0;
      return data;
    })
    .finally(() => {
      inflightMap[range] = null;
    });
  inflightMap[range] = inflight;

  try {
    return await inflight;
  } catch (err) {
    // Serve stale within STALE_MS on error
    if (cache && now - cache.fetchedAt < STALE_MS) {
      return cache.data;
    }
    throw err;
  }
}

export { FRESH_MS };