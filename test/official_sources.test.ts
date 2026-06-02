import assert from "node:assert/strict";
import test from "node:test";
import { buildGBizInfoNumberUrl, buildNtaNameSearchUrl, buildNtaNumberUrl } from "../src/index.ts";

test("builds NTA name search URL with required parameters", () => {
  const url = buildNtaNameSearchUrl("ABC株式会社", "dummy-key");
  assert.equal(url.pathname, "/4/name");
  assert.equal(url.searchParams.get("id"), "dummy-key");
  assert.equal(url.searchParams.get("type"), "12");
  assert.equal(url.searchParams.get("mode"), "2");
  assert.equal(url.searchParams.get("target"), "1");
  assert.equal(url.searchParams.get("from"), "2015-10-05");
  assert.equal(url.searchParams.get("name"), "ＡＢＣ株式会社");
});

test("builds NTA number lookup URL", () => {
  const url = buildNtaNumberUrl("9000000000000", "dummy-key");
  assert.equal(url.pathname, "/4/num");
  assert.equal(url.searchParams.get("number"), "9000000000000");
  assert.equal(url.searchParams.get("history"), "0");
});

test("builds gBizINFO number lookup URL", () => {
  const url = buildGBizInfoNumberUrl("9000000000000");
  assert.equal(url.href, "https://info.gbiz.go.jp/hojin/v1/hojin/9000000000000");
});
