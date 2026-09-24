package core

import (
	"sync"
)

// MakeConfig builds a fresh, fully materialised config map. Every call
// rebuilds the whole structure, so prefer SharedConfig unless you need a
// private copy you intend to mutate.
func MakeConfig() map[string]any {
	return map[string]any{
		"main": map[string]any{
			"name": "Autoscrape",
			"slug": "autoscrape",
			"version": "0.0.1",
			"target": "go",
		},
		"feature": map[string]any{
			"ratelimit": map[string]any{
				"options": map[string]any{
					"active": false,
					"burst": 5,
					"rate": 5,
				},
				"optspec": map[string]any{
					"now": "`$FUNCTION`",
					"sleep": "`$FUNCTION`",
				},
				"strict": false,
				"transport": "wrap",
			},
			"retry": map[string]any{
				"options": map[string]any{
					"active": false,
					"factor": 2,
					"maxDelay": 2000,
					"minDelay": 50,
					"retries": 2,
					"statuses": []any{
						408,
						425,
						429,
						500,
						502,
						503,
						504,
					},
				},
				"optspec": map[string]any{
					"jitter": "`$BOOLEAN`",
					"sleep": "`$FUNCTION`",
				},
				"strict": false,
				"transport": "wrap",
			},
			"test": map[string]any{
				"options": map[string]any{
					"active": false,
				},
				"optspec": map[string]any{
					"entity": "`$MAP`",
					"net": "`$MAP`",
				},
				"strict": false,
				"transport": "base",
			},
			"timeout": map[string]any{
				"options": map[string]any{
					"active": false,
					"ms": 30000,
				},
				"optspec": map[string]any{
					"clearTimer": "`$FUNCTION`",
					"setTimer": "`$FUNCTION`",
				},
				"strict": false,
				"transport": "wrap",
			},
		},
		"options": map[string]any{
			"base": "https://autoscrape-api-seven.vercel.app",
			"headers": map[string]any{
				"content-type": "application/json",
			},
			"entity": map[string]any{
				"building_permit": map[string]any{},
				"business_entity": map[string]any{},
				"irs_990": map[string]any{},
				"sec_edgar": map[string]any{},
				"stock_data": map[string]any{},
				"whoi": map[string]any{},
				"x402_paid": map[string]any{},
			},
		},
		"entity": map[string]any{
			"building_permit": map[string]any{
				"fields": []any{},
				"name": "building_permit",
				"op": map[string]any{
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/v1/building-permits/search",
								"segments": []any{
									map[string]any{
										"lit": "v1",
									},
									map[string]any{
										"lit": "building-permits",
									},
									map[string]any{
										"lit": "search",
									},
								},
								"parts": []any{
									"v1",
									"building-permits",
									"search",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "city",
											"orig": "city",
											"type": "`$STRING`",
											"kind": "query",
											"example": "austin",
										},
										map[string]any{
											"name": "date_from",
											"orig": "date_from",
											"type": "`$STRING`",
											"kind": "query",
										},
										map[string]any{
											"name": "date_to",
											"orig": "date_to",
											"type": "`$STRING`",
											"kind": "query",
										},
										map[string]any{
											"name": "keyword",
											"orig": "keyword",
											"type": "`$STRING`",
											"kind": "query",
										},
										map[string]any{
											"name": "max_result",
											"orig": "max_result",
											"type": "`$INTEGER`",
											"kind": "query",
											"example": 25,
										},
										map[string]any{
											"name": "permit_type",
											"orig": "permit_type",
											"type": "`$STRING`",
											"kind": "query",
										},
										map[string]any{
											"name": "query",
											"orig": "query",
											"type": "`$STRING`",
											"kind": "query",
										},
									},
								},
								"select": map[string]any{
									"$action": "search",
									"exist": []any{
										"city",
										"date_from",
										"date_to",
										"keyword",
										"max_result",
										"permit_type",
										"query",
									},
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"business_entity": map[string]any{
				"fields": []any{},
				"name": "business_entity",
				"op": map[string]any{
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/v1/business-entity/search",
								"segments": []any{
									map[string]any{
										"lit": "v1",
									},
									map[string]any{
										"lit": "business-entity",
									},
									map[string]any{
										"lit": "search",
									},
								},
								"parts": []any{
									"v1",
									"business-entity",
									"search",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "fetch_detail",
											"orig": "fetch_detail",
											"type": "`$BOOLEAN`",
											"kind": "query",
										},
										map[string]any{
											"name": "max_result",
											"orig": "max_result",
											"type": "`$INTEGER`",
											"kind": "query",
											"example": 25,
										},
										map[string]any{
											"name": "query",
											"orig": "query",
											"type": "`$STRING`",
											"kind": "query",
											"example": "Apple Inc",
										},
										map[string]any{
											"name": "state",
											"orig": "state",
											"type": "`$STRING`",
											"kind": "query",
										},
									},
								},
								"select": map[string]any{
									"$action": "search",
									"exist": []any{
										"fetch_detail",
										"max_result",
										"query",
										"state",
									},
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"irs_990": map[string]any{
				"fields": []any{},
				"name": "irs_990",
				"op": map[string]any{
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/v1/irs-990/search",
								"segments": []any{
									map[string]any{
										"lit": "v1",
									},
									map[string]any{
										"lit": "irs-990",
									},
									map[string]any{
										"lit": "search",
									},
								},
								"parts": []any{
									"v1",
									"irs-990",
									"search",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "ein",
											"orig": "ein",
											"type": "`$STRING`",
											"kind": "query",
										},
										map[string]any{
											"name": "fetch_detail",
											"orig": "fetch_detail",
											"type": "`$BOOLEAN`",
											"kind": "query",
										},
										map[string]any{
											"name": "max_result",
											"orig": "max_result",
											"type": "`$INTEGER`",
											"kind": "query",
											"example": 25,
										},
										map[string]any{
											"name": "query",
											"orig": "query",
											"type": "`$STRING`",
											"kind": "query",
										},
										map[string]any{
											"name": "state",
											"orig": "state",
											"type": "`$STRING`",
											"kind": "query",
										},
									},
								},
								"select": map[string]any{
									"$action": "search",
									"exist": []any{
										"ein",
										"fetch_detail",
										"max_result",
										"query",
										"state",
									},
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"sec_edgar": map[string]any{
				"fields": []any{},
				"name": "sec_edgar",
				"op": map[string]any{
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/v1/sec-edgar/filings",
								"segments": []any{
									map[string]any{
										"lit": "v1",
									},
									map[string]any{
										"lit": "sec-edgar",
									},
									map[string]any{
										"lit": "filings",
									},
								},
								"parts": []any{
									"v1",
									"sec-edgar",
									"filings",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "cik",
											"orig": "cik",
											"type": "`$STRING`",
											"kind": "query",
										},
										map[string]any{
											"name": "date_from",
											"orig": "date_from",
											"type": "`$STRING`",
											"kind": "query",
										},
										map[string]any{
											"name": "date_to",
											"orig": "date_to",
											"type": "`$STRING`",
											"kind": "query",
										},
										map[string]any{
											"name": "form_type",
											"orig": "form_type",
											"type": "`$STRING`",
											"kind": "query",
										},
										map[string]any{
											"name": "max_filing",
											"orig": "max_filing",
											"type": "`$INTEGER`",
											"kind": "query",
											"example": 100,
										},
										map[string]any{
											"name": "query",
											"orig": "query",
											"type": "`$STRING`",
											"kind": "query",
										},
										map[string]any{
											"name": "ticker",
											"orig": "ticker",
											"type": "`$STRING`",
											"kind": "query",
										},
									},
								},
								"select": map[string]any{
									"$action": "filing",
									"exist": []any{
										"cik",
										"date_from",
										"date_to",
										"form_type",
										"max_filing",
										"query",
										"ticker",
									},
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"stock_data": map[string]any{
				"fields": []any{},
				"name": "stock_data",
				"op": map[string]any{
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/v1/stock/chart",
								"segments": []any{
									map[string]any{
										"lit": "v1",
									},
									map[string]any{
										"lit": "stock",
									},
									map[string]any{
										"lit": "chart",
									},
								},
								"parts": []any{
									"v1",
									"stock",
									"chart",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "interval",
											"orig": "interval",
											"type": "`$STRING`",
											"kind": "query",
											"example": "1d",
										},
										map[string]any{
											"name": "range",
											"orig": "range",
											"type": "`$STRING`",
											"kind": "query",
											"example": "1mo",
										},
										map[string]any{
											"name": "symbol",
											"orig": "symbol",
											"type": "`$STRING`",
											"kind": "query",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"interval",
										"range",
										"symbol",
									},
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"whoi": map[string]any{
				"fields": []any{},
				"name": "whoi",
				"op": map[string]any{
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/v1/whois/lookup",
								"segments": []any{
									map[string]any{
										"lit": "v1",
									},
									map[string]any{
										"lit": "whois",
									},
									map[string]any{
										"lit": "lookup",
									},
								},
								"parts": []any{
									"v1",
									"whois",
									"lookup",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "domain",
											"orig": "domain",
											"type": "`$STRING`",
											"kind": "query",
											"example": "apple.com",
										},
									},
								},
								"select": map[string]any{
									"$action": "lookup",
									"exist": []any{
										"domain",
									},
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"x402_paid": map[string]any{
				"fields": []any{},
				"name": "x402_paid",
				"op": map[string]any{
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/x402/v1/sec-edgar/filings",
								"segments": []any{
									map[string]any{
										"lit": "x402",
									},
									map[string]any{
										"lit": "v1",
									},
									map[string]any{
										"lit": "sec-edgar",
									},
									map[string]any{
										"lit": "filings",
									},
								},
								"parts": []any{
									"x402",
									"v1",
									"sec-edgar",
									"filings",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "cik",
											"orig": "cik",
											"type": "`$STRING`",
											"kind": "query",
										},
										map[string]any{
											"name": "date_from",
											"orig": "date_from",
											"type": "`$STRING`",
											"kind": "query",
										},
										map[string]any{
											"name": "date_to",
											"orig": "date_to",
											"type": "`$STRING`",
											"kind": "query",
										},
										map[string]any{
											"name": "form_type",
											"orig": "form_type",
											"type": "`$STRING`",
											"kind": "query",
										},
										map[string]any{
											"name": "max_filing",
											"orig": "max_filing",
											"type": "`$INTEGER`",
											"kind": "query",
											"example": 100,
										},
										map[string]any{
											"name": "query",
											"orig": "query",
											"type": "`$STRING`",
											"kind": "query",
										},
										map[string]any{
											"name": "ticker",
											"orig": "ticker",
											"type": "`$STRING`",
											"kind": "query",
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"cik",
										"date_from",
										"date_to",
										"form_type",
										"max_filing",
										"query",
										"ticker",
									},
								},
							},
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/x402/v1/building-permits/search",
								"segments": []any{
									map[string]any{
										"lit": "x402",
									},
									map[string]any{
										"lit": "v1",
									},
									map[string]any{
										"lit": "building-permits",
									},
									map[string]any{
										"lit": "search",
									},
								},
								"parts": []any{
									"x402",
									"v1",
									"building-permits",
									"search",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "city",
											"orig": "city",
											"type": "`$STRING`",
											"kind": "query",
											"example": "austin",
										},
										map[string]any{
											"name": "date_from",
											"orig": "date_from",
											"type": "`$STRING`",
											"kind": "query",
										},
										map[string]any{
											"name": "date_to",
											"orig": "date_to",
											"type": "`$STRING`",
											"kind": "query",
										},
										map[string]any{
											"name": "keyword",
											"orig": "keyword",
											"type": "`$STRING`",
											"kind": "query",
										},
										map[string]any{
											"name": "max_result",
											"orig": "max_result",
											"type": "`$INTEGER`",
											"kind": "query",
											"example": 25,
										},
										map[string]any{
											"name": "permit_type",
											"orig": "permit_type",
											"type": "`$STRING`",
											"kind": "query",
										},
										map[string]any{
											"name": "query",
											"orig": "query",
											"type": "`$STRING`",
											"kind": "query",
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"city",
										"date_from",
										"date_to",
										"keyword",
										"max_result",
										"permit_type",
										"query",
									},
								},
							},
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/x402/v1/irs-990/search",
								"segments": []any{
									map[string]any{
										"lit": "x402",
									},
									map[string]any{
										"lit": "v1",
									},
									map[string]any{
										"lit": "irs-990",
									},
									map[string]any{
										"lit": "search",
									},
								},
								"parts": []any{
									"x402",
									"v1",
									"irs-990",
									"search",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "ein",
											"orig": "ein",
											"type": "`$STRING`",
											"kind": "query",
										},
										map[string]any{
											"name": "fetch_detail",
											"orig": "fetch_detail",
											"type": "`$BOOLEAN`",
											"kind": "query",
										},
										map[string]any{
											"name": "max_result",
											"orig": "max_result",
											"type": "`$INTEGER`",
											"kind": "query",
											"example": 25,
										},
										map[string]any{
											"name": "query",
											"orig": "query",
											"type": "`$STRING`",
											"kind": "query",
										},
										map[string]any{
											"name": "state",
											"orig": "state",
											"type": "`$STRING`",
											"kind": "query",
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"ein",
										"fetch_detail",
										"max_result",
										"query",
										"state",
									},
								},
							},
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/x402/v1/business-entity/search",
								"segments": []any{
									map[string]any{
										"lit": "x402",
									},
									map[string]any{
										"lit": "v1",
									},
									map[string]any{
										"lit": "business-entity",
									},
									map[string]any{
										"lit": "search",
									},
								},
								"parts": []any{
									"x402",
									"v1",
									"business-entity",
									"search",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "fetch_detail",
											"orig": "fetch_detail",
											"type": "`$BOOLEAN`",
											"kind": "query",
										},
										map[string]any{
											"name": "max_result",
											"orig": "max_result",
											"type": "`$INTEGER`",
											"kind": "query",
											"example": 25,
										},
										map[string]any{
											"name": "query",
											"orig": "query",
											"type": "`$STRING`",
											"kind": "query",
											"example": "Apple Inc",
										},
										map[string]any{
											"name": "state",
											"orig": "state",
											"type": "`$STRING`",
											"kind": "query",
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"fetch_detail",
										"max_result",
										"query",
										"state",
									},
								},
							},
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/x402/v1/whois/lookup",
								"segments": []any{
									map[string]any{
										"lit": "x402",
									},
									map[string]any{
										"lit": "v1",
									},
									map[string]any{
										"lit": "whois",
									},
									map[string]any{
										"lit": "lookup",
									},
								},
								"parts": []any{
									"x402",
									"v1",
									"whois",
									"lookup",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "domain",
											"orig": "domain",
											"type": "`$STRING`",
											"kind": "query",
											"example": "apple.com",
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"domain",
									},
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
		},
	}
}

// The plugin definitions the model selected per feature, as []any so a
// feature package can consume them without core naming its types. Empty
// when no active feature declares active plugin groups for this target.
var featurePlugins = map[string][]any{
}

// FeaturePlugins is the definitions list for one feature's chain.
func FeaturePlugins(name string) []any {
	return featurePlugins[name]
}

var (
	sharedConfigOnce sync.Once
	sharedConfigVal  map[string]any
)

// SharedConfig returns the process-wide config, built once on first use.
// The SDK reads the config on every request and never writes to it, so one
// instance is shared by every client rather than rebuilt per client.
//
// The returned map is shared: treat it as read-only. Callers that need to
// mutate should use MakeConfig, which always returns a fresh copy.
func SharedConfig() map[string]any {
	sharedConfigOnce.Do(func() {
		sharedConfigVal = MakeConfig()
	})
	return sharedConfigVal
}

func makeFeature(name string) Feature {
	switch name {
	case "ratelimit":
		if NewRatelimitFeatureFunc != nil {
			return NewRatelimitFeatureFunc()
		}
	case "retry":
		if NewRetryFeatureFunc != nil {
			return NewRetryFeatureFunc()
		}
	case "test":
		if NewTestFeatureFunc != nil {
			return NewTestFeatureFunc()
		}
	case "timeout":
		if NewTimeoutFeatureFunc != nil {
			return NewTimeoutFeatureFunc()
		}
	default:
		if NewBaseFeatureFunc != nil {
			return NewBaseFeatureFunc()
		}
	}
	return nil
}
