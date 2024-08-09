import { Box, Button, Checkbox } from "@/components/Styled";
import { OrderProductNewItemType } from "../defines";
import style from "../style.module.scss";
import { OrderProductUserItem } from "../item";
import { FormatDate, toast } from "@/libs/Function";
import { confirmItems } from "@/libs/api/dashboard";

interface OrderNewListType {
    item: OrderProductNewItemType;
    checkedList: number[];
    setCheckedList(val: number): void;
    handleConfirmItem: (id: number) => void;
}

export const OrderNewList = ({ item, checkedList, setCheckedList, handleConfirmItem }: OrderNewListType) => {
    const checkingId = (id: number) => checkedList.some(purchasedItemId => purchasedItemId === id);

    const { purchasedItemId: id } = item;
    return <Box color="white" className={style.OrderListContainer} >
        <div className={style.OrderListHeader}>
            <Checkbox
                name={`order_new_checkbox_${id}`}
                checked={checkingId(id)}
                onChange={() => setCheckedList(id)}
            />
            <div>
                <span>{FormatDate(item.orderDate)}</span>
                <span>{item.marketAlias}</span>
            </div>
        </div>
        <OrderProductUserItem item={item} isNotDelivery={item.expectedDeliveryMethod === "NOTHING"} />
        <Button disabled={!checkingId(id)} style={{ margin: "0 0 0 calc(100% - 100px)" }} onClick={() => handleConfirmItem(id)}>발주확인</Button>
    </Box>;
};