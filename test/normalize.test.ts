import assert from "node:assert/strict";
import test from "node:test";
import { extractDomain, normalizeCompanyName, toNtaFullWidth } from "../src/index.ts";

test("normalizes legal entity, punctuation, width, and small kana", () => {
  assert.equal(normalizeCompanyName("株式会社サンプル・データ（旧社名）"), "サンプルデータ");
  assert.equal(normalizeCompanyName("合同会社ＡＢＣ－テック"), "abcテツク");
});

test("normalizes English legal suffix variants case-insensitively", () => {
  assert.equal(normalizeCompanyName("Sample Data, Inc."), "sampledata");
  assert.equal(normalizeCompanyName("SAMPLE DATA CO., LTD."), "sampledata");
  assert.equal(normalizeCompanyName("Sample Data Corporation"), "sampledata");
});

test("preserves Japanese long vowel mark while removing hyphen variants", () => {
  assert.equal(normalizeCompanyName("株式会社データー・サンプル"), "データーサンプル");
  assert.equal(normalizeCompanyName("株式会社データ－サンプル"), "データサンプル");
});

test("removes parenthesized former names and legal markers in varied positions", () => {
  assert.equal(normalizeCompanyName("サンプル株式会社データ（旧：サンプル合同会社）"), "サンプルデータ");
  assert.equal(normalizeCompanyName(" 一般社団法人 サンプル データ "), "サンプルデータ");
});

test("converts ASCII to full-width for NTA name search", () => {
  assert.equal(toNtaFullWidth("ABC Co 123"), "ＡＢＣ　Ｃｏ　１２３");
});

test("extracts comparable domains", () => {
  assert.equal(extractDomain("https://www.example.co.jp/path"), "example.co.jp");
  assert.equal(extractDomain("www.example.co.jp/path"), "example.co.jp");
});
