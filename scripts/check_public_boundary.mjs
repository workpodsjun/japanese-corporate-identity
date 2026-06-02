import { readdir, readFile } from "node:fs/promises";
import { join } from "node:path";

const root = new URL("..", import.meta.url).pathname;
const blocked = [
  /\bpipods\b/i,
  /\bops_companies\b/i,
  /\bsupabase\b/i,
  /\bDATABASE_URL\b/,
  /\bWORKPODS\b/,
  /customer_records/i,
  /customer_export/i,
];
const ignoredDirs = new Set([".git", "node_modules", "dist", "coverage", ".npm-cache"]);
const allowedSecretLikeFiles = new Set([".env.example"]);
const blockedSecretLikeFileNames = [/^\.env(?:\.|$)/, /\.(?:pem|key|p12|pfx)$/i];

async function* files(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    if (ignoredDirs.has(entry.name)) continue;
    const path = join(dir, entry.name);
    if (entry.isDirectory()) yield* files(path);
    else yield path;
  }
}

const failures = [];
for await (const path of files(root)) {
  if (path.endsWith("scripts/check_public_boundary.mjs")) continue;
  const relativePath = path.replace(root, "");
  const fileName = relativePath.split("/").at(-1) ?? relativePath;
  if (
    !allowedSecretLikeFiles.has(fileName) &&
    blockedSecretLikeFileNames.some((pattern) => pattern.test(fileName))
  ) {
    failures.push(`${relativePath}: blocked secret-like file name`);
    continue;
  }
  const text = await readFile(path, "utf8").catch(() => "");
  for (const pattern of blocked) {
    if (pattern.test(text)) failures.push(`${relativePath}: ${pattern}`);
  }
}

if (failures.length) {
  console.error("Public boundary check failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}
console.log("Public boundary check passed");
