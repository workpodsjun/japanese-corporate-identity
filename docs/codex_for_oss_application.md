# Codex for Open Source Application Brief

## Repository

`japanese-corporate-identity`

## One-Line Description

A TypeScript toolkit for resolving Japanese corporate identity from messy company names and domains using official NTA and gBizINFO data, with auditable confidence signals.

## Problem

Japanese corporate records are difficult to match reliably across B2B systems. Company names may contain legal entity markers, half-width and full-width characters, kana variants, punctuation, English aliases, and outdated names. Name search alone can return multiple candidates, and closed corporations should not be treated as active matches.

## Ecosystem Importance

Reliable Japanese corporate identity resolution is useful for CRM enrichment, recruiting data hygiene, procurement workflows, vendor onboarding, and B2B SaaS integrations. The official NTA Corporate Number System and gBizINFO provide authoritative public sources, but application developers still need reusable normalization, scoring, and review-boundary logic around those sources.

## Current Status

This is an early public-ready release candidate. The v0.1.x scope is intentionally small and already implemented in the repository:

- company-name normalization
- NTA full-width query conversion
- domain extraction
- candidate scoring with confidence signals
- official-source URL builders and minimal live clients
- CLI JSON output
- npm-ready JavaScript output and type definitions
- synthetic fixtures
- CI and public-boundary checks

The package intentionally has no runtime dependencies in v0.1.x. Tests use Node.js built-in test runner with TypeScript type stripping, while published packages use JavaScript files in `dist/`.

## Maintainer Role

The maintainer owns the repository, release process, and public/private data boundary. Codex would assist with focused implementation, test expansion, documentation review, and release readiness checks, while final publishing and any credential-backed live smoke tests remain maintainer-controlled.

## Intended Codex Usage

Codex would be used for:

- adding normalization edge-case tests
- reviewing candidate scoring logic
- maintaining official-source client behavior
- improving documentation and examples
- release checklist automation
- security and private-data boundary review

Codex is especially useful for this project because useful contributions are small, reviewable, and test-driven: adding normalization cases, explaining scoring changes, checking docs for overclaiming, and keeping the public repository separated from private business adapters.

## Public Boundary

This repository does not include private adapters, internal schemas, customer data, private repositories, or API key values. Private use cases should integrate with this package through separate adapters outside the public repository.

Live NTA and gBizINFO smoke checks are optional. They should only be run after maintainer confirmation, using environment variables that are never printed, echoed, committed, or copied into issue/PR text.

## Repository Usage

Public usage is not yet established. The near-term plan is to dogfood the OSS core in business data hygiene workflows while keeping private adapters out of this repository.

## Risks and Mitigations

| Risk | Mitigation |
| --- | --- |
| Looks like a thin NTA API wrapper | Position as identity resolution with scoring and audit signals |
| Private data accidentally enters repo | Public-boundary CI check and contribution templates |
| Official API behavior changes | Keep source clients small and covered by URL-builder tests |
| Overclaiming accuracy | Return confidence signals and manual-review flags |
| Dataset redistribution concerns | Do not ship official datasets; require user-provided API credentials |

## Release Readiness

- `npm test` passes with synthetic fixtures.
- `npm run check:public-boundary` verifies known private markers and secret-like filenames.
- `npm pack --dry-run --cache ./.npm-cache` should be used before publishing or tagging to confirm package contents.
- GitHub repository creation, initial commit, and release tagging are documented in `docs/release_checklist.md`.
