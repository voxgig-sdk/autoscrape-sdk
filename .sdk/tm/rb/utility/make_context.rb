# Autoscrape SDK utility: make_context
require_relative '../core/context'
module AutoscrapeUtilities
  MakeContext = ->(ctxmap, basectx) {
    AutoscrapeContext.new(ctxmap, basectx)
  }
end
