package sdktest

import (
	"encoding/json"
	"os"
	"path/filepath"
	"runtime"
	"strings"
	"testing"
	"time"

	sdk "github.com/voxgig-sdk/autoscrape-sdk/go"
	"github.com/voxgig-sdk/autoscrape-sdk/go/core"

	vs "github.com/voxgig-sdk/autoscrape-sdk/go/utility/struct"
)

func TestSecEdgarEntity(t *testing.T) {
	t.Run("instance", func(t *testing.T) {
		testsdk := sdk.TestSDK(nil, nil)
		ent := testsdk.SecEdgar(nil)
		if ent == nil {
			t.Fatal("expected non-nil SecEdgarEntity")
		}
	})

	t.Run("basic", func(t *testing.T) {
		setup := sec_edgarBasicSetup(nil)
		// Per-op sdk-test-control.json skip — basic test exercises a flow
		// with multiple ops; skipping any op skips the whole flow.
		_mode := "unit"
		if setup.live {
			_mode = "live"
		}
		for _, _op := range []string{"load"} {
			if _shouldSkip, _reason := isControlSkipped("entityOp", "sec_edgar." + _op, _mode); _shouldSkip {
				if _reason == "" {
					_reason = "skipped via sdk-test-control.json"
				}
				t.Skip(_reason)
				return
			}
		}
		// The basic flow consumes synthetic IDs from the fixture. In live mode
		// without an *_ENTID env override, those IDs hit the live API and 4xx.
		if setup.syntheticOnly {
			t.Skip("live entity test uses synthetic IDs from fixture — set AUTOSCRAPE_TEST_SEC_EDGAR_ENTID JSON to run live")
			return
		}
		client := setup.client

		// Bootstrap entity data from existing test data (no create step in flow).
		secEdgarRef01DataRaw := vs.Items(core.ToMapAny(vs.GetPath("existing.sec_edgar", setup.data)))
		var secEdgarRef01Data map[string]any
		if len(secEdgarRef01DataRaw) > 0 {
			secEdgarRef01Data = core.ToMapAny(secEdgarRef01DataRaw[0][1])
		}
		// Discard guards against Go's unused-var check when the flow's steps
		// happen not to consume the bootstrap data (e.g. list-only flows).
		_ = secEdgarRef01Data

		// LOAD
		secEdgarRef01Ent := client.SecEdgar(nil)
		secEdgarRef01MatchDt0 := map[string]any{}
		secEdgarRef01DataDt0Loaded, err := secEdgarRef01Ent.Load(secEdgarRef01MatchDt0, nil)
		if err != nil {
			t.Fatalf("load failed: %v", err)
		}
		if secEdgarRef01DataDt0Loaded == nil {
			t.Fatal("expected load result to be non-nil")
		}

	})
}

func sec_edgarBasicSetup(extra map[string]any) *entityTestSetup {
	loadEnvLocal()

	_, filename, _, _ := runtime.Caller(0)
	dir := filepath.Dir(filename)

	entityDataFile := filepath.Join(dir, "..", "..", ".sdk", "test", "entity", "sec_edgar", "SecEdgarTestData.json")

	entityDataSource, err := os.ReadFile(entityDataFile)
	if err != nil {
		panic("failed to read sec_edgar test data: " + err.Error())
	}

	var entityData map[string]any
	if err := json.Unmarshal(entityDataSource, &entityData); err != nil {
		panic("failed to parse sec_edgar test data: " + err.Error())
	}

	options := map[string]any{}
	options["entity"] = entityData["existing"]

	client := sdk.TestSDK(options, extra)

	// Generate idmap via transform, matching TS pattern.
	idmap := vs.Transform(
		[]any{"sec_edgar01", "sec_edgar02", "sec_edgar03"},
		map[string]any{
			"`$PACK`": []any{"", map[string]any{
				"`$KEY`": "`$COPY`",
				"`$VAL`": []any{"`$FORMAT`", "upper", "`$COPY`"},
			}},
		},
	)

	// Detect ENTID env override before envOverride consumes it. When live
	// mode is on without a real override, the basic test runs against synthetic
	// IDs from the fixture and 4xx's. Surface this so the test can skip.
	entidEnvRaw := os.Getenv("AUTOSCRAPE_TEST_SEC_EDGAR_ENTID")
	idmapOverridden := entidEnvRaw != "" && strings.HasPrefix(strings.TrimSpace(entidEnvRaw), "{")

	env := envOverride(map[string]any{
		"AUTOSCRAPE_TEST_SEC_EDGAR_ENTID": idmap,
		"AUTOSCRAPE_TEST_LIVE":      "FALSE",
		"AUTOSCRAPE_TEST_EXPLAIN":   "FALSE",
	})

	idmapResolved := core.ToMapAny(env["AUTOSCRAPE_TEST_SEC_EDGAR_ENTID"])
	if idmapResolved == nil {
		idmapResolved = core.ToMapAny(idmap)
	}

	if env["AUTOSCRAPE_TEST_LIVE"] == "TRUE" {
		mergedOpts := vs.Merge([]any{
			map[string]any{
			},
			extra,
		})
		client = sdk.NewAutoscrapeSDK(core.ToMapAny(mergedOpts))
	}

	live := env["AUTOSCRAPE_TEST_LIVE"] == "TRUE"
	return &entityTestSetup{
		client:        client,
		data:          entityData,
		idmap:         idmapResolved,
		env:           env,
		explain:       env["AUTOSCRAPE_TEST_EXPLAIN"] == "TRUE",
		live:          live,
		syntheticOnly: live && !idmapOverridden,
		now:           time.Now().UnixMilli(),
	}
}
