

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


describe('Irs990Entity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when AUTOSCRAPE_TEST_LIVE=TRUE.
  afterEach(liveDelay('AUTOSCRAPE_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = AutoscrapeSDK.test()
    const ent = testsdk.Irs990()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.AUTOSCRAPE_TEST_LIVE
    for (const op of ['load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'irs_990.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{},"name":"irs_990","op":{"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /v1/irs-990/search","source":"openapi3","version":2},"g":{"query":[{"a":true,"k":"query","n":"ein","or":"ein","r":false,"t":"`$STRING`","index$":0},{"a":true,"k":"query","n":"fetch_detail","or":"fetch_detail","r":false,"t":"`$BOOLEAN`","index$":1},{"a":true,"ex":25,"k":"query","n":"max_result","or":"max_result","r":false,"t":"`$INTEGER`","index$":2},{"a":true,"k":"query","n":"query","or":"query","r":false,"t":"`$STRING`","index$":3},{"a":true,"k":"query","n":"state","or":"state","r":false,"t":"`$STRING`","index$":4}]},"k":"http","m":"GET","o":"/v1/irs-990/search","q":{"$action":"search","exist":["ein","fetch_detail","max_result","query","state"]},"r":{},"s":[{"lit":"v1"},{"lit":"irs-990"},{"lit":"search"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"irs_990","name__orig":"irs_990","Name":"Irs990","name_":"irs_990","name-":"irs-990","NAME":"IRS_990","index$":2}, {"active":true,"entity":"irs_990","key$":"BasicIrs990Flow","kind":"basic","name":"BasicIrs990Flow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"irs_990_ref01","srcdatavar":"irs_990_ref01_data","suffix":"_dt0"},"m":{},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-irs_990_ref01"}}],"index$":0}]}, 'Irs990', {"GET /v1/irs-990/search":{"protocol":"http","operationId":"searchIRS990","responses":{"200":{"description":"Nonprofit results","content":{"application/json":{"schema":{"type":"object"}}}}},"parameters":[{"name":"query","in":"query","schema":{"type":"string"},"description":"Organization name","index$":0},{"name":"ein","in":"query","schema":{"type":"string"},"description":"EIN number lookup","index$":1},{"name":"state","in":"query","schema":{"type":"string"},"description":"Two-letter state code","index$":2},{"name":"fetchDetails","in":"query","schema":{"type":"boolean"},"description":"Include full filing details","index$":3},{"name":"maxResults","in":"query","schema":{"type":"integer","default":25},"description":"Max results","index$":4}],"securitySource":"unspecified"}})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let irs_990_ref01_data = Object.values(setup.data.existing.irs_990)[0] as any

    // LOAD
    const irs_990_ref01_ent = client.Irs990()
    const irs_990_ref01_match_dt0: any = {}
    const irs_990_ref01_data_dt0 = (await irs_990_ref01_ent.load(irs_990_ref01_match_dt0)).data()
    assert(null != irs_990_ref01_data_dt0)


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/irs_990/Irs990TestData.json')

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
    ['irs_99001','irs_99002','irs_99003'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'AUTOSCRAPE_TEST_IRS_990_ENTID': idmap,
    'AUTOSCRAPE_TEST_LIVE': 'FALSE',
    'AUTOSCRAPE_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['AUTOSCRAPE_TEST_IRS_990_ENTID']

  const live = 'TRUE' === env.AUTOSCRAPE_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['AUTOSCRAPE_TEST_IRS_990_ENTID']
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
  
