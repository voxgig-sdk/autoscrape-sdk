

import Path from 'node:path'
import * as Fs from 'node:fs'

import { test, describe, afterEach } from 'node:test'
import assert from 'node:assert'
import { createLiveTransport } from '../../live-runner'
import { runLiveEntity } from '../../live-entity'


import { AutoscrapeSDK, BaseFeature, stdutil } from '../../..'

import {
  envOverride,
  liveClientOptions,
  liveDelay,
  loadEnvLocal,
  makeCtrl,
  makeMatch,
  makeReqdata,
  makeStepData,
  makeValid,
  maybeSkipControl,
} from '../../utility'


// AFTER the imports on purpose: TypeScript hoists `import` above any
// statement in the emitted CommonJS, so a loader placed above them would
// run only after every imported module had already been evaluated - and
// anything reading process.env at module scope would miss these values.
loadEnvLocal(__dirname + '/../../../.env.local')


describe('StockDataEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when AUTOSCRAPE_TEST_LIVE=TRUE.
  afterEach(liveDelay('AUTOSCRAPE_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = AutoscrapeSDK.test()
    const ent = testsdk.StockData()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.AUTOSCRAPE_TEST_LIVE
    for (const op of ['load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'stock_data.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":[],"name":"stock_data","op":{"load":{"input":"data","name":"load","points":[{"active":true,"args":{"query":[{"active":true,"example":"1d","kind":"query","name":"interval","orig":"interval","reqd":false,"type":"`$STRING`","index$":0},{"active":true,"example":"1mo","kind":"query","name":"range","orig":"range","reqd":false,"type":"`$STRING`","index$":1},{"active":true,"kind":"query","name":"symbol","orig":"symbol","reqd":true,"type":"`$STRING`","index$":2}]},"contract":{"id":"GET /v1/stock/chart","json":"{\"operationId\":\"getStockChart\",\"parameters\":[{\"description\":\"Stock ticker symbol\",\"in\":\"query\",\"name\":\"symbol\",\"required\":true,\"schema\":{\"type\":\"string\"}},{\"description\":\"Time range\",\"in\":\"query\",\"name\":\"range\",\"schema\":{\"default\":\"1mo\",\"enum\":[\"1d\",\"5d\",\"1mo\",\"3mo\",\"6mo\",\"1y\",\"5y\",\"max\"],\"type\":\"string\"}},{\"description\":\"Data interval\",\"in\":\"query\",\"name\":\"interval\",\"schema\":{\"default\":\"1d\",\"enum\":[\"1m\",\"5m\",\"15m\",\"1h\",\"1d\",\"1wk\",\"1mo\"],\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"type\":\"object\"}}},\"description\":\"OHLCV price data\"}},\"securitySource\":\"unspecified\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/v1/stock/chart","segments":[{"lit":"v1"},{"lit":"stock"},{"lit":"chart"}],"select":{"exist":["interval","range","symbol"]},"transform":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"stock_data","name__orig":"stock_data","Name":"StockData","name_":"stock_data","name-":"stock-data","NAME":"STOCK_DATA","index$":4}, {"active":true,"entity":"stock_data","key$":"BasicStockDataFlow","kind":"basic","name":"BasicStockDataFlow","param":{},"step":[{"active":true,"data":{},"input":{"ref":"stock_data_ref01","srcdatavar":"stock_data_ref01_data","suffix":"_dt0"},"match":{},"op":"load","spec":[],"valid":[{"apply":"TextFieldMark","def":{"mark":"Mark01-stock_data_ref01"}}],"index$":0}]}, 'StockData')
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let stock_data_ref01_data = Object.values(setup.data.existing.stock_data)[0] as any

    // LOAD
    const stock_data_ref01_ent = client.StockData()
    const stock_data_ref01_match_dt0: any = {}
    const stock_data_ref01_data_dt0 = (await stock_data_ref01_ent.load(stock_data_ref01_match_dt0)).data()
    assert(null != stock_data_ref01_data_dt0)


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/stock_data/StockDataTestData.json')

  // TODO: file ready util needed?
  const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8')

  // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
  const entityData = JSON.parse(entityDataSource)

  options.entity = entityData.existing

  let client = AutoscrapeSDK.test(options, extra)
  const struct = client.utility().struct
  const merge = struct.merge
  const transform = struct.transform

  let idmap = transform(
    ['stock_data01','stock_data02','stock_data03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'AUTOSCRAPE_TEST_STOCK_DATA_ENTID': idmap,
    'AUTOSCRAPE_TEST_LIVE': 'FALSE',
    'AUTOSCRAPE_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['AUTOSCRAPE_TEST_STOCK_DATA_ENTID']

  const live = 'TRUE' === env.AUTOSCRAPE_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['AUTOSCRAPE_TEST_STOCK_DATA_ENTID']
    idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {}
    if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
      throw new Error('Live ENTID must be a JSON object')
    }
    client = new AutoscrapeSDK(merge([
      // FIRST, so the generated fields below win: sdk-test-control.json's
      // test.client.options adds to the live client, it does not redirect it.
      liveClientOptions(),
      {
      },
      // 'extra || {}', not a bare 'extra': struct.merge returns UNDEFINED when the
      // last entry is undefined, and basicSetup is normally called with no
      // argument at all - so a bare 'extra' silently discarded the apikey
      // and server values above and handed the SDK undefined. Harmless
      // while there was nothing in that object; not harmless now.
      extra || {},
      { system: { fetch: transport.fetch } }
    ]))
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
  }

  return setup
}
  
