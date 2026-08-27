# Typed models for the Autoscrape SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
# params (op.<name>.points[].args.params[]). Field/param types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Do not edit by hand.
#
# These are TypedDicts, not dataclasses: the SDK ops return/accept plain dicts
# at runtime, and a TypedDict IS a dict shape, so the types match the runtime.
# Optional (req:false) keys are modelled as TypedDict key-optionality
# (total=False), split into a required base + total=False subclass when a type
# has both required and optional keys.

from __future__ import annotations

from typing import TypedDict, Any


class BuildingPermit(TypedDict):
    pass


class BuildingPermitLoadMatch(TypedDict, total=False):
    city: str
    date_from: str
    date_to: str
    keyword: str
    max_result: int
    permit_type: str
    query: str


class BusinessEntity(TypedDict):
    pass


class BusinessEntityLoadMatch(TypedDict, total=False):
    fetch_detail: bool
    max_result: int
    query: str
    state: str


class Irs990(TypedDict):
    pass


class Irs990LoadMatch(TypedDict, total=False):
    ein: str
    fetch_detail: bool
    max_result: int
    query: str
    state: str


class SecEdgar(TypedDict):
    pass


class SecEdgarLoadMatch(TypedDict, total=False):
    cik: str
    date_from: str
    date_to: str
    form_type: str
    max_filing: int
    query: str
    ticker: str


class StockData(TypedDict):
    pass


class StockDataLoadMatchRequired(TypedDict):
    symbol: str


class StockDataLoadMatch(StockDataLoadMatchRequired, total=False):
    interval: str
    range: str


class Whoi(TypedDict):
    pass


class WhoiLoadMatch(TypedDict, total=False):
    domain: str


class X402Paid(TypedDict):
    pass


class X402PaidLoadMatch(TypedDict, total=False):
    cik: str
    date_from: str
    date_to: str
    form_type: str
    max_filing: int
    query: str
    ticker: str
