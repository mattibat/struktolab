import assert from "node:assert/strict";
import { test } from "node:test";
import { KEYWORDS_EN, parsePseudocode } from "./pseudocode-parser.js";
import { treeToPseudocode } from "./tree-to-pseudocode.js";

const roundTrip = (code) => treeToPseudocode(parsePseudocode(code, KEYWORDS_EN), KEYWORDS_EN);

test("keeps loops and their bodies", () => {
  const code = 'repeat while x > 0:\n    x = x - 1\noutput("x")';
  assert.equal(roundTrip(code), code);
});

test("keeps the body of a line it does not understand", () => {
  // "while" alone is not a loop ("repeat while" is); its body used to vanish.
  const out = roundTrip('while x > 0:\n    x = x - 1\n    output("x")\ny = 1');
  assert.equal(out, 'while x > 0:\nx = x - 1\noutput("x")\ny = 1');
});
