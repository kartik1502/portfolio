import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const API_KEY = process.env.WAKATIME_API_KEY;

const STATS_OUT = path.resolve(__dirname, "../public/wakatime.json");
const REPOS_OUT = path.resolve(__dirname, "../public/wakatime-repos.json");

const REPOS = [
  "arya-banking",
  "arya-banking-admin-service",
  "arya-banking-api-gateway",
  "arya-banking-auth-service",
  "arya-banking-bom",
  "arya-banking-common",
  "arya-banking-config-server",
  "arya-banking-configs",
  "arya-banking-infra",
  "arya-banking-service-registry",
  "arya-banking-user-service",
];

const FALLBACK_STATS = {
  total_seconds: 0,
  human_readable_total: "—",
  daily_average: 0,
  human_readable_daily_average: "—",
  all_time_total: "—",
  languages: [],
  editors: [],
  range: "last_7_days",
};

const FALLBACK_REPOS = {
  updatedAt: new Date().toISOString(),
  start: "",
  end: "",
  range: "last_7_days",
  repos: [],
  daily: [],
};

const headers = API_KEY
  ? { Authorization: `Basic ${Buffer.from(API_KEY).toString("base64")}` }
  : {};

async function fetchJSON(url) {
  const res = await fetch(url, { headers });
  if (!res.ok) throw new Error(`WakaTime API error: ${res.status} ${res.statusText}`);
  return res.json();
}

function writeIfMissing(outPath, fallback, reason = "WAKATIME_API_KEY not set") {
  if (fs.existsSync(outPath)) {
    console.warn(`⚠ ${reason} — keeping existing ${path.basename(outPath)}`);
    return;
  }
  fs.writeFileSync(outPath, JSON.stringify(fallback, null, 2));
  console.warn(`⚠ ${reason} — writing fallback ${path.basename(outPath)}`);
}

async function fetchRepoSummaries() {
  const end = new Date();
  const start = new Date(end.getTime() - 6 * 86400000);
  const fmt = (d) => d.toISOString().slice(0, 10);
  const params = new URLSearchParams({ start: fmt(start), end: fmt(end) });
  for (const r of REPOS) params.append("project", r);
  return fetchJSON(
    `https://wakatime.com/api/v1/users/current/summaries?${params.toString()}`,
  );
}

function buildRepoAnalytics(json) {
  const daily = (json.data ?? [])
    .map((d) => {
      const projects = (d.projects ?? [])
        .map((p) => ({
          name: p.name,
          seconds: Math.round(p.total_seconds ?? 0),
          color: p.color ?? "",
        }))
        .filter((p) => p.seconds > 0);
      return {
        date: (d.range?.start ?? "").slice(0, 10),
        total: projects.reduce((s, p) => s + p.seconds, 0),
        projects,
      };
    })
    .filter((d) => d.projects.length > 0);

  const totals = new Map();
  const colors = new Map();
  for (const d of daily) {
    for (const p of d.projects) {
      totals.set(p.name, (totals.get(p.name) ?? 0) + p.seconds);
      if (!colors.has(p.name) && p.color) colors.set(p.name, p.color);
    }
  }

  const grand = [...totals.values()].reduce((s, v) => s + v, 0);
  const repos = [...totals.entries()]
    .map(([name, seconds]) => ({
      name,
      seconds,
      percent: grand ? Math.round((seconds / grand) * 1000) / 10 : 0,
      color: colors.get(name) ?? "",
    }))
    .sort((a, b) => b.seconds - a.seconds);

  return {
    updatedAt: new Date().toISOString(),
    start: daily[0]?.date ?? "",
    end: daily[daily.length - 1]?.date ?? "",
    range: "last_7_days",
    repos,
    daily,
  };
}

if (!API_KEY) {
  writeIfMissing(STATS_OUT, FALLBACK_STATS);
  writeIfMissing(REPOS_OUT, FALLBACK_REPOS);
  process.exit(0);
}

async function main() {
  const [stats, allTime, summaries] = await Promise.all([
    fetchJSON("https://wakatime.com/api/v1/users/current/stats/last_7_days"),
    fetchJSON("https://wakatime.com/api/v1/users/current/all_time_since_today"),
    fetchRepoSummaries(),
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

  fs.writeFileSync(STATS_OUT, JSON.stringify(data, null, 2));
  console.log(`✓ WakaTime data written to ${STATS_OUT}`);

  fs.writeFileSync(REPOS_OUT, JSON.stringify(buildRepoAnalytics(summaries), null, 2));
  console.log(`✓ Repo analytics written to ${REPOS_OUT}`);
}

main().catch((err) => {
  console.error("✗ WakaTime fetch failed:", err.message);
  writeIfMissing(STATS_OUT, FALLBACK_STATS, "WakaTime fetch failed");
  writeIfMissing(REPOS_OUT, FALLBACK_REPOS, "WakaTime fetch failed");
});
