# AutoScrape Data API

No-key evaluation REST API plus paid x402 mirrors for US public-data evidence: business filings across 16 no-key states, building permits, SEC EDGAR, IRS 990 nonprofits, WHOIS domain lookup, and stock price data. Paid x402 routes are listed first for agent/payment crawlers and settle through PayAPI-compatible x402 facilitators (CDP + Dexter) at $0.0100/request. CA business filings require a keyed source and are not enabled on the open pilot. SC currently requires browser CAPTCHA verification and is not enabled for authoritative no-key automated search.

## Start here

This guide introduces the API, the client libraries, and the companion tools in this repository. Start with the API capabilities, choose a client for your application, and use the linked reference when you need exact request and response details.

The selected API surface contains 7 entities and 11 HTTP routes. There are 6 SDK targets and 2 companion tools.

An entity groups related API operations. An operation can have several routes with different inputs or authentication requirements. The SDK exposes the entity and its operations using the conventions of the selected language.

## What the API provides

### BuildingPermit

Results: Permit lead records.

SDK operations: `load`.

### BusinessEntity

Results: Search results.

SDK operations: `load`.

### Irs990

Results: Nonprofit results.

SDK operations: `load`.

### SecEdgar

Results: Filing results.

SDK operations: `load`.

### StockData

Results: OHLCV price data.

SDK operations: `load`.

### Whoi

Results: WHOIS data.

SDK operations: `load`.

### X402Paid

Results: Filing results; Permit lead records; Nonprofit results; Search results; WHOIS data.

SDK operations: `load`.

### Route map

Use this map to locate a capability. Consult the entity reference before supplying request data; routes for the same operation can require different fields.

| Entity | SDK operation | HTTP route | Authentication |
| --- | --- | --- | --- |
| BuildingPermit | `load` | `GET /v1/building-permits/search` | See reference |
| BusinessEntity | `load` | `GET /v1/business-entity/search` | See reference |
| Irs990 | `load` | `GET /v1/irs-990/search` | See reference |
| SecEdgar | `load` | `GET /v1/sec-edgar/filings` | See reference |
| StockData | `load` | `GET /v1/stock/chart` | See reference |
| Whoi | `load` | `GET /v1/whois/lookup` | See reference |
| X402Paid | `load` | `GET /x402/v1/sec-edgar/filings` | See reference |
| X402Paid | `load` | `GET /x402/v1/building-permits/search` | See reference |
| X402Paid | `load` | `GET /x402/v1/irs-990/search` | See reference |
| X402Paid | `load` | `GET /x402/v1/business-entity/search` | See reference |
| X402Paid | `load` | `GET /x402/v1/whois/lookup` | See reference |

## Connect to the API

- API server: `https://autoscrape-api-seven.vercel.app`

Check authentication for the route you plan to call. A route that declares no authentication can be used without credentials; this does not change the requirements of other routes. Keep credentials in environment variables or a configured secret provider, and keep them out of source control and logs.

## Make a first request

1. Choose the API server and an operation that matches your task.
2. Check the operation’s required input and authentication. Use values valid for your account and environment.
3. Send one request and inspect the returned data before adding retries, concurrency, or a larger batch.

For an SDK call, install or build the chosen client, create a client instance with its documented configuration, and call the required entity operation. Language references describe the argument shape, asynchronous behaviour, and returned values.

## Choose an SDK

Choose the language already used by your application or service. The clients represent the same API model, while package setup, naming, and return types follow each language. Check the selected client’s reference and tests before integrating it into an existing application.

| Client | Repository directory | Distribution |
| --- | --- | --- |
| Golang | `go/` | Build from source |
| Lua | `lua/` | Build from source |
| PHP | `php/` | Build from source |
| Python | `py/` | Build from source |
| Ruby | `rb/` | Build from source |
| TypeScript | `ts/` | Build from source |

Build-from-source entries are not marked as published in the project model. Follow the build instructions in that target’s README, then consume the resulting package using your language’s local dependency mechanism. Published entries give the installation command recorded for that client.

## Companion tools

These targets provide another way to use the API. Their available commands or tools can cover a smaller set of operations than the client libraries.

### Go CLI

Use the command-line interface for shell-based tasks and scripts.

Repository directory: `go-cli/`. Not published. Build from the go-cli directory.


### Go MCP server

Use the MCP server to expose supported API operations to an MCP client.

Repository directory: `go-mcp/`. Not published. Build from the go-mcp directory.

- `autoscrape_list`: List records for an entity. No active entity supports this operation.
- `autoscrape_load`: Load one record for an entity. Supported entities: `building_permit`, `business_entity`, `irs_990`, `sec_edgar`, `stock_data`, `whoi`, `x402_paid`.

## Operational features

Features supply behaviour around API calls, such as request handling, diagnostics, or local testing. Inclusion in this project does not mean a feature is enabled at runtime. Check the selected SDK’s supported features and configuration defaults, then enable the behaviour your application needs.

- `ratelimit`: Client-side rate limiting via a token bucket
- `retry`: Automatic retry of transient failures with exponential backoff
- `test`: In-memory mock transport for testing without a live server
- `timeout`: Per-request timeout with transport abort

Start with the default client configuration. Add request limits and diagnostics as needed, test error paths, and review retry behaviour before using operations that change data. A retry can repeat an operation unless the API provides a suitable guarantee.

## Continue with the documentation

- Follow the first-call guide for the setup sequence.
- Read the authentication guide before using protected routes.
- Use the API reference for request schemas, response formats, and status codes.
- Check the chosen SDK or companion tool reference for its configuration and supported operations.

