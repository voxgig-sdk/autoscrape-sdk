"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_path_1 = __importDefault(require("node:path"));
const Fs = __importStar(require("node:fs"));
const node_test_1 = require("node:test");
const node_assert_1 = __importDefault(require("node:assert"));
const live_runner_1 = require("../../live-runner");
const live_entity_1 = require("../../live-entity");
const __1 = require("../../..");
const utility_1 = require("../../utility");
// AFTER the imports on purpose: TypeScript hoists `import` above any
// statement in the emitted CommonJS, so a loader placed above them would
// run only after every imported module had already been evaluated - and
// anything reading process.env at module scope would miss these values.
(0, utility_1.loadEnvLocal)(__dirname + '/../../../.env.local');
(0, node_test_1.describe)('X402PaidEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when AUTOSCRAPE_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('AUTOSCRAPE_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.AutoscrapeSDK.test();
        const ent = testsdk.X402Paid();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.AUTOSCRAPE_TEST_LIVE;
        for (const op of ['load']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'x402_paid.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": [], "name": "x402_paid", "op": { "load": { "input": "data", "name": "load", "points": [{ "active": true, "args": { "query": [{ "active": true, "kind": "query", "name": "cik", "orig": "cik", "reqd": false, "type": "`$STRING`", "index$": 0 }, { "active": true, "kind": "query", "name": "date_from", "orig": "date_from", "reqd": false, "type": "`$STRING`", "index$": 1 }, { "active": true, "kind": "query", "name": "date_to", "orig": "date_to", "reqd": false, "type": "`$STRING`", "index$": 2 }, { "active": true, "kind": "query", "name": "form_type", "orig": "form_type", "reqd": false, "type": "`$STRING`", "index$": 3 }, { "active": true, "example": 100, "kind": "query", "name": "max_filing", "orig": "max_filing", "reqd": false, "type": "`$INTEGER`", "index$": 4 }, { "active": true, "kind": "query", "name": "query", "orig": "query", "reqd": false, "type": "`$STRING`", "index$": 5 }, { "active": true, "kind": "query", "name": "ticker", "orig": "ticker", "reqd": false, "type": "`$STRING`", "index$": 6 }] }, "contract": { "id": "GET /x402/v1/sec-edgar/filings", "json": "{\"operationId\":\"paidX402SearchSECEdgarFilings\",\"parameters\":[{\"description\":\"Company name search\",\"in\":\"query\",\"name\":\"query\",\"schema\":{\"type\":\"string\"}},{\"description\":\"Comma-separated stock tickers\",\"in\":\"query\",\"name\":\"tickers\",\"schema\":{\"type\":\"string\"}},{\"description\":\"Comma-separated CIK numbers\",\"in\":\"query\",\"name\":\"ciks\",\"schema\":{\"type\":\"string\"}},{\"description\":\"Filter by form type (e.g. 10-K,10-Q)\",\"in\":\"query\",\"name\":\"formTypes\",\"schema\":{\"type\":\"string\"}},{\"description\":\"Start date YYYY-MM-DD\",\"in\":\"query\",\"name\":\"dateFrom\",\"schema\":{\"format\":\"date\",\"type\":\"string\"}},{\"description\":\"End date YYYY-MM-DD\",\"in\":\"query\",\"name\":\"dateTo\",\"schema\":{\"format\":\"date\",\"type\":\"string\"}},{\"description\":\"Max results\",\"in\":\"query\",\"name\":\"maxFilings\",\"schema\":{\"default\":100,\"type\":\"integer\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"type\":\"object\"}}},\"description\":\"Filing results\"},\"402\":{\"description\":\"Payment required. Response includes PAYMENT-REQUIRED header with x402 challenge and Bazaar discovery metadata.\",\"headers\":{\"PAYMENT-REQUIRED\":{\"description\":\"Base64-encoded x402 payment challenge\",\"schema\":{\"type\":\"string\"}},\"PAYMENT-RESPONSE\":{\"description\":\"x402 settlement response when payment succeeds\",\"schema\":{\"type\":\"string\"}}}}},\"securitySource\":\"unspecified\"}", "source": "openapi3", "version": 1 }, "kind": "http", "method": "GET", "orig": "/x402/v1/sec-edgar/filings", "segments": [{ "lit": "x402" }, { "lit": "v1" }, { "lit": "sec-edgar" }, { "lit": "filings" }], "select": { "exist": ["cik", "date_from", "date_to", "form_type", "max_filing", "query", "ticker"] }, "transform": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }, { "active": true, "args": { "query": [{ "active": true, "example": "austin", "kind": "query", "name": "city", "orig": "city", "reqd": false, "type": "`$STRING`", "index$": 0 }, { "active": true, "kind": "query", "name": "date_from", "orig": "date_from", "reqd": false, "type": "`$STRING`", "index$": 1 }, { "active": true, "kind": "query", "name": "date_to", "orig": "date_to", "reqd": false, "type": "`$STRING`", "index$": 2 }, { "active": true, "kind": "query", "name": "keyword", "orig": "keyword", "reqd": false, "type": "`$STRING`", "index$": 3 }, { "active": true, "example": 25, "kind": "query", "name": "max_result", "orig": "max_result", "reqd": false, "type": "`$INTEGER`", "index$": 4 }, { "active": true, "kind": "query", "name": "permit_type", "orig": "permit_type", "reqd": false, "type": "`$STRING`", "index$": 5 }, { "active": true, "kind": "query", "name": "query", "orig": "query", "reqd": false, "type": "`$STRING`", "index$": 6 }] }, "contract": { "id": "GET /x402/v1/building-permits/search", "json": "{\"operationId\":\"paidX402SearchBuildingPermits\",\"parameters\":[{\"description\":\"City key such as austin, chicago, la, sf, seattle, denver, boston, portland, dallas, houston, or phoenix. Defaults to austin when omitted for agent discovery.\",\"in\":\"query\",\"name\":\"city\",\"schema\":{\"default\":\"austin\",\"type\":\"string\"}},{\"description\":\"Full-text search across public permit fields; query is accepted as an alias\",\"in\":\"query\",\"name\":\"keyword\",\"schema\":{\"type\":\"string\"}},{\"description\":\"Alias for keyword for agents that send a generic query parameter\",\"in\":\"query\",\"name\":\"query\",\"schema\":{\"type\":\"string\"}},{\"description\":\"Permit type filter\",\"in\":\"query\",\"name\":\"permitType\",\"schema\":{\"type\":\"string\"}},{\"description\":\"Issue/application date lower bound YYYY-MM-DD\",\"in\":\"query\",\"name\":\"dateFrom\",\"schema\":{\"format\":\"date\",\"type\":\"string\"}},{\"description\":\"Issue/application date upper bound YYYY-MM-DD\",\"in\":\"query\",\"name\":\"dateTo\",\"schema\":{\"format\":\"date\",\"type\":\"string\"}},{\"description\":\"Max results\",\"in\":\"query\",\"name\":\"maxResults\",\"schema\":{\"default\":25,\"maximum\":100,\"type\":\"integer\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"type\":\"object\"}}},\"description\":\"Permit lead records\"},\"402\":{\"description\":\"Payment required. Response includes PAYMENT-REQUIRED header with x402 challenge and Bazaar discovery metadata.\",\"headers\":{\"PAYMENT-REQUIRED\":{\"description\":\"Base64-encoded x402 payment challenge\",\"schema\":{\"type\":\"string\"}},\"PAYMENT-RESPONSE\":{\"description\":\"x402 settlement response when payment succeeds\",\"schema\":{\"type\":\"string\"}}}}},\"securitySource\":\"unspecified\"}", "source": "openapi3", "version": 1 }, "kind": "http", "method": "GET", "orig": "/x402/v1/building-permits/search", "segments": [{ "lit": "x402" }, { "lit": "v1" }, { "lit": "building-permits" }, { "lit": "search" }], "select": { "exist": ["city", "date_from", "date_to", "keyword", "max_result", "permit_type", "query"] }, "transform": { "req": "`reqdata`", "res": "`body`" }, "index$": 1 }, { "active": true, "args": { "query": [{ "active": true, "kind": "query", "name": "ein", "orig": "ein", "reqd": false, "type": "`$STRING`", "index$": 0 }, { "active": true, "kind": "query", "name": "fetch_detail", "orig": "fetch_detail", "reqd": false, "type": "`$BOOLEAN`", "index$": 1 }, { "active": true, "example": 25, "kind": "query", "name": "max_result", "orig": "max_result", "reqd": false, "type": "`$INTEGER`", "index$": 2 }, { "active": true, "kind": "query", "name": "query", "orig": "query", "reqd": false, "type": "`$STRING`", "index$": 3 }, { "active": true, "kind": "query", "name": "state", "orig": "state", "reqd": false, "type": "`$STRING`", "index$": 4 }] }, "contract": { "id": "GET /x402/v1/irs-990/search", "json": "{\"operationId\":\"paidX402SearchIRS990\",\"parameters\":[{\"description\":\"Organization name\",\"in\":\"query\",\"name\":\"query\",\"schema\":{\"type\":\"string\"}},{\"description\":\"EIN number lookup\",\"in\":\"query\",\"name\":\"ein\",\"schema\":{\"type\":\"string\"}},{\"description\":\"Two-letter state code\",\"in\":\"query\",\"name\":\"state\",\"schema\":{\"type\":\"string\"}},{\"description\":\"Include full filing details\",\"in\":\"query\",\"name\":\"fetchDetails\",\"schema\":{\"type\":\"boolean\"}},{\"description\":\"Max results\",\"in\":\"query\",\"name\":\"maxResults\",\"schema\":{\"default\":25,\"type\":\"integer\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"type\":\"object\"}}},\"description\":\"Nonprofit results\"},\"402\":{\"description\":\"Payment required. Response includes PAYMENT-REQUIRED header with x402 challenge and Bazaar discovery metadata.\",\"headers\":{\"PAYMENT-REQUIRED\":{\"description\":\"Base64-encoded x402 payment challenge\",\"schema\":{\"type\":\"string\"}},\"PAYMENT-RESPONSE\":{\"description\":\"x402 settlement response when payment succeeds\",\"schema\":{\"type\":\"string\"}}}}},\"securitySource\":\"unspecified\"}", "source": "openapi3", "version": 1 }, "kind": "http", "method": "GET", "orig": "/x402/v1/irs-990/search", "segments": [{ "lit": "x402" }, { "lit": "v1" }, { "lit": "irs-990" }, { "lit": "search" }], "select": { "exist": ["ein", "fetch_detail", "max_result", "query", "state"] }, "transform": { "req": "`reqdata`", "res": "`body`" }, "index$": 2 }, { "active": true, "args": { "query": [{ "active": true, "kind": "query", "name": "fetch_detail", "orig": "fetch_detail", "reqd": false, "type": "`$BOOLEAN`", "index$": 0 }, { "active": true, "example": 25, "kind": "query", "name": "max_result", "orig": "max_result", "reqd": false, "type": "`$INTEGER`", "index$": 1 }, { "active": true, "example": "Apple Inc", "kind": "query", "name": "query", "orig": "query", "reqd": false, "type": "`$STRING`", "index$": 2 }, { "active": true, "kind": "query", "name": "state", "orig": "state", "reqd": false, "type": "`$STRING`", "index$": 3 }] }, "contract": { "id": "GET /x402/v1/business-entity/search", "json": "{\"operationId\":\"paidX402SearchBusinessEntities\",\"parameters\":[{\"description\":\"Business name to search. Defaults to Apple Inc with a warning when omitted for marketplace/agent discovery.\",\"in\":\"query\",\"name\":\"query\",\"schema\":{\"default\":\"Apple Inc\",\"type\":\"string\"}},{\"description\":\"Comma-separated state codes (default: NY with warning). Also accepts 'state' param.\",\"in\":\"query\",\"name\":\"states\",\"schema\":{\"type\":\"string\"}},{\"description\":\"Maximum records to return across the response\",\"in\":\"query\",\"name\":\"maxResults\",\"schema\":{\"default\":25,\"type\":\"integer\"}},{\"description\":\"Include full entity details\",\"in\":\"query\",\"name\":\"fetchDetails\",\"schema\":{\"type\":\"boolean\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"type\":\"object\"}}},\"description\":\"Search results\"},\"402\":{\"description\":\"Payment required. Response includes PAYMENT-REQUIRED header with x402 challenge and Bazaar discovery metadata.\",\"headers\":{\"PAYMENT-REQUIRED\":{\"description\":\"Base64-encoded x402 payment challenge\",\"schema\":{\"type\":\"string\"}},\"PAYMENT-RESPONSE\":{\"description\":\"x402 settlement response when payment succeeds\",\"schema\":{\"type\":\"string\"}}}}},\"securitySource\":\"unspecified\"}", "source": "openapi3", "version": 1 }, "kind": "http", "method": "GET", "orig": "/x402/v1/business-entity/search", "segments": [{ "lit": "x402" }, { "lit": "v1" }, { "lit": "business-entity" }, { "lit": "search" }], "select": { "exist": ["fetch_detail", "max_result", "query", "state"] }, "transform": { "req": "`reqdata`", "res": "`body`" }, "index$": 3 }, { "active": true, "args": { "query": [{ "active": true, "example": "apple.com", "kind": "query", "name": "domain", "orig": "domain", "reqd": false, "type": "`$STRING`", "index$": 0 }] }, "contract": { "id": "GET /x402/v1/whois/lookup", "json": "{\"operationId\":\"paidX402WhoisLookup\",\"parameters\":[{\"description\":\"Domain name to look up. Defaults to apple.com when omitted for agent discovery.\",\"in\":\"query\",\"name\":\"domain\",\"schema\":{\"default\":\"apple.com\",\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"type\":\"object\"}}},\"description\":\"WHOIS data\"},\"402\":{\"description\":\"Payment required. Response includes PAYMENT-REQUIRED header with x402 challenge and Bazaar discovery metadata.\",\"headers\":{\"PAYMENT-REQUIRED\":{\"description\":\"Base64-encoded x402 payment challenge\",\"schema\":{\"type\":\"string\"}},\"PAYMENT-RESPONSE\":{\"description\":\"x402 settlement response when payment succeeds\",\"schema\":{\"type\":\"string\"}}}}},\"securitySource\":\"unspecified\"}", "source": "openapi3", "version": 1 }, "kind": "http", "method": "GET", "orig": "/x402/v1/whois/lookup", "segments": [{ "lit": "x402" }, { "lit": "v1" }, { "lit": "whois" }, { "lit": "lookup" }], "select": { "exist": ["domain"] }, "transform": { "req": "`reqdata`", "res": "`body`" }, "index$": 4 }], "key$": "load" } }, "relations": { "ancestors": [] }, "key$": "x402_paid", "name__orig": "x402_paid", "Name": "X402Paid", "name_": "x402_paid", "name-": "x402-paid", "NAME": "X402_PAID", "index$": 6 }, { "active": true, "entity": "x402_paid", "key$": "BasicX402PaidFlow", "kind": "basic", "name": "BasicX402PaidFlow", "param": {}, "step": [{ "active": true, "data": {}, "input": { "ref": "x402_paid_ref01", "srcdatavar": "x402_paid_ref01_data", "suffix": "_dt0" }, "match": {}, "op": "load", "spec": [], "valid": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-x402_paid_ref01" } }], "index$": 0 }] }, 'X402Paid');
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        let x402_paid_ref01_data = Object.values(setup.data.existing.x402_paid)[0];
        // LOAD
        const x402_paid_ref01_ent = client.X402Paid();
        const x402_paid_ref01_match_dt0 = {};
        const x402_paid_ref01_data_dt0 = (await x402_paid_ref01_ent.load(x402_paid_ref01_match_dt0)).data();
        (0, node_assert_1.default)(null != x402_paid_ref01_data_dt0);
    });
});
function basicSetup(extra) {
    // TODO: fix test def options
    const options = {}; // null
    // TODO: needs test utility to resolve path
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/x402_paid/X402PaidTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.AutoscrapeSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['x402_paid01', 'x402_paid02', 'x402_paid03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'AUTOSCRAPE_TEST_X402_PAID_ENTID': idmap,
        'AUTOSCRAPE_TEST_LIVE': 'FALSE',
        'AUTOSCRAPE_TEST_EXPLAIN': 'FALSE',
    });
    idmap = env['AUTOSCRAPE_TEST_X402_PAID_ENTID'];
    const live = 'TRUE' === env.AUTOSCRAPE_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['AUTOSCRAPE_TEST_X402_PAID_ENTID'];
        idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {};
        if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
            throw new Error('Live ENTID must be a JSON object');
        }
        client = new __1.AutoscrapeSDK(merge([
            // FIRST, so the generated fields below win: sdk-test-control.json's
            // test.client.options adds to the live client, it does not redirect it.
            (0, utility_1.liveClientOptions)(),
            {},
            // 'extra || {}', not a bare 'extra': struct.merge returns UNDEFINED when the
            // last entry is undefined, and basicSetup is normally called with no
            // argument at all - so a bare 'extra' silently discarded the apikey
            // and server values above and handed the SDK undefined. Harmless
            // while there was nothing in that object; not harmless now.
            extra || {},
            { system: { fetch: transport.fetch } }
        ]));
    }
    const setup = {
        idmap,
        env,
        options,
        client,
        struct,
        data: entityData,
        explain: 'TRUE' === env.AUTOSCRAPE_TEST_EXPLAIN,
        live,
        transport,
        now: Date.now(),
    };
    return setup;
}
//# sourceMappingURL=X402PaidEntity.test.js.map