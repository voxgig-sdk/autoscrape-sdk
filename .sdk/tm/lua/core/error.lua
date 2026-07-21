-- Autoscrape SDK error

local AutoscrapeError = {}
AutoscrapeError.__index = AutoscrapeError


function AutoscrapeError.new(code, msg, ctx)
  local self = setmetatable({}, AutoscrapeError)
  self.is_sdk_error = true
  self.sdk = "Autoscrape"
  self.code = code or ""
  self.msg = msg or ""
  self.ctx = ctx
  self.result = nil
  self.spec = nil
  return self
end


function AutoscrapeError:error()
  return self.msg
end


function AutoscrapeError:__tostring()
  return self.msg
end


return AutoscrapeError
