import assert from "node:assert/strict";
import test from "node:test";
import { isCorporateNumberFormat, rankCandidates, scoreIdentityMatch } from "../src/index.ts";
import type { CorporateRecord, IdentityInput } from "../src/index.ts";
import candidates from "./fixtures/candidates_sample.json" with { type: "json" };
import input from "./fixtures/input_sample.json" with { type: "json" };

test("validates corporate number format only", () => {
  assert.equal(isCorporateNumberFormat("9000000000000"), true);
  assert.equal(isCorporateNumberFormat("900000000000"), false);
  assert.equal(isCorporateNumberFormat("ABCDEFGHIJKLM"), false);
});

test("scores strong identity signals as high confidence", () => {
  const result = scoreIdentityMatch(input as IdentityInput, candidates[0] as CorporateRecord);
  assert.equal(result.confidence, "high");
  assert.equal(result.requiresManualReview, false);
  assert.ok(result.score >= 80);
});

test("closed corporations require manual review even with strong signals", () => {
  const result = scoreIdentityMatch(input as IdentityInput, candidates[2] as CorporateRecord);
  assert.equal(result.confidence, "requires_manual_review");
  assert.equal(result.requiresManualReview, true);
});

test("ranks best candidates first", () => {
  const ranked = rankCandidates(input as IdentityInput, candidates as CorporateRecord[]);
  assert.equal(ranked[0].corporateNumber, "9000000000000");
});
