<?php
declare(strict_types=1);

// Autoscrape SDK configuration

class AutoscrapeConfig
{
    /** @var array<string,mixed>|null */
    private static ?array $shared_config = null;

    /**
     * Return the process-wide config, built once on first use. The SDK reads
     * the config on every request and never writes to it, so one instance is
     * shared by every client rather than rebuilt per client.
     *
     * PHP arrays are copy-on-write, so callers that do mutate the result get
     * their own copy and cannot disturb the shared one.
     */
    public static function shared_config(): array
    {
        if (self::$shared_config === null) {
            self::$shared_config = self::make_config();
        }
        return self::$shared_config;
    }

    /**
     * Build a fresh, fully materialised config array. Every call rebuilds the
     * whole structure, so prefer shared_config unless you need a private copy.
     */
    public static function make_config(): array
    {
        return [
            "main" => [
                "name" => "Autoscrape",
                "slug" => "autoscrape",
                "version" => "0.0.1",
                "target" => "php",
            ],
            "feature" => [
                "test" => [
          'options' => [
            'active' => false,
          ],
        ],
            ],
            "options" => [
                "base" => "https://autoscrape-api-seven.vercel.app",
                "headers" => [
          'content-type' => 'application/json',
        ],
                "entity" => [
                    "building_permit" => [],
                    "business_entity" => [],
                    "irs_990" => [],
                    "sec_edgar" => [],
                    "stock_data" => [],
                    "whoi" => [],
                    "x402_paid" => [],
                ],
            ],
            "entity" => [
        'building_permit' => [
          'fields' => [],
          'name' => 'building_permit',
          'op' => [
            'load' => [
              'input' => 'data',
              'name' => 'load',
              'points' => [
                [
                  'args' => [
                    'query' => [
                      [
                        'example' => 'austin',
                        'kind' => 'query',
                        'name' => 'city',
                        'orig' => 'city',
                        'type' => '`$STRING`',
                      ],
                      [
                        'kind' => 'query',
                        'name' => 'date_from',
                        'orig' => 'date_from',
                        'type' => '`$STRING`',
                      ],
                      [
                        'kind' => 'query',
                        'name' => 'date_to',
                        'orig' => 'date_to',
                        'type' => '`$STRING`',
                      ],
                      [
                        'kind' => 'query',
                        'name' => 'keyword',
                        'orig' => 'keyword',
                        'type' => '`$STRING`',
                      ],
                      [
                        'example' => 25,
                        'kind' => 'query',
                        'name' => 'max_result',
                        'orig' => 'max_result',
                        'type' => '`$INTEGER`',
                      ],
                      [
                        'kind' => 'query',
                        'name' => 'permit_type',
                        'orig' => 'permit_type',
                        'type' => '`$STRING`',
                      ],
                      [
                        'kind' => 'query',
                        'name' => 'query',
                        'orig' => 'query',
                        'type' => '`$STRING`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/v1/building-permits/search',
                  'parts' => [
                    'v1',
                    'building-permits',
                    'search',
                  ],
                  'select' => [
                    '$action' => 'search',
                    'exist' => [
                      'city',
                      'date_from',
                      'date_to',
                      'keyword',
                      'max_result',
                      'permit_type',
                      'query',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [],
          ],
        ],
        'business_entity' => [
          'fields' => [],
          'name' => 'business_entity',
          'op' => [
            'load' => [
              'input' => 'data',
              'name' => 'load',
              'points' => [
                [
                  'args' => [
                    'query' => [
                      [
                        'kind' => 'query',
                        'name' => 'fetch_detail',
                        'orig' => 'fetch_detail',
                        'type' => '`$BOOLEAN`',
                      ],
                      [
                        'example' => 25,
                        'kind' => 'query',
                        'name' => 'max_result',
                        'orig' => 'max_result',
                        'type' => '`$INTEGER`',
                      ],
                      [
                        'example' => 'Apple Inc',
                        'kind' => 'query',
                        'name' => 'query',
                        'orig' => 'query',
                        'type' => '`$STRING`',
                      ],
                      [
                        'kind' => 'query',
                        'name' => 'state',
                        'orig' => 'state',
                        'type' => '`$STRING`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/v1/business-entity/search',
                  'parts' => [
                    'v1',
                    'business-entity',
                    'search',
                  ],
                  'select' => [
                    '$action' => 'search',
                    'exist' => [
                      'fetch_detail',
                      'max_result',
                      'query',
                      'state',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [],
          ],
        ],
        'irs_990' => [
          'fields' => [],
          'name' => 'irs_990',
          'op' => [
            'load' => [
              'input' => 'data',
              'name' => 'load',
              'points' => [
                [
                  'args' => [
                    'query' => [
                      [
                        'kind' => 'query',
                        'name' => 'ein',
                        'orig' => 'ein',
                        'type' => '`$STRING`',
                      ],
                      [
                        'kind' => 'query',
                        'name' => 'fetch_detail',
                        'orig' => 'fetch_detail',
                        'type' => '`$BOOLEAN`',
                      ],
                      [
                        'example' => 25,
                        'kind' => 'query',
                        'name' => 'max_result',
                        'orig' => 'max_result',
                        'type' => '`$INTEGER`',
                      ],
                      [
                        'kind' => 'query',
                        'name' => 'query',
                        'orig' => 'query',
                        'type' => '`$STRING`',
                      ],
                      [
                        'kind' => 'query',
                        'name' => 'state',
                        'orig' => 'state',
                        'type' => '`$STRING`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/v1/irs-990/search',
                  'parts' => [
                    'v1',
                    'irs-990',
                    'search',
                  ],
                  'select' => [
                    '$action' => 'search',
                    'exist' => [
                      'ein',
                      'fetch_detail',
                      'max_result',
                      'query',
                      'state',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [],
          ],
        ],
        'sec_edgar' => [
          'fields' => [],
          'name' => 'sec_edgar',
          'op' => [
            'load' => [
              'input' => 'data',
              'name' => 'load',
              'points' => [
                [
                  'args' => [
                    'query' => [
                      [
                        'kind' => 'query',
                        'name' => 'cik',
                        'orig' => 'cik',
                        'type' => '`$STRING`',
                      ],
                      [
                        'kind' => 'query',
                        'name' => 'date_from',
                        'orig' => 'date_from',
                        'type' => '`$STRING`',
                      ],
                      [
                        'kind' => 'query',
                        'name' => 'date_to',
                        'orig' => 'date_to',
                        'type' => '`$STRING`',
                      ],
                      [
                        'kind' => 'query',
                        'name' => 'form_type',
                        'orig' => 'form_type',
                        'type' => '`$STRING`',
                      ],
                      [
                        'example' => 100,
                        'kind' => 'query',
                        'name' => 'max_filing',
                        'orig' => 'max_filing',
                        'type' => '`$INTEGER`',
                      ],
                      [
                        'kind' => 'query',
                        'name' => 'query',
                        'orig' => 'query',
                        'type' => '`$STRING`',
                      ],
                      [
                        'kind' => 'query',
                        'name' => 'ticker',
                        'orig' => 'ticker',
                        'type' => '`$STRING`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/v1/sec-edgar/filings',
                  'parts' => [
                    'v1',
                    'sec-edgar',
                    'filings',
                  ],
                  'select' => [
                    '$action' => 'filing',
                    'exist' => [
                      'cik',
                      'date_from',
                      'date_to',
                      'form_type',
                      'max_filing',
                      'query',
                      'ticker',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [],
          ],
        ],
        'stock_data' => [
          'fields' => [],
          'name' => 'stock_data',
          'op' => [
            'load' => [
              'input' => 'data',
              'name' => 'load',
              'points' => [
                [
                  'args' => [
                    'query' => [
                      [
                        'example' => '1d',
                        'kind' => 'query',
                        'name' => 'interval',
                        'orig' => 'interval',
                        'type' => '`$STRING`',
                      ],
                      [
                        'example' => '1mo',
                        'kind' => 'query',
                        'name' => 'range',
                        'orig' => 'range',
                        'type' => '`$STRING`',
                      ],
                      [
                        'kind' => 'query',
                        'name' => 'symbol',
                        'orig' => 'symbol',
                        'reqd' => true,
                        'type' => '`$STRING`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/v1/stock/chart',
                  'parts' => [
                    'v1',
                    'stock',
                    'chart',
                  ],
                  'select' => [
                    'exist' => [
                      'interval',
                      'range',
                      'symbol',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [],
          ],
        ],
        'whoi' => [
          'fields' => [],
          'name' => 'whoi',
          'op' => [
            'load' => [
              'input' => 'data',
              'name' => 'load',
              'points' => [
                [
                  'args' => [
                    'query' => [
                      [
                        'example' => 'apple.com',
                        'kind' => 'query',
                        'name' => 'domain',
                        'orig' => 'domain',
                        'type' => '`$STRING`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/v1/whois/lookup',
                  'parts' => [
                    'v1',
                    'whois',
                    'lookup',
                  ],
                  'select' => [
                    '$action' => 'lookup',
                    'exist' => [
                      'domain',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [],
          ],
        ],
        'x402_paid' => [
          'fields' => [],
          'name' => 'x402_paid',
          'op' => [
            'load' => [
              'input' => 'data',
              'name' => 'load',
              'points' => [
                [
                  'args' => [
                    'query' => [
                      [
                        'kind' => 'query',
                        'name' => 'cik',
                        'orig' => 'cik',
                        'type' => '`$STRING`',
                      ],
                      [
                        'kind' => 'query',
                        'name' => 'date_from',
                        'orig' => 'date_from',
                        'type' => '`$STRING`',
                      ],
                      [
                        'kind' => 'query',
                        'name' => 'date_to',
                        'orig' => 'date_to',
                        'type' => '`$STRING`',
                      ],
                      [
                        'kind' => 'query',
                        'name' => 'form_type',
                        'orig' => 'form_type',
                        'type' => '`$STRING`',
                      ],
                      [
                        'example' => 100,
                        'kind' => 'query',
                        'name' => 'max_filing',
                        'orig' => 'max_filing',
                        'type' => '`$INTEGER`',
                      ],
                      [
                        'kind' => 'query',
                        'name' => 'query',
                        'orig' => 'query',
                        'type' => '`$STRING`',
                      ],
                      [
                        'kind' => 'query',
                        'name' => 'ticker',
                        'orig' => 'ticker',
                        'type' => '`$STRING`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/x402/v1/sec-edgar/filings',
                  'parts' => [
                    'x402',
                    'v1',
                    'sec-edgar',
                    'filings',
                  ],
                  'select' => [
                    'exist' => [
                      'cik',
                      'date_from',
                      'date_to',
                      'form_type',
                      'max_filing',
                      'query',
                      'ticker',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                ],
                [
                  'args' => [
                    'query' => [
                      [
                        'example' => 'austin',
                        'kind' => 'query',
                        'name' => 'city',
                        'orig' => 'city',
                        'type' => '`$STRING`',
                      ],
                      [
                        'kind' => 'query',
                        'name' => 'date_from',
                        'orig' => 'date_from',
                        'type' => '`$STRING`',
                      ],
                      [
                        'kind' => 'query',
                        'name' => 'date_to',
                        'orig' => 'date_to',
                        'type' => '`$STRING`',
                      ],
                      [
                        'kind' => 'query',
                        'name' => 'keyword',
                        'orig' => 'keyword',
                        'type' => '`$STRING`',
                      ],
                      [
                        'example' => 25,
                        'kind' => 'query',
                        'name' => 'max_result',
                        'orig' => 'max_result',
                        'type' => '`$INTEGER`',
                      ],
                      [
                        'kind' => 'query',
                        'name' => 'permit_type',
                        'orig' => 'permit_type',
                        'type' => '`$STRING`',
                      ],
                      [
                        'kind' => 'query',
                        'name' => 'query',
                        'orig' => 'query',
                        'type' => '`$STRING`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/x402/v1/building-permits/search',
                  'parts' => [
                    'x402',
                    'v1',
                    'building-permits',
                    'search',
                  ],
                  'select' => [
                    'exist' => [
                      'city',
                      'date_from',
                      'date_to',
                      'keyword',
                      'max_result',
                      'permit_type',
                      'query',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                ],
                [
                  'args' => [
                    'query' => [
                      [
                        'kind' => 'query',
                        'name' => 'ein',
                        'orig' => 'ein',
                        'type' => '`$STRING`',
                      ],
                      [
                        'kind' => 'query',
                        'name' => 'fetch_detail',
                        'orig' => 'fetch_detail',
                        'type' => '`$BOOLEAN`',
                      ],
                      [
                        'example' => 25,
                        'kind' => 'query',
                        'name' => 'max_result',
                        'orig' => 'max_result',
                        'type' => '`$INTEGER`',
                      ],
                      [
                        'kind' => 'query',
                        'name' => 'query',
                        'orig' => 'query',
                        'type' => '`$STRING`',
                      ],
                      [
                        'kind' => 'query',
                        'name' => 'state',
                        'orig' => 'state',
                        'type' => '`$STRING`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/x402/v1/irs-990/search',
                  'parts' => [
                    'x402',
                    'v1',
                    'irs-990',
                    'search',
                  ],
                  'select' => [
                    'exist' => [
                      'ein',
                      'fetch_detail',
                      'max_result',
                      'query',
                      'state',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                ],
                [
                  'args' => [
                    'query' => [
                      [
                        'kind' => 'query',
                        'name' => 'fetch_detail',
                        'orig' => 'fetch_detail',
                        'type' => '`$BOOLEAN`',
                      ],
                      [
                        'example' => 25,
                        'kind' => 'query',
                        'name' => 'max_result',
                        'orig' => 'max_result',
                        'type' => '`$INTEGER`',
                      ],
                      [
                        'example' => 'Apple Inc',
                        'kind' => 'query',
                        'name' => 'query',
                        'orig' => 'query',
                        'type' => '`$STRING`',
                      ],
                      [
                        'kind' => 'query',
                        'name' => 'state',
                        'orig' => 'state',
                        'type' => '`$STRING`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/x402/v1/business-entity/search',
                  'parts' => [
                    'x402',
                    'v1',
                    'business-entity',
                    'search',
                  ],
                  'select' => [
                    'exist' => [
                      'fetch_detail',
                      'max_result',
                      'query',
                      'state',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                ],
                [
                  'args' => [
                    'query' => [
                      [
                        'example' => 'apple.com',
                        'kind' => 'query',
                        'name' => 'domain',
                        'orig' => 'domain',
                        'type' => '`$STRING`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/x402/v1/whois/lookup',
                  'parts' => [
                    'x402',
                    'v1',
                    'whois',
                    'lookup',
                  ],
                  'select' => [
                    'exist' => [
                      'domain',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [],
          ],
        ],
      ],
        ];
    }


    public static function make_feature(string $name)
    {
        require_once __DIR__ . '/features.php';
        return AutoscrapeFeatures::make_feature($name);
    }
}
