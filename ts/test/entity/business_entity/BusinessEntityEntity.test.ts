

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


describe('BusinessEntityEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when AUTOSCRAPE_TEST_LIVE=TRUE.
  afterEach(liveDelay('AUTOSCRAPE_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = AutoscrapeSDK.test()
    const ent = testsdk.BusinessEntity()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.AUTOSCRAPE_TEST_LIVE
    for (const op of ['load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'business_entity.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{},"name":"business_entity","op":{"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /v1/business-entity/search","source":"openapi3","version":2},"g":{"query":[{"a":true,"k":"query","n":"fetch_detail","or":"fetch_detail","r":false,"t":"`$BOOLEAN`","index$":0},{"a":true,"ex":25,"k":"query","n":"max_result","or":"max_result","r":false,"t":"`$INTEGER`","index$":1},{"a":true,"ex":"Apple Inc","k":"query","n":"query","or":"query","r":false,"t":"`$STRING`","index$":2},{"a":true,"k":"query","n":"state","or":"state","r":false,"t":"`$STRING`","index$":3}]},"k":"http","m":"GET","o":"/v1/business-entity/search","q":{"$action":"search","exist":["fetch_detail","max_result","query","state"]},"r":{},"s":[{"lit":"v1"},{"lit":"business-entity"},{"lit":"search"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"business_entity","name__orig":"business_entity","Name":"BusinessEntity","name_":"business_entity","name-":"business-entity","NAME":"BUSINESS_ENTITY","index$":1}, {"active":true,"entity":"business_entity","key$":"BasicBusinessEntityFlow","kind":"basic","name":"BasicBusinessEntityFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"business_entity_ref01","srcdatavar":"business_entity_ref01_data","suffix":"_dt0"},"m":{},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-business_entity_ref01"}}],"index$":0}]}, 'BusinessEntity', {"GET /v1/business-entity/search":{"protocol":"http","operationId":"searchBusinessEntities","responses":{"200":{"description":"Search results","content":{"application/json":{"schema":{"type":"object"}}}}},"parameters":[{"name":"query","in":"query","schema":{"type":"string","default":"Apple Inc"},"description":"Business name to search. Defaults to Apple Inc with a warning when omitted for marketplace/agent discovery.","index$":0},{"name":"states","in":"query","schema":{"type":"string"},"description":"Comma-separated state codes (default: NY with warning). Also accepts 'state' param.","index$":1},{"name":"maxResults","in":"query","schema":{"type":"integer","default":25},"description":"Maximum records to return across the response","index$":2},{"name":"fetchDetails","in":"query","schema":{"type":"boolean"},"description":"Include full entity details","index$":3}],"securitySource":"unspecified"}})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let business_entity_ref01_data = Object.values(setup.data.existing.business_entity)[0] as any

    // LOAD
    const business_entity_ref01_ent = client.BusinessEntity()
    const business_entity_ref01_match_dt0: any = {}
    const business_entity_ref01_data_dt0 = (await business_entity_ref01_ent.load(business_entity_ref01_match_dt0)).data()
    assert(null != business_entity_ref01_data_dt0)


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/business_entity/BusinessEntityTestData.json')

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
    ['business_entity01','business_entity02','business_entity03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'AUTOSCRAPE_TEST_BUSINESS_ENTITY_ENTID': idmap,
    'AUTOSCRAPE_TEST_LIVE': 'FALSE',
    'AUTOSCRAPE_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['AUTOSCRAPE_TEST_BUSINESS_ENTITY_ENTID']

  const live = 'TRUE' === env.AUTOSCRAPE_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['AUTOSCRAPE_TEST_BUSINESS_ENTITY_ENTID']
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
  
