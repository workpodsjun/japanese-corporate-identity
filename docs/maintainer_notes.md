# Maintainer Notes

These notes capture implementation lessons that are useful for future maintainers.

## Normalization Safety

Do not treat the Japanese long vowel mark `ー` as a hyphen. It is semantically part of many company names, such as `データ`. Hyphen normalization should remove ASCII and width-variant hyphens, but preserve long vowel marks.

Good:

- remove: `-`, `－`, `‐`, `−`, `–`, `—`
- preserve: `ー`

English legal suffixes should be removed case-insensitively and tolerate common spacing or punctuation variants, such as `Inc.`, `CO., LTD.`, `Co Ltd`, `Corp.`, and `Corporation`.

## Public Boundary Check

The public-boundary checker intentionally scans repository content for private-project markers. The checker file itself is skipped so that the deny-list patterns do not match their own definitions.

When adding new private markers, add tests or run:

```bash
npm run check:public-boundary
```

## npm Cache

`npm pack --dry-run` can fail on local machines if the global npm cache contains files owned by another user. Prefer a repository-local cache when verifying package contents:

```bash
npm --cache .npm-cache pack --dry-run
```

The `.npm-cache/` directory is ignored and should not be committed.

## Distribution Build

Runtime package files are generated from `src/` and `bin/jci.ts`:

```bash
npm run build
npm run check
```

`npm run check` rebuilds `dist/` and fails when generated output differs from the committed files. Update `src/index.d.ts` when public type signatures change; the build copies it to `dist/index.d.ts`.

## Scope Discipline

Keep the OSS core limited to reusable identity-resolution logic:

- normalization
- source-client request construction
- candidate scoring
- auditable JSON output
- synthetic fixtures

Private adapters, internal schemas, real company lists, customer records, and API key values belong outside this repository.

## OpenAI Codex for OSS Application Notes

When applying to maintainer-support programs, keep public application material focused on the reusable OSS core:

- public repository URL, npm package, CI, release notes, and synthetic fixtures
- why Japanese corporate identity resolution matters for CRM, recruiting, procurement, and B2B SaaS data quality
- security boundary: no private adapters, customer data, API keys, or internal schemas
- planned API-credit usage: public tests, docs, release review, scoring validation, response mapping, and credential-safe smoke tests

If a form has a character limit, prefer short English text for global reviewers. Keep account identifiers, organization IDs, and other account-specific values out of public docs.

For optional security-review benefits, state the authorization boundary explicitly: use the benefit only for repositories the maintainer owns or is authorized to administer, and not for private systems or customer data.
