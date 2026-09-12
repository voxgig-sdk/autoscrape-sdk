export interface BuildingPermit {
}
export interface BuildingPermitLoadMatch {
    city?: string;
    date_from?: string;
    date_to?: string;
    keyword?: string;
    max_result?: number;
    permit_type?: string;
    query?: string;
    $action?: string;
    [action: string]: any;
}
export interface BusinessEntity {
}
export interface BusinessEntityLoadMatch {
    fetch_detail?: boolean;
    max_result?: number;
    query?: string;
    state?: string;
    $action?: string;
    [action: string]: any;
}
export interface Irs990 {
}
export interface Irs990LoadMatch {
    ein?: string;
    fetch_detail?: boolean;
    max_result?: number;
    query?: string;
    state?: string;
    $action?: string;
    [action: string]: any;
}
export interface SecEdgar {
}
export interface SecEdgarLoadMatch {
    cik?: string;
    date_from?: string;
    date_to?: string;
    form_type?: string;
    max_filing?: number;
    query?: string;
    ticker?: string;
    $action?: string;
    [action: string]: any;
}
export interface StockData {
}
export interface StockDataLoadMatch {
    interval?: string;
    range?: string;
    symbol: string;
}
export interface Whoi {
}
export interface WhoiLoadMatch {
    domain?: string;
    $action?: string;
    [action: string]: any;
}
export interface X402Paid {
}
export interface X402PaidLoadMatch {
    cik?: string;
    date_from?: string;
    date_to?: string;
    form_type?: string;
    max_filing?: number;
    query?: string;
    ticker?: string;
}
