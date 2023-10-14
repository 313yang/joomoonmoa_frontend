import { Box, Button, Checkbox } from "@/components/Styled";
import { OrderProductOkItemType } from "../defines";
import style from "../style.module.scss";
import { OrderProductUserItem } from "../item";

interface OrderPurchasedListType {
    items: OrderProductOkItemType[];
    checkedList: number[];
    setCheckedList(val: number): void;
}

export const OrderPurchasedList = ({ items, checkedList, setCheckedList }: OrderPurchasedListType) => {
    return <>{items.map(item => {
        const { purchasedItemId: id } = item;
        return <Box color="white" className={style.OrderListContainer} key={`order_checkbox_${item.purchasedItemId}`}>
            <div className={style.OrderListHeader}>
                <Checkbox
                    name={`order_checkbox_${id}`}
                    checked={checkedList.some(purchasedItemId => purchasedItemId === id)}
                    onChange={() => setCheckedList(id)}
                />
                <div>
                    <span>{item.orderDate}</span>
                    <span>{item.marketAlias}</span>
                </div>
            </div>
            <OrderProductUserItem item={item} />
            <Button style={{ margin: "0 0 0 calc(100% - 100px)" }}>발주확인</Button>
        </Box>;
    })
    }</>;
};