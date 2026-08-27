// Typed models for the Autoscrape SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.

export interface BuildingPermit {
}

export interface BuildingPermitLoadMatch {
  city?: string
  date_from?: string
  date_to?: string
  keyword?: string
  max_result?: number
  permit_type?: string
  query?: string

  // Selects a custom action instead of the plain load:
  //   'search'
  // The remaining keys are that action's own payload.
  $action?: string
  [action: string]: any
}

export interface BusinessEntity {
}

export interface BusinessEntityLoadMatch {
  fetch_detail?: boolean
  max_result?: number
  query?: string
  state?: string

  // Selects a custom action instead of the plain load:
  //   'search'
  // The remaining keys are that action's own payload.
  $action?: string
  [action: string]: any
}

export interface Irs990 {
}

export interface Irs990LoadMatch {
  ein?: string
  fetch_detail?: boolean
  max_result?: number
  query?: string
  state?: string

  // Selects a custom action instead of the plain load:
  //   'search'
  // The remaining keys are that action's own payload.
  $action?: string
  [action: string]: any
}

export interface SecEdgar {
}

export interface SecEdgarLoadMatch {
  cik?: string
  date_from?: string
  date_to?: string
  form_type?: string
  max_filing?: number
  query?: string
  ticker?: string

  // Selects a custom action instead of the plain load:
  //   'filing'
  // The remaining keys are that action's own payload.
  $action?: string
  [action: string]: any
}

export interface StockData {
}

export interface StockDataLoadMatch {
  interval?: string
  range?: string
  symbol: string
}

export interface Whoi {
}

export interface WhoiLoadMatch {
  domain?: string

  // Selects a custom action instead of the plain load:
  //   'lookup'
  // The remaining keys are that action's own payload.
  $action?: string
  [action: string]: any
}

export interface X402Paid {
}

export interface X402PaidLoadMatch {
  cik?: string
  date_from?: string
  date_to?: string
  form_type?: string
  max_filing?: number
  query?: string
  ticker?: string
}

