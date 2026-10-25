import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const TOKEN = process.env.GITHUB_TOKEN;
const GROQ_KEY = process.env.GROQ_API_KEY;
const DRY_RUN = process.env.DRY_RUN === "1";
const DEBUG = process.env.DEBUG === "1";
const ORG = "Event-Based-Banking-Application";
const MODEL = "openai/gpt-oss-120b";
const SINCE = process.env.ARYA_SINCE ?? "2026-09-14T18:30:00Z";
const CUTOFF_DATE = process.env.ARYA_CUTOFF_DATE ?? "2026-09-15";

const OUT = path.resolve(__dirname, "../public/changelog-arya.json");

const AUTHOR_LOGINS = new Set([
  "kartik1502",
  "google-labs-jules[bot]",
  "lovable-dev[bot]",
  "gpt-engineer-app[bot]",
]);
const AUTHOR_EMAILS = new Set([
  "kartikkulkarni1411@gmail.com",
  "64131481+kartik1502@users.noreply.github.com",
  "161369871+google-labs-jules[bot]@users.noreply.github.com",
  "159125892+lovable-dev[bot]@users.noreply.github.com",
  "159125892+gpt-engineer-app[bot]@users.noreply.github.com",
]);

const HARD_SKIP_TYPES = new Set(["docs", "test", "tests", "ci", "build", "style"]);
const GENERIC_SUBJECT =
  /^(changes?|work in progress|wip|update|updates|update plan|misc|miscellaneous|tmp|temp|test|fix|fixes)$/i;
const DEPENDENCY_SUBJECT =
  /^(chore|build|fix)\(deps\):|^(chore|build|fix):\s*(bump|update|upgrade|downgrade)\b/i;
const DOC_SUBJECT =
  /^(add|added|update|updated|create|created|write|wrote|edit|edited|fix|fixed)\s+(the\s+)?(project\s+)?(readme|docs?|documentation|changelog)\b/i;

const headers = {
  Accept: "application/vnd.github+json",
  "X-GitHub-Api-Version": "2022-11-28",
  "User-Agent": "kartik1502-portfolio",
  ...(TOKEN ? { Authorization: `Bearer ${TOKEN}` } : {}),
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

const SYSTEM_PROMPT = `You write the public changelog for Karthik's portfolio. The input is one local day of commits from Arya Banking, an event-driven banking platform with Spring Boot services, Kafka, MongoDB, and a unified portal.

Return only JSON:
{"skip": false, "title": "short heading", "summary": "two or three sentences"}

Rules:
- title: 4 to 10 words, plain, sentence case, no date, no "Arya Banking" prefix. Use a short noun phrase or past-tense phrase.
- summary: two or three sentences in past tense. Say what changed and why it matters to a reader. Use only the input.
- Prefer the author's "Changelog" trailer when present; it is the author's own summary.
- Include infrastructure and configuration changes that affect how the platform runs.
- Ignore documentation, tests, CI, dependency bumps, formatting, repository housekeeping such as .gitignore and lockfiles, and other non-user-visible work.
- Do not mention commit hashes, file paths, test commands, pull requests, bots, or agents.
- Do not use marketing language. Do not invent details.
- Set skip to true when the day has no user-visible change.`;

function istDate(value) {
  return dateFormat.format(new Date(value));
}

function istTime(value) {
  return timeFormat.format(new Date(value));
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function gh(pathname) {
  const res = await fetch(`https://api.github.com${pathname}`, { headers });
  if (!res.ok) {
    const body = await res.text();
    throw new Error(`GitHub API ${res.status}: ${body.slice(0, 200)}`);
  }
  return res.json();
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

function parseCommitMessage(message) {
  const lines = message.replace(/\r\n/g, "\n").split("\n");
  const subject = (lines.shift() ?? "").trim();
  const body = lines.join("\n").trim();
  const trailer = body.match(/^Changelog:\s*(.+)$/mi)?.[1]?.trim() ?? null;
  return { subject, body, trailer };
}

function isAllowedAuthor(commit) {
  const login = commit.author?.login ?? "";
  const email = commit.commit.author?.email ?? "";
  return AUTHOR_LOGINS.has(login) || AUTHOR_EMAILS.has(email);
}

function isImportantCommit({ subject, trailer }) {
  if (trailer?.toLowerCase() === "skip") return false;
  if (trailer) return true;
  const parsed = parseTitle(subject);
  if (parsed.type && HARD_SKIP_TYPES.has(parsed.type)) return false;
  if (DEPENDENCY_SUBJECT.test(subject)) return false;
  if (GENERIC_SUBJECT.test(parsed.text) || GENERIC_SUBJECT.test(subject)) return false;
  if (DOC_SUBJECT.test(parsed.text)) return false;
  return true;
}

function needsFiles(commit) {
  if (commit.trailer) return false;
  if (!commit.type) return true;
  return commit.type === "chore";
}

function displayTitle(subject) {
  const { text } = parseTitle(subject);
  return text.charAt(0).toUpperCase() + text.slice(1);
}

function displaySentence(subject) {
  const title = displayTitle(subject);
  return /[.!?]$/.test(title) ? title : `${title}.`;
}

function cleanText(value) {
  return typeof value === "string"
    ? value
        .replace(/`/g, "")
        .replace(/[\u2018\u2019]/g, "'")
        .replace(/[\u201C\u201D]/g, '"')
        .replace(/[\u2010\u2011]/g, "-")
        .replace(/\s+/g, " ")
        .trim()
    : "";
}

function limitWords(text, max) {
  const words = text.split(/\s+/).filter(Boolean);
  return words.length > max ? words.slice(0, max).join(" ") : text;
}

function limitSentences(text, max = 3) {
  const cleaned = text.replace(/\s+/g, " ").trim();
  if (!cleaned) return "";
  const sentences = cleaned.split(/(?<=[.!?])\s+/).filter(Boolean);
  let result = sentences.slice(0, max).join(" ").trim();
  if (result.length > 600) {
    result = `${result.slice(0, 597).replace(/\s+\S*$/, "")}…`;
  }
  return result;
}

function tagsFor(commits) {
  const tags = ["arya-banking"];
  for (const commit of commits) {
    const repo = commit.repo.replace(/^arya-banking-/, "");
    tags.push(repo === "arya-banking" ? "arya-banking" : repo);
  }
  return [...new Set(tags)].slice(0, 6);
}

function fallbackEntry(date, commits) {
  const main =
    commits.find((commit) => /^(feat|fix|perf|refactor|improvement|revert)\b/i.test(commit.subject)) ??
    commits[0];
  const summaries = commits
    .map((commit) =>
      commit.trailer && commit.trailer.toLowerCase() !== "skip"
        ? commit.trailer
        : displaySentence(commit.subject),
    )
    .filter(Boolean)
    .map((summary) => summary.replace(/[.!?]+$/, ""));
  const untypedPortal = commits.every(
    (commit) => !commit.type && commit.repo === "unified-banking-portal",
  );
  const title = untypedPortal ? "Initial unified banking portal" : displayTitle(main.subject);
  const summaryText =
    summaries.length > 1 ? `${summaries.join("; ")}.` : `${summaries[0] ?? ""}.`;

  return {
    id: `arya:${date}`,
    date,
    time: commits.at(-1).time,
    title: limitWords(title, 12),
    description: limitSentences(summaryText, 3),
    tags: tagsFor(commits),
    source: "fallback",
  };
}

function parseModelJson(content) {
  const cleaned = content
    .replace(/^```(?:json)?\s*/i, "")
    .replace(/\s*```$/, "")
    .trim();
  const match = cleaned.match(/\{[\s\S]*\}/);
  return JSON.parse(match?.[0] ?? cleaned);
}

async function groq(messages, attempt = 0) {
  const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${GROQ_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: MODEL,
      messages,
      temperature: 0.2,
      max_completion_tokens: 1200,
    }),
  });

  if (!res.ok) {
    const body = await res.text();
    if ((res.status === 429 || res.status >= 500) && attempt < 2) {
      await sleep(1000 * 2 ** attempt);
      return groq(messages, attempt + 1);
    }
    throw new Error(`Groq API ${res.status}: ${body.slice(0, 200)}`);
  }

  const json = await res.json();
  return json.choices?.[0]?.message?.content ?? "";
}

async function summarizeDay(date, commits) {
  if (!GROQ_KEY) return fallbackEntry(date, commits);

  const input = {
    date,
    commits: commits.map((commit) => ({
      repo: commit.repo,
      message: commit.body ? `${commit.subject}\n\n${commit.body}` : commit.subject,
      changelog: commit.trailer && commit.trailer.toLowerCase() !== "skip" ? commit.trailer : undefined,
      files: commit.files.length > 0 ? commit.files : undefined,
    })),
  };

  try {
    const content = await groq([
      { role: "system", content: SYSTEM_PROMPT },
      { role: "user", content: JSON.stringify(input, null, 2) },
    ]);
    const parsed = parseModelJson(content);
    if (parsed.skip === true) {
      return { id: `arya:${date}`, date, skip: true };
    }

    const title = limitWords(cleanText(parsed.title), 12);
    const summary = limitSentences(cleanText(parsed.summary), 3);
    if (!title || !summary) throw new Error("Groq returned an empty title or summary");

    return {
      id: `arya:${date}`,
      date,
      time: commits.at(-1).time,
      title,
      description: summary,
      tags: tagsFor(commits),
      source: "ai",
    };
  } catch (err) {
    console.warn(`⚠ Groq summary failed for ${date}: ${err.message}`);
    return fallbackEntry(date, commits);
  }
}

async function fetchRepos() {
  const repos = await gh(`/orgs/${ORG}/repos?per_page=100&type=all`);
  return repos.filter(
    (repo) =>
      repo.name !== ".github" &&
      !repo.archived &&
      !repo.disabled &&
      repo.size > 0 &&
      repo.default_branch,
  );
}

async function fetchCommits(repo, branch) {
  const commits = [];
  for (let page = 1; ; page += 1) {
    const params = new URLSearchParams({
      sha: branch,
      since: SINCE,
      per_page: "100",
      page: String(page),
    });
    const batch = await gh(`/repos/${ORG}/${repo}/commits?${params}`);
    if (!Array.isArray(batch) || batch.length === 0) break;
    commits.push(...batch);
    if (batch.length < 100) break;
  }
  return commits;
}

async function fetchCommitFiles(repo, sha) {
  try {
    const data = await gh(`/repos/${ORG}/${repo}/commits/${sha}`);
    return (data.files ?? [])
      .slice(0, 20)
      .map(
        (file) =>
          `${file.filename} (${file.status}, +${file.additions}/-${file.deletions})`,
      );
  } catch (err) {
    console.warn(`⚠ ${repo}@${sha.slice(0, 7)} files: ${err.message}`);
    return [];
  }
}

function readExisting() {
  if (!fs.existsSync(OUT)) return [];
  const raw = fs.readFileSync(OUT, "utf8").trim();
  if (!raw) return [];
  const parsed = JSON.parse(raw);
  if (!Array.isArray(parsed)) {
    throw new Error(`${path.basename(OUT)} must be an array`);
  }
  return parsed;
}

async function main() {
  if (!TOKEN) console.warn("⚠ GITHUB_TOKEN is not set; using the unauthenticated rate limit.");
  if (!GROQ_KEY) console.warn("⚠ GROQ_API_KEY is not set; using commit-message summaries.");
  if (DRY_RUN) console.warn("⚠ DRY_RUN is set; no file will be written.");

  const existing = readExisting();
  const skipDates = new Set(
    existing
      .filter((entry) => !(GROQ_KEY && entry.source === "fallback"))
      .map((entry) => entry.date)
      .filter(Boolean),
  );

  const today = istDate(new Date());
  const repos = await fetchRepos();
  const groups = new Map();

  for (const repo of repos) {
    let commits;
    try {
      commits = await fetchCommits(repo.name, repo.default_branch);
    } catch (err) {
      console.warn(`⚠ ${repo.name}: ${err.message}`);
      continue;
    }

    for (const commit of commits) {
      if (DEBUG) {
        console.log(
          `? ${repo.name} ${commit.sha.slice(0, 7)} ${commit.commit.author.date} ${commit.author?.login ?? "-"} ${commit.commit.author.email}`,
        );
      }
      const isMerge = (commit.parents?.length ?? 0) > 1;
      const subject = (commit.commit.message.split("\n")[0] ?? "").trim();
      if (isMerge && /^Merge\b/i.test(subject)) continue;
      if (!isAllowedAuthor(commit)) continue;

      const date = istDate(commit.commit.author.date);
      if (date < CUTOFF_DATE || date >= today) continue;
      if (skipDates.has(date)) continue;

      const parsed = parseCommitMessage(commit.commit.message);
      if (!isImportantCommit(parsed)) continue;

      const title = parseTitle(parsed.subject);
      const item = {
        repo: repo.name,
        sha: commit.sha,
        date,
        time: istTime(commit.commit.author.date),
        subject: parsed.subject,
        body: parsed.body,
        trailer: parsed.trailer,
        type: title.type,
        scope: title.scope,
        files: [],
      };

      if (!groups.has(date)) groups.set(date, []);
      groups.get(date).push(item);
    }
  }

  const dates = [...groups.keys()].sort();
  if (dates.length === 0) {
    console.log("No new complete Arya Banking days.");
    return;
  }

  const created = [];
  for (const date of dates) {
    const commits = groups
      .get(date)
      .sort((a, b) => a.time.localeCompare(b.time) || a.sha.localeCompare(b.sha));

    await Promise.all(
      commits.filter(needsFiles).map(async (commit) => {
        commit.files = await fetchCommitFiles(commit.repo, commit.sha);
      }),
    );

    const entry = await summarizeDay(date, commits);
    created.push(entry);
    console.log(entry.skip ? `- ${date}: skipped` : `✓ ${date}: ${entry.title} (${entry.source})`);
  }

  const createdDates = new Set(created.filter((entry) => entry.date).map((entry) => entry.date));
  const kept = existing.filter(
    (entry) => !(GROQ_KEY && entry.source === "fallback" && createdDates.has(entry.date)),
  );
  const next = [...kept, ...created].sort((a, b) =>
    (b.date ?? "").localeCompare(a.date ?? ""),
  );

  if (DRY_RUN) {
    console.log(JSON.stringify(next, null, 2));
    return;
  }

  fs.writeFileSync(OUT, JSON.stringify(next, null, 2));
  console.log(`✓ Arya changelog written to ${OUT} (${created.length} new)`);
}

main().catch((err) => {
  console.error("✗ Arya changelog fetch failed:", err.message);
  if (DRY_RUN) return;
  if (fs.existsSync(OUT)) {
    console.warn(`⚠ Keeping existing ${path.basename(OUT)}`);
  } else {
    fs.writeFileSync(OUT, JSON.stringify([], null, 2));
    console.warn(`⚠ Writing empty ${path.basename(OUT)}`);
  }
});
