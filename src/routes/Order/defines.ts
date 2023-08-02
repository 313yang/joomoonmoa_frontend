export enum OrderTabHostItemType {
  New = 1,
  Pre = 2,
}
export interface OrderProductNewItemType {
  id: number,
  storeTitle: string,
  paymentDate: string,
  productName: string,
  productOption: string,
  quantity: string,
  userName: string,
  tel: string,
  address: string;
}
