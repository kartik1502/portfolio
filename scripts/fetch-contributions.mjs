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
const CHANGELOG_OUT = path.resolve(__dirname, "../public/changelog-contributions.json");
const OVERRIDES = path.resolve(__dirname, "../data/changelog-overrides.json");

const IMPORTANT_TYPES = new Set(["feat", "fix", "perf", "refactor", "improvement"]);
const SKIP_TYPES = new Set(["docs", "chore", "test", "tests", "ci", "build", "style"]);
const TYPE_TAGS = {
  feat: "feature",
  fix: "fix",
  perf: "performance",
  refactor: "refactor",
  improvement: "improvement",
};

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

const dateFormat = new Intl.DateTimeFormat("en-CA", {
  timeZone: "Asia/Kolkata",
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
});
const timeFormat = new Intl.DateTimeFormat("en-GB", {
  timeZone: "Asia/Kolkata",
  hour: "2-digit",
  minute: "2-digit",
  hourCycle: "h23",
});

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

function localDate(iso) {
  return dateFormat.format(new Date(iso));
}

function localTime(iso) {
  return timeFormat.format(new Date(iso));
}

function parseTitle(title) {
  const match = title.match(/^([a-z]+)(?:\(([^)]+)\))?!?:\s*(.+)$/i);
  if (!match) return { type: null, scope: null, text: title.trim() };
  return {
    type: match[1].toLowerCase(),
    scope: match[2]?.toLowerCase() ?? null,
    text: match[3].trim(),
  };
}

function displayTitle(title) {
  const { text } = parseTitle(title);
  return text.charAt(0).toUpperCase() + text.slice(1);
}

function section(body, matches) {
  const lines = body.replace(/\r\n/g, "\n").split("\n");
  let start = -1;
  for (let i = 0; i < lines.length; i += 1) {
    const heading = lines[i].match(/^##\s+(.+?)\s*#*\s*$/);
    if (heading && matches(heading[1].trim())) {
      start = i + 1;
      break;
    }
  }
  if (start === -1) return null;

  let end = lines.length;
  for (let i = start; i < lines.length; i += 1) {
    if (/^##\s+/.test(lines[i])) {
      end = i;
      break;
    }
  }
  return lines.slice(start, end).join("\n").trim();
}

function cleanMarkdown(text) {
  return text
    .replace(/<!--[\s\S]*?-->/g, "")
    .replace(/```[\s\S]*?```/g, "")
    .replace(/`([^`]+)`/g, "$1")
    .replace(/!\[[^\]]*\]\([^)]*\)/g, "")
    .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
    .replace(/<[^>]+>/g, "")
    .replace(/\*\*([^*]+)\*\*/g, "$1")
    .replace(/\*([^*]+)\*/g, "$1")
    .replace(/^\s*[-*+]\s+/gm, ". ")
    .replace(/^\s*>\s?/gm, "")
    .replace(/^\s*-{3,}\s*$/gm, " ")
    .replace(/\s+/g, " ")
    .replace(/^\.\s*/, "")
    .trim();
}

function limitSentences(text, max = 2) {
  const cleaned = text.replace(/\s+/g, " ").trim();
  if (!cleaned) return "";
  const sentences = cleaned.split(/(?<=[.!?])\s+/).filter(Boolean);
  let result = sentences.slice(0, max).join(" ").trim();
  if (result.length > 420) {
    result = `${result.slice(0, 417).replace(/\s+\S*$/, "")}…`;
  }
  return result;
}

function selectChangeParagraph(text) {
  const paragraphs = text
    .replace(/<!--[\s\S]*?-->/g, "")
    .split(/\n\s*\n/)
    .map((paragraph) => cleanMarkdown(paragraph))
    .filter(Boolean);
  if (paragraphs.length === 0) return "";

  const changeVerb =
    /\b(adds?|added|fix(?:es|ed)?|update[sd]?|removes?|removed|replaces?|replaced|changes?|changed|makes?|made|introduces?|improves?|refactors?|renames?|moves?|migrates?|enables?|disables?|prevents?|returns?|reports?|supports?|now)\b/i;
  const startsWithVerb =
    /^(adds?|fix(?:es)?|updates?|removes?|replaces?|introduces?|improves?|refactors?|renames?|moves?|migrates?|enables?|disables?|prevents?|returns?|reports?|supports?)\b/i;

  const scored = paragraphs
    .filter((paragraph) => paragraph.length > 40)
    .filter((paragraph) => !/^(closes?|fixes?|resolves?)\s+#\d+\.?$/i.test(paragraph))
    .map((paragraph) => {
      let score = 0;
      if (changeVerb.test(paragraph)) score += 2;
      if (/\bnow\b/i.test(paragraph)) score += 2;
      if (startsWithVerb.test(paragraph)) score += 3;
      if (/\b(old|previously|before|instead|bug|problem|issue|error)\b/i.test(paragraph)) {
        score -= 1;
      }
      return { paragraph, score };
    })
    .sort((a, b) => b.score - a.score);

  return scored[0]?.paragraph ?? paragraphs.find((p) => p.length > 40) ?? paragraphs[0];
}

function importanceFrom(sectionText) {
  return (
    sectionText
      .match(/^\s*\*{0,2}importance\*{0,2}:\s*(major|minor|skip)\b/im)?.[1]
      ?.toLowerCase() ?? null
  );
}

function areasFrom(sectionText) {
  const value = sectionText.match(/^\s*\*{0,2}area\*{0,2}:\s*(.+)$/im)?.[1];
  if (!value) return [];
  return cleanMarkdown(value)
    .split(/[,|]/)
    .map((area) => area.trim().toLowerCase())
    .filter(Boolean)
    .slice(0, 3);
}

function changelogSummary(sectionText) {
  const labeled = sectionText.match(
    /^\s*\*{0,2}summary\*{0,2}:\s*([\s\S]*?)(?=^\s*\*{0,2}(?:area|importance|type|scope)\*{0,2}:|$)/im,
  );
  const source =
    labeled?.[1] ??
    sectionText.replace(
      /^\s*\*{0,2}(?:area|importance|type|scope)\*{0,2}:.*$/gim,
      "",
    );
  return cleanMarkdown(source);
}

function summaryFromBody(body) {
  if (!body) return { summary: "", importance: null, areas: [] };

  const changelog = section(body, (heading) => /^changelog$/i.test(heading));
  if (changelog) {
    return {
      summary: limitSentences(changelogSummary(changelog), 2),
      importance: importanceFrom(changelog),
      areas: areasFrom(changelog),
    };
  }

  const summarySection = section(body, (heading) => /^summary$/i.test(heading));
  const what = section(body, (heading) => /^what\b/i.test(heading));
  const why = section(body, (heading) => /^why$/i.test(heading));
  const source = summarySection ?? what ?? why;
  if (!source) return { summary: "", importance: null, areas: [] };

  return {
    summary: limitSentences(selectChangeParagraph(source), 2),
    importance: importanceFrom(source),
    areas: areasFrom(source),
  };
}

function isImportant(parsed, extracted) {
  if (extracted.importance === "skip") return false;
  if (extracted.importance === "major" || extracted.importance === "minor") return true;
  if (parsed.type && SKIP_TYPES.has(parsed.type)) return false;
  if (parsed.type && IMPORTANT_TYPES.has(parsed.type)) return true;
  return false;
}

function tagsFor(repo, parsed, areas) {
  const tags = ["open-source", repo, parsed.scope, ...areas, TYPE_TAGS[parsed.type]];
  return [...new Set(tags.filter(Boolean))].slice(0, 6);
}

function readOverrides() {
  try {
    return JSON.parse(fs.readFileSync(OVERRIDES, "utf8"));
  } catch {
    return { include: [] };
  }
}

async function main() {
  const result = await search(QUERY, 100);
  const items = result.items ?? [];
  const include = new Set(readOverrides().include ?? []);

  const contributions = items
    .map((item) => {
      const mergedAt = item.pull_request?.merged_at ?? item.closed_at;
      if (!mergedAt) return null;
      return {
        repo: repoName(item.repository_url),
        number: item.number,
        title: item.title,
        url: item.html_url,
        mergedAt,
      };
    })
    .filter(Boolean)
    .sort((a, b) => new Date(b.mergedAt) - new Date(a.mergedAt));

  const latest = contributions.slice(0, 5);

  const data = {
    updatedAt: new Date().toISOString(),
    totalMerged: result.total_count ?? 0,
    projects: new Set(contributions.map((item) => item.repo)).size,
    latest,
  };

  const changelog = [];
  for (const item of items) {
    const mergedAt = item.pull_request?.merged_at ?? item.closed_at;
    if (!mergedAt) continue;

    const repo = repoName(item.repository_url);
    const id = `external:${repo}#${item.number}`;
    const parsed = parseTitle(item.title);
    const extracted = summaryFromBody(item.body);
    if (!include.has(id) && !isImportant(parsed, extracted)) continue;

    changelog.push({
      id,
      date: localDate(mergedAt),
      time: localTime(mergedAt),
      title: displayTitle(item.title),
      description: extracted.summary || displayTitle(item.title),
      tags: tagsFor(repo, parsed, extracted.areas),
      href: item.html_url,
      source: "external",
    });
  }

  changelog.sort((a, b) =>
    `${b.date}T${b.time}`.localeCompare(`${a.date}T${a.time}`),
  );

  fs.writeFileSync(OUT, JSON.stringify(data, null, 2));
  fs.writeFileSync(CHANGELOG_OUT, JSON.stringify(changelog, null, 2));
  console.log(
    `✓ GitHub contributions written to ${OUT} (${data.totalMerged} merged, ${data.projects} projects)`,
  );
  console.log(`✓ Changelog entries written to ${CHANGELOG_OUT} (${changelog.length})`);
}

main().catch((err) => {
  console.error("✗ GitHub contributions fetch failed:", err.message);
  if (fs.existsSync(OUT)) {
    console.warn(`⚠ Keeping existing ${path.basename(OUT)}`);
  } else {
    fs.writeFileSync(OUT, JSON.stringify(FALLBACK, null, 2));
    console.warn(`⚠ Writing fallback ${path.basename(OUT)}`);
  }
  if (fs.existsSync(CHANGELOG_OUT)) {
    console.warn(`⚠ Keeping existing ${path.basename(CHANGELOG_OUT)}`);
  } else {
    fs.writeFileSync(CHANGELOG_OUT, JSON.stringify([], null, 2));
    console.warn(`⚠ Writing fallback ${path.basename(CHANGELOG_OUT)}`);
  }
});
