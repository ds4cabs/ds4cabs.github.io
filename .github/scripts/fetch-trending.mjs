// Pre-builds assets/data/trending.json for the Trending page.
// Runs in GitHub Actions (authenticated → 1000 req/hr) so visitors never hit
// the unauthenticated 60 req/hr public limit. Mirrors the topics & windows in
// assets/js/trending.js — keep the two lists in sync.

import { writeFile, mkdir } from "node:fs/promises";

const TOPICS = [
  { id: "all",                  q: "bioinformatics OR genomics OR drug-discovery OR pharma OR proteomics OR cheminformatics" },
  { id: "bioinformatics",       q: "topic:bioinformatics" },
  { id: "drug-discovery",       q: "topic:drug-discovery" },
  { id: "genomics",             q: "topic:genomics" },
  { id: "computational-biology",q: "topic:computational-biology" },
  { id: "cheminformatics",      q: "topic:cheminformatics" },
  { id: "single-cell",          q: "topic:single-cell" },
];
const WINDOWS = ["7", "30", "90", "365"];

const token = process.env.GITHUB_TOKEN;
const headers = {
  Accept: "application/vnd.github+json",
  "X-GitHub-Api-Version": "2022-11-28",
  "User-Agent": "ds4cabs-trending-bot",
  ...(token ? { Authorization: `Bearer ${token}` } : {}),
};

function sinceDate(days) {
  const d = new Date();
  d.setUTCDate(d.getUTCDate() - Number(days));
  return d.toISOString().slice(0, 10);
}

function trim(r) {
  return {
    full_name: r.full_name,
    html_url: r.html_url,
    description: r.description,
    language: r.language,
    stargazers_count: r.stargazers_count,
    forks_count: r.forks_count,
    topics: (r.topics || []).slice(0, 4),
  };
}

const sleep = (ms) => new Promise((res) => setTimeout(res, ms));

async function fetchSet(topic, win) {
  const q = `${topic.q} created:>=${sinceDate(win)}`;
  const params = new URLSearchParams({ q, sort: "stars", order: "desc", per_page: "30" });
  const url = "https://api.github.com/search/repositories?" + params.toString();
  for (let attempt = 0; attempt < 3; attempt++) {
    const res = await fetch(url, { headers });
    if (res.ok) {
      const data = await res.json();
      return (data.items || []).map(trim);
    }
    if (res.status === 403 || res.status === 429) {
      // secondary rate limit — back off and retry
      await sleep(5000 * (attempt + 1));
      continue;
    }
    console.error(`  ! ${topic.id}|${win} → HTTP ${res.status}: ${await res.text()}`);
    return [];
  }
  console.error(`  ! ${topic.id}|${win} → gave up after retries`);
  return [];
}

const sets = {};
for (const topic of TOPICS) {
  for (const win of WINDOWS) {
    const key = `${topic.id}|${win}`;
    const items = await fetchSet(topic, win);
    sets[key] = items;
    console.log(`  ${key}: ${items.length} repos`);
    await sleep(1500); // stay well under the search secondary-rate-limit
  }
}

const out = { generated: new Date().toISOString(), sets };
await mkdir("assets/data", { recursive: true });
await writeFile("assets/data/trending.json", JSON.stringify(out, null, 2) + "\n");
console.log(`\nWrote assets/data/trending.json (${Object.keys(sets).length} sets)`);
