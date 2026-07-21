
import { test, describe } from 'node:test'
import { equal } from 'node:assert'


import { AutoscrapeSDK } from '..'


describe('exists', async () => {

  test('test-mode', async () => {
    const testsdk = await AutoscrapeSDK.test()
    equal(null !== testsdk, true)
  })

})
