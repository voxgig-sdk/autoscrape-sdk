<?php
declare(strict_types=1);

// Autoscrape SDK utility: result_headers

class AutoscrapeResultHeaders
{
    public static function call(AutoscrapeContext $ctx): ?AutoscrapeResult
    {
        $response = $ctx->response;
        $result = $ctx->result;
        if ($result) {
            if ($response && is_array($response->headers)) {
                $result->headers = $response->headers;
            } else {
                $result->headers = [];
            }
        }
        return $result;
    }
}
