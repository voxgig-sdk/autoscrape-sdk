package core

var UtilityRegistrar func(u *Utility)

var NewBaseFeatureFunc func() Feature

var NewTestFeatureFunc func() Feature

var NewBuildingPermitEntityFunc func(client *AutoscrapeSDK, entopts map[string]any) AutoscrapeEntity

var NewBusinessEntityEntityFunc func(client *AutoscrapeSDK, entopts map[string]any) AutoscrapeEntity

var NewIrs990EntityFunc func(client *AutoscrapeSDK, entopts map[string]any) AutoscrapeEntity

var NewSecEdgarEntityFunc func(client *AutoscrapeSDK, entopts map[string]any) AutoscrapeEntity

var NewStockDataEntityFunc func(client *AutoscrapeSDK, entopts map[string]any) AutoscrapeEntity

var NewWhoiEntityFunc func(client *AutoscrapeSDK, entopts map[string]any) AutoscrapeEntity

var NewX402PaidEntityFunc func(client *AutoscrapeSDK, entopts map[string]any) AutoscrapeEntity

