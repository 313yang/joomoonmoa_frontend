import { OrderTabHostItemType } from "./defines";
import { useState } from "react";
import Header from "@/components/Layout/Header";
import { Subtract } from "@/components/Icons";
import style from "./style.module.scss";
import { Box } from "@/components/Styled/Box";
import { Checkbox, TabHost,Button } from "@/components/Styled";

const tabItems = [
    {
        name: "신규",
        value: OrderTabHostItemType.New
    },
    {
        name: "발송준비",
        value: OrderTabHostItemType.Pre
    }
];
const Order = () => {
    const [selected, setSelected] = useState<OrderTabHostItemType>(OrderTabHostItemType.New);
    const [checkedList, setCheckedList] = useState<boolean>(true);
    return <div>
        <Header title={<div className={style.flexCenter}><h3>주문</h3><Subtract /></div>} />
        <TabHost
            items={tabItems}
            selected={selected}
            onClick={setSelected} />
        <Box className={style.OrderContainer} size="md">
            <Checkbox
                name="order_checkbox_all"
                defaultChecked={checkedList}
                onChange={() => setCheckedList(!checkedList)}
            />
            <Button />

        </Box>

    </div>;
};
export default Order;