"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AutoscrapeError = void 0;
class AutoscrapeError extends Error {
    isAutoscrapeError = true;
    sdk = 'Autoscrape';
    code;
    ctx;
    status = -1;
    // `err.notFound` rather than a magic number at every call site.
    get notFound() { return 404 === this.status; }
    constructor(code, msg, ctx) {
        super(msg);
        this.code = code;
        this.ctx = ctx;
    }
}
exports.AutoscrapeError = AutoscrapeError;
//# sourceMappingURL=AutoscrapeError.js.map