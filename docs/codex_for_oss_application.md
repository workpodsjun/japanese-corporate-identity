# Codex for Open Source Application

## Project

`japanese-corporate-identity`

- GitHub: https://github.com/workpodsjun/japanese-corporate-identity
- npm: https://www.npmjs.com/package/japanese-corporate-identity
- Latest release: `v0.1.5`
- License: MIT
- Maintainer: Jun Nitta, Workpods Inc.

## Short Description

A TypeScript toolkit for resolving Japanese corporate identity from messy company names and domains using official NTA Corporate Number System and gBizINFO data, with auditable confidence signals.

## Problem

Japanese corporate records are difficult to match reliably across B2B systems. Company names may contain legal entity markers, half-width and full-width characters, kana variants, punctuation, English aliases, historical names, and outdated company states. Name search alone can return multiple candidates, and closed corporations should not be treated as active matches.

Application developers can call official NTA and gBizINFO services directly, but they still need reusable normalization, scoring, and review-boundary logic around those official sources.

## Why This Is Useful

Reliable Japanese corporate identity resolution is useful for:

- CRM enrichment
- recruiting data hygiene
- procurement workflows
- vendor onboarding
- B2B SaaS integrations
- audit-friendly ETL checks before a human or downstream system accepts a match

The package focuses on the identity-resolution layer, not on redistributing official datasets or making legal, tax, credit, or compliance conclusions.

## Current Public Status

The project is already public and installable from npm.

Implemented in the `v0.1.x` line:

- company-name normalization
- English legal suffix normalization, including variants such as `Inc.`, `CO., LTD.`, and `Corporation`
- preservation of Japanese long vowel marks while removing hyphen variants
- NTA full-width query conversion
- domain extraction
- candidate scoring with confidence signals
- active/closed corporation review flagging
- official-source URL builders and minimal live clients
- CLI JSON output
- npm-ready JavaScript output and type definitions
- repeatable `npm run build` generation for `dist/`
- CI drift detection for generated package output
- synthetic fixtures only
- public-boundary checks for private markers and secret-like files

The package intentionally has no runtime dependencies in `v0.1.x`.

## How Codex Would Be Used

Codex would be used as a regular maintainer assistant for small, reviewable, test-driven OSS work:

- adding normalization edge-case tests
- reviewing candidate scoring behavior
- maintaining official-source client behavior
- improving examples and response-mapping documentation
- generating and validating release checklists
- checking public/private data boundaries before releases
- keeping `src/`, generated `dist/`, README, npm metadata, GitHub releases, and issue roadmap consistent

Codex is especially useful for this project because high-quality contributions are narrow and evidence-based. The best workflow is to add synthetic fixtures, update focused tests, run package smoke checks, and document boundary decisions.

## Recent Codex-Assisted Work

Codex helped prepare the repository for public release by:

- reviewing the public/private boundary before first publication
- adding release and security docs
- publishing GitHub releases from `v0.1.0` through `v0.1.5`
- identifying that npm cannot strip TypeScript types under `node_modules`
- adding npm-ready JavaScript output and package smoke tests
- adding repeatable `dist` generation and CI drift detection
- adding normalization edge cases for English legal suffixes, hyphen variants, parenthesized former names, and Japanese long vowel marks
- confirming that no private adapters, customer data, API key values, or private project markers are included

## Public Boundary

This repository does not include:

- private adapters
- internal schemas
- customer data
- private repositories
- API key values, tokens, or local `.env` files
- redistributed NTA or gBizINFO datasets

Private use cases should integrate with this package through separate adapters outside the public repository. Live NTA and gBizINFO smoke checks are optional and require maintainer confirmation. Credentials are read from environment variables and must never be printed, echoed, committed, copied into issues, or copied into PR text.

## Roadmap

Open public issues track the next work:

- Document NTA and gBizINFO response mapping examples
- Add live API smoke scripts without printing credentials

Additional likely improvements:

- broader synthetic normalization fixtures
- scoring-threshold documentation
- more CLI examples for ETL and CI use
- changelog automation once release cadence stabilizes

## Risks and Mitigations

| Risk | Mitigation |
| --- | --- |
| Looks like a thin NTA API wrapper | Position as identity resolution with normalization, scoring, and audit signals |
| Private data accidentally enters repo | Public-boundary check, contribution templates, and synthetic fixtures only |
| Official API behavior changes | Keep live clients small and cover request construction with tests |
| Overclaiming accuracy | Return confidence signals and manual-review flags |
| Dataset redistribution concerns | Do not ship official datasets; require user-provided API credentials |
| Generated package output drifts from source | `npm run check` rebuilds `dist/` and fails on generated-output drift |

## Maintainer Commitment

I will maintain this as a small, public, reusable OSS core. The project is intentionally scoped so that useful Codex-assisted contributions can be reviewed quickly, tested locally, and released without exposing private business data.
