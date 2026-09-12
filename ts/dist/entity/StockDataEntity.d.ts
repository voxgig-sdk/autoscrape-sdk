import { AutoscrapeEntityBase } from '../AutoscrapeEntityBase';
import type { AutoscrapeSDK } from '../AutoscrapeSDK';
import type { Control } from '../types';
import type { StockData, StockDataLoadMatch } from '../AutoscrapeTypes';
declare class StockDataEntity extends AutoscrapeEntityBase<StockData> {
    constructor(client: AutoscrapeSDK, entopts: any);
    make(this: StockDataEntity): StockDataEntity;
    load(this: any, reqmatch?: StockDataLoadMatch, ctrl?: Control): Promise<StockDataEntity>;
}
export { StockDataEntity };
