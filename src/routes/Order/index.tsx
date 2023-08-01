import { OrderTabHostItemType } from "./defines";
import { useState } from "react";
import Header from "@/components/Layout/Header";
import { Subtract } from "@/components/Icons";
import style from "./style.module.scss";
import { Box } from "@/components/Styled";
import { Checkbox, TabHost, Button } from "@/components/Styled";
import { OrderProductUserItem } from "./item";

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

const dummy = [
    {
        id: 1,
        storeTitle: "스토어1",
        paymentDate: "2023.01.02 03:35:32",
        productName: "아이패드 케이스",
        productOption: "주황",
        quantity: "1",
        userName: "yang",
        tel: "01012341234",
        address: "서울시 송파구 가나다로 25"

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
            <div className={style.OrderCheckboxContainer}>
                <Checkbox
                    name="order_checkbox_all"
                    defaultChecked={checkedList}
                    onChange={() => setCheckedList(!checkedList)}
                />
                <Button disabled={!checkedList}>
                    <p>선택 발주확인</p>
                </Button>
            </div>
            {dummy.map(x =>
                <div className={style.OrderListContainer}>
                    <Checkbox
                        name={`order_checkbox_${x.id}`}
                        defaultChecked={checkedList}
                        onChange={() => setCheckedList(!checkedList)}
                    />
                    <OrderProductUserItem item={x} />
                    <Button style={{ margin: "0 0 0 calc(100% - 100px)" }}>발주확인</Button>
                </div>)}
        </Box>

    </div>;
};
export default Order;