
import { test, describe } from 'node:test'
import { equal } from 'node:assert'


import { AutoscrapeSDK } from '..'


describe('exists', async () => {

  test('test-mode', () => {
    const testsdk = AutoscrapeSDK.test()
    equal(testsdk instanceof AutoscrapeSDK, true,
      'AutoscrapeSDK.test() must return a client synchronously')
  })

})
