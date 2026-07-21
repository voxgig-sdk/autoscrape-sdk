<?php
declare(strict_types=1);

// Irs990 entity test

require_once __DIR__ . '/../autoscrape_sdk.php';
require_once __DIR__ . '/Runner.php';

use PHPUnit\Framework\TestCase;
use Voxgig\Struct\Struct as Vs;

class Irs990EntityTest extends TestCase
{
    public function test_create_instance(): void
    {
        $testsdk = AutoscrapeSDK::test(null, null);
        $ent = $testsdk->Irs990(null);
        $this->assertNotNull($ent);
    }

    public function test_basic_flow(): void
    {
        $setup = irs_990_basic_setup(null);
        // Per-op sdk-test-control.json skip.
        $_live = !empty($setup["live"]);
        foreach (["load"] as $_op) {
            [$_shouldSkip, $_reason] = Runner::is_control_skipped("entityOp", "irs_990." . $_op, $_live ? "live" : "unit");
            if ($_shouldSkip) {
                $this->markTestSkipped($_reason ?? "skipped via sdk-test-control.json");
                return;
            }
        }
        // The basic flow consumes synthetic IDs from the fixture. In live mode
        // without an *_ENTID env override, those IDs hit the live API and 4xx.
        if (!empty($setup["synthetic_only"])) {
            $this->markTestSkipped("live entity test uses synthetic IDs from fixture — set AUTOSCRAPE_TEST_IRS_____ENTID JSON to run live");
            return;
        }
        $client = $setup["client"];

        // Bootstrap entity data from existing test data.
        $irs_990_ref01_data_raw = Vs::items(Helpers::to_map(
            Vs::getpath($setup["data"], "existing.irs_990")));
        $irs_990_ref01_data = null;
        if (count($irs_990_ref01_data_raw) > 0) {
            $irs_990_ref01_data = Helpers::to_map($irs_990_ref01_data_raw[0][1]);
        }

        // LOAD
        $irs_990_ref01_ent = $client->Irs990(null);
        $irs_990_ref01_match_dt0 = [];
        $irs_990_ref01_data_dt0_loaded = $irs_990_ref01_ent->load($irs_990_ref01_match_dt0, null);
        $this->assertNotNull($irs_990_ref01_data_dt0_loaded);

    }
}

function irs_990_basic_setup($extra)
{
    Runner::load_env_local();

    $entity_data_file = __DIR__ . '/../../.sdk/test/entity/irs_990/Irs990TestData.json';
    $entity_data_source = file_get_contents($entity_data_file);
    $entity_data = json_decode($entity_data_source, true);

    $options = [];
    $options["entity"] = $entity_data["existing"];

    $client = AutoscrapeSDK::test($options, $extra);

    // Generate idmap.
    $idmap = [];
    foreach (["irs_99001", "irs_99002", "irs_99003"] as $k) {
        $idmap[$k] = strtoupper($k);
    }

    // Detect ENTID env override before envOverride consumes it. When live
    // mode is on without a real override, the basic test runs against synthetic
    // IDs from the fixture and 4xx's. Surface this so the test can skip.
    $entid_env_raw = getenv("AUTOSCRAPE_TEST_IRS_____ENTID");
    $idmap_overridden = $entid_env_raw !== false && str_starts_with(trim($entid_env_raw), "{");

    $env = Runner::env_override([
        "AUTOSCRAPE_TEST_IRS_____ENTID" => $idmap,
        "AUTOSCRAPE_TEST_LIVE" => "FALSE",
        "AUTOSCRAPE_TEST_EXPLAIN" => "FALSE",
    ]);

    $idmap_resolved = Helpers::to_map(
        $env["AUTOSCRAPE_TEST_IRS_____ENTID"]);
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
