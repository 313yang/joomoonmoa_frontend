import { OrderProductNewItemType, OrderTabHostItemType } from "./defines";
import { Fragment, useEffect, useState } from "react";
import style from "./style.module.scss";
import { Checkbox, Button } from "@/components/Styled";
import { OrderNewList } from "./New";
import { getOrder } from "@/libs/api/orders";
import { RequestGet, onClickRefresh, toast } from "@/libs/Function";
import { OrderPurchasedList } from "./Wait";
import { useLocation } from "react-router-dom";
import { confirmItems } from "@/libs/api/dashboard";
import { DispatchItemListType } from "@/libs/Defines";

const Order = () => {
    const { pathname } = useLocation();
    const orderType = pathname.replace("/order/", "").replace("/", "") as OrderTabHostItemType;
    const [checkedList, setCheckedList] = useState<number[]>([]);
    const [newList, setNewList] = useState<OrderProductNewItemType[]>([]);
    const [orderList, setOrderList] = useState<OrderProductNewItemType[]>([]);
    const isNew = orderType === OrderTabHostItemType.New;
    // Initialize state with an empty array
    const [items, setItems] = useState<DispatchItemListType[]>([]);

    const getNewList = async () => {
        const data = await RequestGet(getOrder, orderType) || [];
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
        // 체크 되어있는 상품
        if (checkedList.some(x => x === val)) {
            cloneList = checkedList.filter(x => x !== val);
        } else {
            cloneList.push(val);
        }
        setCheckedList(cloneList);
    };

    const handleConfirmItems = async (id?: number) => {
        try {
            const resp = await confirmItems(id ? [id] : checkedList);
            if (resp.status === 200) {
                toast("발주 확인 완료. 제품을 발송해주세요 🚚");
                await onClickRefresh();
            }
        } catch (err) {
            console.error(err);
        }
    };

    // const handleSetTrackingNumber = (id:number,value:string) =>{
    //     if(!deliveryInfo.id) 
    // }
    // const handleSetDeliveryCompanyCode = (id:number,value:string) =>{

    // }
    // Function to handle changes
    const handleChange = (purchasedItemId: number, field: string, value: string) => {
        setItems(prevItems => {
            // Find if the item already exists
            const existingItemIndex = prevItems.findIndex(item => item.purchasedItemId === purchasedItemId);

            if (existingItemIndex !== -1) {
                // Update existing item
                const updatedItems = [...prevItems];
                updatedItems[existingItemIndex] = {
                    ...updatedItems[existingItemIndex],
                    [field]: value,
                };
                return updatedItems;
            } else {
                // Add new item
                return [
                    ...prevItems,
                    {
                        purchasedItemId,
                        deliveryCompanyCode: field === 'deliveryCompanyCode' ? value : '',
                        trackingNumber: field === 'trackingNumber' ? value : '',
                    },
                ];
            }
        });
    };

    // Example input change handlers
    const handleCompanyCodeChange = (event: React.ChangeEvent<HTMLInputElement>, purchasedItemId: number) => {
        handleChange(purchasedItemId, 'deliveryCompanyCode', event.target.value);
    };

    const handleTrackingNumberChange = (event: React.ChangeEvent<HTMLInputElement>, purchasedItemId: number) => {
        handleChange(purchasedItemId, 'trackingNumber', event.target.value);
    };
    useEffect(() => {
        getNewList();
    }, [orderType]);

    return <div>
        {(isNew ? newList : orderList).length > 0 ? <div className={style.OrderContainer} >
            <div className={style.OrderCheckboxContainer}>
                <Checkbox
                    name="order_checkbox_all"
                    checked={checkedList.length === newList.length}
                    value={checkedList.length === newList.length}
                    onChange={handleAllChecked}
                />
                <Button width="fit-content" disabled={checkedList.length === 0} onClick={() => handleConfirmItems()}>
                    <p>선택 주문 {isNew ? "발주확인" : "발송"}</p>
                </Button>
            </div>
            {(isNew ? newList : orderList).map((item, idx) => <Fragment key={`order_${orderType}_checkbox_${item.purchasedItemId}_${idx}`}>
                {isNew ?
                    <OrderNewList
                        item={item}
                        checkedList={checkedList}
                        setCheckedList={handleChecked}
                        handleConfirmItem={(id) => handleConfirmItems(id)}
                    />
                    :
                    <OrderPurchasedList
                        item={item}
                        checkedList={checkedList}
                        setCheckedList={handleChecked}
                        handleCompanyCodeChange={handleCompanyCodeChange}
                        handleTrackingNumberChange={handleTrackingNumberChange}
                    />
                }
            </Fragment>)}

        </div> : <div className={style.NoDataList}>
            <h4>{isNew ? "신규주문" : "발송준비"} 건이 없습니다.</h4>
        </div>
        }
    </div >;
};
export default Order;