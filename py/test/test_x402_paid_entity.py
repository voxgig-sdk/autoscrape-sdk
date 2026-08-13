# X402Paid entity test

import json
import os
import time

import pytest

from autoscrape_sdk.utility.voxgig_struct import voxgig_struct as vs
from autoscrape_sdk import AutoscrapeSDK
from autoscrape_sdk.core import helpers

_TEST_DIR = os.path.dirname(os.path.abspath(__file__))
from test import runner


class TestX402PaidEntity:

    def test_should_create_instance(self):
        testsdk = AutoscrapeSDK.test(None, None)
        ent = testsdk.X402Paid(None)
        assert ent is not None

    def test_should_run_basic_flow(self):
        setup = _x402_paid_basic_setup(None)
        # Per-op sdk-test-control.json skip — basic test exercises a flow with
        # multiple ops; skipping any one skips the whole flow (steps depend
        # on each other).
        _live = setup.get("live", False)
        for _op in ["load"]:
            _skip, _reason = runner.is_control_skipped("entityOp", "x402_paid." + _op, "live" if _live else "unit")
            if _skip:
                pytest.skip(_reason or "skipped via sdk-test-control.json")
                return
        # The basic flow consumes synthetic IDs from the fixture. In live mode
        # without an *_ENTID env override, those IDs hit the live API and 4xx.
        if setup.get("synthetic_only"):
            pytest.skip("live entity test uses synthetic IDs from fixture — "
                        "set AUTOSCRAPE_TEST_X402_PAID_ENTID JSON to run live")
        client = setup["client"]

        # Bootstrap entity data from existing test data.
        x402_paid_ref01_data_raw = vs.items(helpers.to_map(
            vs.getpath(setup["data"], "existing.x402_paid")))
        x402_paid_ref01_data = None
        if len(x402_paid_ref01_data_raw) > 0:
            x402_paid_ref01_data = helpers.to_map(x402_paid_ref01_data_raw[0][1])

        # LOAD
        x402_paid_ref01_ent = client.X402Paid(None)
        x402_paid_ref01_match_dt0 = {}
        x402_paid_ref01_data_dt0_loaded = x402_paid_ref01_ent.load(x402_paid_ref01_match_dt0, None)
        assert x402_paid_ref01_data_dt0_loaded is not None



def _x402_paid_basic_setup(extra):
    runner.load_env_local()

    entity_data_file = os.path.join(_TEST_DIR, "../../.sdk/test/entity/x402_paid/X402PaidTestData.json")
    with open(entity_data_file, "r") as f:
        entity_data_source = f.read()

    entity_data = json.loads(entity_data_source)

    options = {}
    options["entity"] = entity_data.get("existing")

    client = AutoscrapeSDK.test(options, extra)

    # Generate idmap via transform.
    idmap = vs.transform(
        ["x402_paid01", "x402_paid02", "x402_paid03"],
        {
            "`$PACK`": ["", {
                "`$KEY`": "`$COPY`",
                "`$VAL`": ["`$FORMAT`", "upper", "`$COPY`"],
            }],
        }
    )

    # Detect ENTID env override before envOverride consumes it. When live
    # mode is on without a real override, the basic test runs against synthetic
    # IDs from the fixture and 4xx's. We surface this so the test can skip.
    _entid_env_raw = os.environ.get(
        "AUTOSCRAPE_TEST_X402_PAID_ENTID")
    _idmap_overridden = _entid_env_raw is not None and _entid_env_raw.strip().startswith("{")

    env = runner.env_override({
        "AUTOSCRAPE_TEST_X402_PAID_ENTID": idmap,
        "AUTOSCRAPE_TEST_LIVE": "FALSE",
        "AUTOSCRAPE_TEST_EXPLAIN": "FALSE",
    })

    idmap_resolved = helpers.to_map(
        env.get("AUTOSCRAPE_TEST_X402_PAID_ENTID"))
    if idmap_resolved is None:
        idmap_resolved = helpers.to_map(idmap)

    if env.get("AUTOSCRAPE_TEST_LIVE") == "TRUE":
        merged_opts = vs.merge([
            {
            },
            extra or {},
        ])
        client = AutoscrapeSDK(helpers.to_map(merged_opts))

    _live = env.get("AUTOSCRAPE_TEST_LIVE") == "TRUE"
    return {
        "client": client,
        "data": entity_data,
        "idmap": idmap_resolved,
        "env": env,
        "explain": env.get("AUTOSCRAPE_TEST_EXPLAIN") == "TRUE",
        "live": _live,
        "synthetic_only": _live and not _idmap_overridden,
        "now": int(time.time() * 1000),
    }
