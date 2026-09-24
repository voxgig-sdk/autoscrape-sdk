

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
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{},"name":"sec_edgar","op":{"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /v1/sec-edgar/filings","source":"openapi3","version":2},"g":{"query":[{"a":true,"k":"query","n":"cik","or":"cik","r":false,"t":"`$STRING`","index$":0},{"a":true,"k":"query","n":"date_from","or":"date_from","r":false,"t":"`$STRING`","index$":1},{"a":true,"k":"query","n":"date_to","or":"date_to","r":false,"t":"`$STRING`","index$":2},{"a":true,"k":"query","n":"form_type","or":"form_type","r":false,"t":"`$STRING`","index$":3},{"a":true,"ex":100,"k":"query","n":"max_filing","or":"max_filing","r":false,"t":"`$INTEGER`","index$":4},{"a":true,"k":"query","n":"query","or":"query","r":false,"t":"`$STRING`","index$":5},{"a":true,"k":"query","n":"ticker","or":"ticker","r":false,"t":"`$STRING`","index$":6}]},"k":"http","m":"GET","o":"/v1/sec-edgar/filings","q":{"$action":"filing","exist":["cik","date_from","date_to","form_type","max_filing","query","ticker"]},"r":{},"s":[{"lit":"v1"},{"lit":"sec-edgar"},{"lit":"filings"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"sec_edgar","name__orig":"sec_edgar","Name":"SecEdgar","name_":"sec_edgar","name-":"sec-edgar","NAME":"SEC_EDGAR","index$":3}, {"active":true,"entity":"sec_edgar","key$":"BasicSecEdgarFlow","kind":"basic","name":"BasicSecEdgarFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"sec_edgar_ref01","srcdatavar":"sec_edgar_ref01_data","suffix":"_dt0"},"m":{},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-sec_edgar_ref01"}}],"index$":0}]}, 'SecEdgar', {"GET /v1/sec-edgar/filings":{"protocol":"http","operationId":"searchSECEdgarFilings","responses":{"200":{"description":"Filing results","content":{"application/json":{"schema":{"type":"object"}}}}},"parameters":[{"name":"query","in":"query","schema":{"type":"string"},"description":"Company name search","index$":0},{"name":"tickers","in":"query","schema":{"type":"string"},"description":"Comma-separated stock tickers","index$":1},{"name":"ciks","in":"query","schema":{"type":"string"},"description":"Comma-separated CIK numbers","index$":2},{"name":"formTypes","in":"query","schema":{"type":"string"},"description":"Filter by form type (e.g. 10-K,10-Q)","index$":3},{"name":"dateFrom","in":"query","schema":{"type":"string","format":"date"},"description":"Start date YYYY-MM-DD","index$":4},{"name":"dateTo","in":"query","schema":{"type":"string","format":"date"},"description":"End date YYYY-MM-DD","index$":5},{"name":"maxFilings","in":"query","schema":{"type":"integer","default":100},"description":"Max results","index$":6}],"securitySource":"unspecified"}})
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
  
