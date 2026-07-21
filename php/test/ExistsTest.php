<?php
declare(strict_types=1);

// Autoscrape SDK exists test

require_once __DIR__ . '/../autoscrape_sdk.php';

use PHPUnit\Framework\TestCase;

class ExistsTest extends TestCase
{
    public function test_create_test_sdk(): void
    {
        $testsdk = AutoscrapeSDK::test(null, null);
        $this->assertNotNull($testsdk);
    }
}
