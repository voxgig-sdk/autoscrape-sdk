<?php
declare(strict_types=1);

// BusinessEntity entity test

require_once __DIR__ . '/../autoscrape_sdk.php';
require_once __DIR__ . '/Runner.php';

use PHPUnit\Framework\TestCase;
use Voxgig\Struct\Struct as Vs;

class BusinessEntityEntityTest extends TestCase
{
    public function test_create_instance(): void
    {
        $testsdk = AutoscrapeSDK::test(null, null);
        $ent = $testsdk->BusinessEntity(null);
        $this->assertNotNull($ent);
    }

    public function test_basic_flow(): void
    {
        $setup = business_entity_basic_setup(null);
        // Per-op sdk-test-control.json skip.
        $_live = !empty($setup["live"]);
        foreach (["load"] as $_op) {
            [$_shouldSkip, $_reason] = Runner::is_control_skipped("entityOp", "business_entity." . $_op, $_live ? "live" : "unit");
            if ($_shouldSkip) {
                $this->markTestSkipped($_reason ?? "skipped via sdk-test-control.json");
                return;
            }
        }
        // The basic flow consumes synthetic IDs from the fixture. In live mode
        // without an *_ENTID env override, those IDs hit the live API and 4xx.
        if (!empty($setup["synthetic_only"])) {
            $this->markTestSkipped("live entity test uses synthetic IDs from fixture — set AUTOSCRAPE_TEST_BUSINESS_ENTITY_ENTID JSON to run live");
            return;
        }
        $client = $setup["client"];

        // Bootstrap entity data from existing test data.
        $business_entity_ref01_data_raw = Vs::items(Helpers::to_map(
            Vs::getpath($setup["data"], "existing.business_entity")));
        $business_entity_ref01_data = null;
        if (count($business_entity_ref01_data_raw) > 0) {
            $business_entity_ref01_data = Helpers::to_map($business_entity_ref01_data_raw[0][1]);
        }

        // LOAD
        $business_entity_ref01_ent = $client->BusinessEntity(null);
        $business_entity_ref01_match_dt0 = [];
        $business_entity_ref01_data_dt0_loaded = $business_entity_ref01_ent->load($business_entity_ref01_match_dt0, null);
        $this->assertNotNull($business_entity_ref01_data_dt0_loaded);

    }
}

function business_entity_basic_setup($extra)
{
    Runner::load_env_local();

    $entity_data_file = __DIR__ . '/../../.sdk/test/entity/business_entity/BusinessEntityTestData.json';
    $entity_data_source = file_get_contents($entity_data_file);
    $entity_data = json_decode($entity_data_source, true);

    $options = [];
    $options["entity"] = $entity_data["existing"];

    $client = AutoscrapeSDK::test($options, $extra);

    // Generate idmap.
    $idmap = [];
    foreach (["business_entity01", "business_entity02", "business_entity03"] as $k) {
        $idmap[$k] = strtoupper($k);
    }

    // Detect ENTID env override before envOverride consumes it. When live
    // mode is on without a real override, the basic test runs against synthetic
    // IDs from the fixture and 4xx's. Surface this so the test can skip.
    $entid_env_raw = getenv("AUTOSCRAPE_TEST_BUSINESS_ENTITY_ENTID");
    $idmap_overridden = $entid_env_raw !== false && str_starts_with(trim($entid_env_raw), "{");

    $env = Runner::env_override([
        "AUTOSCRAPE_TEST_BUSINESS_ENTITY_ENTID" => $idmap,
        "AUTOSCRAPE_TEST_LIVE" => "FALSE",
        "AUTOSCRAPE_TEST_EXPLAIN" => "FALSE",
    ]);

    $idmap_resolved = Helpers::to_map(
        $env["AUTOSCRAPE_TEST_BUSINESS_ENTITY_ENTID"]);
    if ($idmap_resolved === null) {
        $idmap_resolved = Helpers::to_map($idmap);
    }

    if ($env["AUTOSCRAPE_TEST_LIVE"] === "TRUE") {
        $merged_opts = Vs::merge([
            [
            ],
            $extra ?? [],
        ]);
        $client = new AutoscrapeSDK(Helpers::to_map($merged_opts));
    }

    $live = $env["AUTOSCRAPE_TEST_LIVE"] === "TRUE";
    return [
        "client" => $client,
        "data" => $entity_data,
        "idmap" => $idmap_resolved,
        "env" => $env,
        "explain" => $env["AUTOSCRAPE_TEST_EXPLAIN"] === "TRUE",
        "live" => $live,
        "synthetic_only" => $live && !$idmap_overridden,
        "now" => (int)(microtime(true) * 1000),
    ];
}
