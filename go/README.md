# Autoscrape Golang SDK



The Golang SDK for the Autoscrape API — an entity-oriented client using standard Go conventions. No generics required; data flows as `map[string]any`.

It exposes the API as capitalised, semantic **Entities** — e.g. `client.BuildingPermit(nil)` — each with the same small set of operations (`Load`) instead of raw URL paths and query strings. You call meaning, not endpoints, which keeps the cognitive load low.

> Other languages, the CLI, and MCP server live alongside this one — see
> the [top-level README](../README.md).


## Install
```bash
go get github.com/voxgig-sdk/autoscrape-sdk/go@latest
```

The Go module proxy resolves the version from the `go/vX.Y.Z` GitHub
release tag — see [Releases](https://github.com/voxgig-sdk/autoscrape-sdk/releases) for the available versions.

To vendor from a local checkout instead, clone this repo alongside your
project and add a `replace` directive pointing at the checked-out
`go/` directory:

```bash
go mod edit -replace github.com/voxgig-sdk/autoscrape-sdk/go=../autoscrape-sdk/go
```


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### Quickstart

A complete program: create a client, then call the entity operations.
Each operation returns `(value, error)` — the value is the data itself
(there is no `{ok, data}` wrapper), so check `err` and use the value
directly.

```go
package main

import (
    "fmt"
    sdk "github.com/voxgig-sdk/autoscrape-sdk/go"
)

func main() {
    client := sdk.New()

    // Load a single buildingPermit — the value is the loaded record.
    buildingPermit, err := client.BuildingPermit(nil).Load(nil, nil)
    if err != nil {
        panic(err)
    }
    fmt.Println(buildingPermit)
}
```


## Error handling

Every entity operation returns `(value, error)`. Check `err` before
using the value — there is no exception to catch:

```go
secedgar, err := client.SecEdgar(nil).Load(nil, nil)
if err != nil {
    // handle err
    return
}
_ = secedgar
```

`Direct` follows the same `(value, error)` convention:

```go
result, err := client.Direct(map[string]any{
    "path":   "/api/resource/{id}",
    "method": "GET",
    "params": map[string]any{"id": "example_id"},
})
if err != nil {
    // handle err
}
_ = result
```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```go
result, err := client.Direct(map[string]any{
    "path":   "/api/resource/{id}",
    "method": "GET",
    "params": map[string]any{"id": "example"},
})
if err != nil {
    panic(err)
}

if result["ok"] == true {
    fmt.Println(result["status"]) // 200
    fmt.Println(result["data"])   // response body
}
```

### Prepare a request without sending it

```go
fetchdef, err := client.Prepare(map[string]any{
    "path":   "/api/resource/{id}",
    "method": "DELETE",
    "params": map[string]any{"id": "example"},
})
if err != nil {
    panic(err)
}

fmt.Println(fetchdef["url"])
fmt.Println(fetchdef["method"])
fmt.Println(fetchdef["headers"])
```

### Use test mode

Create a mock client for unit testing — no server required:

```go
client := sdk.Test()

secEdgar, err := client.SecEdgar(nil).Load(
    nil, nil,
)
if err != nil {
    panic(err)
}
fmt.Println(secEdgar) // the returned mock data
```

### Use a custom fetch function

Replace the HTTP transport with your own function:

```go
mockFetch := func(url string, init map[string]any) (map[string]any, error) {
    return map[string]any{
        "status":     200,
        "statusText": "OK",
        "headers":    map[string]any{},
        "json": (func() any)(func() any {
            return map[string]any{"id": "mock01"}
        }),
    }, nil
}

client := sdk.NewAutoscrapeSDK(map[string]any{
    "base": "http://localhost:8080",
    "system": map[string]any{
        "fetch": (func(string, map[string]any) (map[string]any, error))(mockFetch),
    },
})
```

### Run live tests

Create a `.env.local` file at the project root:

```
AUTOSCRAPE_TEST_LIVE=TRUE
```

Then run:

```bash
cd go && go test ./test/...
```


## Reference

### NewAutoscrapeSDK

```go
func NewAutoscrapeSDK(options map[string]any) *AutoscrapeSDK
```

Creates a new SDK client.

| Option | Type | Description |
| --- | --- | --- |
| `"base"` | `string` | Base URL of the API server. |
| `"prefix"` | `string` | URL path prefix prepended to all requests. |
| `"suffix"` | `string` | URL path suffix appended to all requests. |
| `"feature"` | `map[string]any` | Feature activation flags. |
| `"extend"` | `[]any` | Additional Feature instances to load. |
| `"system"` | `map[string]any` | System overrides (e.g. custom `"fetch"` function). |

### TestSDK

```go
func TestSDK(testopts map[string]any, sdkopts map[string]any) *AutoscrapeSDK
```

Creates a test-mode client with mock transport. Both arguments may be `nil`.

### AutoscrapeSDK methods

| Method | Signature | Description |
| --- | --- | --- |
| `OptionsMap` | `() map[string]any` | Deep copy of current SDK options. |
| `GetUtility` | `() *Utility` | Copy of the SDK utility object. |
| `Prepare` | `(fetchargs map[string]any) (map[string]any, error)` | Build an HTTP request definition without sending. |
| `Direct` | `(fetchargs map[string]any) (map[string]any, error)` | Build and send an HTTP request. |
| `BuildingPermit` | `(data map[string]any) AutoscrapeEntity` | Create a BuildingPermit entity instance. |
| `BusinessEntity` | `(data map[string]any) AutoscrapeEntity` | Create a BusinessEntity entity instance. |
| `Irs990` | `(data map[string]any) AutoscrapeEntity` | Create an Irs990 entity instance. |
| `SecEdgar` | `(data map[string]any) AutoscrapeEntity` | Create a SecEdgar entity instance. |
| `StockData` | `(data map[string]any) AutoscrapeEntity` | Create a StockData entity instance. |
| `Whoi` | `(data map[string]any) AutoscrapeEntity` | Create a Whoi entity instance. |
| `X402Paid` | `(data map[string]any) AutoscrapeEntity` | Create a X402Paid entity instance. |

### Entity interface (AutoscrapeEntity)

All entities implement the `AutoscrapeEntity` interface.

| Method | Signature | Description |
| --- | --- | --- |
| `Load` | `(reqmatch, ctrl map[string]any) (any, error)` | Load a single entity by match criteria. |
| `Data` | `(args ...any) any` | Get or set entity data. |
| `Match` | `(args ...any) any` | Get or set entity match criteria. |
| `Make` | `() Entity` | Create a new instance with the same options. |
| `GetName` | `() string` | Return the entity name. |

### Result shape

Entity operations return `(value, error)`. The `value` is the
operation's data **directly** — there is no wrapper:

| Operation | `value` |
| --- | --- |
| `Load` | the entity record (`map[string]any`) |

Check `err` first, then use the value directly (or the typed
`...Typed` variants, which return the entity's model struct and a typed
slice):

    buildingPermit, err := client.BuildingPermit(nil).Load(nil, nil)
    if err != nil { /* handle */ }
    // buildingPermit is the returned record

Only `Direct()` returns a response envelope — a `map[string]any` with
`"ok"`, `"status"`, `"headers"`, and `"data"` keys.

### Entities

#### BuildingPermit

| Field | Description |
| --- | --- |

Operations: Load.

API path: `/v1/building-permits/search`

#### BusinessEntity

| Field | Description |
| --- | --- |

Operations: Load.

API path: `/v1/business-entity/search`

#### Irs990

| Field | Description |
| --- | --- |

Operations: Load.

API path: `/v1/irs-990/search`

#### SecEdgar

| Field | Description |
| --- | --- |

Operations: Load.

API path: `/v1/sec-edgar/filings`

#### StockData

| Field | Description |
| --- | --- |

Operations: Load.

API path: `/v1/stock/chart`

#### Whoi

| Field | Description |
| --- | --- |

Operations: Load.

API path: `/v1/whois/lookup`

#### X402Paid

| Field | Description |
| --- | --- |

Operations: Load.

API path: `/x402/v1/sec-edgar/filings`



## Entities


### BuildingPermit

Create an instance: `buildingPermit := client.BuildingPermit(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Example: Load

```go
buildingPermit, err := client.BuildingPermit(nil).Load(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(buildingPermit) // the loaded record
```


### BusinessEntity

Create an instance: `businessEntity := client.BusinessEntity(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Example: Load

```go
businessEntity, err := client.BusinessEntity(nil).Load(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(businessEntity) // the loaded record
```


### Irs990

Create an instance: `irs990 := client.Irs990(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Example: Load

```go
irs990, err := client.Irs990(nil).Load(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(irs990) // the loaded record
```


### SecEdgar

Create an instance: `secEdgar := client.SecEdgar(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Example: Load

```go
secEdgar, err := client.SecEdgar(nil).Load(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(secEdgar) // the loaded record
```


### StockData

Create an instance: `stockData := client.StockData(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Example: Load

```go
stockData, err := client.StockData(nil).Load(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(stockData) // the loaded record
```


### Whoi

Create an instance: `whoi := client.Whoi(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Example: Load

```go
whoi, err := client.Whoi(nil).Load(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(whoi) // the loaded record
```


### X402Paid

Create an instance: `x402Paid := client.X402Paid(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Example: Load

```go
x402Paid, err := client.X402Paid(nil).Load(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(x402Paid) // the loaded record
```


## Advanced

> The sections above cover everyday use. The material below explains the
> SDK's internals — useful when extending it with custom features, but not
> needed for normal use.

### The operation pipeline

Every entity operation follows a six-stage pipeline. Each stage fires a
feature hook before executing:

```
PrePoint → PreSpec → PreRequest → PreResponse → PreResult → PreDone
```

- **PrePoint**: Resolves which API endpoint to call based on the
  operation name and entity configuration.
- **PreSpec**: Builds the HTTP spec — URL, method, headers, body —
  from the resolved point and the caller's parameters.
- **PreRequest**: Sends the HTTP request. Features can intercept here
  to replace the transport (as TestFeature does with mocks).
- **PreResponse**: Parses the raw HTTP response.
- **PreResult**: Extracts the business data from the parsed response.
- **PreDone**: Final stage before returning to the caller. Entity
  state (match, data) is updated here.

If any stage errors, the pipeline short-circuits and the error surfaces
to the caller — see [Error handling](#error-handling) for how that looks
in this language.

### Features and hooks

Features are the extension mechanism. A feature implements the
`Feature` interface and provides hooks — functions keyed by pipeline
stage names.

The SDK ships with built-in features:

- **TestFeature**: In-memory mock transport for testing without a live server

Features are initialized in order. Hooks fire in the order features
were added, so later features can override earlier ones.

### Data as maps

The Go SDK uses `map[string]any` throughout rather than typed structs.
This mirrors the dynamic nature of the API and keeps the SDK
flexible — no code generation is needed when the API schema changes.

Use `core.ToMapAny()` to safely cast results and nested data.

### Package structure

```
github.com/voxgig-sdk/autoscrape-sdk/go/
├── autoscrape.go        # Root package — type aliases and constructors
├── core/               # SDK core — client, types, pipeline
├── entity/             # Entity implementations
├── feature/            # Built-in features (Base, Test, Log)
├── utility/            # Utility functions and struct library
└── test/               # Test suites
```

The root package (`github.com/voxgig-sdk/autoscrape-sdk/go`) re-exports everything needed
for normal use. Import sub-packages only when you need specific types
like `core.ToMapAny`.

### Entity state

Entity instances are stateful. After a successful `Load`, the entity
stores the returned data and match criteria internally.

```go
secedgar := client.SecEdgar(nil)
secedgar.Load(nil, nil)

// secedgar.Data() now returns the secedgar data from the last load
// secedgar.Match() returns the last match criteria
```

Call `Make()` to create a fresh instance with the same configuration
but no stored state.

### Direct vs entity access

The entity interface handles URL construction, parameter placement,
and response parsing automatically. Use it for standard CRUD operations.

`Direct()` gives full control over the HTTP request. Use it for
non-standard endpoints, bulk operations, or any path not modelled as
an entity. `Prepare()` builds the request without sending it — useful
for debugging or custom transport.


## Full Reference

See [REFERENCE.md](REFERENCE.md) for complete API reference
documentation including all method signatures, entity field schemas,
and detailed usage examples.
