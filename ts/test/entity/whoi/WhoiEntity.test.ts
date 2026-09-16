

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


describe('WhoiEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when AUTOSCRAPE_TEST_LIVE=TRUE.
  afterEach(liveDelay('AUTOSCRAPE_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = AutoscrapeSDK.test()
    const ent = testsdk.Whoi()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.AUTOSCRAPE_TEST_LIVE
    for (const op of ['load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'whoi.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":[],"name":"whoi","op":{"load":{"input":"data","name":"load","points":[{"active":true,"args":{"query":[{"active":true,"example":"apple.com","kind":"query","name":"domain","orig":"domain","reqd":false,"type":"`$STRING`","index$":0}]},"contract":{"id":"GET /v1/whois/lookup","json":"{\"operationId\":\"whoisLookup\",\"parameters\":[{\"description\":\"Domain name to look up. Defaults to apple.com when omitted for agent discovery.\",\"in\":\"query\",\"name\":\"domain\",\"schema\":{\"default\":\"apple.com\",\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"type\":\"object\"}}},\"description\":\"WHOIS data\"}},\"securitySource\":\"unspecified\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/v1/whois/lookup","segments":[{"lit":"v1"},{"lit":"whois"},{"lit":"lookup"}],"select":{"$action":"lookup","exist":["domain"]},"transform":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"whoi","name__orig":"whoi","Name":"Whoi","name_":"whoi","name-":"whoi","NAME":"WHOI","index$":5}, {"active":true,"entity":"whoi","key$":"BasicWhoiFlow","kind":"basic","name":"BasicWhoiFlow","param":{},"step":[{"active":true,"data":{},"input":{"ref":"whoi_ref01","srcdatavar":"whoi_ref01_data","suffix":"_dt0"},"match":{},"op":"load","spec":[],"valid":[{"apply":"TextFieldMark","def":{"mark":"Mark01-whoi_ref01"}}],"index$":0}]}, 'Whoi')
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let whoi_ref01_data = Object.values(setup.data.existing.whoi)[0] as any

    // LOAD
    const whoi_ref01_ent = client.Whoi()
    const whoi_ref01_match_dt0: any = {}
    const whoi_ref01_data_dt0 = (await whoi_ref01_ent.load(whoi_ref01_match_dt0)).data()
    assert(null != whoi_ref01_data_dt0)


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/whoi/WhoiTestData.json')

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
    ['whoi01','whoi02','whoi03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'AUTOSCRAPE_TEST_WHOI_ENTID': idmap,
    'AUTOSCRAPE_TEST_LIVE': 'FALSE',
    'AUTOSCRAPE_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['AUTOSCRAPE_TEST_WHOI_ENTID']

  const live = 'TRUE' === env.AUTOSCRAPE_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['AUTOSCRAPE_TEST_WHOI_ENTID']
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
  
