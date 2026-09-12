import { BuildingPermitEntity } from './entity/BuildingPermitEntity';
import { BusinessEntityEntity } from './entity/BusinessEntityEntity';
import { Irs990Entity } from './entity/Irs990Entity';
import { SecEdgarEntity } from './entity/SecEdgarEntity';
import { StockDataEntity } from './entity/StockDataEntity';
import { WhoiEntity } from './entity/WhoiEntity';
import { X402PaidEntity } from './entity/X402PaidEntity';
export type * from './AutoscrapeTypes';
import { inspect } from 'node:util';
import type { Context, Feature } from './types';
import { config } from './Config';
import { AutoscrapeEntityBase } from './AutoscrapeEntityBase';
import { Utility } from './utility/Utility';
import { BaseFeature } from './feature/base/BaseFeature';
declare const stdutil: Utility;
declare class AutoscrapeSDK {
    _mode: string;
    _options: any;
    _utility: Utility;
    _features: Feature[];
    _rootctx: Context;
    constructor(options?: any);
    options(): any;
    utility(): any;
    prepare(fetchargs?: any): Promise<any>;
    direct(fetchargs?: any): Promise<Error | {
        ok: boolean;
        status: number;
        headers: any;
        data: any;
        err?: undefined;
    } | {
        ok: boolean;
        err: any;
        status?: undefined;
        headers?: undefined;
        data?: undefined;
    }>;
    _rawRequest(fetchargs?: any): Promise<Error | {
        ok: boolean;
        status: number;
        headers: any;
        data: any;
        err?: undefined;
    } | {
        ok: boolean;
        err: any;
        status?: undefined;
        headers?: undefined;
        data?: undefined;
    }>;
    graphql(query: string, variables?: any, ctrl?: any): Promise<any>;
    BuildingPermit(entopts?: Record<string, any>): BuildingPermitEntity;
    BusinessEntity(entopts?: Record<string, any>): BusinessEntityEntity;
    Irs990(entopts?: Record<string, any>): Irs990Entity;
    SecEdgar(entopts?: Record<string, any>): SecEdgarEntity;
    StockData(entopts?: Record<string, any>): StockDataEntity;
    Whoi(entopts?: Record<string, any>): WhoiEntity;
    X402Paid(entopts?: Record<string, any>): X402PaidEntity;
    static test(testoptsarg?: any, sdkoptsarg?: any): AutoscrapeSDK;
    tester(testopts?: any, sdkopts?: any): AutoscrapeSDK;
    toJSON(): {
        name: string;
    };
    toString(): string;
    [inspect.custom](): string;
}
declare const SDK: typeof AutoscrapeSDK;
export { stdutil, config, BaseFeature, AutoscrapeEntityBase, AutoscrapeSDK, SDK, };
