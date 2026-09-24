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
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": {}, "name": "x402_paid", "op": { "load": { "input": "data", "name": "load", "points": [{ "a": true, "co": { "id": "GET /x402/v1/sec-edgar/filings", "source": "openapi3", "version": 2 }, "g": { "query": [{ "a": true, "k": "query", "n": "cik", "or": "cik", "r": false, "t": "`$STRING`", "index$": 0 }, { "a": true, "k": "query", "n": "date_from", "or": "date_from", "r": false, "t": "`$STRING`", "index$": 1 }, { "a": true, "k": "query", "n": "date_to", "or": "date_to", "r": false, "t": "`$STRING`", "index$": 2 }, { "a": true, "k": "query", "n": "form_type", "or": "form_type", "r": false, "t": "`$STRING`", "index$": 3 }, { "a": true, "ex": 100, "k": "query", "n": "max_filing", "or": "max_filing", "r": false, "t": "`$INTEGER`", "index$": 4 }, { "a": true, "k": "query", "n": "query", "or": "query", "r": false, "t": "`$STRING`", "index$": 5 }, { "a": true, "k": "query", "n": "ticker", "or": "ticker", "r": false, "t": "`$STRING`", "index$": 6 }] }, "k": "http", "m": "GET", "o": "/x402/v1/sec-edgar/filings", "q": { "exist": ["cik", "date_from", "date_to", "form_type", "max_filing", "query", "ticker"] }, "r": {}, "s": [{ "lit": "x402" }, { "lit": "v1" }, { "lit": "sec-edgar" }, { "lit": "filings" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }, { "a": true, "co": { "id": "GET /x402/v1/building-permits/search", "source": "openapi3", "version": 2 }, "g": { "query": [{ "a": true, "ex": "austin", "k": "query", "n": "city", "or": "city", "r": false, "t": "`$STRING`", "index$": 0 }, { "a": true, "k": "query", "n": "date_from", "or": "date_from", "r": false, "t": "`$STRING`", "index$": 1 }, { "a": true, "k": "query", "n": "date_to", "or": "date_to", "r": false, "t": "`$STRING`", "index$": 2 }, { "a": true, "k": "query", "n": "keyword", "or": "keyword", "r": false, "t": "`$STRING`", "index$": 3 }, { "a": true, "ex": 25, "k": "query", "n": "max_result", "or": "max_result", "r": false, "t": "`$INTEGER`", "index$": 4 }, { "a": true, "k": "query", "n": "permit_type", "or": "permit_type", "r": false, "t": "`$STRING`", "index$": 5 }, { "a": true, "k": "query", "n": "query", "or": "query", "r": false, "t": "`$STRING`", "index$": 6 }] }, "k": "http", "m": "GET", "o": "/x402/v1/building-permits/search", "q": { "exist": ["city", "date_from", "date_to", "keyword", "max_result", "permit_type", "query"] }, "r": {}, "s": [{ "lit": "x402" }, { "lit": "v1" }, { "lit": "building-permits" }, { "lit": "search" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 1 }, { "a": true, "co": { "id": "GET /x402/v1/irs-990/search", "source": "openapi3", "version": 2 }, "g": { "query": [{ "a": true, "k": "query", "n": "ein", "or": "ein", "r": false, "t": "`$STRING`", "index$": 0 }, { "a": true, "k": "query", "n": "fetch_detail", "or": "fetch_detail", "r": false, "t": "`$BOOLEAN`", "index$": 1 }, { "a": true, "ex": 25, "k": "query", "n": "max_result", "or": "max_result", "r": false, "t": "`$INTEGER`", "index$": 2 }, { "a": true, "k": "query", "n": "query", "or": "query", "r": false, "t": "`$STRING`", "index$": 3 }, { "a": true, "k": "query", "n": "state", "or": "state", "r": false, "t": "`$STRING`", "index$": 4 }] }, "k": "http", "m": "GET", "o": "/x402/v1/irs-990/search", "q": { "exist": ["ein", "fetch_detail", "max_result", "query", "state"] }, "r": {}, "s": [{ "lit": "x402" }, { "lit": "v1" }, { "lit": "irs-990" }, { "lit": "search" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 2 }, { "a": true, "co": { "id": "GET /x402/v1/business-entity/search", "source": "openapi3", "version": 2 }, "g": { "query": [{ "a": true, "k": "query", "n": "fetch_detail", "or": "fetch_detail", "r": false, "t": "`$BOOLEAN`", "index$": 0 }, { "a": true, "ex": 25, "k": "query", "n": "max_result", "or": "max_result", "r": false, "t": "`$INTEGER`", "index$": 1 }, { "a": true, "ex": "Apple Inc", "k": "query", "n": "query", "or": "query", "r": false, "t": "`$STRING`", "index$": 2 }, { "a": true, "k": "query", "n": "state", "or": "state", "r": false, "t": "`$STRING`", "index$": 3 }] }, "k": "http", "m": "GET", "o": "/x402/v1/business-entity/search", "q": { "exist": ["fetch_detail", "max_result", "query", "state"] }, "r": {}, "s": [{ "lit": "x402" }, { "lit": "v1" }, { "lit": "business-entity" }, { "lit": "search" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 3 }, { "a": true, "co": { "id": "GET /x402/v1/whois/lookup", "source": "openapi3", "version": 2 }, "g": { "query": [{ "a": true, "ex": "apple.com", "k": "query", "n": "domain", "or": "domain", "r": false, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "GET", "o": "/x402/v1/whois/lookup", "q": { "exist": ["domain"] }, "r": {}, "s": [{ "lit": "x402" }, { "lit": "v1" }, { "lit": "whois" }, { "lit": "lookup" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 4 }], "key$": "load" } }, "relations": { "ancestors": [] }, "key$": "x402_paid", "name__orig": "x402_paid", "Name": "X402Paid", "name_": "x402_paid", "name-": "x402-paid", "NAME": "X402_PAID", "index$": 6 }, { "active": true, "entity": "x402_paid", "key$": "BasicX402PaidFlow", "kind": "basic", "name": "BasicX402PaidFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": { "ref": "x402_paid_ref01", "srcdatavar": "x402_paid_ref01_data", "suffix": "_dt0" }, "m": {}, "o": "load", "s": [], "v": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-x402_paid_ref01" } }], "index$": 0 }] }, 'X402Paid', { "GET /x402/v1/sec-edgar/filings": { "protocol": "http", "operationId": "paidX402SearchSECEdgarFilings", "responses": { "200": { "description": "Filing results", "content": { "application/json": { "schema": { "type": "object" } } } }, "402": { "description": "Payment required. Response includes PAYMENT-REQUIRED header with x402 challenge and Bazaar discovery metadata.", "headers": { "PAYMENT-REQUIRED": { "description": "Base64-encoded x402 payment challenge", "schema": { "type": "string" } }, "PAYMENT-RESPONSE": { "description": "x402 settlement response when payment succeeds", "schema": { "type": "string" } } } } }, "parameters": [{ "name": "query", "in": "query", "schema": { "type": "string" }, "description": "Company name search", "index$": 0 }, { "name": "tickers", "in": "query", "schema": { "type": "string" }, "description": "Comma-separated stock tickers", "index$": 1 }, { "name": "ciks", "in": "query", "schema": { "type": "string" }, "description": "Comma-separated CIK numbers", "index$": 2 }, { "name": "formTypes", "in": "query", "schema": { "type": "string" }, "description": "Filter by form type (e.g. 10-K,10-Q)", "index$": 3 }, { "name": "dateFrom", "in": "query", "schema": { "type": "string", "format": "date" }, "description": "Start date YYYY-MM-DD", "index$": 4 }, { "name": "dateTo", "in": "query", "schema": { "type": "string", "format": "date" }, "description": "End date YYYY-MM-DD", "index$": 5 }, { "name": "maxFilings", "in": "query", "schema": { "type": "integer", "default": 100 }, "description": "Max results", "index$": 6 }], "securitySource": "unspecified" }, "GET /x402/v1/building-permits/search": { "protocol": "http", "operationId": "paidX402SearchBuildingPermits", "responses": { "200": { "description": "Permit lead records", "content": { "application/json": { "schema": { "type": "object" } } } }, "402": { "description": "Payment required. Response includes PAYMENT-REQUIRED header with x402 challenge and Bazaar discovery metadata.", "headers": { "PAYMENT-REQUIRED": { "description": "Base64-encoded x402 payment challenge", "schema": { "type": "string" } }, "PAYMENT-RESPONSE": { "description": "x402 settlement response when payment succeeds", "schema": { "type": "string" } } } } }, "parameters": [{ "name": "city", "in": "query", "schema": { "type": "string", "default": "austin" }, "description": "City key such as austin, chicago, la, sf, seattle, denver, boston, portland, dallas, houston, or phoenix. Defaults to austin when omitted for agent discovery.", "index$": 0 }, { "name": "keyword", "in": "query", "schema": { "type": "string" }, "description": "Full-text search across public permit fields; query is accepted as an alias", "index$": 1 }, { "name": "query", "in": "query", "schema": { "type": "string" }, "description": "Alias for keyword for agents that send a generic query parameter", "index$": 2 }, { "name": "permitType", "in": "query", "schema": { "type": "string" }, "description": "Permit type filter", "index$": 3 }, { "name": "dateFrom", "in": "query", "schema": { "type": "string", "format": "date" }, "description": "Issue/application date lower bound YYYY-MM-DD", "index$": 4 }, { "name": "dateTo", "in": "query", "schema": { "type": "string", "format": "date" }, "description": "Issue/application date upper bound YYYY-MM-DD", "index$": 5 }, { "name": "maxResults", "in": "query", "schema": { "type": "integer", "default": 25, "maximum": 100 }, "description": "Max results", "index$": 6 }], "securitySource": "unspecified" }, "GET /x402/v1/irs-990/search": { "protocol": "http", "operationId": "paidX402SearchIRS990", "responses": { "200": { "description": "Nonprofit results", "content": { "application/json": { "schema": { "type": "object" } } } }, "402": { "description": "Payment required. Response includes PAYMENT-REQUIRED header with x402 challenge and Bazaar discovery metadata.", "headers": { "PAYMENT-REQUIRED": { "description": "Base64-encoded x402 payment challenge", "schema": { "type": "string" } }, "PAYMENT-RESPONSE": { "description": "x402 settlement response when payment succeeds", "schema": { "type": "string" } } } } }, "parameters": [{ "name": "query", "in": "query", "schema": { "type": "string" }, "description": "Organization name", "index$": 0 }, { "name": "ein", "in": "query", "schema": { "type": "string" }, "description": "EIN number lookup", "index$": 1 }, { "name": "state", "in": "query", "schema": { "type": "string" }, "description": "Two-letter state code", "index$": 2 }, { "name": "fetchDetails", "in": "query", "schema": { "type": "boolean" }, "description": "Include full filing details", "index$": 3 }, { "name": "maxResults", "in": "query", "schema": { "type": "integer", "default": 25 }, "description": "Max results", "index$": 4 }], "securitySource": "unspecified" }, "GET /x402/v1/business-entity/search": { "protocol": "http", "operationId": "paidX402SearchBusinessEntities", "responses": { "200": { "description": "Search results", "content": { "application/json": { "schema": { "type": "object" } } } }, "402": { "description": "Payment required. Response includes PAYMENT-REQUIRED header with x402 challenge and Bazaar discovery metadata.", "headers": { "PAYMENT-REQUIRED": { "description": "Base64-encoded x402 payment challenge", "schema": { "type": "string" } }, "PAYMENT-RESPONSE": { "description": "x402 settlement response when payment succeeds", "schema": { "type": "string" } } } } }, "parameters": [{ "name": "query", "in": "query", "schema": { "type": "string", "default": "Apple Inc" }, "description": "Business name to search. Defaults to Apple Inc with a warning when omitted for marketplace/agent discovery.", "index$": 0 }, { "name": "states", "in": "query", "schema": { "type": "string" }, "description": "Comma-separated state codes (default: NY with warning). Also accepts 'state' param.", "index$": 1 }, { "name": "maxResults", "in": "query", "schema": { "type": "integer", "default": 25 }, "description": "Maximum records to return across the response", "index$": 2 }, { "name": "fetchDetails", "in": "query", "schema": { "type": "boolean" }, "description": "Include full entity details", "index$": 3 }], "securitySource": "unspecified" }, "GET /x402/v1/whois/lookup": { "protocol": "http", "operationId": "paidX402WhoisLookup", "responses": { "200": { "description": "WHOIS data", "content": { "application/json": { "schema": { "type": "object" } } } }, "402": { "description": "Payment required. Response includes PAYMENT-REQUIRED header with x402 challenge and Bazaar discovery metadata.", "headers": { "PAYMENT-REQUIRED": { "description": "Base64-encoded x402 payment challenge", "schema": { "type": "string" } }, "PAYMENT-RESPONSE": { "description": "x402 settlement response when payment succeeds", "schema": { "type": "string" } } } } }, "parameters": [{ "name": "domain", "in": "query", "schema": { "type": "string", "default": "apple.com" }, "description": "Domain name to look up. Defaults to apple.com when omitted for agent discovery.", "index$": 0 }], "securitySource": "unspecified" } });
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