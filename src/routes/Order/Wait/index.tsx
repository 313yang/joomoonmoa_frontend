import { useState } from "react";
import { Box, Button, Checkbox, Input, InputLabel, InputLine } from "@/components/Styled";
import { OrderProductNewItemType } from "../defines";
import { OrderProductUserItem } from "../item";
import { BuildClass, FormatDate, FormatNumber, onClickRefresh, toast } from "@/libs/Function";
import Dropdown from "@/components/Styled/Dropdown";
import { approveCancel, confirmDeliveryItems } from "@/libs/api/dashboard";
import deliveryList from "./deliveryCode.json";
import style from "../style.module.scss";

interface OrderPurchasedListType {
    item: OrderProductNewItemType;
    checkedList: number[];
    setCheckedList(val: number): void;
    handleCompanyCodeChange(value: string): void;
    handleTrackingNumberChange(value: string): void;
    trackingNumber: string;
    handleDeliveryItem(): void;
    isNotDelivery: boolean;
    handleDeliveryItem(): void;
}

export const OrderPurchasedList = ({
    item,
    checkedList,
    setCheckedList,
    handleCompanyCodeChange,
    handleTrackingNumberChange,
    trackingNumber,
    isNotDelivery,
    handleDeliveryItem
}: OrderPurchasedListType) => {
    const { purchasedItemId: id } = item;
    const isCancel = item.claimType === "CANCEL";

    const handleItemCancel = async () => {
        try {
            const { status } = await approveCancel(id);
            if (status === 200) {
                toast("취소가 완료됐습니다 ");
                await onClickRefresh();
            }
        } catch (err) {
            console.error(err);
        }
    };
    return <Box color="white" className={BuildClass(style.OrderListContainer, isCancel && style.isCancel)}>
        <div className={style.OrderListHeader}>
            <Checkbox
                name={`order_wait_checkbox_${id}`}
                checked={checkedList.some(purchasedItemId => purchasedItemId === id)}
                onChange={() => setCheckedList(id)}
            />
            <div>
                <span>{FormatDate(item.orderDate)}</span>
                <span>{item.marketAlias}</span>
            </div>
        </div>
        <OrderProductUserItem item={item} isNotDelivery={isNotDelivery} />
        <div className={style.OrderPurchasedContainer}>
            <Dropdown
                items={deliveryList}
                placeholder="택배사"
                onClick={handleCompanyCodeChange}
                defaultValue={isNotDelivery ? "NOTHING" : ""}
                disabled={isNotDelivery}
            />
            <Input
                placeholder="송장번호"
                value={trackingNumber}
                onInput={(val) => handleTrackingNumberChange(FormatNumber(val))}
                formatCallback={(val) => FormatNumber(val)}
                disabled={isNotDelivery}
            />
            <Button onClick={handleDeliveryItem}>
                발송
            </Button>
        </div>
        {isCancel &&
            <div className={style.CancelContainer}>
                <div>
                    <InputLine>
                        <InputLabel>구매자</InputLabel>
                        <div>
                            <strong>{item.ordererName}</strong>
                        </div>
                    </InputLine>
                    <InputLine>
                        <InputLabel>연락처</InputLabel>
                        <div>
                            <strong>{item.ordererTel}</strong>
                        </div>
                    </InputLine>
                </div>
                <Button onClick={handleItemCancel}>취소승인</Button>
            </div>
        }
    </Box>;
};