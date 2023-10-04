import { Box, InputLine, InputLabel } from "@/components/Styled";
import { OrderProductNewItemType } from "./defines";
import style from "./style.module.scss";

export const OrderProductUserItem = ({ item }: { item: OrderProductNewItemType; }) => {
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
            <strong>{item.quantity}</strong>
        </InputLine>



        <InputLine>
            <InputLabel>수령인</InputLabel>
            <strong>{item.receiverName}</strong>
        </InputLine>
        <InputLine>
            <InputLabel>전화번호</InputLabel>
            <strong>{item.receiverPhoneNumber}</strong>
        </InputLine>
        <InputLine>
            <InputLabel>주소</InputLabel>
            <strong>{item.baseAddress} <br />
                {item.detailedAddress}</strong>
        </InputLine>

    </div>;
};