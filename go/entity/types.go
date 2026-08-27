// Typed models for the Autoscrape SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.
package entity

import (
	"encoding/json"

	"github.com/voxgig-sdk/autoscrape-sdk/go/core"
)

// BuildingPermit is the typed data model for the building_permit entity.
type BuildingPermit struct {
}

// BuildingPermitLoadMatch is the typed request payload for BuildingPermit.LoadTyped.
type BuildingPermitLoadMatch struct {
	City *string `json:"city,omitempty"`
	DateFrom *string `json:"date_from,omitempty"`
	DateTo *string `json:"date_to,omitempty"`
	Keyword *string `json:"keyword,omitempty"`
	MaxResult *int `json:"max_result,omitempty"`
	PermitType *string `json:"permit_type,omitempty"`
	Query *string `json:"query,omitempty"`
}

// BusinessEntity is the typed data model for the business_entity entity.
type BusinessEntity struct {
}

// BusinessEntityLoadMatch is the typed request payload for BusinessEntity.LoadTyped.
type BusinessEntityLoadMatch struct {
	FetchDetail *bool `json:"fetch_detail,omitempty"`
	MaxResult *int `json:"max_result,omitempty"`
	Query *string `json:"query,omitempty"`
	State *string `json:"state,omitempty"`
}

// Irs990 is the typed data model for the irs_990 entity.
type Irs990 struct {
}

// Irs990LoadMatch is the typed request payload for Irs990.LoadTyped.
type Irs990LoadMatch struct {
	Ein *string `json:"ein,omitempty"`
	FetchDetail *bool `json:"fetch_detail,omitempty"`
	MaxResult *int `json:"max_result,omitempty"`
	Query *string `json:"query,omitempty"`
	State *string `json:"state,omitempty"`
}

// SecEdgar is the typed data model for the sec_edgar entity.
type SecEdgar struct {
}

// SecEdgarLoadMatch is the typed request payload for SecEdgar.LoadTyped.
type SecEdgarLoadMatch struct {
	Cik *string `json:"cik,omitempty"`
	DateFrom *string `json:"date_from,omitempty"`
	DateTo *string `json:"date_to,omitempty"`
	FormType *string `json:"form_type,omitempty"`
	MaxFiling *int `json:"max_filing,omitempty"`
	Query *string `json:"query,omitempty"`
	Ticker *string `json:"ticker,omitempty"`
}

// StockData is the typed data model for the stock_data entity.
type StockData struct {
}

// StockDataLoadMatch is the typed request payload for StockData.LoadTyped.
type StockDataLoadMatch struct {
	Interval *string `json:"interval,omitempty"`
	Range *string `json:"range,omitempty"`
	Symbol string `json:"symbol"`
}

// Whoi is the typed data model for the whoi entity.
type Whoi struct {
}

// WhoiLoadMatch is the typed request payload for Whoi.LoadTyped.
type WhoiLoadMatch struct {
	Domain *string `json:"domain,omitempty"`
}

// X402Paid is the typed data model for the x402_paid entity.
type X402Paid struct {
}

// X402PaidLoadMatch is the typed request payload for X402Paid.LoadTyped.
type X402PaidLoadMatch struct {
	Cik *string `json:"cik,omitempty"`
	DateFrom *string `json:"date_from,omitempty"`
	DateTo *string `json:"date_to,omitempty"`
	FormType *string `json:"form_type,omitempty"`
	MaxFiling *int `json:"max_filing,omitempty"`
	Query *string `json:"query,omitempty"`
	Ticker *string `json:"ticker,omitempty"`
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

// entityData unwraps an entity to its data map.
//
// Operations resolve to the ENTITY, not the raw data (see AGENTS.md), and an
// entity's fields are UNEXPORTED — marshalling one directly yields `{}`, so
// every typed accessor would silently hand back a zero-valued struct. The
// typed boundary therefore takes the data hop first.
func entityData(v any) any {
	if ent, ok := v.(core.Entity); ok {
		return ent.Data()
	}
	return v
}

// typedFrom decodes a runtime value (an entity, or the map[string]any the op
// pipeline produced) into a typed model T via a JSON round-trip. On any error
// it returns the zero value of T; the op's own (value, error) tuple carries
// the real error.
func typedFrom[T any](v any) T {
	var out T
	v = entityData(v)
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

// typedSliceFrom decodes a runtime list value into a typed slice []T via a
// JSON round-trip, for list ops. `list` resolves to a slice of ENTITY
// instances, so each element takes the data hop.
func typedSliceFrom[T any](v any) []T {
	var out []T
	if v == nil {
		return out
	}
	if list, ok := v.([]any); ok {
		unwrapped := make([]any, 0, len(list))
		for _, item := range list {
			unwrapped = append(unwrapped, entityData(item))
		}
		v = unwrapped
	}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}
