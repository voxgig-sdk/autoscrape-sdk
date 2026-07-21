<?php
declare(strict_types=1);

// Autoscrape SDK base feature

class AutoscrapeBaseFeature
{
    public string $version;
    public string $name;
    public bool $active;

    // Positions this feature when added via the client `extend` option:
    // "__before__" / "__after__" / "__replace__" name an already-added
    // feature (mirrors the ts feature `_options`). Declared so setting it
    // on an extension instance avoids the dynamic-property deprecation.
    public ?array $_options = null;

    public function __construct()
    {
        $this->version = '0.0.1';
        $this->name = 'base';
        $this->active = true;
    }

    public function get_version(): string { return $this->version; }
    public function get_name(): string { return $this->name; }
    public function get_active(): bool { return $this->active; }

    public function init(AutoscrapeContext $ctx, array $options): void {}
    public function PostConstruct(AutoscrapeContext $ctx): void {}
    public function PostConstructEntity(AutoscrapeContext $ctx): void {}
    public function SetData(AutoscrapeContext $ctx): void {}
    public function GetData(AutoscrapeContext $ctx): void {}
    public function GetMatch(AutoscrapeContext $ctx): void {}
    public function SetMatch(AutoscrapeContext $ctx): void {}
    public function PrePoint(AutoscrapeContext $ctx): void {}
    public function PreSpec(AutoscrapeContext $ctx): void {}
    public function PreRequest(AutoscrapeContext $ctx): void {}
    public function PreResponse(AutoscrapeContext $ctx): void {}
    public function PreResult(AutoscrapeContext $ctx): void {}
    public function PreDone(AutoscrapeContext $ctx): void {}
    public function PreUnexpected(AutoscrapeContext $ctx): void {}
}
