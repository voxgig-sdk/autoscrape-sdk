<?php
declare(strict_types=1);

// Autoscrape SDK utility: result_body

class AutoscrapeResultBody
{
    public static function call(AutoscrapeContext $ctx): ?AutoscrapeResult
    {
        $response = $ctx->response;
        $result = $ctx->result;
        if ($result && $response && $response->json_func && $response->body) {
            $result->body = ($response->json_func)();
        }
        return $result;
    }
}
