
import { Context } from './Context'


class AutoscrapeError extends Error {

  isAutoscrapeError = true

  sdk = 'Autoscrape'

  code: string
  ctx: Context

  constructor(code: string, msg: string, ctx: Context) {
    super(msg)
    this.code = code
    this.ctx = ctx
  }

}

export {
  AutoscrapeError
}

