# Public Repository Review

Review target: `japanese-corporate-identity` v0.1.0 public release candidate.

## Result

No blocking public-release issue is currently known after local review and checks.

## Reviewed Areas

- README positioning and public boundary
- Codex for OSS application brief
- release and first-push procedure
- package contents via `npm pack --dry-run --cache ./.npm-cache`
- npm tarball install/import/CLI behavior
- synthetic fixtures
- public-boundary checker
- live API credential handling docs

## Fixes Applied

- Added clearer v0.1.0 status and no-private-adapter language to README.
- Replaced the README release-prep link with `docs/release_checklist.md`.
- Strengthened `scripts/check_public_boundary.mjs` so secret-like files are blocked by filename without reading their values.
- Added release steps for GitHub repo creation, initial commit, and `v0.1.0` release.
- Added a human confirmation gate for optional live NTA and gBizINFO smoke checks.
- Added npm-ready JavaScript output and type definitions after tarball smoke showed Node does not strip TypeScript types under `node_modules`.
- Added repeatable `npm run build` output generation and CI drift detection for `dist/`.

## Remaining Human Gates

- Confirm before `git init` because the directory is inside the wider Jun AI Workspace.
- Confirm before `gh repo create`, first push, tag push, or release creation.
- Confirm before any live API smoke. Do not print credential values or request URLs containing credentials.
