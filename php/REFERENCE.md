# Autoscrape PHP SDK Reference

Complete API reference for the Autoscrape PHP SDK.


## AutoscrapeSDK

### Constructor

```php
require_once __DIR__ . '/autoscrape_sdk.php';

$client = new AutoscrapeSDK($options);
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `$options` | `array` | SDK configuration options. |
| `$options["base"]` | `string` | Base URL for API requests. |
| `$options["prefix"]` | `string` | URL prefix appended after base. |
| `$options["suffix"]` | `string` | URL suffix appended after path. |
| `$options["headers"]` | `array` | Custom headers for all requests. |
| `$options["feature"]` | `array` | Feature configuration. |
| `$options["system"]` | `array` | System overrides (e.g. custom fetch). |


### Static Methods

#### `AutoscrapeSDK::test($testopts = null, $sdkopts = null)`

Create a test client with mock features active. Both arguments may be `null`.

```php
$client = AutoscrapeSDK::test();
```


### Instance Methods

#### `BuildingPermit($data = null)`

Create a new `BuildingPermitEntity` instance. Pass `null` for no initial data.

#### `BusinessEntity($data = null)`

Create a new `BusinessEntityEntity` instance. Pass `null` for no initial data.

#### `Irs990($data = null)`

Create a new `Irs990Entity` instance. Pass `null` for no initial data.

#### `SecEdgar($data = null)`

Create a new `SecEdgarEntity` instance. Pass `null` for no initial data.

#### `StockData($data = null)`

Create a new `StockDataEntity` instance. Pass `null` for no initial data.

#### `Whoi($data = null)`

Create a new `WhoiEntity` instance. Pass `null` for no initial data.

#### `X402Paid($data = null)`

Create a new `X402PaidEntity` instance. Pass `null` for no initial data.

#### `options_map(): array`

Return a deep copy of the current SDK options.

#### `get_utility(): AutoscrapeUtility`

Return a copy of the SDK utility object.

#### `direct(array $fetchargs = []): array`

Make a direct HTTP request to any API endpoint. This is the raw-HTTP escape
hatch: it does **not** throw. It returns a result array
`["ok" => bool, "status" => int, "headers" => array, "data" => mixed]`, or
`["ok" => false, "err" => \Exception]` on failure. Branch on `$result["ok"]`.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `$fetchargs["path"]` | `string` | URL path with optional `{param}` placeholders. |
| `$fetchargs["method"]` | `string` | HTTP method (default: `"GET"`). |
| `$fetchargs["params"]` | `array` | Path parameter values for `{param}` substitution. |
| `$fetchargs["query"]` | `array` | Query string parameters. |
| `$fetchargs["headers"]` | `array` | Request headers (merged with defaults). |
| `$fetchargs["body"]` | `mixed` | Request body (arrays are JSON-serialized). |
| `$fetchargs["ctrl"]` | `array` | Control options. |

**Returns:** `array` — the result dict (see above); never throws.

#### `prepare(array $fetchargs = []): mixed`

Prepare a fetch definition without sending the request. Returns the
`$fetchdef` array. Throws on error.


---

## BuildingPermitEntity

```php
$building_permit = $client->BuildingPermit();
```

### Operations

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->BuildingPermit()->load();
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): BuildingPermitEntity`

Create a new `BuildingPermitEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## BusinessEntityEntity

```php
$business_entity = $client->BusinessEntity();
```

### Operations

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->BusinessEntity()->load();
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): BusinessEntityEntity`

Create a new `BusinessEntityEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## Irs990Entity

```php
$irs_990 = $client->Irs990();
```

### Operations

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->Irs990()->load();
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): Irs990Entity`

Create a new `Irs990Entity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## SecEdgarEntity

```php
$sec_edgar = $client->SecEdgar();
```

### Operations

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->SecEdgar()->load();
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): SecEdgarEntity`

Create a new `SecEdgarEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## StockDataEntity

```php
$stock_data = $client->StockData();
```

### Operations

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->StockData()->load();
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): StockDataEntity`

Create a new `StockDataEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## WhoiEntity

```php
$whoi = $client->Whoi();
```

### Operations

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->Whoi()->load();
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): WhoiEntity`

Create a new `WhoiEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## X402PaidEntity

```php
$x402_paid = $client->X402Paid();
```

### Operations

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->X402Paid()->load();
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): X402PaidEntity`

Create a new `X402PaidEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |


Features are activated via the `feature` option:

```php
$client = new AutoscrapeSDK([
  "feature" => [
    "test" => ["active" => true],
  ],
]);
```

