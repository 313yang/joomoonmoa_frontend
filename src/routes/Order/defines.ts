export enum OrderTabHostItemType {
  New = 1,
  Pre = 2,
}
export interface OrderProductNewItemType {
  purchasedItemId: number,
  marketTitle: string,
  orderDate: string,
  productName: string,
  productOption: string,
  quantity: string,
  receiverName: string,
  receiverPhoneNumber: string,
  baseAddress: string;
  detailedAddress: string;
}
export interface OrderProductOkItemType extends OrderProductNewItemType {
  deliveryType: string;
  deliveryCode: string | number;
}