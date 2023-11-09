import { OrderProductNewItemType, OrderProductOkItemType, OrderTabHostItemType } from "./defines";
import { useEffect, useState } from "react";
import Header from "@/components/Layout/Header";
import { Subtract } from "@/components/Icons";
import style from "./style.module.scss";
import { Checkbox, TabHost, Button } from "@/components/Styled";
import { OrderNewList } from "./NewList";
import { getOrder } from "@/libs/api/orders";
import { RequestGet } from "@/libs/Function";
import { OrderPurchasedList } from "./Purchased";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { confirmItems } from "@/libs/api/dashboard";

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

const testItem = [
    {
        "purchasedItemId": 10,
        "marketAlias": "스마트스토어 테스트샵",
        "orderDate": "2023.10.11 12:11:22",
        "productName": "아이패드 케이스 투명 9 8 7세대 10.2인치 펜슬 수납 스마트 북커버 에어 수납 마그네틱",
        "productOption": "주황",
        "quantity": 2,
        "receiverPhoneNumber": "010-1234-5678",
        "receiverName": "서연제",
        "baseAddress": "서울시 송파구 가나다로 25",
        "detailedAddress": "서울시 송파구 가나다로 25"
    }
];

const Order = () => {
    const { pathname } = useLocation();
    const route = useNavigate();
    const orderType = pathname.replace("/order/", "") as OrderTabHostItemType;
    const [selected, setSelected] = useState<OrderTabHostItemType>(orderType || OrderTabHostItemType.New);
    const [checkedList, setCheckedList] = useState<number[]>([]);
    const [newList, setNewList] = useState<OrderProductNewItemType[]>([]);
    const [orderList, setOrderList] = useState<OrderProductNewItemType[]>([]);
    const isNew = selected === OrderTabHostItemType.New;

    const setTabHost = (value: OrderTabHostItemType) => {
        setSelected(value);
        route(`/order/${value}`);
    };

    const getNewList = async () => {
        const data = await RequestGet(getOrder, selected) || [];
        setNewList(data);
        setOrderList(data);
        setCheckedList(data.map(x => x.purchasedItemId));
    };

    const handleAllChecked = (checked: boolean) => {
        if (checked)
            setCheckedList(newList.map(x => x.purchasedItemId));
        else setCheckedList([]);
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

    const handleConfirmItem = async () => {
        try {
            const resp = await selected === OrderTabHostItemType.New ? confirmItems(checkedList) : confirmItems(checkedList);
            console.log(resp);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        getNewList();
    }, [selected]);

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
                <Button width="fit-content" disabled={checkedList.length === 0} onClick={handleConfirmItem}>
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