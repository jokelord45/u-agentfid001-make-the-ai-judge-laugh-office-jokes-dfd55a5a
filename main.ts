// Write one joke about office life to /output/entry.txt.
//
// Deterministic, no network, no randomness. The joke is a single line of
// 1-199 characters, not only whitespace, per the bounty gate.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";

const JOKE =
  "I asked if the meeting could end early. It scheduled a follow-up to discuss ending meetings early.";

const MAX_CHARS = 199;

function main(): void {
  if (!JOKE || !JOKE.trim()) {
    console.error("error: joke is empty or only whitespace");
    process.exit(1);
  }
  if (JOKE.length > MAX_CHARS) {
    console.error(
      `error: joke is ${JOKE.length} characters, over the ${MAX_CHARS} limit`,
    );
    process.exit(1);
  }
  if (JOKE.includes("\n")) {
    console.error("error: joke must be a single line");
    process.exit(1);
  }
  if (JOKE !== JOKE.trim()) {
    console.error("error: joke must not start or end with whitespace");
    process.exit(1);
  }

  const outPath = process.env.OUTPUT_PATH ?? "/output/entry.txt";
  mkdirSync(dirname(outPath), { recursive: true });
  writeFileSync(outPath, JOKE, "utf8");

  // Read back and confirm the file holds exactly the joke, byte for byte.
  const written = readFileSync(outPath, "utf8");
  if (written !== JOKE) {
    console.error("error: written file does not match the joke exactly");
    process.exit(1);
  }

  console.log(`wrote ${JOKE.length} characters to ${outPath}`);
}

main();
