# Autoscrape TypeScript SDK



The TypeScript SDK for the Autoscrape API — a type-safe, entity-oriented client with full async/await support.

The API is exposed as capitalised, semantic **Entities** — e.g.
`client.BuildingPermit()` — each with a small set of operations (`load`)
instead of raw URL paths and query parameters. This keeps the surface
predictable and low-friction for both humans and AI agents.

> Other languages, the CLI, and MCP server live alongside this one — see
> the [top-level README](../README.md).


## Install
This package is not yet published to npm. Install it from the GitHub
release tag (`ts/vX.Y.Z`):

- Releases: [https://github.com/voxgig-sdk/autoscrape-sdk/releases](https://github.com/voxgig-sdk/autoscrape-sdk/releases)


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### 1. Create a client

```ts
import { AutoscrapeSDK } from '@voxgig-sdk/autoscrape'

const client = new AutoscrapeSDK()
```

### 3. Load a buildingpermit

`load()` returns the entity directly and throws on failure:

```ts
try {
  const buildingpermit = await client.BuildingPermit().load()
  console.log(buildingpermit)
} catch (err) {
  console.error('load failed:', err)
}
```


## Error handling

Entity operations reject on failure, so wrap them in `try` / `catch`:

```ts
try {
  const buildingpermit = await client.BuildingPermit().load()
  console.log(buildingpermit)
} catch (err) {
  console.error('load failed:', err)
}
```

The low-level `direct()` method does **not** throw — it returns the
value or an `Error`, so check the result before using it:

```ts
const result = await client.direct({
  path: '/api/resource/{id}',
  method: 'GET',
  params: { id: 'example_id' },
})

if (result instanceof Error) {
  throw result
}
```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```ts
const result = await client.direct({
  path: '/api/resource/{id}',
  method: 'GET',
  params: { id: 'example' },
})

if (result instanceof Error) {
  throw result
}
if (result.ok) {
  console.log(result.status)  // 200
  console.log(result.data)    // response body
}
```

### Prepare a request without sending it

```ts
const fetchdef = await client.prepare({
  path: '/api/resource/{id}',
  method: 'DELETE',
  params: { id: 'example' },
})

// Inspect before sending
console.log(fetchdef.url)
console.log(fetchdef.method)
console.log(fetchdef.headers)
```

### Use test mode

Create a mock client for unit testing — no server required:

```ts
const client = AutoscrapeSDK.test()

const buildingpermit = await client.BuildingPermit().load()
// buildingpermit is a bare entity populated with mock response data
console.log(buildingpermit)
```

You can also use the instance method:

```ts
const client = new AutoscrapeSDK()
const testClient = client.tester()
```

### Retain entity state across calls

Entity instances remember their last match and data:

```ts
const entity = client.BuildingPermit()

// First call runs the operation and stores its result
await entity.load()

// Subsequent calls reuse the stored state
const data = entity.data()
console.log(data)
```

### Add custom middleware

Pass features via the `extend` option:

```ts
const logger = {
  hooks: {
    PreRequest: (ctx: any) => {
      console.log('Requesting:', ctx.spec.method, ctx.spec.path)
    },
    PreResponse: (ctx: any) => {
      console.log('Status:', ctx.out.request?.status)
    },
  },
}

const client = new AutoscrapeSDK({
  extend: [logger],
})
```

### Run live tests

Create a `.env.local` file at the project root:

```
AUTOSCRAPE_TEST_LIVE=TRUE
```

Then run:

```bash
cd ts && npm test
```


## Reference

### AutoscrapeSDK

#### Constructor

```ts
new AutoscrapeSDK(options?: {
  base?: string
  prefix?: string
  suffix?: string
  feature?: Record<string, { active: boolean }>
  extend?: Feature[]
})
```

| Option | Type | Description |
| --- | --- | --- |
| `base` | `string` | Base URL of the API server. |
| `prefix` | `string` | URL path prefix prepended to all requests. |
| `suffix` | `string` | URL path suffix appended to all requests. |
| `feature` | `object` | Feature activation flags (e.g. `{ test: { active: true } }`). |
| `extend` | `Feature[]` | Additional feature instances to load. |

#### Methods

| Method | Returns | Description |
| --- | --- | --- |
| `options()` | `object` | Deep copy of current SDK options. |
| `utility()` | `Utility` | Deep copy of the SDK utility object. |
| `prepare(fetchargs?)` | `Promise<FetchDef>` | Build an HTTP request definition without sending it. |
| `direct(fetchargs?)` | `Promise<DirectResult>` | Build and send an HTTP request. |
| `BuildingPermit(data?)` | `BuildingPermitEntity` | Create a BuildingPermit entity instance. |
| `BusinessEntity(data?)` | `BusinessEntityEntity` | Create a BusinessEntity entity instance. |
| `Irs990(data?)` | `Irs990Entity` | Create an Irs990 entity instance. |
| `SecEdgar(data?)` | `SecEdgarEntity` | Create a SecEdgar entity instance. |
| `StockData(data?)` | `StockDataEntity` | Create a StockData entity instance. |
| `Whoi(data?)` | `WhoiEntity` | Create a Whoi entity instance. |
| `X402Paid(data?)` | `X402PaidEntity` | Create a X402Paid entity instance. |
| `tester(testopts?, sdkopts?)` | `AutoscrapeSDK` | Create a test-mode client instance. |

#### Static methods

| Method | Returns | Description |
| --- | --- | --- |
| `AutoscrapeSDK.test(testopts?, sdkopts?)` | `AutoscrapeSDK` | Create a test-mode client. |

### Entity interface

All entities share the same interface.

#### Methods

| Method | Signature | Description |
| --- | --- | --- |
| `load` | `load(reqmatch?, ctrl?): Promise<Entity>` | Load a single entity by match criteria. |
| `data` | `data(data?: Partial<Entity>): Entity` | Get or set entity data. |
| `match` | `match(match?: Partial<Entity>): Partial<Entity>` | Get or set entity match criteria. |
| `make` | `make(): Entity` | Create a new instance with the same options. |
| `client` | `client(): AutoscrapeSDK` | Return the parent SDK client. |
| `entopts` | `entopts(): object` | Return a copy of the entity options. |

#### Return values

Entity operations resolve to the entity data directly — there is no
result envelope:

- `load` resolves to a single entity object.

On a failed request these methods **throw**, so wrap calls in
`try`/`catch` to handle errors. Only `direct()` returns the result
envelope described below.

### DirectResult shape

The `direct()` method returns:

```ts
{
  ok: boolean
  status: number
  headers: object
  data: any
}
```

On error, `ok` is `false` and an `err` property contains the error.

### FetchDef shape

The `prepare()` method returns:

```ts
{
  url: string
  method: string
  headers: Record<string, string>
  body?: any
}
```

### Entities

#### BuildingPermit

| Field | Description |
| --- | --- |

Operations: load.

API path: `/v1/building-permits/search`

#### BusinessEntity

| Field | Description |
| --- | --- |

Operations: load.

API path: `/v1/business-entity/search`

#### Irs990

| Field | Description |
| --- | --- |

Operations: load.

API path: `/v1/irs-990/search`

#### SecEdgar

| Field | Description |
| --- | --- |

Operations: load.

API path: `/v1/sec-edgar/filings`

#### StockData

| Field | Description |
| --- | --- |

Operations: load.

API path: `/v1/stock/chart`

#### Whoi

| Field | Description |
| --- | --- |

Operations: load.

API path: `/v1/whois/lookup`

#### X402Paid

| Field | Description |
| --- | --- |

Operations: load.

API path: `/x402/v1/sec-edgar/filings`



## Entities


### BuildingPermit

Create an instance: `const building_permit = client.BuildingPermit()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```ts
const building_permit = await client.BuildingPermit().load()
```


### BusinessEntity

Create an instance: `const business_entity = client.BusinessEntity()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```ts
const business_entity = await client.BusinessEntity().load()
```


### Irs990

Create an instance: `const irs_990 = client.Irs990()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```ts
const irs_990 = await client.Irs990().load()
```


### SecEdgar

Create an instance: `const sec_edgar = client.SecEdgar()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```ts
const sec_edgar = await client.SecEdgar().load()
```


### StockData

Create an instance: `const stock_data = client.StockData()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```ts
const stock_data = await client.StockData().load()
```


### Whoi

Create an instance: `const whoi = client.Whoi()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```ts
const whoi = await client.Whoi().load()
```


### X402Paid

Create an instance: `const x402_paid = client.X402Paid()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```ts
const x402_paid = await client.X402Paid().load()
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

Features are the extension mechanism. A feature is an object with a
`hooks` map. Each hook key is a pipeline stage name, and the value is
a function that receives the context.

The SDK ships with built-in features:

- **TestFeature**: In-memory mock transport for testing without a live server

Features are initialized in order. Hooks fire in the order features
were added, so later features can override earlier ones.

### Module structure

```
autoscrape/
├── src/
│   ├── AutoscrapeSDK.ts        # Main SDK class
│   ├── entity/             # Entity implementations
│   ├── feature/            # Built-in features (Base, Test, Log)
│   └── utility/            # Utility functions
├── test/                   # Test suites
└── dist/                   # Compiled output
```

Import the SDK from the package root:

```ts
import { AutoscrapeSDK } from '@voxgig-sdk/autoscrape'
```

### Entity state

Entity instances are stateful. After a successful `load`, the entity
stores the returned data and match criteria internally. Subsequent
calls on the same instance can rely on this state.

```ts
const buildingpermit = client.BuildingPermit()
await buildingpermit.load()

// buildingpermit.data() now returns the buildingpermit data from the last `load`
// buildingpermit.match() returns the last match criteria
```

Call `make()` to create a fresh instance with the same configuration
but no stored state.

### Direct vs entity access

The entity interface handles URL construction, parameter placement,
and response parsing automatically. Use it for standard CRUD operations.

The `direct` method gives full control over the HTTP request. Use it
for non-standard endpoints, bulk operations, or any path not modelled
as an entity. The `prepare` method is useful for debugging — it
shows exactly what `direct` would send.


## Full Reference

See [REFERENCE.md](REFERENCE.md) for complete API reference
documentation including all method signatures, entity field schemas,
and detailed usage examples.
