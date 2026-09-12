import { AutoscrapeEntityBase } from '../AutoscrapeEntityBase';
import type { AutoscrapeSDK } from '../AutoscrapeSDK';
import type { Control } from '../types';
import type { Whoi, WhoiLoadMatch } from '../AutoscrapeTypes';
declare class WhoiEntity extends AutoscrapeEntityBase<Whoi> {
    constructor(client: AutoscrapeSDK, entopts: any);
    make(this: WhoiEntity): WhoiEntity;
    load(this: any, reqmatch?: WhoiLoadMatch, ctrl?: Control): Promise<WhoiEntity>;
}
export { WhoiEntity };
