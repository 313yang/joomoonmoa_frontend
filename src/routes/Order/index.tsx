import { OrderProductNewItemType, OrderProductOkItemType, OrderTabHostItemType } from "./defines";
import { useEffect, useState } from "react";
import Header from "@/components/Layout/Header";
import { Subtract } from "@/components/Icons";
import style from "./style.module.scss";
import { Checkbox, TabHost, Button } from "@/components/Styled";
import { OrderNewList } from "./NewList";
import { getOrderNews } from "@/libs/api/orders";
import { RequestGet } from "@/libs/Function";
import { OrderPurchasedList } from "./Purchased";
import { useLocation, useNavigate, useParams } from "react-router-dom";

const tabItems = [
    {
        name: "신규주문",
        value: OrderTabHostItemType.New
    },
    {
        name: "발송준비",
        value: OrderTabHostItemType.Purchased
    }
];

const dummy1 = [
    {
        baseAddress: "서울특별시 송파구 백제고분로18길 23-8 (잠실동)",
        detailedAddress: "우민주택 402호",
        marketAlias: "양벼리강윤구서연제",
        orderDate: "2023-09-16T20:20:46.0+09:00",
        productName: "SEEK COMPACT 스마트폰 누수탐지기 열화상카메라",
        productOption: "모델: C타입 프로",
        purchasedItemId: 17,
        quantity: 1,
        receiverName: "서연제",
        receiverPhoneNumber: "010-4999-0234",
    }
];
const Order = () => {
    const { pathname } = useLocation();
    const route = useNavigate();
    const orderType = pathname.replace("/order/", "") as OrderTabHostItemType;
    const [selected, setSelected] = useState<OrderTabHostItemType>(orderType || OrderTabHostItemType.New);
    const [checkedList, setCheckedList] = useState<number[]>([]);
    const [newList, setNewList] = useState<OrderProductNewItemType[]>([]);
    const [orderList, setOrderList] = useState<OrderProductOkItemType[]>([]);
    const isNew = selected === OrderTabHostItemType.New;

    const setTabHost = (value: OrderTabHostItemType) => {
        setSelected(value);
        route(`/order/${value}`);
    };
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
            onClick={setTabHost}
        />

        {(isNew ? newList : orderList).length > 0 ? <div className={style.OrderContainer} >
            <div className={style.OrderCheckboxContainer}>
                <Checkbox
                    name="order_checkbox_all"
                    checked={checkedList.length === newList.length}
                    value={checkedList.length === newList.length}
                    onChange={handleAllChecked}
                />
                <Button width="fit-content" disabled={checkedList.length === 0}>
                    <p>선택 주문 발주확인</p>
                </Button>
            </div>
            {selected === OrderTabHostItemType.New &&
                <OrderNewList
                    items={newList}
                    checkedList={checkedList}
                    setCheckedList={handleChecked}
                />
            }
            {selected === OrderTabHostItemType.Purchased && <>
                <OrderPurchasedList
                    items={orderList}
                    checkedList={checkedList}
                    setCheckedList={handleChecked}
                />
            </>
            }
        </div> : <div className={style.NoDataList}>
            <h4>{isNew ? "신규주문" : "발송준비"} 건이 없습니다.</h4>
        </div>
        }
    </div >;
};
export default Order;