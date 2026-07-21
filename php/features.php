<?php
declare(strict_types=1);

// Autoscrape SDK feature factory

require_once __DIR__ . '/feature/BaseFeature.php';
require_once __DIR__ . '/feature/TestFeature.php';


class AutoscrapeFeatures
{
    public static function make_feature(string $name)
    {
        switch ($name) {
            case "base":
                return new AutoscrapeBaseFeature();
            case "test":
                return new AutoscrapeTestFeature();
            default:
                return new AutoscrapeBaseFeature();
        }
    }
}
