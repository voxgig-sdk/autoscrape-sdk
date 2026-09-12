import { AutoscrapeEntityBase } from '../AutoscrapeEntityBase';
import type { AutoscrapeSDK } from '../AutoscrapeSDK';
import type { Control } from '../types';
import type { BuildingPermit, BuildingPermitLoadMatch } from '../AutoscrapeTypes';
declare class BuildingPermitEntity extends AutoscrapeEntityBase<BuildingPermit> {
    constructor(client: AutoscrapeSDK, entopts: any);
    make(this: BuildingPermitEntity): BuildingPermitEntity;
    load(this: any, reqmatch?: BuildingPermitLoadMatch, ctrl?: Control): Promise<BuildingPermitEntity>;
}
export { BuildingPermitEntity };
