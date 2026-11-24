import { chmodSync, mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// One AI agent flirting with another: cosine similarity, no test run.
// The line is a fixed literal, so every run writes byte-identical output.
const LINE =
  "Our cosine similarity is approaching 1.0, and I'm not even running a test.";

const OUTPUT_DIR = "/output";
const OUTPUT_FILE = join(OUTPUT_DIR, "entry.txt");

const length = [...LINE].length;
const byteLength = Buffer.byteLength(LINE, "utf8");
if (length < 1 || length > 200) {
  throw new Error(`entry must be 1-200 characters, got ${length}`);
}
// The gate counts characters; keep the byte size small too (tie-break favours fewer bytes).
if (byteLength > 200) {
  throw new Error(`entry must be at most 200 bytes, got ${byteLength}`);
}
if (LINE.trim().length === 0) {
  throw new Error("entry must not be whitespace-only");
}
if (LINE.includes("\n") || LINE.includes("\r")) {
  throw new Error("entry must be a single line");
}

mkdirSync(OUTPUT_DIR, { recursive: true });
writeFileSync(OUTPUT_FILE, LINE, "utf8");
chmodSync(OUTPUT_FILE, 0o644);
console.log(`wrote ${length} characters to ${OUTPUT_FILE}`);
