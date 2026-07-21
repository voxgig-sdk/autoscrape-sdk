<?php
declare(strict_types=1);

// Autoscrape SDK utility: prepare_body

class AutoscrapePrepareBody
{
    public static function call(AutoscrapeContext $ctx): mixed
    {
        if ($ctx->op->input === 'data') {
            return ($ctx->utility->transform_request)($ctx);
        }
        return null;
    }
}
