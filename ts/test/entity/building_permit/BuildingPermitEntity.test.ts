

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


describe('BuildingPermitEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when AUTOSCRAPE_TEST_LIVE=TRUE.
  afterEach(liveDelay('AUTOSCRAPE_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = AutoscrapeSDK.test()
    const ent = testsdk.BuildingPermit()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.AUTOSCRAPE_TEST_LIVE
    for (const op of ['load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'building_permit.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":[],"name":"building_permit","op":{"load":{"input":"data","name":"load","points":[{"active":true,"args":{"query":[{"active":true,"example":"austin","kind":"query","name":"city","orig":"city","reqd":false,"type":"`$STRING`","index$":0},{"active":true,"kind":"query","name":"date_from","orig":"date_from","reqd":false,"type":"`$STRING`","index$":1},{"active":true,"kind":"query","name":"date_to","orig":"date_to","reqd":false,"type":"`$STRING`","index$":2},{"active":true,"kind":"query","name":"keyword","orig":"keyword","reqd":false,"type":"`$STRING`","index$":3},{"active":true,"example":25,"kind":"query","name":"max_result","orig":"max_result","reqd":false,"type":"`$INTEGER`","index$":4},{"active":true,"kind":"query","name":"permit_type","orig":"permit_type","reqd":false,"type":"`$STRING`","index$":5},{"active":true,"kind":"query","name":"query","orig":"query","reqd":false,"type":"`$STRING`","index$":6}]},"contract":{"id":"GET /v1/building-permits/search","json":"{\"operationId\":\"searchBuildingPermits\",\"parameters\":[{\"description\":\"City key such as austin, chicago, la, sf, seattle, denver, boston, portland, dallas, houston, or phoenix. Defaults to austin when omitted for agent discovery.\",\"in\":\"query\",\"name\":\"city\",\"schema\":{\"default\":\"austin\",\"type\":\"string\"}},{\"description\":\"Full-text search across public permit fields; query is accepted as an alias\",\"in\":\"query\",\"name\":\"keyword\",\"schema\":{\"type\":\"string\"}},{\"description\":\"Alias for keyword for agents that send a generic query parameter\",\"in\":\"query\",\"name\":\"query\",\"schema\":{\"type\":\"string\"}},{\"description\":\"Permit type filter\",\"in\":\"query\",\"name\":\"permitType\",\"schema\":{\"type\":\"string\"}},{\"description\":\"Issue/application date lower bound YYYY-MM-DD\",\"in\":\"query\",\"name\":\"dateFrom\",\"schema\":{\"format\":\"date\",\"type\":\"string\"}},{\"description\":\"Issue/application date upper bound YYYY-MM-DD\",\"in\":\"query\",\"name\":\"dateTo\",\"schema\":{\"format\":\"date\",\"type\":\"string\"}},{\"description\":\"Max results\",\"in\":\"query\",\"name\":\"maxResults\",\"schema\":{\"default\":25,\"maximum\":100,\"type\":\"integer\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"type\":\"object\"}}},\"description\":\"Permit lead records\"}},\"securitySource\":\"unspecified\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/v1/building-permits/search","segments":[{"lit":"v1"},{"lit":"building-permits"},{"lit":"search"}],"select":{"$action":"search","exist":["city","date_from","date_to","keyword","max_result","permit_type","query"]},"transform":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"building_permit","name__orig":"building_permit","Name":"BuildingPermit","name_":"building_permit","name-":"building-permit","NAME":"BUILDING_PERMIT","index$":0}, {"active":true,"entity":"building_permit","key$":"BasicBuildingPermitFlow","kind":"basic","name":"BasicBuildingPermitFlow","param":{},"step":[{"active":true,"data":{},"input":{"ref":"building_permit_ref01","srcdatavar":"building_permit_ref01_data","suffix":"_dt0"},"match":{},"op":"load","spec":[],"valid":[{"apply":"TextFieldMark","def":{"mark":"Mark01-building_permit_ref01"}}],"index$":0}]}, 'BuildingPermit')
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let building_permit_ref01_data = Object.values(setup.data.existing.building_permit)[0] as any

    // LOAD
    const building_permit_ref01_ent = client.BuildingPermit()
    const building_permit_ref01_match_dt0: any = {}
    const building_permit_ref01_data_dt0 = (await building_permit_ref01_ent.load(building_permit_ref01_match_dt0)).data()
    assert(null != building_permit_ref01_data_dt0)


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/building_permit/BuildingPermitTestData.json')

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
    ['building_permit01','building_permit02','building_permit03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'AUTOSCRAPE_TEST_BUILDING_PERMIT_ENTID': idmap,
    'AUTOSCRAPE_TEST_LIVE': 'FALSE',
    'AUTOSCRAPE_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['AUTOSCRAPE_TEST_BUILDING_PERMIT_ENTID']

  const live = 'TRUE' === env.AUTOSCRAPE_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['AUTOSCRAPE_TEST_BUILDING_PERMIT_ENTID']
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
  
