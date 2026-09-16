"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FEATURE_PLUGINS = exports.config = void 0;
const RatelimitFeature_1 = require("./feature/ratelimit/RatelimitFeature");
const RetryFeature_1 = require("./feature/retry/RetryFeature");
const TestFeature_1 = require("./feature/test/TestFeature");
const TimeoutFeature_1 = require("./feature/timeout/TimeoutFeature");
const FEATURE_CLASS = {
    ratelimit: RatelimitFeature_1.RatelimitFeature,
    retry: RetryFeature_1.RetryFeature,
    test: TestFeature_1.TestFeature,
    timeout: TimeoutFeature_1.TimeoutFeature,
};
// Per-feature plugin DEFINITIONS (voxgig/plugin `Definition` values), from
// the model's active plugin groups. A feature that takes a `plugins` option
// (secrets over sekreto) reads its own entry; a feature with no plugins has
// none. Named imports above make each definition statically reachable, so
// an SDK carries exactly the plugin modules its model selects — the same
// leanness the old side-effect registry imports bought, without a registry.
const FEATURE_PLUGINS = {};
exports.FEATURE_PLUGINS = FEATURE_PLUGINS;
class Config {
    makeFeature(fn) {
        const fc = FEATURE_CLASS[fn];
        const fi = new fc();
        // TODO: errors etc
        return fi;
    }
    // False for a feature added at runtime via options.extend (station's
    // adopt path) - the constructor uses this to skip makeFeature for names
    // no generated class backs.
    hasFeature(fn) {
        return null != FEATURE_CLASS[fn];
    }
    main = {
        name: 'Autoscrape',
        slug: "autoscrape",
        version: "0.0.1",
        target: "ts",
    };
    feature = {
        ratelimit: {
            "options": {
                "active": false,
                "burst": 5,
                "rate": 5
            },
            "optspec": {
                "now": "`$FUNCTION`",
                "sleep": "`$FUNCTION`"
            },
            "strict": false,
            "transport": "wrap"
        },
        retry: {
            "options": {
                "active": false,
                "factor": 2,
                "maxDelay": 2000,
                "minDelay": 50,
                "retries": 2,
                "statuses": [
                    408,
                    425,
                    429,
                    500,
                    502,
                    503,
                    504
                ]
            },
            "optspec": {
                "jitter": "`$BOOLEAN`",
                "sleep": "`$FUNCTION`"
            },
            "strict": false,
            "transport": "wrap"
        },
        test: {
            "options": {
                "active": false
            },
            "optspec": {
                "entity": "`$MAP`",
                "net": "`$MAP`"
            },
            "strict": false,
            "transport": "base"
        },
        timeout: {
            "options": {
                "active": false,
                "ms": 30000
            },
            "optspec": {
                "clearTimer": "`$FUNCTION`",
                "setTimer": "`$FUNCTION`"
            },
            "strict": false,
            "transport": "wrap"
        },
    };
    options = {
        base: "https://autoscrape-api-seven.vercel.app",
        headers: {
            "content-type": "application/json"
        },
        entity: {
            building_permit: {},
            business_entity: {},
            irs_990: {},
            sec_edgar: {},
            stock_data: {},
            whoi: {},
            x402_paid: {},
        }
    };
    entity = {
        "building_permit": {
            "fields": [],
            "name": "building_permit",
            "op": {
                "load": {
                    "input": "data",
                    "name": "load",
                    "points": [
                        {
                            "args": {
                                "query": [
                                    {
                                        "example": "austin",
                                        "kind": "query",
                                        "name": "city",
                                        "orig": "city",
                                        "type": "`$STRING`"
                                    },
                                    {
                                        "kind": "query",
                                        "name": "date_from",
                                        "orig": "date_from",
                                        "type": "`$STRING`"
                                    },
                                    {
                                        "kind": "query",
                                        "name": "date_to",
                                        "orig": "date_to",
                                        "type": "`$STRING`"
                                    },
                                    {
                                        "kind": "query",
                                        "name": "keyword",
                                        "orig": "keyword",
                                        "type": "`$STRING`"
                                    },
                                    {
                                        "example": 25,
                                        "kind": "query",
                                        "name": "max_result",
                                        "orig": "max_result",
                                        "type": "`$INTEGER`"
                                    },
                                    {
                                        "kind": "query",
                                        "name": "permit_type",
                                        "orig": "permit_type",
                                        "type": "`$STRING`"
                                    },
                                    {
                                        "kind": "query",
                                        "name": "query",
                                        "orig": "query",
                                        "type": "`$STRING`"
                                    }
                                ]
                            },
                            "kind": "http",
                            "method": "GET",
                            "orig": "/v1/building-permits/search",
                            "segments": [
                                {
                                    "lit": "v1"
                                },
                                {
                                    "lit": "building-permits"
                                },
                                {
                                    "lit": "search"
                                }
                            ],
                            "select": {
                                "$action": "search",
                                "exist": [
                                    "city",
                                    "date_from",
                                    "date_to",
                                    "keyword",
                                    "max_result",
                                    "permit_type",
                                    "query"
                                ]
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "parts": [
                                "v1",
                                "building-permits",
                                "search"
                            ]
                        }
                    ]
                }
            },
            "relations": {
                "ancestors": []
            }
        },
        "business_entity": {
            "fields": [],
            "name": "business_entity",
            "op": {
                "load": {
                    "input": "data",
                    "name": "load",
                    "points": [
                        {
                            "args": {
                                "query": [
                                    {
                                        "kind": "query",
                                        "name": "fetch_detail",
                                        "orig": "fetch_detail",
                                        "type": "`$BOOLEAN`"
                                    },
                                    {
                                        "example": 25,
                                        "kind": "query",
                                        "name": "max_result",
                                        "orig": "max_result",
                                        "type": "`$INTEGER`"
                                    },
                                    {
                                        "example": "Apple Inc",
                                        "kind": "query",
                                        "name": "query",
                                        "orig": "query",
                                        "type": "`$STRING`"
                                    },
                                    {
                                        "kind": "query",
                                        "name": "state",
                                        "orig": "state",
                                        "type": "`$STRING`"
                                    }
                                ]
                            },
                            "kind": "http",
                            "method": "GET",
                            "orig": "/v1/business-entity/search",
                            "segments": [
                                {
                                    "lit": "v1"
                                },
                                {
                                    "lit": "business-entity"
                                },
                                {
                                    "lit": "search"
                                }
                            ],
                            "select": {
                                "$action": "search",
                                "exist": [
                                    "fetch_detail",
                                    "max_result",
                                    "query",
                                    "state"
                                ]
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "parts": [
                                "v1",
                                "business-entity",
                                "search"
                            ]
                        }
                    ]
                }
            },
            "relations": {
                "ancestors": []
            }
        },
        "irs_990": {
            "fields": [],
            "name": "irs_990",
            "op": {
                "load": {
                    "input": "data",
                    "name": "load",
                    "points": [
                        {
                            "args": {
                                "query": [
                                    {
                                        "kind": "query",
                                        "name": "ein",
                                        "orig": "ein",
                                        "type": "`$STRING`"
                                    },
                                    {
                                        "kind": "query",
                                        "name": "fetch_detail",
                                        "orig": "fetch_detail",
                                        "type": "`$BOOLEAN`"
                                    },
                                    {
                                        "example": 25,
                                        "kind": "query",
                                        "name": "max_result",
                                        "orig": "max_result",
                                        "type": "`$INTEGER`"
                                    },
                                    {
                                        "kind": "query",
                                        "name": "query",
                                        "orig": "query",
                                        "type": "`$STRING`"
                                    },
                                    {
                                        "kind": "query",
                                        "name": "state",
                                        "orig": "state",
                                        "type": "`$STRING`"
                                    }
                                ]
                            },
                            "kind": "http",
                            "method": "GET",
                            "orig": "/v1/irs-990/search",
                            "segments": [
                                {
                                    "lit": "v1"
                                },
                                {
                                    "lit": "irs-990"
                                },
                                {
                                    "lit": "search"
                                }
                            ],
                            "select": {
                                "$action": "search",
                                "exist": [
                                    "ein",
                                    "fetch_detail",
                                    "max_result",
                                    "query",
                                    "state"
                                ]
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "parts": [
                                "v1",
                                "irs-990",
                                "search"
                            ]
                        }
                    ]
                }
            },
            "relations": {
                "ancestors": []
            }
        },
        "sec_edgar": {
            "fields": [],
            "name": "sec_edgar",
            "op": {
                "load": {
                    "input": "data",
                    "name": "load",
                    "points": [
                        {
                            "args": {
                                "query": [
                                    {
                                        "kind": "query",
                                        "name": "cik",
                                        "orig": "cik",
                                        "type": "`$STRING`"
                                    },
                                    {
                                        "kind": "query",
                                        "name": "date_from",
                                        "orig": "date_from",
                                        "type": "`$STRING`"
                                    },
                                    {
                                        "kind": "query",
                                        "name": "date_to",
                                        "orig": "date_to",
                                        "type": "`$STRING`"
                                    },
                                    {
                                        "kind": "query",
                                        "name": "form_type",
                                        "orig": "form_type",
                                        "type": "`$STRING`"
                                    },
                                    {
                                        "example": 100,
                                        "kind": "query",
                                        "name": "max_filing",
                                        "orig": "max_filing",
                                        "type": "`$INTEGER`"
                                    },
                                    {
                                        "kind": "query",
                                        "name": "query",
                                        "orig": "query",
                                        "type": "`$STRING`"
                                    },
                                    {
                                        "kind": "query",
                                        "name": "ticker",
                                        "orig": "ticker",
                                        "type": "`$STRING`"
                                    }
                                ]
                            },
                            "kind": "http",
                            "method": "GET",
                            "orig": "/v1/sec-edgar/filings",
                            "segments": [
                                {
                                    "lit": "v1"
                                },
                                {
                                    "lit": "sec-edgar"
                                },
                                {
                                    "lit": "filings"
                                }
                            ],
                            "select": {
                                "$action": "filing",
                                "exist": [
                                    "cik",
                                    "date_from",
                                    "date_to",
                                    "form_type",
                                    "max_filing",
                                    "query",
                                    "ticker"
                                ]
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "parts": [
                                "v1",
                                "sec-edgar",
                                "filings"
                            ]
                        }
                    ]
                }
            },
            "relations": {
                "ancestors": []
            }
        },
        "stock_data": {
            "fields": [],
            "name": "stock_data",
            "op": {
                "load": {
                    "input": "data",
                    "name": "load",
                    "points": [
                        {
                            "args": {
                                "query": [
                                    {
                                        "example": "1d",
                                        "kind": "query",
                                        "name": "interval",
                                        "orig": "interval",
                                        "type": "`$STRING`"
                                    },
                                    {
                                        "example": "1mo",
                                        "kind": "query",
                                        "name": "range",
                                        "orig": "range",
                                        "type": "`$STRING`"
                                    },
                                    {
                                        "kind": "query",
                                        "name": "symbol",
                                        "orig": "symbol",
                                        "reqd": true,
                                        "type": "`$STRING`"
                                    }
                                ]
                            },
                            "kind": "http",
                            "method": "GET",
                            "orig": "/v1/stock/chart",
                            "segments": [
                                {
                                    "lit": "v1"
                                },
                                {
                                    "lit": "stock"
                                },
                                {
                                    "lit": "chart"
                                }
                            ],
                            "select": {
                                "exist": [
                                    "interval",
                                    "range",
                                    "symbol"
                                ]
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "parts": [
                                "v1",
                                "stock",
                                "chart"
                            ]
                        }
                    ]
                }
            },
            "relations": {
                "ancestors": []
            }
        },
        "whoi": {
            "fields": [],
            "name": "whoi",
            "op": {
                "load": {
                    "input": "data",
                    "name": "load",
                    "points": [
                        {
                            "args": {
                                "query": [
                                    {
                                        "example": "apple.com",
                                        "kind": "query",
                                        "name": "domain",
                                        "orig": "domain",
                                        "type": "`$STRING`"
                                    }
                                ]
                            },
                            "kind": "http",
                            "method": "GET",
                            "orig": "/v1/whois/lookup",
                            "segments": [
                                {
                                    "lit": "v1"
                                },
                                {
                                    "lit": "whois"
                                },
                                {
                                    "lit": "lookup"
                                }
                            ],
                            "select": {
                                "$action": "lookup",
                                "exist": [
                                    "domain"
                                ]
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "parts": [
                                "v1",
                                "whois",
                                "lookup"
                            ]
                        }
                    ]
                }
            },
            "relations": {
                "ancestors": []
            }
        },
        "x402_paid": {
            "fields": [],
            "name": "x402_paid",
            "op": {
                "load": {
                    "input": "data",
                    "name": "load",
                    "points": [
                        {
                            "args": {
                                "query": [
                                    {
                                        "kind": "query",
                                        "name": "cik",
                                        "orig": "cik",
                                        "type": "`$STRING`"
                                    },
                                    {
                                        "kind": "query",
                                        "name": "date_from",
                                        "orig": "date_from",
                                        "type": "`$STRING`"
                                    },
                                    {
                                        "kind": "query",
                                        "name": "date_to",
                                        "orig": "date_to",
                                        "type": "`$STRING`"
                                    },
                                    {
                                        "kind": "query",
                                        "name": "form_type",
                                        "orig": "form_type",
                                        "type": "`$STRING`"
                                    },
                                    {
                                        "example": 100,
                                        "kind": "query",
                                        "name": "max_filing",
                                        "orig": "max_filing",
                                        "type": "`$INTEGER`"
                                    },
                                    {
                                        "kind": "query",
                                        "name": "query",
                                        "orig": "query",
                                        "type": "`$STRING`"
                                    },
                                    {
                                        "kind": "query",
                                        "name": "ticker",
                                        "orig": "ticker",
                                        "type": "`$STRING`"
                                    }
                                ]
                            },
                            "kind": "http",
                            "method": "GET",
                            "orig": "/x402/v1/sec-edgar/filings",
                            "segments": [
                                {
                                    "lit": "x402"
                                },
                                {
                                    "lit": "v1"
                                },
                                {
                                    "lit": "sec-edgar"
                                },
                                {
                                    "lit": "filings"
                                }
                            ],
                            "select": {
                                "exist": [
                                    "cik",
                                    "date_from",
                                    "date_to",
                                    "form_type",
                                    "max_filing",
                                    "query",
                                    "ticker"
                                ]
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "parts": [
                                "x402",
                                "v1",
                                "sec-edgar",
                                "filings"
                            ]
                        },
                        {
                            "args": {
                                "query": [
                                    {
                                        "example": "austin",
                                        "kind": "query",
                                        "name": "city",
                                        "orig": "city",
                                        "type": "`$STRING`"
                                    },
                                    {
                                        "kind": "query",
                                        "name": "date_from",
                                        "orig": "date_from",
                                        "type": "`$STRING`"
                                    },
                                    {
                                        "kind": "query",
                                        "name": "date_to",
                                        "orig": "date_to",
                                        "type": "`$STRING`"
                                    },
                                    {
                                        "kind": "query",
                                        "name": "keyword",
                                        "orig": "keyword",
                                        "type": "`$STRING`"
                                    },
                                    {
                                        "example": 25,
                                        "kind": "query",
                                        "name": "max_result",
                                        "orig": "max_result",
                                        "type": "`$INTEGER`"
                                    },
                                    {
                                        "kind": "query",
                                        "name": "permit_type",
                                        "orig": "permit_type",
                                        "type": "`$STRING`"
                                    },
                                    {
                                        "kind": "query",
                                        "name": "query",
                                        "orig": "query",
                                        "type": "`$STRING`"
                                    }
                                ]
                            },
                            "kind": "http",
                            "method": "GET",
                            "orig": "/x402/v1/building-permits/search",
                            "segments": [
                                {
                                    "lit": "x402"
                                },
                                {
                                    "lit": "v1"
                                },
                                {
                                    "lit": "building-permits"
                                },
                                {
                                    "lit": "search"
                                }
                            ],
                            "select": {
                                "exist": [
                                    "city",
                                    "date_from",
                                    "date_to",
                                    "keyword",
                                    "max_result",
                                    "permit_type",
                                    "query"
                                ]
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "parts": [
                                "x402",
                                "v1",
                                "building-permits",
                                "search"
                            ]
                        },
                        {
                            "args": {
                                "query": [
                                    {
                                        "kind": "query",
                                        "name": "ein",
                                        "orig": "ein",
                                        "type": "`$STRING`"
                                    },
                                    {
                                        "kind": "query",
                                        "name": "fetch_detail",
                                        "orig": "fetch_detail",
                                        "type": "`$BOOLEAN`"
                                    },
                                    {
                                        "example": 25,
                                        "kind": "query",
                                        "name": "max_result",
                                        "orig": "max_result",
                                        "type": "`$INTEGER`"
                                    },
                                    {
                                        "kind": "query",
                                        "name": "query",
                                        "orig": "query",
                                        "type": "`$STRING`"
                                    },
                                    {
                                        "kind": "query",
                                        "name": "state",
                                        "orig": "state",
                                        "type": "`$STRING`"
                                    }
                                ]
                            },
                            "kind": "http",
                            "method": "GET",
                            "orig": "/x402/v1/irs-990/search",
                            "segments": [
                                {
                                    "lit": "x402"
                                },
                                {
                                    "lit": "v1"
                                },
                                {
                                    "lit": "irs-990"
                                },
                                {
                                    "lit": "search"
                                }
                            ],
                            "select": {
                                "exist": [
                                    "ein",
                                    "fetch_detail",
                                    "max_result",
                                    "query",
                                    "state"
                                ]
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "parts": [
                                "x402",
                                "v1",
                                "irs-990",
                                "search"
                            ]
                        },
                        {
                            "args": {
                                "query": [
                                    {
                                        "kind": "query",
                                        "name": "fetch_detail",
                                        "orig": "fetch_detail",
                                        "type": "`$BOOLEAN`"
                                    },
                                    {
                                        "example": 25,
                                        "kind": "query",
                                        "name": "max_result",
                                        "orig": "max_result",
                                        "type": "`$INTEGER`"
                                    },
                                    {
                                        "example": "Apple Inc",
                                        "kind": "query",
                                        "name": "query",
                                        "orig": "query",
                                        "type": "`$STRING`"
                                    },
                                    {
                                        "kind": "query",
                                        "name": "state",
                                        "orig": "state",
                                        "type": "`$STRING`"
                                    }
                                ]
                            },
                            "kind": "http",
                            "method": "GET",
                            "orig": "/x402/v1/business-entity/search",
                            "segments": [
                                {
                                    "lit": "x402"
                                },
                                {
                                    "lit": "v1"
                                },
                                {
                                    "lit": "business-entity"
                                },
                                {
                                    "lit": "search"
                                }
                            ],
                            "select": {
                                "exist": [
                                    "fetch_detail",
                                    "max_result",
                                    "query",
                                    "state"
                                ]
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "parts": [
                                "x402",
                                "v1",
                                "business-entity",
                                "search"
                            ]
                        },
                        {
                            "args": {
                                "query": [
                                    {
                                        "example": "apple.com",
                                        "kind": "query",
                                        "name": "domain",
                                        "orig": "domain",
                                        "type": "`$STRING`"
                                    }
                                ]
                            },
                            "kind": "http",
                            "method": "GET",
                            "orig": "/x402/v1/whois/lookup",
                            "segments": [
                                {
                                    "lit": "x402"
                                },
                                {
                                    "lit": "v1"
                                },
                                {
                                    "lit": "whois"
                                },
                                {
                                    "lit": "lookup"
                                }
                            ],
                            "select": {
                                "exist": [
                                    "domain"
                                ]
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "parts": [
                                "x402",
                                "v1",
                                "whois",
                                "lookup"
                            ]
                        }
                    ]
                }
            },
            "relations": {
                "ancestors": []
            }
        }
    };
}
const config = new Config();
exports.config = config;
//# sourceMappingURL=Config.js.map