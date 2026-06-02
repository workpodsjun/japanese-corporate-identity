# Data Sources

This project is designed to work with official public data sources.

## NTA Corporate Number System Web-API

Primary uses:

- name search
- corporate-number lookup
- active or closed corporation status
- registered name and address comparison

Implementation notes:

- name search values are converted to full-width characters
- `type=12` is used for Unicode XML responses
- `history=0` is used for latest-number lookup
- users must provide their own API key through `NTA_API_KEY`

## gBizINFO

Primary uses:

- corporate-number detail lookup
- company URL and domain comparison
- supplementary public corporate attributes

Implementation notes:

- users must provide their own API token through `GBIZINFO_API_TOKEN`
- this project does not redistribute gBizINFO data

## Attribution and Terms

Applications using this toolkit should identify the official source used and comply with the terms of the relevant public service. This project provides code, not legal advice.
