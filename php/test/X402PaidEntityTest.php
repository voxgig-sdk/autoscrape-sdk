<?php
declare(strict_types=1);

// X402Paid entity test

require_once __DIR__ . '/../autoscrape_sdk.php';
require_once __DIR__ . '/Runner.php';

use PHPUnit\Framework\TestCase;
use Voxgig\Struct\Struct as Vs;

class X402PaidEntityTest extends TestCase
{
    public function test_create_instance(): void
    {
        $testsdk = AutoscrapeSDK::test(null, null);
        $ent = $testsdk->X402Paid(null);
        $this->assertNotNull($ent);
    }

    public function test_basic_flow(): void
    {
        $setup = x402_paid_basic_setup(null);
        // Per-op sdk-test-control.json skip.
        $_live = !empty($setup["live"]);
        foreach (["load"] as $_op) {
            [$_shouldSkip, $_reason] = Runner::is_control_skipped("entityOp", "x402_paid." . $_op, $_live ? "live" : "unit");
            if ($_shouldSkip) {
                $this->markTestSkipped($_reason ?? "skipped via sdk-test-control.json");
                return;
            }
        }
        // The basic flow consumes synthetic IDs from the fixture. In live mode
        // without an *_ENTID env override, those IDs hit the live API and 4xx.
        if (!empty($setup["synthetic_only"])) {
            $this->markTestSkipped("live entity test uses synthetic IDs from fixture — set AUTOSCRAPE_TEST_X____PAID_ENTID JSON to run live");
            return;
        }
        $client = $setup["client"];

        // Bootstrap entity data from existing test data.
        $x402_paid_ref01_data_raw = Vs::items(Helpers::to_map(
            Vs::getpath($setup["data"], "existing.x402_paid")));
        $x402_paid_ref01_data = null;
        if (count($x402_paid_ref01_data_raw) > 0) {
            $x402_paid_ref01_data = Helpers::to_map($x402_paid_ref01_data_raw[0][1]);
        }

        // LOAD
        $x402_paid_ref01_ent = $client->X402Paid(null);
        $x402_paid_ref01_match_dt0 = [];
        $x402_paid_ref01_data_dt0_loaded = $x402_paid_ref01_ent->load($x402_paid_ref01_match_dt0, null);
        $this->assertNotNull($x402_paid_ref01_data_dt0_loaded);

    }
}

function x402_paid_basic_setup($extra)
{
    Runner::load_env_local();

    $entity_data_file = __DIR__ . '/../../.sdk/test/entity/x402_paid/X402PaidTestData.json';
    $entity_data_source = file_get_contents($entity_data_file);
    $entity_data = json_decode($entity_data_source, true);

    $options = [];
    $options["entity"] = $entity_data["existing"];

    $client = AutoscrapeSDK::test($options, $extra);

    // Generate idmap.
    $idmap = [];
    foreach (["x402_paid01", "x402_paid02", "x402_paid03"] as $k) {
        $idmap[$k] = strtoupper($k);
    }

    // Detect ENTID env override before envOverride consumes it. When live
    // mode is on without a real override, the basic test runs against synthetic
    // IDs from the fixture and 4xx's. Surface this so the test can skip.
    $entid_env_raw = getenv("AUTOSCRAPE_TEST_X____PAID_ENTID");
    $idmap_overridden = $entid_env_raw !== false && str_starts_with(trim($entid_env_raw), "{");

    $env = Runner::env_override([
        "AUTOSCRAPE_TEST_X____PAID_ENTID" => $idmap,
        "AUTOSCRAPE_TEST_LIVE" => "FALSE",
        "AUTOSCRAPE_TEST_EXPLAIN" => "FALSE",
    ]);

    $idmap_resolved = Helpers::to_map(
        $env["AUTOSCRAPE_TEST_X____PAID_ENTID"]);
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
