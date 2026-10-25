import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Only merged pull requests to repositories outside the user's own projects.
// The default GITHUB_TOKEN is enough for public repository data.
const TOKEN = process.env.GITHUB_TOKEN;
const USER = "kartik1502";
const QUERY = `author:${USER} is:pr is:merged is:public -user:${USER} -org:Event-Based-Banking-Application`;

const OUT = path.resolve(__dirname, "../public/contributions.json");

const headers = {
  Accept: "application/vnd.github+json",
  "X-GitHub-Api-Version": "2022-11-28",
  "User-Agent": "kartik1502-portfolio",
  ...(TOKEN ? { Authorization: `Bearer ${TOKEN}` } : {}),
};

const FALLBACK = {
  updatedAt: new Date().toISOString(),
  totalMerged: 0,
  projects: 0,
  latest: [],
};

async function search(query, perPage) {
  const params = new URLSearchParams({
    q: query,
    sort: "created",
    order: "desc",
    per_page: String(perPage),
  });
  const res = await fetch(`https://api.github.com/search/issues?${params}`, {
    headers,
  });
  if (!res.ok) {
    throw new Error(`GitHub API error: ${res.status} ${res.statusText}`);
  }
  return res.json();
}

function repoName(repositoryUrl) {
  const parts = repositoryUrl.split("/");
  return `${parts.at(-2)}/${parts.at(-1)}`;
}

async function main() {
  const result = await search(QUERY, 100);
  const items = result.items ?? [];

  const latest = items
    .map((item) => ({
      repo: repoName(item.repository_url),
      number: item.number,
      title: item.title,
      url: item.html_url,
      mergedAt: item.pull_request?.merged_at ?? item.closed_at,
    }))
    .sort((a, b) => new Date(b.mergedAt) - new Date(a.mergedAt))
    .slice(0, 5);

  const data = {
    updatedAt: new Date().toISOString(),
    totalMerged: result.total_count ?? 0,
    projects: new Set(items.map((item) => repoName(item.repository_url))).size,
    latest,
  };

  fs.writeFileSync(OUT, JSON.stringify(data, null, 2));
  console.log(
    `✓ GitHub contributions written to ${OUT} (${data.totalMerged} merged, ${data.projects} projects)`,
  );
}

main().catch((err) => {
  console.error("✗ GitHub contributions fetch failed:", err.message);
  if (fs.existsSync(OUT)) {
    console.warn(`⚠ Keeping existing ${path.basename(OUT)}`);
    return;
  }
  fs.writeFileSync(OUT, JSON.stringify(FALLBACK, null, 2));
  console.warn(`⚠ Writing fallback ${path.basename(OUT)}`);
});
