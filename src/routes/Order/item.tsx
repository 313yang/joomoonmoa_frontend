import { Box, InputLine, InputLabel } from "@/components/Styled";
import { OrderProductNewItemType } from "./defines";
import style from "./style.module.scss";
import { copyToClipboard } from "@/libs/Function";

export const OrderProductUserItem = ({ item ,isNotDelivery }: { item: OrderProductNewItemType; isNotDelivery: boolean; }) => {
    return <div className={style.OrderProductUserItem}>
        <strong>
            {item.productName}
        </strong>

        <InputLine>
            <InputLabel>옵션</InputLabel>
            <strong>{item.productOption}</strong>
        </InputLine>
        <InputLine>
            <InputLabel>수량</InputLabel>
            <strong className={item.quantity > 1 ? "text-danger" : ""}>{item.quantity}</strong>
        </InputLine>
        <div className={style.border} />


        <InputLine>
            <InputLabel>수령인</InputLabel>
            <div>
                <strong>{item.receiverName}</strong>
                <p onClick={() => copyToClipboard(item.receiverName, "수령인")} className="text-primary">복사</p>
            </div>
        </InputLine>
        <InputLine>
            <InputLabel>전화번호</InputLabel>
            <div>
                <strong>{item.receiverPhoneNumber}</strong>
                <p onClick={() => copyToClipboard(item.receiverPhoneNumber, "연락처")} className="text-primary">복사</p>
            </div>
        </InputLine>
        {!isNotDelivery &&
            <InputLine>
                <InputLabel>주소</InputLabel>
                <div>
                    <strong>{item.baseAddress} <br />
                        {item.detailedAddress}</strong>
                    <p onClick={() => copyToClipboard(`${item.baseAddress} ${item.detailedAddress}`, "주소")} className="text-primary">복사</p>
                </div>
            </InputLine>
        }
        {!!item.shippingMemo &&
            <InputLine>
                <InputLabel>배송메모</InputLabel>
                <div>
                    <strong>{item.shippingMemo}</strong>
                    <p onClick={() => copyToClipboard(`${item.shippingMemo}`, "배송메모")} className="text-primary">복사</p>
                </div>
            </InputLine>
        }
    </div>;
};