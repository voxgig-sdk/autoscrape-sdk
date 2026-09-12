# Autoscrape SDK configuration

module AutoscrapeConfig
  # Return the process-wide config, built once on first use. The SDK reads
  # the config on every request and never writes to it, so one instance is
  # shared by every client rather than rebuilt per client.
  #
  # The returned hash is shared: treat it as read-only. Callers that need to
  # mutate should use make_config, which always returns a fresh copy.
  def self.shared_config
    @shared_config ||= make_config
  end


  # Build a fresh, fully materialised config hash. Every call rebuilds the
  # whole structure, so prefer shared_config unless you need a private copy
  # you intend to mutate.
  def self.make_config
    {
      "main" => {
        "name" => "Autoscrape",
        "slug" => "autoscrape",
        "version" => "0.0.1",
        "target" => "rb",
      },
      "feature" => {
        "test" => {
          "options" => {
            "active" => false,
          },
          "transport" => "base",
        },
      },
      "options" => {
        "base" => "https://autoscrape-api-seven.vercel.app",
        "headers" => {
          "content-type" => "application/json",
        },
        "entity" => {
          "building_permit" => {},
          "business_entity" => {},
          "irs_990" => {},
          "sec_edgar" => {},
          "stock_data" => {},
          "whoi" => {},
          "x402_paid" => {},
        },
      },
      "entity" => {
        "building_permit" => {
          "fields" => [],
          "name" => "building_permit",
          "op" => {
            "load" => {
              "input" => "data",
              "name" => "load",
              "points" => [
                {
                  "args" => {
                    "query" => [
                      {
                        "example" => "austin",
                        "kind" => "query",
                        "name" => "city",
                        "orig" => "city",
                        "type" => "`$STRING`",
                      },
                      {
                        "kind" => "query",
                        "name" => "date_from",
                        "orig" => "date_from",
                        "type" => "`$STRING`",
                      },
                      {
                        "kind" => "query",
                        "name" => "date_to",
                        "orig" => "date_to",
                        "type" => "`$STRING`",
                      },
                      {
                        "kind" => "query",
                        "name" => "keyword",
                        "orig" => "keyword",
                        "type" => "`$STRING`",
                      },
                      {
                        "example" => 25,
                        "kind" => "query",
                        "name" => "max_result",
                        "orig" => "max_result",
                        "type" => "`$INTEGER`",
                      },
                      {
                        "kind" => "query",
                        "name" => "permit_type",
                        "orig" => "permit_type",
                        "type" => "`$STRING`",
                      },
                      {
                        "kind" => "query",
                        "name" => "query",
                        "orig" => "query",
                        "type" => "`$STRING`",
                      },
                    ],
                  },
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/v1/building-permits/search",
                  "segments" => [
                    {
                      "lit" => "v1",
                    },
                    {
                      "lit" => "building-permits",
                    },
                    {
                      "lit" => "search",
                    },
                  ],
                  "select" => {
                    "$action" => "search",
                    "exist" => [
                      "city",
                      "date_from",
                      "date_to",
                      "keyword",
                      "max_result",
                      "permit_type",
                      "query",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "parts" => [
                    "v1",
                    "building-permits",
                    "search",
                  ],
                },
              ],
            },
          },
          "relations" => {
            "ancestors" => [],
          },
        },
        "business_entity" => {
          "fields" => [],
          "name" => "business_entity",
          "op" => {
            "load" => {
              "input" => "data",
              "name" => "load",
              "points" => [
                {
                  "args" => {
                    "query" => [
                      {
                        "kind" => "query",
                        "name" => "fetch_detail",
                        "orig" => "fetch_detail",
                        "type" => "`$BOOLEAN`",
                      },
                      {
                        "example" => 25,
                        "kind" => "query",
                        "name" => "max_result",
                        "orig" => "max_result",
                        "type" => "`$INTEGER`",
                      },
                      {
                        "example" => "Apple Inc",
                        "kind" => "query",
                        "name" => "query",
                        "orig" => "query",
                        "type" => "`$STRING`",
                      },
                      {
                        "kind" => "query",
                        "name" => "state",
                        "orig" => "state",
                        "type" => "`$STRING`",
                      },
                    ],
                  },
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/v1/business-entity/search",
                  "segments" => [
                    {
                      "lit" => "v1",
                    },
                    {
                      "lit" => "business-entity",
                    },
                    {
                      "lit" => "search",
                    },
                  ],
                  "select" => {
                    "$action" => "search",
                    "exist" => [
                      "fetch_detail",
                      "max_result",
                      "query",
                      "state",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "parts" => [
                    "v1",
                    "business-entity",
                    "search",
                  ],
                },
              ],
            },
          },
          "relations" => {
            "ancestors" => [],
          },
        },
        "irs_990" => {
          "fields" => [],
          "name" => "irs_990",
          "op" => {
            "load" => {
              "input" => "data",
              "name" => "load",
              "points" => [
                {
                  "args" => {
                    "query" => [
                      {
                        "kind" => "query",
                        "name" => "ein",
                        "orig" => "ein",
                        "type" => "`$STRING`",
                      },
                      {
                        "kind" => "query",
                        "name" => "fetch_detail",
                        "orig" => "fetch_detail",
                        "type" => "`$BOOLEAN`",
                      },
                      {
                        "example" => 25,
                        "kind" => "query",
                        "name" => "max_result",
                        "orig" => "max_result",
                        "type" => "`$INTEGER`",
                      },
                      {
                        "kind" => "query",
                        "name" => "query",
                        "orig" => "query",
                        "type" => "`$STRING`",
                      },
                      {
                        "kind" => "query",
                        "name" => "state",
                        "orig" => "state",
                        "type" => "`$STRING`",
                      },
                    ],
                  },
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/v1/irs-990/search",
                  "segments" => [
                    {
                      "lit" => "v1",
                    },
                    {
                      "lit" => "irs-990",
                    },
                    {
                      "lit" => "search",
                    },
                  ],
                  "select" => {
                    "$action" => "search",
                    "exist" => [
                      "ein",
                      "fetch_detail",
                      "max_result",
                      "query",
                      "state",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "parts" => [
                    "v1",
                    "irs-990",
                    "search",
                  ],
                },
              ],
            },
          },
          "relations" => {
            "ancestors" => [],
          },
        },
        "sec_edgar" => {
          "fields" => [],
          "name" => "sec_edgar",
          "op" => {
            "load" => {
              "input" => "data",
              "name" => "load",
              "points" => [
                {
                  "args" => {
                    "query" => [
                      {
                        "kind" => "query",
                        "name" => "cik",
                        "orig" => "cik",
                        "type" => "`$STRING`",
                      },
                      {
                        "kind" => "query",
                        "name" => "date_from",
                        "orig" => "date_from",
                        "type" => "`$STRING`",
                      },
                      {
                        "kind" => "query",
                        "name" => "date_to",
                        "orig" => "date_to",
                        "type" => "`$STRING`",
                      },
                      {
                        "kind" => "query",
                        "name" => "form_type",
                        "orig" => "form_type",
                        "type" => "`$STRING`",
                      },
                      {
                        "example" => 100,
                        "kind" => "query",
                        "name" => "max_filing",
                        "orig" => "max_filing",
                        "type" => "`$INTEGER`",
                      },
                      {
                        "kind" => "query",
                        "name" => "query",
                        "orig" => "query",
                        "type" => "`$STRING`",
                      },
                      {
                        "kind" => "query",
                        "name" => "ticker",
                        "orig" => "ticker",
                        "type" => "`$STRING`",
                      },
                    ],
                  },
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/v1/sec-edgar/filings",
                  "segments" => [
                    {
                      "lit" => "v1",
                    },
                    {
                      "lit" => "sec-edgar",
                    },
                    {
                      "lit" => "filings",
                    },
                  ],
                  "select" => {
                    "$action" => "filing",
                    "exist" => [
                      "cik",
                      "date_from",
                      "date_to",
                      "form_type",
                      "max_filing",
                      "query",
                      "ticker",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "parts" => [
                    "v1",
                    "sec-edgar",
                    "filings",
                  ],
                },
              ],
            },
          },
          "relations" => {
            "ancestors" => [],
          },
        },
        "stock_data" => {
          "fields" => [],
          "name" => "stock_data",
          "op" => {
            "load" => {
              "input" => "data",
              "name" => "load",
              "points" => [
                {
                  "args" => {
                    "query" => [
                      {
                        "example" => "1d",
                        "kind" => "query",
                        "name" => "interval",
                        "orig" => "interval",
                        "type" => "`$STRING`",
                      },
                      {
                        "example" => "1mo",
                        "kind" => "query",
                        "name" => "range",
                        "orig" => "range",
                        "type" => "`$STRING`",
                      },
                      {
                        "kind" => "query",
                        "name" => "symbol",
                        "orig" => "symbol",
                        "reqd" => true,
                        "type" => "`$STRING`",
                      },
                    ],
                  },
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/v1/stock/chart",
                  "segments" => [
                    {
                      "lit" => "v1",
                    },
                    {
                      "lit" => "stock",
                    },
                    {
                      "lit" => "chart",
                    },
                  ],
                  "select" => {
                    "exist" => [
                      "interval",
                      "range",
                      "symbol",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "parts" => [
                    "v1",
                    "stock",
                    "chart",
                  ],
                },
              ],
            },
          },
          "relations" => {
            "ancestors" => [],
          },
        },
        "whoi" => {
          "fields" => [],
          "name" => "whoi",
          "op" => {
            "load" => {
              "input" => "data",
              "name" => "load",
              "points" => [
                {
                  "args" => {
                    "query" => [
                      {
                        "example" => "apple.com",
                        "kind" => "query",
                        "name" => "domain",
                        "orig" => "domain",
                        "type" => "`$STRING`",
                      },
                    ],
                  },
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/v1/whois/lookup",
                  "segments" => [
                    {
                      "lit" => "v1",
                    },
                    {
                      "lit" => "whois",
                    },
                    {
                      "lit" => "lookup",
                    },
                  ],
                  "select" => {
                    "$action" => "lookup",
                    "exist" => [
                      "domain",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "parts" => [
                    "v1",
                    "whois",
                    "lookup",
                  ],
                },
              ],
            },
          },
          "relations" => {
            "ancestors" => [],
          },
        },
        "x402_paid" => {
          "fields" => [],
          "name" => "x402_paid",
          "op" => {
            "load" => {
              "input" => "data",
              "name" => "load",
              "points" => [
                {
                  "args" => {
                    "query" => [
                      {
                        "kind" => "query",
                        "name" => "cik",
                        "orig" => "cik",
                        "type" => "`$STRING`",
                      },
                      {
                        "kind" => "query",
                        "name" => "date_from",
                        "orig" => "date_from",
                        "type" => "`$STRING`",
                      },
                      {
                        "kind" => "query",
                        "name" => "date_to",
                        "orig" => "date_to",
                        "type" => "`$STRING`",
                      },
                      {
                        "kind" => "query",
                        "name" => "form_type",
                        "orig" => "form_type",
                        "type" => "`$STRING`",
                      },
                      {
                        "example" => 100,
                        "kind" => "query",
                        "name" => "max_filing",
                        "orig" => "max_filing",
                        "type" => "`$INTEGER`",
                      },
                      {
                        "kind" => "query",
                        "name" => "query",
                        "orig" => "query",
                        "type" => "`$STRING`",
                      },
                      {
                        "kind" => "query",
                        "name" => "ticker",
                        "orig" => "ticker",
                        "type" => "`$STRING`",
                      },
                    ],
                  },
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/x402/v1/sec-edgar/filings",
                  "segments" => [
                    {
                      "lit" => "x402",
                    },
                    {
                      "lit" => "v1",
                    },
                    {
                      "lit" => "sec-edgar",
                    },
                    {
                      "lit" => "filings",
                    },
                  ],
                  "select" => {
                    "exist" => [
                      "cik",
                      "date_from",
                      "date_to",
                      "form_type",
                      "max_filing",
                      "query",
                      "ticker",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "parts" => [
                    "x402",
                    "v1",
                    "sec-edgar",
                    "filings",
                  ],
                },
                {
                  "args" => {
                    "query" => [
                      {
                        "example" => "austin",
                        "kind" => "query",
                        "name" => "city",
                        "orig" => "city",
                        "type" => "`$STRING`",
                      },
                      {
                        "kind" => "query",
                        "name" => "date_from",
                        "orig" => "date_from",
                        "type" => "`$STRING`",
                      },
                      {
                        "kind" => "query",
                        "name" => "date_to",
                        "orig" => "date_to",
                        "type" => "`$STRING`",
                      },
                      {
                        "kind" => "query",
                        "name" => "keyword",
                        "orig" => "keyword",
                        "type" => "`$STRING`",
                      },
                      {
                        "example" => 25,
                        "kind" => "query",
                        "name" => "max_result",
                        "orig" => "max_result",
                        "type" => "`$INTEGER`",
                      },
                      {
                        "kind" => "query",
                        "name" => "permit_type",
                        "orig" => "permit_type",
                        "type" => "`$STRING`",
                      },
                      {
                        "kind" => "query",
                        "name" => "query",
                        "orig" => "query",
                        "type" => "`$STRING`",
                      },
                    ],
                  },
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/x402/v1/building-permits/search",
                  "segments" => [
                    {
                      "lit" => "x402",
                    },
                    {
                      "lit" => "v1",
                    },
                    {
                      "lit" => "building-permits",
                    },
                    {
                      "lit" => "search",
                    },
                  ],
                  "select" => {
                    "exist" => [
                      "city",
                      "date_from",
                      "date_to",
                      "keyword",
                      "max_result",
                      "permit_type",
                      "query",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "parts" => [
                    "x402",
                    "v1",
                    "building-permits",
                    "search",
                  ],
                },
                {
                  "args" => {
                    "query" => [
                      {
                        "kind" => "query",
                        "name" => "ein",
                        "orig" => "ein",
                        "type" => "`$STRING`",
                      },
                      {
                        "kind" => "query",
                        "name" => "fetch_detail",
                        "orig" => "fetch_detail",
                        "type" => "`$BOOLEAN`",
                      },
                      {
                        "example" => 25,
                        "kind" => "query",
                        "name" => "max_result",
                        "orig" => "max_result",
                        "type" => "`$INTEGER`",
                      },
                      {
                        "kind" => "query",
                        "name" => "query",
                        "orig" => "query",
                        "type" => "`$STRING`",
                      },
                      {
                        "kind" => "query",
                        "name" => "state",
                        "orig" => "state",
                        "type" => "`$STRING`",
                      },
                    ],
                  },
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/x402/v1/irs-990/search",
                  "segments" => [
                    {
                      "lit" => "x402",
                    },
                    {
                      "lit" => "v1",
                    },
                    {
                      "lit" => "irs-990",
                    },
                    {
                      "lit" => "search",
                    },
                  ],
                  "select" => {
                    "exist" => [
                      "ein",
                      "fetch_detail",
                      "max_result",
                      "query",
                      "state",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "parts" => [
                    "x402",
                    "v1",
                    "irs-990",
                    "search",
                  ],
                },
                {
                  "args" => {
                    "query" => [
                      {
                        "kind" => "query",
                        "name" => "fetch_detail",
                        "orig" => "fetch_detail",
                        "type" => "`$BOOLEAN`",
                      },
                      {
                        "example" => 25,
                        "kind" => "query",
                        "name" => "max_result",
                        "orig" => "max_result",
                        "type" => "`$INTEGER`",
                      },
                      {
                        "example" => "Apple Inc",
                        "kind" => "query",
                        "name" => "query",
                        "orig" => "query",
                        "type" => "`$STRING`",
                      },
                      {
                        "kind" => "query",
                        "name" => "state",
                        "orig" => "state",
                        "type" => "`$STRING`",
                      },
                    ],
                  },
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/x402/v1/business-entity/search",
                  "segments" => [
                    {
                      "lit" => "x402",
                    },
                    {
                      "lit" => "v1",
                    },
                    {
                      "lit" => "business-entity",
                    },
                    {
                      "lit" => "search",
                    },
                  ],
                  "select" => {
                    "exist" => [
                      "fetch_detail",
                      "max_result",
                      "query",
                      "state",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "parts" => [
                    "x402",
                    "v1",
                    "business-entity",
                    "search",
                  ],
                },
                {
                  "args" => {
                    "query" => [
                      {
                        "example" => "apple.com",
                        "kind" => "query",
                        "name" => "domain",
                        "orig" => "domain",
                        "type" => "`$STRING`",
                      },
                    ],
                  },
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/x402/v1/whois/lookup",
                  "segments" => [
                    {
                      "lit" => "x402",
                    },
                    {
                      "lit" => "v1",
                    },
                    {
                      "lit" => "whois",
                    },
                    {
                      "lit" => "lookup",
                    },
                  ],
                  "select" => {
                    "exist" => [
                      "domain",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "parts" => [
                    "x402",
                    "v1",
                    "whois",
                    "lookup",
                  ],
                },
              ],
            },
          },
          "relations" => {
            "ancestors" => [],
          },
        },
      },
    }
  end


  def self.make_feature(name)
    require_relative 'features'
    AutoscrapeFeatures.make_feature(name)
  end
end
