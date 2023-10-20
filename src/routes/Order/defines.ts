export enum OrderTabHostItemType {
  New = "new",
  Purchased = "purchased",
}
export interface OrderProductNewItemType {
  purchasedItemId: number,
  marketAlias: string,
  orderDate: string,
  productName: string,
  productOption: string,
  quantity: number,
  receiverName: string,
  receiverPhoneNumber: string,
  baseAddress: string;
  detailedAddress: string;
}
export interface OrderProductOkItemType extends OrderProductNewItemType {
  deliveryType: string;
  deliveryCode: string | number;
}