// Typed models for the Autoscrape SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.
package entity

import "encoding/json"

// BuildingPermit is the typed data model for the building_permit entity.
type BuildingPermit struct {
}

// BuildingPermitLoadMatch is the typed request payload for BuildingPermit.LoadTyped.
type BuildingPermitLoadMatch struct {
}

// BusinessEntity is the typed data model for the business_entity entity.
type BusinessEntity struct {
}

// BusinessEntityLoadMatch is the typed request payload for BusinessEntity.LoadTyped.
type BusinessEntityLoadMatch struct {
}

// Irs990 is the typed data model for the irs_990 entity.
type Irs990 struct {
}

// Irs990LoadMatch is the typed request payload for Irs990.LoadTyped.
type Irs990LoadMatch struct {
}

// SecEdgar is the typed data model for the sec_edgar entity.
type SecEdgar struct {
}

// SecEdgarLoadMatch is the typed request payload for SecEdgar.LoadTyped.
type SecEdgarLoadMatch struct {
}

// StockData is the typed data model for the stock_data entity.
type StockData struct {
}

// StockDataLoadMatch is the typed request payload for StockData.LoadTyped.
type StockDataLoadMatch struct {
}

// Whoi is the typed data model for the whoi entity.
type Whoi struct {
}

// WhoiLoadMatch is the typed request payload for Whoi.LoadTyped.
type WhoiLoadMatch struct {
}

// X402Paid is the typed data model for the x402_paid entity.
type X402Paid struct {
}

// X402PaidLoadMatch is the typed request payload for X402Paid.LoadTyped.
type X402PaidLoadMatch struct {
}

// asMap turns a typed request/data struct into the map[string]any the
// runtime op pipeline consumes, honouring the json tags above.
func asMap(v any) map[string]any {
	out := map[string]any{}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}

// typedFrom decodes a runtime value (a map[string]any produced by the op
// pipeline) into a typed model T via a JSON round-trip. On any error it
// returns the zero value of T; the op's own (value, error) tuple carries the
// real error.
func typedFrom[T any](v any) T {
	var out T
	if v == nil {
		return out
	}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}

// typedSliceFrom decodes a runtime list value ([]any of maps) into a typed
// slice []T via a JSON round-trip, for list ops.
func typedSliceFrom[T any](v any) []T {
	var out []T
	if v == nil {
		return out
	}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}
