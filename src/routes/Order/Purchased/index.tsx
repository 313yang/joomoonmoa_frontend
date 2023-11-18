import { useState } from "react";
import { Box, Button, Checkbox, Input } from "@/components/Styled";
import { OrderProductNewItemType } from "../defines";
import { OrderProductUserItem } from "../item";
import { FormatDate, FormatNumber, toast } from "@/libs/Function";
import Dropdown from "@/components/Styled/Dropdown";
import { confirmDeliveryItems } from "@/libs/api/dashboard";
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

    const handleDeliveryItem = async (id: number) => {
        const verifyDigit = deliveryList.find(x => x.value === deliveryCompanyCode)?.digit;
        if (!deliveryCompanyCode) return toast("택배사를 선택해주세요!");
        if (!!verifyDigit && verifyDigit?.length > 0 && !verifyDigit?.some(x => x === trackingNumber.length)) {
            return toast("송장번호를 정확히 입력해주세요!");
        }
        try {
            const resp = await confirmDeliveryItems(id, { deliveryCompanyCode: deliveryCompanyCode, trackingNumber });
            console.log(resp);
            toast("제품이 발송되었어요 🚚");
        } catch (err) {
            console.error(err);
            toast("발송 실패 ❌ 송장번호를 확인해주세요");
        }
    };

    return <Box color="white" className={style.OrderListContainer}>
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
                value={trackingNumber}
                onInput={setTrackingNumber}
                formatCallback={(val) => FormatNumber(val)}
            />
            <Button onClick={() => handleDeliveryItem(item.purchasedItemId)}>
                발송
            </Button>
        </div>
        {/* <Button style={{ margin: "0 0 0 calc(100% - 100px)" }}>발주확인</Button> */}
    </Box>;
};