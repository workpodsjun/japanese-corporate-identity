import assert from "node:assert/strict";
import test from "node:test";
import { isCorporateNumberFormat, normalizeCompanyName } from "../dist/index.js";

test("published dist entrypoint exposes runtime functions", () => {
  assert.equal(normalizeCompanyName("株式会社サンプル・データ"), "サンプルデータ");
  assert.equal(isCorporateNumberFormat("9000000000000"), true);
});
