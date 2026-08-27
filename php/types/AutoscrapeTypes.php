<?php
declare(strict_types=1);

// Typed models for the Autoscrape SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.
//
// These are documentation-grade value objects (PHP 8 typed properties),
// registered on the composer classmap autoload. The SDK boundary exchanges
// assoc-arrays; these classes name the shapes for tooling and typed callers.

/** BuildingPermit entity data model. */
class BuildingPermit
{
}

/** Request payload for BuildingPermit#load. */
class BuildingPermitLoadMatch
{
    public ?string $city = null;
    public ?string $date_from = null;
    public ?string $date_to = null;
    public ?string $keyword = null;
    public ?int $max_result = null;
    public ?string $permit_type = null;
    public ?string $query = null;
}

/** BusinessEntity entity data model. */
class BusinessEntity
{
}

/** Request payload for BusinessEntity#load. */
class BusinessEntityLoadMatch
{
    public ?bool $fetch_detail = null;
    public ?int $max_result = null;
    public ?string $query = null;
    public ?string $state = null;
}

/** Irs990 entity data model. */
class Irs990
{
}

/** Request payload for Irs990#load. */
class Irs990LoadMatch
{
    public ?string $ein = null;
    public ?bool $fetch_detail = null;
    public ?int $max_result = null;
    public ?string $query = null;
    public ?string $state = null;
}

/** SecEdgar entity data model. */
class SecEdgar
{
}

/** Request payload for SecEdgar#load. */
class SecEdgarLoadMatch
{
    public ?string $cik = null;
    public ?string $date_from = null;
    public ?string $date_to = null;
    public ?string $form_type = null;
    public ?int $max_filing = null;
    public ?string $query = null;
    public ?string $ticker = null;
}

/** StockData entity data model. */
class StockData
{
}

/** Request payload for StockData#load. */
class StockDataLoadMatch
{
    public ?string $interval = null;
    public ?string $range = null;
    public string $symbol;
}

/** Whoi entity data model. */
class Whoi
{
}

/** Request payload for Whoi#load. */
class WhoiLoadMatch
{
    public ?string $domain = null;
}

/** X402Paid entity data model. */
class X402Paid
{
}

/** Request payload for X402Paid#load. */
class X402PaidLoadMatch
{
    public ?string $cik = null;
    public ?string $date_from = null;
    public ?string $date_to = null;
    public ?string $form_type = null;
    public ?int $max_filing = null;
    public ?string $query = null;
    public ?string $ticker = null;
}

