# OpenAI Codex for OSS Application Submission Packet

## Project Links

- GitHub: https://github.com/workpodsjun/japanese-corporate-identity
- npm: https://www.npmjs.com/package/japanese-corporate-identity
- Latest release: `v0.1.5`
- License: MIT
- Maintainer: Jun Nitta, Workpods Inc.

## Short Answer

`japanese-corporate-identity` is a public TypeScript OSS toolkit for resolving Japanese corporate identity from messy company names and domains using official NTA Corporate Number System and gBizINFO data. It provides normalization, candidate scoring, auditable confidence signals, CLI JSON output, npm-ready package output, and public/private boundary checks. I use Codex to maintain this project through focused test-driven contributions: normalization edge cases, scoring review, release readiness, documentation, package smoke checks, and private-data boundary review.

## Standard Answer

I maintain `japanese-corporate-identity`, a public MIT-licensed TypeScript toolkit for resolving Japanese corporate identity from messy company names and domains using official NTA Corporate Number System and gBizINFO data. Japanese company records are hard to match reliably because legal entity markers, half-width/full-width text, kana variants, punctuation, English aliases, historical names, and active/closed company states all affect identity resolution.

The project focuses on reusable identity-resolution logic around official sources: company-name normalization, NTA full-width query conversion, domain extraction, candidate scoring, confidence signals, manual-review flags, official-source URL builders, minimal live clients, CLI JSON output, npm-ready JavaScript output, and type definitions. It is already public on GitHub and npm, with CI, synthetic fixtures, release docs, public-boundary checks, and package smoke tests.

Codex is useful for this project because contributions are small, reviewable, and test-driven. I use Codex to add normalization edge cases, review scoring behavior, maintain official-source client behavior, improve docs and examples, generate release checklists, verify package output, and check that no private adapters, customer data, API keys, or private project markers enter the public repository.

## Long Answer

I maintain `japanese-corporate-identity`, a public MIT-licensed TypeScript package for resolving Japanese corporate identity from messy company names and domains using official NTA Corporate Number System and gBizINFO data. The project is public on GitHub and published on npm as `japanese-corporate-identity`.

The problem is practical and common in Japanese B2B systems. Company names can contain legal entity markers, half-width and full-width text, kana variants, punctuation, English aliases, historical names, and active or closed company states. Official NTA and gBizINFO services provide authoritative public data, but application developers still need reusable normalization, scoring, and review-boundary logic around those sources.

The current `v0.1.x` line implements company-name normalization, English legal suffix normalization, preservation of Japanese long vowel marks while removing hyphen variants, NTA full-width query conversion, domain extraction, candidate scoring with confidence signals, active/closed corporation review flagging, official-source URL builders, minimal live clients, CLI JSON output, npm-ready JavaScript output, type definitions, repeatable `dist` generation, CI drift detection, synthetic fixtures, and public-boundary checks.

Codex is valuable for this project because high-quality work is narrow, evidence-based, and test-driven. Codex has already helped prepare the public release, identify npm packaging issues, add package smoke tests, add repeatable build generation, expand normalization edge cases, and confirm that no private adapters, customer data, API key values, or private project markers are included. I plan to keep using Codex for normalization edge cases, scoring review, official-source response mapping docs, live API smoke scripts that do not print credentials, release readiness, and security boundary review.

## One-Line Description

A TypeScript OSS toolkit for resolving Japanese corporate identity from messy company names and domains using official NTA and gBizINFO data, with auditable confidence signals.

## Maintainer / Usage Explanation

I am Jun Nitta, CEO of Workpods Inc. I maintain this package as a small public OSS core. Private business adapters and data stay outside the public repository. Codex is used for focused, test-driven maintenance and public/private boundary review.

## Public Boundary Statement

This repository does not include private adapters, internal schemas, customer data, private repositories, API key values, tokens, local `.env` files, or redistributed NTA/gBizINFO datasets. Live API checks require maintainer confirmation and must never print credentials or credential-bearing request URLs.

## Why Codex Credits Matter

Codex helps turn small maintainer tasks into high-quality OSS contributions: adding synthetic fixtures, updating tests, reviewing scoring behavior, improving docs, validating package contents, and checking security boundaries before release. Credits would directly support ongoing public maintenance of this package rather than private adapter work.

## Current Roadmap

- Document NTA and gBizINFO response mapping examples.
- Add live API smoke scripts without printing credentials.
- Add broader synthetic normalization fixtures.
- Document scoring thresholds.
- Add more CLI examples for ETL and CI workflows.
