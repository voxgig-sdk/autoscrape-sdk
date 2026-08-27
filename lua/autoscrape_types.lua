-- Typed models for the Autoscrape SDK (LuaLS annotations).
--
-- GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
-- params (op.<name>.points[].args.params[]). Field/param types come from the
-- canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
-- @voxgig/apidef VALID_CANON). Annotations only — no runtime effect. Do not
-- edit by hand.

---@class BuildingPermit

---@class BuildingPermitLoadMatch
---@field city? string
---@field date_from? string
---@field date_to? string
---@field keyword? string
---@field max_result? number
---@field permit_type? string
---@field query? string

---@class BusinessEntity

---@class BusinessEntityLoadMatch
---@field fetch_detail? boolean
---@field max_result? number
---@field query? string
---@field state? string

---@class Irs990

---@class Irs990LoadMatch
---@field ein? string
---@field fetch_detail? boolean
---@field max_result? number
---@field query? string
---@field state? string

---@class SecEdgar

---@class SecEdgarLoadMatch
---@field cik? string
---@field date_from? string
---@field date_to? string
---@field form_type? string
---@field max_filing? number
---@field query? string
---@field ticker? string

---@class StockData

---@class StockDataLoadMatch
---@field interval? string
---@field range? string
---@field symbol string

---@class Whoi

---@class WhoiLoadMatch
---@field domain? string

---@class X402Paid

---@class X402PaidLoadMatch
---@field cik? string
---@field date_from? string
---@field date_to? string
---@field form_type? string
---@field max_filing? number
---@field query? string
---@field ticker? string

local M = {}

return M
