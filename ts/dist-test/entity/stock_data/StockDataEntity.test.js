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
(0, node_test_1.describe)('StockDataEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when AUTOSCRAPE_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('AUTOSCRAPE_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.AutoscrapeSDK.test();
        const ent = testsdk.StockData();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.AUTOSCRAPE_TEST_LIVE;
        for (const op of ['load']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'stock_data.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": {}, "name": "stock_data", "op": { "load": { "input": "data", "name": "load", "points": [{ "a": true, "co": { "id": "GET /v1/stock/chart", "source": "openapi3", "version": 2 }, "g": { "query": [{ "a": true, "ex": "1d", "k": "query", "n": "interval", "or": "interval", "r": false, "t": "`$STRING`", "index$": 0 }, { "a": true, "ex": "1mo", "k": "query", "n": "range", "or": "range", "r": false, "t": "`$STRING`", "index$": 1 }, { "a": true, "k": "query", "n": "symbol", "or": "symbol", "r": true, "t": "`$STRING`", "index$": 2 }] }, "k": "http", "m": "GET", "o": "/v1/stock/chart", "q": { "exist": ["interval", "range", "symbol"] }, "r": {}, "s": [{ "lit": "v1" }, { "lit": "stock" }, { "lit": "chart" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "load" } }, "relations": { "ancestors": [] }, "key$": "stock_data", "name__orig": "stock_data", "Name": "StockData", "name_": "stock_data", "name-": "stock-data", "NAME": "STOCK_DATA", "index$": 4 }, { "active": true, "entity": "stock_data", "key$": "BasicStockDataFlow", "kind": "basic", "name": "BasicStockDataFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": { "ref": "stock_data_ref01", "srcdatavar": "stock_data_ref01_data", "suffix": "_dt0" }, "m": {}, "o": "load", "s": [], "v": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-stock_data_ref01" } }], "index$": 0 }] }, 'StockData', { "GET /v1/stock/chart": { "protocol": "http", "operationId": "getStockChart", "responses": { "200": { "description": "OHLCV price data", "content": { "application/json": { "schema": { "type": "object" } } } } }, "parameters": [{ "name": "symbol", "in": "query", "required": true, "schema": { "type": "string" }, "description": "Stock ticker symbol", "index$": 0 }, { "name": "range", "in": "query", "schema": { "type": "string", "enum": ["1d", "5d", "1mo", "3mo", "6mo", "1y", "5y", "max"], "default": "1mo" }, "description": "Time range", "index$": 1 }, { "name": "interval", "in": "query", "schema": { "type": "string", "enum": ["1m", "5m", "15m", "1h", "1d", "1wk", "1mo"], "default": "1d" }, "description": "Data interval", "index$": 2 }], "securitySource": "unspecified" } });
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        let stock_data_ref01_data = Object.values(setup.data.existing.stock_data)[0];
        // LOAD
        const stock_data_ref01_ent = client.StockData();
        const stock_data_ref01_match_dt0 = {};
        const stock_data_ref01_data_dt0 = (await stock_data_ref01_ent.load(stock_data_ref01_match_dt0)).data();
        (0, node_assert_1.default)(null != stock_data_ref01_data_dt0);
    });
});
function basicSetup(extra) {
    // TODO: fix test def options
    const options = {}; // null
    // TODO: needs test utility to resolve path
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/stock_data/StockDataTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.AutoscrapeSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['stock_data01', 'stock_data02', 'stock_data03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'AUTOSCRAPE_TEST_STOCK_DATA_ENTID': idmap,
        'AUTOSCRAPE_TEST_LIVE': 'FALSE',
        'AUTOSCRAPE_TEST_EXPLAIN': 'FALSE',
    });
    idmap = env['AUTOSCRAPE_TEST_STOCK_DATA_ENTID'];
    const live = 'TRUE' === env.AUTOSCRAPE_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['AUTOSCRAPE_TEST_STOCK_DATA_ENTID'];
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
//# sourceMappingURL=StockDataEntity.test.js.map