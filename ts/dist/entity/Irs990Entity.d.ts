import { AutoscrapeEntityBase } from '../AutoscrapeEntityBase';
import type { AutoscrapeSDK } from '../AutoscrapeSDK';
import type { Control } from '../types';
import type { Irs990, Irs990LoadMatch } from '../AutoscrapeTypes';
declare class Irs990Entity extends AutoscrapeEntityBase<Irs990> {
    constructor(client: AutoscrapeSDK, entopts: any);
    make(this: Irs990Entity): Irs990Entity;
    load(this: any, reqmatch?: Irs990LoadMatch, ctrl?: Control): Promise<Irs990Entity>;
}
export { Irs990Entity };
