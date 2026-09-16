

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


describe('SecEdgarEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when AUTOSCRAPE_TEST_LIVE=TRUE.
  afterEach(liveDelay('AUTOSCRAPE_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = AutoscrapeSDK.test()
    const ent = testsdk.SecEdgar()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.AUTOSCRAPE_TEST_LIVE
    for (const op of ['load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'sec_edgar.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":[],"name":"sec_edgar","op":{"load":{"input":"data","name":"load","points":[{"active":true,"args":{"query":[{"active":true,"kind":"query","name":"cik","orig":"cik","reqd":false,"type":"`$STRING`","index$":0},{"active":true,"kind":"query","name":"date_from","orig":"date_from","reqd":false,"type":"`$STRING`","index$":1},{"active":true,"kind":"query","name":"date_to","orig":"date_to","reqd":false,"type":"`$STRING`","index$":2},{"active":true,"kind":"query","name":"form_type","orig":"form_type","reqd":false,"type":"`$STRING`","index$":3},{"active":true,"example":100,"kind":"query","name":"max_filing","orig":"max_filing","reqd":false,"type":"`$INTEGER`","index$":4},{"active":true,"kind":"query","name":"query","orig":"query","reqd":false,"type":"`$STRING`","index$":5},{"active":true,"kind":"query","name":"ticker","orig":"ticker","reqd":false,"type":"`$STRING`","index$":6}]},"contract":{"id":"GET /v1/sec-edgar/filings","json":"{\"operationId\":\"searchSECEdgarFilings\",\"parameters\":[{\"description\":\"Company name search\",\"in\":\"query\",\"name\":\"query\",\"schema\":{\"type\":\"string\"}},{\"description\":\"Comma-separated stock tickers\",\"in\":\"query\",\"name\":\"tickers\",\"schema\":{\"type\":\"string\"}},{\"description\":\"Comma-separated CIK numbers\",\"in\":\"query\",\"name\":\"ciks\",\"schema\":{\"type\":\"string\"}},{\"description\":\"Filter by form type (e.g. 10-K,10-Q)\",\"in\":\"query\",\"name\":\"formTypes\",\"schema\":{\"type\":\"string\"}},{\"description\":\"Start date YYYY-MM-DD\",\"in\":\"query\",\"name\":\"dateFrom\",\"schema\":{\"format\":\"date\",\"type\":\"string\"}},{\"description\":\"End date YYYY-MM-DD\",\"in\":\"query\",\"name\":\"dateTo\",\"schema\":{\"format\":\"date\",\"type\":\"string\"}},{\"description\":\"Max results\",\"in\":\"query\",\"name\":\"maxFilings\",\"schema\":{\"default\":100,\"type\":\"integer\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"type\":\"object\"}}},\"description\":\"Filing results\"}},\"securitySource\":\"unspecified\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/v1/sec-edgar/filings","segments":[{"lit":"v1"},{"lit":"sec-edgar"},{"lit":"filings"}],"select":{"$action":"filing","exist":["cik","date_from","date_to","form_type","max_filing","query","ticker"]},"transform":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"sec_edgar","name__orig":"sec_edgar","Name":"SecEdgar","name_":"sec_edgar","name-":"sec-edgar","NAME":"SEC_EDGAR","index$":3}, {"active":true,"entity":"sec_edgar","key$":"BasicSecEdgarFlow","kind":"basic","name":"BasicSecEdgarFlow","param":{},"step":[{"active":true,"data":{},"input":{"ref":"sec_edgar_ref01","srcdatavar":"sec_edgar_ref01_data","suffix":"_dt0"},"match":{},"op":"load","spec":[],"valid":[{"apply":"TextFieldMark","def":{"mark":"Mark01-sec_edgar_ref01"}}],"index$":0}]}, 'SecEdgar')
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let sec_edgar_ref01_data = Object.values(setup.data.existing.sec_edgar)[0] as any

    // LOAD
    const sec_edgar_ref01_ent = client.SecEdgar()
    const sec_edgar_ref01_match_dt0: any = {}
    const sec_edgar_ref01_data_dt0 = (await sec_edgar_ref01_ent.load(sec_edgar_ref01_match_dt0)).data()
    assert(null != sec_edgar_ref01_data_dt0)


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/sec_edgar/SecEdgarTestData.json')

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
    ['sec_edgar01','sec_edgar02','sec_edgar03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'AUTOSCRAPE_TEST_SEC_EDGAR_ENTID': idmap,
    'AUTOSCRAPE_TEST_LIVE': 'FALSE',
    'AUTOSCRAPE_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['AUTOSCRAPE_TEST_SEC_EDGAR_ENTID']

  const live = 'TRUE' === env.AUTOSCRAPE_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['AUTOSCRAPE_TEST_SEC_EDGAR_ENTID']
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
  
