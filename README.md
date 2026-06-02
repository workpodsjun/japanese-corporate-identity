# Japanese Corporate Identity

A small TypeScript toolkit for resolving Japanese corporate identity from messy company names and domains using official NTA Corporate Number System and gBizINFO data.

This project is not a replacement for official services. It helps applications normalize names, compare candidates, and return auditable confidence signals before a human or downstream system decides whether a corporate identity is resolved.

## Status

`v0.1.x` is a focused public release line. It includes normalization, URL builders for official sources, lightweight live clients, candidate scoring, a CLI, synthetic fixtures, npm-ready JavaScript output, type definitions, and CI checks. It does not ship official datasets or private adapters.

## Why This Exists

Japanese company data is often messy in CRM, recruiting, procurement, and B2B SaaS workflows:

- legal entity prefixes and suffixes vary
- half-width and full-width characters are mixed
- English names, kana names, and registered Japanese names diverge
- multiple entities can share similar names
- closed corporations should not be treated the same as active ones
- URL domain matches can be stronger evidence than name similarity alone

This toolkit focuses on the identity-resolution layer around official data sources.

## Non-Goals

- It does not redistribute NTA or gBizINFO datasets.
- It does not include private company lists, customer data, internal schemas, or proprietary adapters.
- It does not guarantee legal, tax, credit, or compliance conclusions.
- It does not scrape third-party corporate-number websites.

## Install

```bash
npm install japanese-corporate-identity
```

For local development in this repository:

```bash
npm test
```

Node.js 22.6+ is required because the test workflow uses Node's TypeScript type stripping.
Published npm packages use compiled JavaScript from `dist/`.

## Library Usage

```ts
import {
  normalizeCompanyName,
  scoreIdentityMatch,
  toNtaFullWidth,
} from "japanese-corporate-identity";

const normalized = normalizeCompanyName("株式会社サンプル・データ");
const ntaQuery = toNtaFullWidth("Sample Data");

const result = scoreIdentityMatch(
  {
    name: "株式会社サンプルデータ",
    domain: "sample-data.example.jp",
  },
  {
    corporateNumber: "9000000000000",
    name: "株式会社サンプルデータ",
    companyUrl: "https://www.sample-data.example.jp/",
    closeCause: "0",
    source: "fixture",
  },
);

console.log({ normalized, ntaQuery, result });
```

## CLI Usage

Normalize a company name:

```bash
jci normalize "株式会社サンプル・データ"
```

Score one input against candidate records:

```bash
jci score \
  --input test/fixtures/input_sample.json \
  --candidates test/fixtures/candidates_sample.json
```

The CLI prints JSON so it can be used from ETL jobs and CI checks.

## Official Data Sources

The intended official sources are:

- NTA Corporate Number System Web-API
- gBizINFO

API keys are read from environment variables when live clients are used:

- `NTA_API_KEY`
- `GBIZINFO_API_TOKEN`

Do not commit API keys. This repository includes only synthetic fixtures.

Live API smoke checks are optional and must be run manually with the maintainer's own credentials. The default test suite does not read API key values or call live services.

## Output Model

The scoring API returns:

- `score`: numeric score from 0 to 100
- `confidence`: `high`, `medium`, `low`, or `requires_manual_review`
- `signals`: evidence used for the score, such as normalized-name match, domain match, corporate-number match, and active status
- `requiresManualReview`: boolean safety flag

The goal is auditability, not magic.

## Public Boundary

This repository is designed to be public-ready. Private adapters should live outside this repository and call the OSS core as a library. The included `npm run check:public-boundary` command fails if known private project markers or secret-like files are accidentally introduced.

Release preparation steps are documented in [`docs/release_checklist.md`](docs/release_checklist.md). The public repository review note is in [`docs/public_repo_review.md`](docs/public_repo_review.md).

## License

MIT
