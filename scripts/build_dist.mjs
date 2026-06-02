import { chmod, copyFile, mkdir, readFile, writeFile } from "node:fs/promises";
import { stripTypeScriptTypes } from "node:module";
import { basename, join } from "node:path";

const root = new URL("..", import.meta.url).pathname;
const srcDir = join(root, "src");
const distDir = join(root, "dist");
const runtimeFiles = ["index.ts", "normalize.ts", "official_sources.ts", "scoring.ts"];

function toRuntimeJs(source, { bin = false } = {}) {
  let js = stripTypeScriptTypes(source, { mode: "transform" });
  js = js.replaceAll(".ts\"", ".js\"").replaceAll(".ts';", ".js';");
  if (bin) {
    js = js.replace("#!/usr/bin/env -S node --experimental-strip-types", "#!/usr/bin/env node");
    js = js.replaceAll("../src/index.js", "../index.js");
  }
  return js.endsWith("\n") ? js : `${js}\n`;
}

for (const file of runtimeFiles) {
  const source = await readFile(join(srcDir, file), "utf8");
  const target = join(distDir, basename(file, ".ts") + ".js");
  await writeFile(target, toRuntimeJs(source), "utf8");
}

await mkdir(join(distDir, "bin"), { recursive: true });
const cliSource = await readFile(join(root, "bin/jci.ts"), "utf8");
const cliTarget = join(distDir, "bin/jci.js");
await writeFile(cliTarget, toRuntimeJs(cliSource, { bin: true }), "utf8");
await chmod(cliTarget, 0o755);

await copyFile(join(srcDir, "index.d.ts"), join(distDir, "index.d.ts"));
