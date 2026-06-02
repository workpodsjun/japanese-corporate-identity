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
