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
(0, node_test_1.describe)('Irs990Entity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when AUTOSCRAPE_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('AUTOSCRAPE_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.AutoscrapeSDK.test();
        const ent = testsdk.Irs990();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.AUTOSCRAPE_TEST_LIVE;
        for (const op of ['load']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'irs_990.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": {}, "name": "irs_990", "op": { "load": { "input": "data", "name": "load", "points": [{ "a": true, "co": { "id": "GET /v1/irs-990/search", "source": "openapi3", "version": 2 }, "g": { "query": [{ "a": true, "k": "query", "n": "ein", "or": "ein", "r": false, "t": "`$STRING`", "index$": 0 }, { "a": true, "k": "query", "n": "fetch_detail", "or": "fetch_detail", "r": false, "t": "`$BOOLEAN`", "index$": 1 }, { "a": true, "ex": 25, "k": "query", "n": "max_result", "or": "max_result", "r": false, "t": "`$INTEGER`", "index$": 2 }, { "a": true, "k": "query", "n": "query", "or": "query", "r": false, "t": "`$STRING`", "index$": 3 }, { "a": true, "k": "query", "n": "state", "or": "state", "r": false, "t": "`$STRING`", "index$": 4 }] }, "k": "http", "m": "GET", "o": "/v1/irs-990/search", "q": { "$action": "search", "exist": ["ein", "fetch_detail", "max_result", "query", "state"] }, "r": {}, "s": [{ "lit": "v1" }, { "lit": "irs-990" }, { "lit": "search" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "load" } }, "relations": { "ancestors": [] }, "key$": "irs_990", "name__orig": "irs_990", "Name": "Irs990", "name_": "irs_990", "name-": "irs-990", "NAME": "IRS_990", "index$": 2 }, { "active": true, "entity": "irs_990", "key$": "BasicIrs990Flow", "kind": "basic", "name": "BasicIrs990Flow", "param": {}, "step": [{ "a": true, "d": {}, "i": { "ref": "irs_990_ref01", "srcdatavar": "irs_990_ref01_data", "suffix": "_dt0" }, "m": {}, "o": "load", "s": [], "v": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-irs_990_ref01" } }], "index$": 0 }] }, 'Irs990', { "GET /v1/irs-990/search": { "protocol": "http", "operationId": "searchIRS990", "responses": { "200": { "description": "Nonprofit results", "content": { "application/json": { "schema": { "type": "object" } } } } }, "parameters": [{ "name": "query", "in": "query", "schema": { "type": "string" }, "description": "Organization name", "index$": 0 }, { "name": "ein", "in": "query", "schema": { "type": "string" }, "description": "EIN number lookup", "index$": 1 }, { "name": "state", "in": "query", "schema": { "type": "string" }, "description": "Two-letter state code", "index$": 2 }, { "name": "fetchDetails", "in": "query", "schema": { "type": "boolean" }, "description": "Include full filing details", "index$": 3 }, { "name": "maxResults", "in": "query", "schema": { "type": "integer", "default": 25 }, "description": "Max results", "index$": 4 }], "securitySource": "unspecified" } });
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        let irs_990_ref01_data = Object.values(setup.data.existing.irs_990)[0];
        // LOAD
        const irs_990_ref01_ent = client.Irs990();
        const irs_990_ref01_match_dt0 = {};
        const irs_990_ref01_data_dt0 = (await irs_990_ref01_ent.load(irs_990_ref01_match_dt0)).data();
        (0, node_assert_1.default)(null != irs_990_ref01_data_dt0);
    });
});
function basicSetup(extra) {
    // TODO: fix test def options
    const options = {}; // null
    // TODO: needs test utility to resolve path
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/irs_990/Irs990TestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.AutoscrapeSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['irs_99001', 'irs_99002', 'irs_99003'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'AUTOSCRAPE_TEST_IRS_990_ENTID': idmap,
        'AUTOSCRAPE_TEST_LIVE': 'FALSE',
        'AUTOSCRAPE_TEST_EXPLAIN': 'FALSE',
    });
    idmap = env['AUTOSCRAPE_TEST_IRS_990_ENTID'];
    const live = 'TRUE' === env.AUTOSCRAPE_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['AUTOSCRAPE_TEST_IRS_990_ENTID'];
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
//# sourceMappingURL=Irs990Entity.test.js.map