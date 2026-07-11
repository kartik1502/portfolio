import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const API_KEY = process.env.WAKATIME_API_KEY;

if (!API_KEY) {
  console.warn("⚠ WAKATIME_API_KEY not set — skipping WakaTime fetch");
  process.exit(0);
}

const headers = {
  Authorization: `Basic ${Buffer.from(API_KEY).toString("base64")}`,
};

async function fetchJSON(url) {
  const res = await fetch(url, { headers });
  if (!res.ok) throw new Error(`WakaTime API error: ${res.status} ${res.statusText}`);
  return res.json();
}

async function main() {
  const [stats, allTime] = await Promise.all([
    fetchJSON("https://wakatime.com/api/v1/users/current/stats/last_7_days"),
    fetchJSON("https://wakatime.com/api/v1/users/current/all_time_since_today"),
  ]);

  const data = {
    total_seconds: stats.data?.total_seconds ?? 0,
    human_readable_total: stats.data?.human_readable_total ?? "0 hrs",
    daily_average: stats.data?.daily_average ?? 0,
    human_readable_daily_average: stats.data?.human_readable_daily_average ?? "0 hrs",
    all_time_total: allTime.data?.human_readable_total ?? "0 hrs",
    languages: (stats.data?.languages ?? []).slice(0, 6).map((l) => ({
      name: l.name,
      percent: Math.round(l.percent),
      total_seconds: l.total_seconds,
    })),
    editors: (stats.data?.editors ?? []).slice(0, 3).map((e) => ({
      name: e.name,
      percent: Math.round(e.percent),
    })),
    range: stats.data?.range ?? "last_7_days",
  };

  const outPath = path.resolve(__dirname, "../public/wakatime.json");
  fs.writeFileSync(outPath, JSON.stringify(data, null, 2));
  console.log(`✓ WakaTime data written to ${outPath}`);
}

main().catch((err) => {
  console.error("✗ WakaTime fetch failed:", err.message);
  // Write empty data so the build doesn't break
  const fallback = {
    total_seconds: 0,
    human_readable_total: "—",
    daily_average: 0,
    human_readable_daily_average: "—",
    all_time_total: "—",
    languages: [],
    editors: [],
    range: "last_7_days",
  };
  const outPath = path.resolve(__dirname, "../public/wakatime.json");
  fs.writeFileSync(outPath, JSON.stringify(fallback, null, 2));
});
