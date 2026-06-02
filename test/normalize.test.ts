import assert from "node:assert/strict";
import test from "node:test";
import { extractDomain, normalizeCompanyName, toNtaFullWidth } from "../src/index.ts";

test("normalizes legal entity, punctuation, width, and small kana", () => {
  assert.equal(normalizeCompanyName("株式会社サンプル・データ（旧社名）"), "サンプルデータ");
  assert.equal(normalizeCompanyName("合同会社ＡＢＣ－テック"), "abcテツク");
});

test("converts ASCII to full-width for NTA name search", () => {
  assert.equal(toNtaFullWidth("ABC Co 123"), "ＡＢＣ　Ｃｏ　１２３");
});

test("extracts comparable domains", () => {
  assert.equal(extractDomain("https://www.example.co.jp/path"), "example.co.jp");
  assert.equal(extractDomain("www.example.co.jp/path"), "example.co.jp");
});
