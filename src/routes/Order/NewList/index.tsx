import { Box, Button, Checkbox } from "@/components/Styled";
import { OrderProductNewItemType } from "../defines";
import style from "../style.module.scss";
import { OrderProductUserItem } from "../item";

interface OrderNewListType {
    items: OrderProductNewItemType[];
    checkedList: number[];
    setCheckedList(val: number): void;
}

export const OrderNewList = ({ items, checkedList, setCheckedList }: OrderNewListType) => {
    const checkingId = (id: number) => checkedList.some(purchasedItemId => purchasedItemId === id);
    
    return <>{items.map(item => {
        const { purchasedItemId: id } = item;
        return <Box color="white" className={style.OrderListContainer} key={`order_checkbox_${item.purchasedItemId}`}>
            <div className={style.OrderListHeader}>
                <Checkbox
                    name={`order_checkbox_${id}`}
                    checked={checkingId(id)}
                    onChange={() => setCheckedList(id)}
                />
                <div>
                    <span>{item.orderDate}</span>
                    <span>{item.marketAlias}</span>
                </div>
            </div>
            <OrderProductUserItem item={item} />
            <Button disabled={!checkingId(id)} style={{ margin: "0 0 0 calc(100% - 100px)" }}>발주확인</Button>
        </Box>;
    })
    }</>;
};