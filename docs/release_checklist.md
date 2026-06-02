# Release Checklist

This checklist prepares `japanese-corporate-identity` for the first public GitHub release.

## Scope

Public release includes:

- TypeScript library source in `src/`
- npm runtime output in `dist/`
- CLI in `dist/bin/jci.js`
- synthetic fixtures and tests
- README, contribution, security, and data-source docs
- CI and public-boundary checks

Public release does not include:

- private adapters
- internal schemas
- customer data
- official datasets
- API key values, tokens, or local `.env` files

## Pre-Public Review

Run from the repository root:

```bash
cd /Users/jun/claude_code/jun_nitta/japanese-corporate-identity
npm run check
npm pack --dry-run --cache ./.npm-cache
git status --short -- .
```

Review the `npm pack --dry-run` file list before publishing or tagging. It should include only package files declared in `package.json`.

Before npm publish, install the tarball into a temporary project and verify package import and CLI execution. This catches Node's restriction against stripping TypeScript types inside `node_modules`.

## Live API Smoke Gate

Live NTA and gBizINFO checks are optional. Do not run them unless the maintainer explicitly confirms all of the following:

- which official API will be called
- which public corporate number or company name will be used
- that the needed credential is available in the shell environment
- that output may include public official-source response metadata or public corporate data

Do not print API key values. Do not run `env`, `printenv`, `echo $NTA_API_KEY`, or `echo $GBIZINFO_API_TOKEN`.

If live smoke is approved, use a command that reports only pass/fail shape and does not print request URLs or credential values.

## Initial Repository Creation

These commands should be run only after the pre-public review is clean.

```bash
cd /Users/jun/claude_code/jun_nitta/japanese-corporate-identity
git init -b main
git add .
git commit -m "chore: prepare v0.1.0 public release"
gh repo create japanese-corporate-identity \
  --public \
  --source=. \
  --remote=origin \
  --push \
  --description "Resolve Japanese corporate identity from messy company names and domains using official NTA and gBizINFO data."
```

This directory currently lives inside the wider Jun AI Workspace. Confirm before `git init` so the nested repository does not accidentally become a parent-repo submodule entry.

## GitHub Release

After the initial push and successful CI run:

```bash
git tag -a v0.1.0 -m "v0.1.0"
git push origin v0.1.0
gh release create v0.1.0 \
  --title "v0.1.0" \
  --notes "Initial public release with normalization, official-source URL builders, lightweight live clients, candidate scoring, CLI JSON output, synthetic fixtures, CI, and public-boundary checks."
```

## Post-Release Verification

- Open the public repository page and confirm README rendering.
- Confirm CI passed on `main`.
- Confirm the `v0.1.0` release page exists.
- Confirm no private markers, secret-like files, local npm logs, or local cache files are visible in GitHub.
