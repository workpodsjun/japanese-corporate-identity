# Security Policy

## Supported Versions

The latest released minor version is supported.

## Reporting a Vulnerability

Please report security issues privately to the maintainer before public disclosure. Include:

- affected version or commit
- reproduction steps
- impact
- suggested fix, if known

Do not include API keys, tokens, private company data, customer data, or internal database exports in reports.

## Secret Handling

This project must not store API key values. Live API clients read credentials from environment variables:

- `NTA_API_KEY`
- `GBIZINFO_API_TOKEN`

Fixtures in this repository are synthetic unless explicitly documented otherwise.
