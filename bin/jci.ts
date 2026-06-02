#!/usr/bin/env -S node --experimental-strip-types
import { readFile } from "node:fs/promises";
import {
  normalizeCompanyName,
  rankCandidates,
  toNtaFullWidth,
  isCorporateNumberFormat,
} from "../src/index.ts";
import type { CorporateRecord, IdentityInput } from "../src/index.ts";

function usage(): never {
  console.error(`Usage:
  jci normalize <company-name>
  jci fullwidth <value>
  jci verify-number <13-digit-number>
  jci score --input <input.json> --candidates <candidates.json>`);
  process.exit(2);
}

function argValue(args: string[], name: string): string | undefined {
  const index = args.indexOf(name);
  return index >= 0 ? args[index + 1] : undefined;
}

async function readJson<T>(path: string): Promise<T> {
  return JSON.parse(await readFile(path, "utf8")) as T;
}

const [command, ...args] = process.argv.slice(2);

if (command === "normalize") {
  const value = args.join(" ");
  if (!value) usage();
  console.log(JSON.stringify({ input: value, normalized: normalizeCompanyName(value) }, null, 2));
} else if (command === "fullwidth") {
  const value = args.join(" ");
  if (!value) usage();
  console.log(JSON.stringify({ input: value, fullwidth: toNtaFullWidth(value) }, null, 2));
} else if (command === "verify-number") {
  const value = args[0];
  if (!value) usage();
  console.log(JSON.stringify({ input: value, validFormat: isCorporateNumberFormat(value) }, null, 2));
} else if (command === "score") {
  const inputPath = argValue(args, "--input");
  const candidatesPath = argValue(args, "--candidates");
  if (!inputPath || !candidatesPath) usage();
  const input = await readJson<IdentityInput>(inputPath);
  const candidates = await readJson<CorporateRecord[]>(candidatesPath);
  console.log(JSON.stringify({ input, results: rankCandidates(input, candidates) }, null, 2));
} else {
  usage();
}
