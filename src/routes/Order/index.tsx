import TabHost from "@/components/Styled/TabHost";
import { OrderTabHostItemType } from "./defines";
import { useState } from "react";


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

    return <div>
        <div>
            <h3>주문</h3>
            <button></button>
        </div>
        <TabHost
            items={tabItems}
            selected={selected}
            onClick={setSelected} />

    </div>;
};
export default Order;