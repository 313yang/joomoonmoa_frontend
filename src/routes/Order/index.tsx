import { OrderProductNewItemType, OrderProductOkItemType, OrderTabHostItemType } from "./defines";
import { Fragment, useEffect, useState } from "react";
import Header from "@/components/Layout/Header";
import { Subtract } from "@/components/Icons";
import style from "./style.module.scss";
import { Box } from "@/components/Styled";
import { Checkbox, TabHost, Button } from "@/components/Styled";
import { OrderNewList } from "./NewList";
import { getOrderNews } from "@/libs/api/orders";
import { RequestGet } from "@/libs/Function";

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
        purchasedItemId: 1,
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
const dummy1 = [
    {
        purchasedItemId: 1,
        marketTitle: "스토어1",
        orderDate: "2023.01.02 03:35:32",
        productName: "아이패드 케이스",
        productOption: "주황",
        quantity: "1",
        receiverName: "yang",
        receiverPhoneNumber: "01012341234",
        baseAddress: "서울시 송파구 가나다로 25",
        detailedAddress: "",
    }
];
const Order = () => {
    const [selected, setSelected] = useState<OrderTabHostItemType>(OrderTabHostItemType.New);
    const [checkedList, setCheckedList] = useState<number[]>([]);
    const [newList, setNewList] = useState<OrderProductNewItemType[]>([]);
    const [orderList, setOrderList] = useState<OrderProductOkItemType[]>([]);

    const getNewList = async () => {
        const data = await RequestGet(getOrderNews) || [];
        setNewList(data);
        setCheckedList(data.map(x => x.purchasedItemId));
    };
    const handleAllChecked = (checked: boolean) => {
        if (checked)
            setCheckedList(newList.map(x => x.purchasedItemId));
        else setCheckedList([]);
        console.log(checked);
    };
    const handleChecked = (val: number) => {
        let cloneList = [...checkedList];
        if (checkedList.some(x => x === val)) {
            cloneList = checkedList.filter(x => x !== val);
        } else {
            cloneList.push(val);
        }
        setCheckedList(cloneList);
    };

    useEffect(() => {
        getNewList();
    }, []);
    return <div>
        <Header title={<div className={style.flexCenter}><h3>주문</h3><Subtract /></div>} />
        <TabHost
            items={tabItems}
            selected={selected}
            onClick={setSelected}
        />

        {newList.length > 0 ? <div className={style.OrderContainer} >
            <div className={style.OrderCheckboxContainer}>
                <Checkbox
                    name="order_checkbox_all"
                    checked={checkedList.length === newList.length}
                    value={checkedList.length === newList.length}
                    onChange={handleAllChecked}
                />
                <Button disabled={!checkedList}>
                    <p>선택 발주확인</p>
                </Button>
            </div>
            {selected === OrderTabHostItemType.New &&
                <OrderNewList
                    items={newList}
                    checkedList={checkedList}
                    setCheckedList={handleChecked}
                />
            }
            {selected === OrderTabHostItemType.Pre && <>
                {/* {orderList.map(item =>
                    <OrderNewList
                        item={item}
                        checkedList={checkedList}
                        setCheckedList={handleChecked}
                    />
                )} */}
            </>}
        </div> : <h4>신규 주문 건이 없습니다.</h4>
        }
    </div >;
};
export default Order;