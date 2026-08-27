# frozen_string_literal: true

# Typed models for the Autoscrape SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
# params (op.<name>.points[].args.params[]). Member types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Ruby types are unenforced; these YARD
# annotations document the shapes. Do not edit by hand.

# BuildingPermit entity data model.
class BuildingPermit
end

# Request payload for BuildingPermit#load.
#
# @!attribute [rw] city
#   @return [String, nil]
#
# @!attribute [rw] date_from
#   @return [String, nil]
#
# @!attribute [rw] date_to
#   @return [String, nil]
#
# @!attribute [rw] keyword
#   @return [String, nil]
#
# @!attribute [rw] max_result
#   @return [Integer, nil]
#
# @!attribute [rw] permit_type
#   @return [String, nil]
#
# @!attribute [rw] query
#   @return [String, nil]
BuildingPermitLoadMatch = Struct.new(
  :city,
  :date_from,
  :date_to,
  :keyword,
  :max_result,
  :permit_type,
  :query,
  keyword_init: true
)

# BusinessEntity entity data model.
class BusinessEntity
end

# Request payload for BusinessEntity#load.
#
# @!attribute [rw] fetch_detail
#   @return [Boolean, nil]
#
# @!attribute [rw] max_result
#   @return [Integer, nil]
#
# @!attribute [rw] query
#   @return [String, nil]
#
# @!attribute [rw] state
#   @return [String, nil]
BusinessEntityLoadMatch = Struct.new(
  :fetch_detail,
  :max_result,
  :query,
  :state,
  keyword_init: true
)

# Irs990 entity data model.
class Irs990
end

# Request payload for Irs990#load.
#
# @!attribute [rw] ein
#   @return [String, nil]
#
# @!attribute [rw] fetch_detail
#   @return [Boolean, nil]
#
# @!attribute [rw] max_result
#   @return [Integer, nil]
#
# @!attribute [rw] query
#   @return [String, nil]
#
# @!attribute [rw] state
#   @return [String, nil]
Irs990LoadMatch = Struct.new(
  :ein,
  :fetch_detail,
  :max_result,
  :query,
  :state,
  keyword_init: true
)

# SecEdgar entity data model.
class SecEdgar
end

# Request payload for SecEdgar#load.
#
# @!attribute [rw] cik
#   @return [String, nil]
#
# @!attribute [rw] date_from
#   @return [String, nil]
#
# @!attribute [rw] date_to
#   @return [String, nil]
#
# @!attribute [rw] form_type
#   @return [String, nil]
#
# @!attribute [rw] max_filing
#   @return [Integer, nil]
#
# @!attribute [rw] query
#   @return [String, nil]
#
# @!attribute [rw] ticker
#   @return [String, nil]
SecEdgarLoadMatch = Struct.new(
  :cik,
  :date_from,
  :date_to,
  :form_type,
  :max_filing,
  :query,
  :ticker,
  keyword_init: true
)

# StockData entity data model.
class StockData
end

# Request payload for StockData#load.
#
# @!attribute [rw] interval
#   @return [String, nil]
#
# @!attribute [rw] range
#   @return [String, nil]
#
# @!attribute [rw] symbol
#   @return [String]
StockDataLoadMatch = Struct.new(
  :interval,
  :range,
  :symbol,
  keyword_init: true
)

# Whoi entity data model.
class Whoi
end

# Request payload for Whoi#load.
#
# @!attribute [rw] domain
#   @return [String, nil]
WhoiLoadMatch = Struct.new(
  :domain,
  keyword_init: true
)

# X402Paid entity data model.
class X402Paid
end

# Request payload for X402Paid#load.
#
# @!attribute [rw] cik
#   @return [String, nil]
#
# @!attribute [rw] date_from
#   @return [String, nil]
#
# @!attribute [rw] date_to
#   @return [String, nil]
#
# @!attribute [rw] form_type
#   @return [String, nil]
#
# @!attribute [rw] max_filing
#   @return [Integer, nil]
#
# @!attribute [rw] query
#   @return [String, nil]
#
# @!attribute [rw] ticker
#   @return [String, nil]
X402PaidLoadMatch = Struct.new(
  :cik,
  :date_from,
  :date_to,
  :form_type,
  :max_filing,
  :query,
  :ticker,
  keyword_init: true
)

