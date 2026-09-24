-- Autoscrape SDK configuration

-- Build a fresh, fully materialised config table. Every call rebuilds the
-- whole structure, so prefer require("config_shared") unless you need a
-- private copy you intend to mutate.
local function make_config()
  return {
    main = {
      name = "Autoscrape",
      slug = "autoscrape",
      version = "0.0.1",
      target = "lua",
    },
    feature = {
      ["ratelimit"] = {
        ["options"] = {
          ["active"] = false,
          ["burst"] = 5,
          ["rate"] = 5,
        },
        ["optspec"] = {
          ["now"] = "`$FUNCTION`",
          ["sleep"] = "`$FUNCTION`",
        },
        ["strict"] = false,
        ["transport"] = "wrap",
      },
      ["retry"] = {
        ["options"] = {
          ["active"] = false,
          ["factor"] = 2,
          ["maxDelay"] = 2000,
          ["minDelay"] = 50,
          ["retries"] = 2,
          ["statuses"] = {
            408,
            425,
            429,
            500,
            502,
            503,
            504,
          },
        },
        ["optspec"] = {
          ["jitter"] = "`$BOOLEAN`",
          ["sleep"] = "`$FUNCTION`",
        },
        ["strict"] = false,
        ["transport"] = "wrap",
      },
      ["test"] = {
        ["options"] = {
          ["active"] = false,
        },
        ["optspec"] = {
          ["entity"] = "`$MAP`",
          ["net"] = "`$MAP`",
        },
        ["strict"] = false,
        ["transport"] = "base",
      },
      ["timeout"] = {
        ["options"] = {
          ["active"] = false,
          ["ms"] = 30000,
        },
        ["optspec"] = {
          ["clearTimer"] = "`$FUNCTION`",
          ["setTimer"] = "`$FUNCTION`",
        },
        ["strict"] = false,
        ["transport"] = "wrap",
      },
    },
    options = {
      base = "https://autoscrape-api-seven.vercel.app",
      headers = {
        ["content-type"] = "application/json",
      },
      entity = {
        ["building_permit"] = {},
        ["business_entity"] = {},
        ["irs_990"] = {},
        ["sec_edgar"] = {},
        ["stock_data"] = {},
        ["whoi"] = {},
        ["x402_paid"] = {},
      },
    },
    entity = {
      ["building_permit"] = {
        ["fields"] = {},
        ["name"] = "building_permit",
        ["op"] = {
          ["load"] = {
            ["input"] = "data",
            ["name"] = "load",
            ["points"] = {
              {
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/v1/building-permits/search",
                ["segments"] = {
                  {
                    ["lit"] = "v1",
                  },
                  {
                    ["lit"] = "building-permits",
                  },
                  {
                    ["lit"] = "search",
                  },
                },
                ["parts"] = {
                  "v1",
                  "building-permits",
                  "search",
                },
                ["rename"] = {},
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["args"] = {
                  ["query"] = {
                    {
                      ["name"] = "city",
                      ["orig"] = "city",
                      ["type"] = "`$STRING`",
                      ["kind"] = "query",
                      ["example"] = "austin",
                    },
                    {
                      ["name"] = "date_from",
                      ["orig"] = "date_from",
                      ["type"] = "`$STRING`",
                      ["kind"] = "query",
                    },
                    {
                      ["name"] = "date_to",
                      ["orig"] = "date_to",
                      ["type"] = "`$STRING`",
                      ["kind"] = "query",
                    },
                    {
                      ["name"] = "keyword",
                      ["orig"] = "keyword",
                      ["type"] = "`$STRING`",
                      ["kind"] = "query",
                    },
                    {
                      ["name"] = "max_result",
                      ["orig"] = "max_result",
                      ["type"] = "`$INTEGER`",
                      ["kind"] = "query",
                      ["example"] = 25,
                    },
                    {
                      ["name"] = "permit_type",
                      ["orig"] = "permit_type",
                      ["type"] = "`$STRING`",
                      ["kind"] = "query",
                    },
                    {
                      ["name"] = "query",
                      ["orig"] = "query",
                      ["type"] = "`$STRING`",
                      ["kind"] = "query",
                    },
                  },
                },
                ["select"] = {
                  ["$action"] = "search",
                  ["exist"] = {
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
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
      ["business_entity"] = {
        ["fields"] = {},
        ["name"] = "business_entity",
        ["op"] = {
          ["load"] = {
            ["input"] = "data",
            ["name"] = "load",
            ["points"] = {
              {
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/v1/business-entity/search",
                ["segments"] = {
                  {
                    ["lit"] = "v1",
                  },
                  {
                    ["lit"] = "business-entity",
                  },
                  {
                    ["lit"] = "search",
                  },
                },
                ["parts"] = {
                  "v1",
                  "business-entity",
                  "search",
                },
                ["rename"] = {},
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["args"] = {
                  ["query"] = {
                    {
                      ["name"] = "fetch_detail",
                      ["orig"] = "fetch_detail",
                      ["type"] = "`$BOOLEAN`",
                      ["kind"] = "query",
                    },
                    {
                      ["name"] = "max_result",
                      ["orig"] = "max_result",
                      ["type"] = "`$INTEGER`",
                      ["kind"] = "query",
                      ["example"] = 25,
                    },
                    {
                      ["name"] = "query",
                      ["orig"] = "query",
                      ["type"] = "`$STRING`",
                      ["kind"] = "query",
                      ["example"] = "Apple Inc",
                    },
                    {
                      ["name"] = "state",
                      ["orig"] = "state",
                      ["type"] = "`$STRING`",
                      ["kind"] = "query",
                    },
                  },
                },
                ["select"] = {
                  ["$action"] = "search",
                  ["exist"] = {
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
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
      ["irs_990"] = {
        ["fields"] = {},
        ["name"] = "irs_990",
        ["op"] = {
          ["load"] = {
            ["input"] = "data",
            ["name"] = "load",
            ["points"] = {
              {
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/v1/irs-990/search",
                ["segments"] = {
                  {
                    ["lit"] = "v1",
                  },
                  {
                    ["lit"] = "irs-990",
                  },
                  {
                    ["lit"] = "search",
                  },
                },
                ["parts"] = {
                  "v1",
                  "irs-990",
                  "search",
                },
                ["rename"] = {},
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["args"] = {
                  ["query"] = {
                    {
                      ["name"] = "ein",
                      ["orig"] = "ein",
                      ["type"] = "`$STRING`",
                      ["kind"] = "query",
                    },
                    {
                      ["name"] = "fetch_detail",
                      ["orig"] = "fetch_detail",
                      ["type"] = "`$BOOLEAN`",
                      ["kind"] = "query",
                    },
                    {
                      ["name"] = "max_result",
                      ["orig"] = "max_result",
                      ["type"] = "`$INTEGER`",
                      ["kind"] = "query",
                      ["example"] = 25,
                    },
                    {
                      ["name"] = "query",
                      ["orig"] = "query",
                      ["type"] = "`$STRING`",
                      ["kind"] = "query",
                    },
                    {
                      ["name"] = "state",
                      ["orig"] = "state",
                      ["type"] = "`$STRING`",
                      ["kind"] = "query",
                    },
                  },
                },
                ["select"] = {
                  ["$action"] = "search",
                  ["exist"] = {
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
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
      ["sec_edgar"] = {
        ["fields"] = {},
        ["name"] = "sec_edgar",
        ["op"] = {
          ["load"] = {
            ["input"] = "data",
            ["name"] = "load",
            ["points"] = {
              {
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/v1/sec-edgar/filings",
                ["segments"] = {
                  {
                    ["lit"] = "v1",
                  },
                  {
                    ["lit"] = "sec-edgar",
                  },
                  {
                    ["lit"] = "filings",
                  },
                },
                ["parts"] = {
                  "v1",
                  "sec-edgar",
                  "filings",
                },
                ["rename"] = {},
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["args"] = {
                  ["query"] = {
                    {
                      ["name"] = "cik",
                      ["orig"] = "cik",
                      ["type"] = "`$STRING`",
                      ["kind"] = "query",
                    },
                    {
                      ["name"] = "date_from",
                      ["orig"] = "date_from",
                      ["type"] = "`$STRING`",
                      ["kind"] = "query",
                    },
                    {
                      ["name"] = "date_to",
                      ["orig"] = "date_to",
                      ["type"] = "`$STRING`",
                      ["kind"] = "query",
                    },
                    {
                      ["name"] = "form_type",
                      ["orig"] = "form_type",
                      ["type"] = "`$STRING`",
                      ["kind"] = "query",
                    },
                    {
                      ["name"] = "max_filing",
                      ["orig"] = "max_filing",
                      ["type"] = "`$INTEGER`",
                      ["kind"] = "query",
                      ["example"] = 100,
                    },
                    {
                      ["name"] = "query",
                      ["orig"] = "query",
                      ["type"] = "`$STRING`",
                      ["kind"] = "query",
                    },
                    {
                      ["name"] = "ticker",
                      ["orig"] = "ticker",
                      ["type"] = "`$STRING`",
                      ["kind"] = "query",
                    },
                  },
                },
                ["select"] = {
                  ["$action"] = "filing",
                  ["exist"] = {
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
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
      ["stock_data"] = {
        ["fields"] = {},
        ["name"] = "stock_data",
        ["op"] = {
          ["load"] = {
            ["input"] = "data",
            ["name"] = "load",
            ["points"] = {
              {
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/v1/stock/chart",
                ["segments"] = {
                  {
                    ["lit"] = "v1",
                  },
                  {
                    ["lit"] = "stock",
                  },
                  {
                    ["lit"] = "chart",
                  },
                },
                ["parts"] = {
                  "v1",
                  "stock",
                  "chart",
                },
                ["rename"] = {},
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["args"] = {
                  ["query"] = {
                    {
                      ["name"] = "interval",
                      ["orig"] = "interval",
                      ["type"] = "`$STRING`",
                      ["kind"] = "query",
                      ["example"] = "1d",
                    },
                    {
                      ["name"] = "range",
                      ["orig"] = "range",
                      ["type"] = "`$STRING`",
                      ["kind"] = "query",
                      ["example"] = "1mo",
                    },
                    {
                      ["name"] = "symbol",
                      ["orig"] = "symbol",
                      ["type"] = "`$STRING`",
                      ["kind"] = "query",
                      ["reqd"] = true,
                    },
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "interval",
                    "range",
                    "symbol",
                  },
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
      ["whoi"] = {
        ["fields"] = {},
        ["name"] = "whoi",
        ["op"] = {
          ["load"] = {
            ["input"] = "data",
            ["name"] = "load",
            ["points"] = {
              {
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/v1/whois/lookup",
                ["segments"] = {
                  {
                    ["lit"] = "v1",
                  },
                  {
                    ["lit"] = "whois",
                  },
                  {
                    ["lit"] = "lookup",
                  },
                },
                ["parts"] = {
                  "v1",
                  "whois",
                  "lookup",
                },
                ["rename"] = {},
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["args"] = {
                  ["query"] = {
                    {
                      ["name"] = "domain",
                      ["orig"] = "domain",
                      ["type"] = "`$STRING`",
                      ["kind"] = "query",
                      ["example"] = "apple.com",
                    },
                  },
                },
                ["select"] = {
                  ["$action"] = "lookup",
                  ["exist"] = {
                    "domain",
                  },
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
      ["x402_paid"] = {
        ["fields"] = {},
        ["name"] = "x402_paid",
        ["op"] = {
          ["load"] = {
            ["input"] = "data",
            ["name"] = "load",
            ["points"] = {
              {
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/x402/v1/sec-edgar/filings",
                ["segments"] = {
                  {
                    ["lit"] = "x402",
                  },
                  {
                    ["lit"] = "v1",
                  },
                  {
                    ["lit"] = "sec-edgar",
                  },
                  {
                    ["lit"] = "filings",
                  },
                },
                ["parts"] = {
                  "x402",
                  "v1",
                  "sec-edgar",
                  "filings",
                },
                ["rename"] = {},
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["args"] = {
                  ["query"] = {
                    {
                      ["name"] = "cik",
                      ["orig"] = "cik",
                      ["type"] = "`$STRING`",
                      ["kind"] = "query",
                    },
                    {
                      ["name"] = "date_from",
                      ["orig"] = "date_from",
                      ["type"] = "`$STRING`",
                      ["kind"] = "query",
                    },
                    {
                      ["name"] = "date_to",
                      ["orig"] = "date_to",
                      ["type"] = "`$STRING`",
                      ["kind"] = "query",
                    },
                    {
                      ["name"] = "form_type",
                      ["orig"] = "form_type",
                      ["type"] = "`$STRING`",
                      ["kind"] = "query",
                    },
                    {
                      ["name"] = "max_filing",
                      ["orig"] = "max_filing",
                      ["type"] = "`$INTEGER`",
                      ["kind"] = "query",
                      ["example"] = 100,
                    },
                    {
                      ["name"] = "query",
                      ["orig"] = "query",
                      ["type"] = "`$STRING`",
                      ["kind"] = "query",
                    },
                    {
                      ["name"] = "ticker",
                      ["orig"] = "ticker",
                      ["type"] = "`$STRING`",
                      ["kind"] = "query",
                    },
                  },
                },
                ["select"] = {
                  ["exist"] = {
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
              {
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/x402/v1/building-permits/search",
                ["segments"] = {
                  {
                    ["lit"] = "x402",
                  },
                  {
                    ["lit"] = "v1",
                  },
                  {
                    ["lit"] = "building-permits",
                  },
                  {
                    ["lit"] = "search",
                  },
                },
                ["parts"] = {
                  "x402",
                  "v1",
                  "building-permits",
                  "search",
                },
                ["rename"] = {},
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["args"] = {
                  ["query"] = {
                    {
                      ["name"] = "city",
                      ["orig"] = "city",
                      ["type"] = "`$STRING`",
                      ["kind"] = "query",
                      ["example"] = "austin",
                    },
                    {
                      ["name"] = "date_from",
                      ["orig"] = "date_from",
                      ["type"] = "`$STRING`",
                      ["kind"] = "query",
                    },
                    {
                      ["name"] = "date_to",
                      ["orig"] = "date_to",
                      ["type"] = "`$STRING`",
                      ["kind"] = "query",
                    },
                    {
                      ["name"] = "keyword",
                      ["orig"] = "keyword",
                      ["type"] = "`$STRING`",
                      ["kind"] = "query",
                    },
                    {
                      ["name"] = "max_result",
                      ["orig"] = "max_result",
                      ["type"] = "`$INTEGER`",
                      ["kind"] = "query",
                      ["example"] = 25,
                    },
                    {
                      ["name"] = "permit_type",
                      ["orig"] = "permit_type",
                      ["type"] = "`$STRING`",
                      ["kind"] = "query",
                    },
                    {
                      ["name"] = "query",
                      ["orig"] = "query",
                      ["type"] = "`$STRING`",
                      ["kind"] = "query",
                    },
                  },
                },
                ["select"] = {
                  ["exist"] = {
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
              {
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/x402/v1/irs-990/search",
                ["segments"] = {
                  {
                    ["lit"] = "x402",
                  },
                  {
                    ["lit"] = "v1",
                  },
                  {
                    ["lit"] = "irs-990",
                  },
                  {
                    ["lit"] = "search",
                  },
                },
                ["parts"] = {
                  "x402",
                  "v1",
                  "irs-990",
                  "search",
                },
                ["rename"] = {},
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["args"] = {
                  ["query"] = {
                    {
                      ["name"] = "ein",
                      ["orig"] = "ein",
                      ["type"] = "`$STRING`",
                      ["kind"] = "query",
                    },
                    {
                      ["name"] = "fetch_detail",
                      ["orig"] = "fetch_detail",
                      ["type"] = "`$BOOLEAN`",
                      ["kind"] = "query",
                    },
                    {
                      ["name"] = "max_result",
                      ["orig"] = "max_result",
                      ["type"] = "`$INTEGER`",
                      ["kind"] = "query",
                      ["example"] = 25,
                    },
                    {
                      ["name"] = "query",
                      ["orig"] = "query",
                      ["type"] = "`$STRING`",
                      ["kind"] = "query",
                    },
                    {
                      ["name"] = "state",
                      ["orig"] = "state",
                      ["type"] = "`$STRING`",
                      ["kind"] = "query",
                    },
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "ein",
                    "fetch_detail",
                    "max_result",
                    "query",
                    "state",
                  },
                },
              },
              {
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/x402/v1/business-entity/search",
                ["segments"] = {
                  {
                    ["lit"] = "x402",
                  },
                  {
                    ["lit"] = "v1",
                  },
                  {
                    ["lit"] = "business-entity",
                  },
                  {
                    ["lit"] = "search",
                  },
                },
                ["parts"] = {
                  "x402",
                  "v1",
                  "business-entity",
                  "search",
                },
                ["rename"] = {},
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["args"] = {
                  ["query"] = {
                    {
                      ["name"] = "fetch_detail",
                      ["orig"] = "fetch_detail",
                      ["type"] = "`$BOOLEAN`",
                      ["kind"] = "query",
                    },
                    {
                      ["name"] = "max_result",
                      ["orig"] = "max_result",
                      ["type"] = "`$INTEGER`",
                      ["kind"] = "query",
                      ["example"] = 25,
                    },
                    {
                      ["name"] = "query",
                      ["orig"] = "query",
                      ["type"] = "`$STRING`",
                      ["kind"] = "query",
                      ["example"] = "Apple Inc",
                    },
                    {
                      ["name"] = "state",
                      ["orig"] = "state",
                      ["type"] = "`$STRING`",
                      ["kind"] = "query",
                    },
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "fetch_detail",
                    "max_result",
                    "query",
                    "state",
                  },
                },
              },
              {
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/x402/v1/whois/lookup",
                ["segments"] = {
                  {
                    ["lit"] = "x402",
                  },
                  {
                    ["lit"] = "v1",
                  },
                  {
                    ["lit"] = "whois",
                  },
                  {
                    ["lit"] = "lookup",
                  },
                },
                ["parts"] = {
                  "x402",
                  "v1",
                  "whois",
                  "lookup",
                },
                ["rename"] = {},
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["args"] = {
                  ["query"] = {
                    {
                      ["name"] = "domain",
                      ["orig"] = "domain",
                      ["type"] = "`$STRING`",
                      ["kind"] = "query",
                      ["example"] = "apple.com",
                    },
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "domain",
                  },
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
    },
  }
end


local function make_feature(name)
  local features = require("features")
  local factory = features[name]
  if factory ~= nil then
    return factory()
  end
  return features.base()
end


-- Attach make_feature to the SDK class
local function setup_sdk(SDK)
  SDK._make_feature = make_feature
end


return make_config
