# BuildingPermit entity test

require "minitest/autorun"
require "json"
require_relative "../Autoscrape_sdk"
require_relative "runner"

class BuildingPermitEntityTest < Minitest::Test
  def test_create_instance
    testsdk = AutoscrapeSDK.test(nil, nil)
    ent = testsdk.BuildingPermit(nil)
    assert !ent.nil?
  end

  def test_basic_flow
    setup = building_permit_basic_setup(nil)
    # Per-op sdk-test-control.json skip.
    _live = setup[:live] || false
    ["load"].each do |_op|
      _should_skip, _reason = Runner.is_control_skipped("entityOp", "building_permit." + _op, _live ? "live" : "unit")
      if _should_skip
        skip(_reason || "skipped via sdk-test-control.json")
        return
      end
    end
    # The basic flow consumes synthetic IDs from the fixture. In live mode
    # without an *_ENTID env override, those IDs hit the live API and 4xx.
    if setup[:synthetic_only]
      skip "live entity test uses synthetic IDs from fixture — set AUTOSCRAPE_TEST_BUILDING_PERMIT_ENTID JSON to run live"
      return
    end
    client = setup[:client]

    # Bootstrap entity data from existing test data.
    building_permit_ref01_data_raw = Vs.items(Helpers.to_map(
      Vs.getpath(setup[:data], "existing.building_permit")))
    building_permit_ref01_data = nil
    if building_permit_ref01_data_raw.length > 0
      building_permit_ref01_data = Helpers.to_map(building_permit_ref01_data_raw[0][1])
    end

    # LOAD
    building_permit_ref01_ent = client.BuildingPermit(nil)
    building_permit_ref01_match_dt0 = {}
    building_permit_ref01_data_dt0_loaded = building_permit_ref01_ent.load(building_permit_ref01_match_dt0, nil)
    assert !building_permit_ref01_data_dt0_loaded.nil?

  end
end

def building_permit_basic_setup(extra)
  Runner.load_env_local

  entity_data_file = File.join(__dir__, "..", "..", ".sdk", "test", "entity", "building_permit", "BuildingPermitTestData.json")
  entity_data_source = File.read(entity_data_file)
  entity_data = JSON.parse(entity_data_source)

  options = {}
  options["entity"] = entity_data["existing"]

  client = AutoscrapeSDK.test(options, extra)

  # Generate idmap via transform.
  idmap = Vs.transform(
    ["building_permit01", "building_permit02", "building_permit03"],
    {
      "`$PACK`" => ["", {
        "`$KEY`" => "`$COPY`",
        "`$VAL`" => ["`$FORMAT`", "upper", "`$COPY`"],
      }],
    }
  )

  # Detect ENTID env override before envOverride consumes it. When live
  # mode is on without a real override, the basic test runs against synthetic
  # IDs from the fixture and 4xx's. Surface this so the test can skip.
  entid_env_raw = ENV["AUTOSCRAPE_TEST_BUILDING_PERMIT_ENTID"]
  idmap_overridden = !entid_env_raw.nil? && entid_env_raw.strip.start_with?("{")

  env = Runner.env_override({
    "AUTOSCRAPE_TEST_BUILDING_PERMIT_ENTID" => idmap,
    "AUTOSCRAPE_TEST_LIVE" => "FALSE",
    "AUTOSCRAPE_TEST_EXPLAIN" => "FALSE",
  })

  idmap_resolved = Helpers.to_map(
    env["AUTOSCRAPE_TEST_BUILDING_PERMIT_ENTID"])
  if idmap_resolved.nil?
    idmap_resolved = Helpers.to_map(idmap)
  end

  if env["AUTOSCRAPE_TEST_LIVE"] == "TRUE"
    merged_opts = Vs.merge([
      {
      },
      extra || {},
    ])
    client = AutoscrapeSDK.new(Helpers.to_map(merged_opts))
  end

  live = env["AUTOSCRAPE_TEST_LIVE"] == "TRUE"
  {
    client: client,
    data: entity_data,
    idmap: idmap_resolved,
    env: env,
    explain: env["AUTOSCRAPE_TEST_EXPLAIN"] == "TRUE",
    live: live,
    synthetic_only: live && !idmap_overridden,
    now: (Time.now.to_f * 1000).to_i,
  }
end
