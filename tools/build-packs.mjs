/**
 * Compile / extract Bandits On The River compendium packs.
 *
 * Foundry v11+ loads compendiums as LevelDB directories (the `packs/` dir
 * declared in module.json). We author content as readable source JSON under
 * `src/packs/<name>/` and compile it here, so the source is diff-friendly and
 * the built packs are reproducible.
 *
 *   npm run pack     src/packs/<name>/*.json  ->  packs/<name>/   (LevelDB)
 *   npm run unpack   packs/<name>/            ->  src/packs/<name>/*.json
 *
 * Only non-empty source dirs are compiled, so you can scaffold a pack folder
 * before it has content without producing a broken (declared-but-missing) pack.
 */

import { compilePack, extractPack } from "@foundryvtt/foundryvtt-cli";
import { readdirSync } from "node:fs";

const SRC = "src/packs";
const OUT = "packs";
const mode = process.argv[2] ?? "pack";

const hasDocs = (dir) =>
  readdirSync(dir).some((f) => /\.(json|ya?ml)$/i.test(f));

const packs = readdirSync(SRC, { withFileTypes: true })
  .filter((d) => d.isDirectory())
  .map((d) => d.name);

for (const name of packs) {
  const src = `${SRC}/${name}`;
  const out = `${OUT}/${name}`;
  if (mode === "unpack") {
    await extractPack(out, src, { log: true });
  } else {
    if (!hasDocs(src)) {
      console.log(`skip ${name} (no source documents yet)`);
      continue;
    }
    await compilePack(src, out, { log: true });
  }
}
console.log(`done (${mode}).`);
