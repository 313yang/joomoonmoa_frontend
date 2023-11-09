import { Box, Button, Checkbox, Input } from "@/components/Styled";
import { OrderProductNewItemType, OrderProductOkItemType } from "../defines";
import style from "../style.module.scss";
import { OrderProductUserItem } from "../item";
import { getDeliveryCompanies } from "@/libs/api/common";
import { useEffect, useState } from "react";
import { AxiosError } from "axios";
import toast from "react-hot-toast";
import { FormatDate, FormatNumber, RequestGet } from "@/libs/Function";
import Dropdown from "@/components/Styled/Dropdown";
import { confirmDeliveryItems } from "@/libs/api/dashboard";

interface OrderPurchasedListType {
    items: OrderProductNewItemType[];
    checkedList: number[];
    setCheckedList(val: number): void;
}

export const OrderPurchasedList = ({ items, checkedList, setCheckedList }: OrderPurchasedListType) => {
    const [deliveryList, setDeliveryList] = useState([]);
    
    const getDeliveryCompanieList = async () => {
        const data = await RequestGet(getDeliveryCompanies) || [];
        setDeliveryList([]);
    };

    useEffect(() => {
        getDeliveryCompanieList();
    }, []);
    return <>{items.map((item, idx) => {
        const { purchasedItemId: id } = item;
        const [trackingNumber, setTrackingNumber] = useState<string>("");
            const handleDeliveryItem = async (id: number) => {
                try {
                    const resp = await confirmDeliveryItems(id, { deliveryCompanyCode: "", trackingNumber });
                    console.log(resp);
                } catch (err) {
                    console.error(err);
                }
            };
        return <Box color="white" className={style.OrderListContainer} key={`order_wait_checkbox_${item.purchasedItemId}_${idx}`}>
            <div className={style.OrderListHeader}>
                <Checkbox
                    name={`order_wait_checkbox_${id}_${idx}`}
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
                <Dropdown items={deliveryList} placeholder="택배사" />
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
    })
    }</>;
};