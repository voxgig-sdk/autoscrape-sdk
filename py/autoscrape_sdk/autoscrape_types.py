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


class BuildingPermitLoadMatch(TypedDict):
    pass


class BusinessEntity(TypedDict):
    pass


class BusinessEntityLoadMatch(TypedDict):
    pass


class Irs990(TypedDict):
    pass


class Irs990LoadMatch(TypedDict):
    pass


class SecEdgar(TypedDict):
    pass


class SecEdgarLoadMatch(TypedDict):
    pass


class StockData(TypedDict):
    pass


class StockDataLoadMatch(TypedDict):
    pass


class Whoi(TypedDict):
    pass


class WhoiLoadMatch(TypedDict):
    pass


class X402Paid(TypedDict):
    pass


class X402PaidLoadMatch(TypedDict):
    pass
