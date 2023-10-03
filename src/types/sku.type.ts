export enum TransactionType {
    ORDER ="order",
    REFUND="refund"
}
export interface Stock {
    sku:string;
    stock:number;
}
export interface Transaction extends Stock {
    qty:number;
    type:TransactionType
}