import { AutoscrapeEntityBase } from '../AutoscrapeEntityBase';
import type { AutoscrapeSDK } from '../AutoscrapeSDK';
import type { Control } from '../types';
import type { BusinessEntity, BusinessEntityLoadMatch } from '../AutoscrapeTypes';
declare class BusinessEntityEntity extends AutoscrapeEntityBase<BusinessEntity> {
    constructor(client: AutoscrapeSDK, entopts: any);
    make(this: BusinessEntityEntity): BusinessEntityEntity;
    load(this: any, reqmatch?: BusinessEntityLoadMatch, ctrl?: Control): Promise<BusinessEntityEntity>;
}
export { BusinessEntityEntity };
