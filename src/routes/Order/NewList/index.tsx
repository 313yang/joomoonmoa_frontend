import { Button, Checkbox } from "@/components/Styled";
import { OrderProductNewItemType } from "../defines";
import style from "../style.module.scss";
import { OrderProductUserItem } from "../item";

interface OrderNewListType {
    items: OrderProductNewItemType[];
    checkedList: number[];
    setCheckedList(val: number): void;
}

export const OrderNewList = ({ items, checkedList, setCheckedList }: OrderNewListType) => {
    return <>
        {items.map(item =>
            <div key={`order_checkbox_${item.id}`} className={style.OrderListContainer}>
                <Checkbox
                    name={`order_checkbox_${item.id}`}
                    defaultChecked={!!checkedList.find(id => id === item.id)}
                    onChange={() => setCheckedList(item.id)}
                />
                <OrderProductUserItem item={item} />
                <Button style={{ margin: "0 0 0 calc(100% - 100px)" }}>발주확인</Button>
            </div>
        )}
    </>;
};