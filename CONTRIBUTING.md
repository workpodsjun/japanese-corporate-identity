# Contributing

Contributions are welcome when they keep the project focused on public, reusable Japanese corporate identity resolution.

## Scope

Good contributions:

- normalization improvements
- candidate scoring signals
- official-source client improvements
- synthetic fixtures
- documentation and examples
- tests for edge cases

Out of scope:

- private adapters
- internal schemas
- customer data
- scraped third-party datasets
- legal, tax, credit, or compliance determinations

## Development

```bash
npm test
npm run check:public-boundary
```

The repository intentionally avoids runtime dependencies in v0.1.0.

## Pull Requests

Before opening a PR:

- add or update tests
- keep fixtures synthetic or clearly public
- do not include API key values
- update README or docs when behavior changes
