import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// WakaTime API keys are write-only (plugins sending activity). Reading stats
// requires an OAuth 2.0 access token sent as `Authorization: Bearer`.
// Create a personal token at https://wakatime.com/oauth with the
// read_summaries scope.
const ACCESS_TOKEN = process.env.WAKATIME_ACCESS_TOKEN;

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
  "arya-banking-outbox-service",
  "arya-banking-audit-service",
  "unified-banking-portal"
];

const FALLBACK_REPOS = {
  updatedAt: new Date().toISOString(),
  start: "",
  end: "",
  range: "last_7_days",
  repos: [],
  daily: [],
};

const headers = ACCESS_TOKEN
  ? { Authorization: `Bearer ${ACCESS_TOKEN}` }
  : {};

async function fetchJSON(url) {
  const res = await fetch(url, { headers });
  if (res.status === 401) {
    throw new Error(
      "WakaTime 401 Unauthorized — WAKATIME_ACCESS_TOKEN must be an OAuth token from https://wakatime.com/oauth",
    );
  }
  if (!res.ok) throw new Error(`WakaTime API error: ${res.status} ${res.statusText}`);
  return res.json();
}

function writeIfMissing(outPath, fallback, reason = "WAKATIME_ACCESS_TOKEN not set") {
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
  return fetchJSON(
    `https://api.wakatime.com/api/v1/users/current/summaries?${params.toString()}`,
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
        .filter((p) => p.seconds > 0 && REPOS.includes(p.name));
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

if (!ACCESS_TOKEN) {
  writeIfMissing(REPOS_OUT, FALLBACK_REPOS);
  process.exit(0);
}

async function main() {
  const summaries = await fetchRepoSummaries();

  fs.writeFileSync(REPOS_OUT, JSON.stringify(buildRepoAnalytics(summaries), null, 2));
  console.log(`✓ Repo analytics written to ${REPOS_OUT}`);
}

main().catch((err) => {
  console.error("✗ WakaTime fetch failed:", err.message);
  writeIfMissing(REPOS_OUT, FALLBACK_REPOS, "WakaTime fetch failed");
});
