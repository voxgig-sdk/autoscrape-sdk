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
		},
		"feature": map[string]any{
			"test": map[string]any{
				"options": map[string]any{
					"active": false,
				},
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
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"example": "austin",
											"kind": "query",
											"name": "city",
											"orig": "city",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "date_from",
											"orig": "date_from",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "date_to",
											"orig": "date_to",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "keyword",
											"orig": "keyword",
											"type": "`$STRING`",
										},
										map[string]any{
											"example": 25,
											"kind": "query",
											"name": "max_result",
											"orig": "max_result",
											"type": "`$INTEGER`",
										},
										map[string]any{
											"kind": "query",
											"name": "permit_type",
											"orig": "permit_type",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "query",
											"orig": "query",
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/v1/building-permits/search",
								"parts": []any{
									"v1",
									"building-permits",
									"search",
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
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
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
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"kind": "query",
											"name": "fetch_detail",
											"orig": "fetch_detail",
											"type": "`$BOOLEAN`",
										},
										map[string]any{
											"example": 25,
											"kind": "query",
											"name": "max_result",
											"orig": "max_result",
											"type": "`$INTEGER`",
										},
										map[string]any{
											"example": "Apple Inc",
											"kind": "query",
											"name": "query",
											"orig": "query",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "state",
											"orig": "state",
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/v1/business-entity/search",
								"parts": []any{
									"v1",
									"business-entity",
									"search",
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
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
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
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"kind": "query",
											"name": "ein",
											"orig": "ein",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "fetch_detail",
											"orig": "fetch_detail",
											"type": "`$BOOLEAN`",
										},
										map[string]any{
											"example": 25,
											"kind": "query",
											"name": "max_result",
											"orig": "max_result",
											"type": "`$INTEGER`",
										},
										map[string]any{
											"kind": "query",
											"name": "query",
											"orig": "query",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "state",
											"orig": "state",
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/v1/irs-990/search",
								"parts": []any{
									"v1",
									"irs-990",
									"search",
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
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
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
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"kind": "query",
											"name": "cik",
											"orig": "cik",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "date_from",
											"orig": "date_from",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "date_to",
											"orig": "date_to",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "form_type",
											"orig": "form_type",
											"type": "`$STRING`",
										},
										map[string]any{
											"example": 100,
											"kind": "query",
											"name": "max_filing",
											"orig": "max_filing",
											"type": "`$INTEGER`",
										},
										map[string]any{
											"kind": "query",
											"name": "query",
											"orig": "query",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "ticker",
											"orig": "ticker",
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/v1/sec-edgar/filings",
								"parts": []any{
									"v1",
									"sec-edgar",
									"filings",
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
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
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
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"example": "1d",
											"kind": "query",
											"name": "interval",
											"orig": "interval",
											"type": "`$STRING`",
										},
										map[string]any{
											"example": "1mo",
											"kind": "query",
											"name": "range",
											"orig": "range",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "symbol",
											"orig": "symbol",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/v1/stock/chart",
								"parts": []any{
									"v1",
									"stock",
									"chart",
								},
								"select": map[string]any{
									"exist": []any{
										"interval",
										"range",
										"symbol",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
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
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"example": "apple.com",
											"kind": "query",
											"name": "domain",
											"orig": "domain",
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/v1/whois/lookup",
								"parts": []any{
									"v1",
									"whois",
									"lookup",
								},
								"select": map[string]any{
									"$action": "lookup",
									"exist": []any{
										"domain",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
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
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"kind": "query",
											"name": "cik",
											"orig": "cik",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "date_from",
											"orig": "date_from",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "date_to",
											"orig": "date_to",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "form_type",
											"orig": "form_type",
											"type": "`$STRING`",
										},
										map[string]any{
											"example": 100,
											"kind": "query",
											"name": "max_filing",
											"orig": "max_filing",
											"type": "`$INTEGER`",
										},
										map[string]any{
											"kind": "query",
											"name": "query",
											"orig": "query",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "ticker",
											"orig": "ticker",
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/x402/v1/sec-edgar/filings",
								"parts": []any{
									"x402",
									"v1",
									"sec-edgar",
									"filings",
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
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
							map[string]any{
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"example": "austin",
											"kind": "query",
											"name": "city",
											"orig": "city",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "date_from",
											"orig": "date_from",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "date_to",
											"orig": "date_to",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "keyword",
											"orig": "keyword",
											"type": "`$STRING`",
										},
										map[string]any{
											"example": 25,
											"kind": "query",
											"name": "max_result",
											"orig": "max_result",
											"type": "`$INTEGER`",
										},
										map[string]any{
											"kind": "query",
											"name": "permit_type",
											"orig": "permit_type",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "query",
											"orig": "query",
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/x402/v1/building-permits/search",
								"parts": []any{
									"x402",
									"v1",
									"building-permits",
									"search",
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
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
							map[string]any{
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"kind": "query",
											"name": "ein",
											"orig": "ein",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "fetch_detail",
											"orig": "fetch_detail",
											"type": "`$BOOLEAN`",
										},
										map[string]any{
											"example": 25,
											"kind": "query",
											"name": "max_result",
											"orig": "max_result",
											"type": "`$INTEGER`",
										},
										map[string]any{
											"kind": "query",
											"name": "query",
											"orig": "query",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "state",
											"orig": "state",
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/x402/v1/irs-990/search",
								"parts": []any{
									"x402",
									"v1",
									"irs-990",
									"search",
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
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
							map[string]any{
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"kind": "query",
											"name": "fetch_detail",
											"orig": "fetch_detail",
											"type": "`$BOOLEAN`",
										},
										map[string]any{
											"example": 25,
											"kind": "query",
											"name": "max_result",
											"orig": "max_result",
											"type": "`$INTEGER`",
										},
										map[string]any{
											"example": "Apple Inc",
											"kind": "query",
											"name": "query",
											"orig": "query",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "state",
											"orig": "state",
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/x402/v1/business-entity/search",
								"parts": []any{
									"x402",
									"v1",
									"business-entity",
									"search",
								},
								"select": map[string]any{
									"exist": []any{
										"fetch_detail",
										"max_result",
										"query",
										"state",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
							map[string]any{
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"example": "apple.com",
											"kind": "query",
											"name": "domain",
											"orig": "domain",
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/x402/v1/whois/lookup",
								"parts": []any{
									"x402",
									"v1",
									"whois",
									"lookup",
								},
								"select": map[string]any{
									"exist": []any{
										"domain",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
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
	case "test":
		if NewTestFeatureFunc != nil {
			return NewTestFeatureFunc()
		}
	default:
		if NewBaseFeatureFunc != nil {
			return NewBaseFeatureFunc()
		}
	}
	return nil
}
