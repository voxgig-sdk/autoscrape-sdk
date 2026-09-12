import { AutoscrapeEntityBase } from '../AutoscrapeEntityBase';
import type { AutoscrapeSDK } from '../AutoscrapeSDK';
import type { Control } from '../types';
import type { X402Paid, X402PaidLoadMatch } from '../AutoscrapeTypes';
declare class X402PaidEntity extends AutoscrapeEntityBase<X402Paid> {
    constructor(client: AutoscrapeSDK, entopts: any);
    make(this: X402PaidEntity): X402PaidEntity;
    load(this: any, reqmatch?: X402PaidLoadMatch, ctrl?: Control): Promise<X402PaidEntity>;
}
export { X402PaidEntity };
