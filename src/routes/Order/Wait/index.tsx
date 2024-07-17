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
}

export const OrderPurchasedList = ({ item, checkedList, setCheckedList }: OrderPurchasedListType) => {
    const { purchasedItemId: id } = item;
    const [trackingNumber, setTrackingNumber] = useState<string>("");
    const [deliveryCompanyCode, setDeleveryCompanyCode] = useState<string>("");
    const isCancel = item.claimType === "CANCEL";

    const handleDeliveryItem = async () => {
        if (!deliveryCompanyCode) return toast("택배사를 선택해주세요!");
        const verifyDigit = deliveryList.find(x => x.value === deliveryCompanyCode)?.digit;
        const regex = / /gi;
        if (!!verifyDigit && verifyDigit?.length > 0 && !verifyDigit?.some(x => x === trackingNumber.replace(regex, '').length)) {
            return toast("송장번호를 정확히 입력해주세요!");
        }
        try {
            const { status } = await confirmDeliveryItems({ purchasedItemId: id, deliveryCompanyCode, trackingNumber });
            if (status === 200) {
                toast("제품이 발송되었어요 🚚");
                await onClickRefresh();
            }
        } catch (err) {
            console.error(err);
            toast("발송 실패 ❌ 송장번호를 확인해주세요");
        }
    };

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
        <OrderProductUserItem item={item} />
        <div className={style.OrderPurchasedContainer}>
            <Dropdown
                items={deliveryList}
                placeholder="택배사"
                onClick={setDeleveryCompanyCode}
            />
            <Input
                placeholder="송장번호"
                value={trackingNumber}
                onInput={setTrackingNumber}
                formatCallback={(val) => FormatNumber(val)}
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