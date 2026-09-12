import { AutoscrapeEntityBase } from '../AutoscrapeEntityBase';
import type { AutoscrapeSDK } from '../AutoscrapeSDK';
import type { Control } from '../types';
import type { SecEdgar, SecEdgarLoadMatch } from '../AutoscrapeTypes';
declare class SecEdgarEntity extends AutoscrapeEntityBase<SecEdgar> {
    constructor(client: AutoscrapeSDK, entopts: any);
    make(this: SecEdgarEntity): SecEdgarEntity;
    load(this: any, reqmatch?: SecEdgarLoadMatch, ctrl?: Control): Promise<SecEdgarEntity>;
}
export { SecEdgarEntity };
