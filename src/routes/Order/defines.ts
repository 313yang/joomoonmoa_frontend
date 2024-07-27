export enum OrderTabHostItemType {
  New = "news",
  Purchased = "wait",
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
  claimType: string | null;
  ordererTel: string;
  ordererName: string;
  shippingMemo: string | null;
  expectedDeliveryMethod: string;
}
export interface OrderProductOkItemType extends OrderProductNewItemType {
  deliveryType: string;
  deliveryCode: string | number;
}