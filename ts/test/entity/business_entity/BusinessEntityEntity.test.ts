

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
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":[],"name":"business_entity","op":{"load":{"input":"data","name":"load","points":[{"active":true,"args":{"query":[{"active":true,"kind":"query","name":"fetch_detail","orig":"fetch_detail","reqd":false,"type":"`$BOOLEAN`","index$":0},{"active":true,"example":25,"kind":"query","name":"max_result","orig":"max_result","reqd":false,"type":"`$INTEGER`","index$":1},{"active":true,"example":"Apple Inc","kind":"query","name":"query","orig":"query","reqd":false,"type":"`$STRING`","index$":2},{"active":true,"kind":"query","name":"state","orig":"state","reqd":false,"type":"`$STRING`","index$":3}]},"contract":{"id":"GET /v1/business-entity/search","json":"{\"operationId\":\"searchBusinessEntities\",\"parameters\":[{\"description\":\"Business name to search. Defaults to Apple Inc with a warning when omitted for marketplace/agent discovery.\",\"in\":\"query\",\"name\":\"query\",\"schema\":{\"default\":\"Apple Inc\",\"type\":\"string\"}},{\"description\":\"Comma-separated state codes (default: NY with warning). Also accepts 'state' param.\",\"in\":\"query\",\"name\":\"states\",\"schema\":{\"type\":\"string\"}},{\"description\":\"Maximum records to return across the response\",\"in\":\"query\",\"name\":\"maxResults\",\"schema\":{\"default\":25,\"type\":\"integer\"}},{\"description\":\"Include full entity details\",\"in\":\"query\",\"name\":\"fetchDetails\",\"schema\":{\"type\":\"boolean\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"type\":\"object\"}}},\"description\":\"Search results\"}},\"securitySource\":\"unspecified\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/v1/business-entity/search","segments":[{"lit":"v1"},{"lit":"business-entity"},{"lit":"search"}],"select":{"$action":"search","exist":["fetch_detail","max_result","query","state"]},"transform":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"business_entity","name__orig":"business_entity","Name":"BusinessEntity","name_":"business_entity","name-":"business-entity","NAME":"BUSINESS_ENTITY","index$":1}, {"active":true,"entity":"business_entity","key$":"BasicBusinessEntityFlow","kind":"basic","name":"BasicBusinessEntityFlow","param":{},"step":[{"active":true,"data":{},"input":{"ref":"business_entity_ref01","srcdatavar":"business_entity_ref01_data","suffix":"_dt0"},"match":{},"op":"load","spec":[],"valid":[{"apply":"TextFieldMark","def":{"mark":"Mark01-business_entity_ref01"}}],"index$":0}]}, 'BusinessEntity')
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
  
