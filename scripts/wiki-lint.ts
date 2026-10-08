#!/usr/bin/env node

import { readdir, readFile, stat } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const wikiRoot = path.join(root, "wiki");

const wikiLinkPattern = /\[\[([^\]|#]+)(?:#[^\]|]+)?(?:\|[^\]]+)?\]\]/g;
const markdownLinkPattern = /\[[^\]]*\]\(([^)]+\.md(?:#[^)]+)?)\)/g;
const backtickMarkdownPathPattern = /`([^`]+\.md)`/g;

async function exists(filePath: string): Promise<boolean> {
  try {
    await stat(filePath);
    return true;
  } catch {
    return false;
  }
}

async function walkMarkdown(directory: string): Promise<string[]> {
  if (!(await exists(directory))) return [];

  const entries = await readdir(directory, { withFileTypes: true });
  const nested = await Promise.all(
    entries.map(async (entry) => {
      const fullPath = path.join(directory, entry.name);
      if (entry.isDirectory()) return walkMarkdown(fullPath);
      return entry.isFile() && entry.name.endsWith(".md") ? [fullPath] : [];
    }),
  );

  return nested.flat().sort();
}

function normalise(value: string): string {
  return value.trim().toLowerCase().replace(/[\s_-]+/g, "-");
}

function firstHeading(markdown: string): string | undefined {
  return markdown
    .split(/\r?\n/)
    .find((line) => line.startsWith("# "))
    ?.slice(2)
    .trim();
}

function relative(filePath: string): string {
  return path.relative(root, filePath).split(path.sep).join("/");
}

async function main(): Promise<void> {
  const errors: string[] = [];

  for (const required of ["wiki/index.md", "wiki/ontology.md", ".wiki/source-registry.md"]) {
    if (!(await exists(path.join(root, required)))) {
      errors.push(`missing required file: ${required}`);
    }
  }

  const files = await walkMarkdown(wikiRoot);
  const content = new Map<string, string>();
  const byCanonicalName = new Map<string, string[]>();

  for (const file of files) {
    const markdown = await readFile(file, "utf8");
    content.set(file, markdown);

    const heading = firstHeading(markdown);
    if (!heading) {
      errors.push(`${relative(file)}: missing top-level heading`);
      continue;
    }

    const keys = new Set([normalise(path.parse(file).name), normalise(heading)]);
    for (const key of keys) {
      const matches = byCanonicalName.get(key) ?? [];
      matches.push(file);
      byCanonicalName.set(key, matches);
    }
  }

  for (const [key, matches] of byCanonicalName) {
    const unique = [...new Set(matches)];
    if (unique.length > 1) {
      errors.push(`ambiguous wiki page '${key}': ${unique.map(relative).join(", ")}`);
    }
  }

  for (const file of files) {
    const markdown = content.get(file) ?? "";

    for (const match of markdown.matchAll(wikiLinkPattern)) {
      const rawTarget = match[1].trim();
      const targetKey = normalise(path.parse(rawTarget).name);
      const matches = [...new Set(byCanonicalName.get(targetKey) ?? [])];

      if (matches.length === 0) {
        errors.push(`${relative(file)}: broken wikilink [[${rawTarget}]]`);
      } else if (matches.length > 1) {
        errors.push(`${relative(file)}: ambiguous wikilink [[${rawTarget}]]`);
      }
    }

    for (const match of markdown.matchAll(markdownLinkPattern)) {
      const target = match[1].split("#", 1)[0];
      if (target.includes("://")) continue;

      const resolved = path.resolve(path.dirname(file), target);
      if (!(await exists(resolved))) {
        errors.push(`${relative(file)}: broken Markdown link (${target})`);
      }
    }

    const lines = markdown.split(/\r?\n/);
    let inSources = false;

    for (const line of lines) {
      if (/^##\s+Sources\s*$/i.test(line)) {
        inSources = true;
        continue;
      }
      if (inSources && /^##\s+/.test(line)) {
        inSources = false;
      }
      if (!inSources) continue;

      for (const match of line.matchAll(backtickMarkdownPathPattern)) {
        const sourcePath = path.resolve(root, match[1]);
        if (!(await exists(sourcePath))) {
          errors.push(`${relative(file)}: missing source file \`${match[1]}\``);
        }
      }
    }
  }

  if (errors.length > 0) {
    console.error("Wiki lint failed:\n");
    for (const error of errors) console.error(`- ${error}`);
    process.exitCode = 1;
    return;
  }

  console.log("Wiki lint passed.");
}

await main();
