import { Box, InputLine, InputLabel } from "@/components/Styled";
import { OrderProductItemType } from "./defines";
import style from "./style.module.scss";

export const OrderProductUserItem = ({ item }: { item: OrderProductItemType; }) => {
    return <div className={style.OrderProductUserItem}>
        <Box size="none" style={{ borderRadius: "4px" }}>
            <InputLine>
                <InputLabel>스토어</InputLabel>
                {item.storeTitle}
            </InputLine>
            <InputLine>
                <InputLabel>주문시간</InputLabel>
                {item.paymentDate}
            </InputLine>
            <InputLine>
                <InputLabel>상품</InputLabel>
                {item.storeTitle}
            </InputLine>
            <InputLine>
                <InputLabel>옵션</InputLabel>
                {item.productOption}
            </InputLine>
            <InputLine>
                <InputLabel>수량</InputLabel>
                {item.quantity}
            </InputLine>
        </Box>

        <Box size="none" style={{ borderRadius: "4px" }}>
            <InputLine>
                <InputLabel>수령인</InputLabel>
                {item.userName}
            </InputLine>
            <InputLine>
                <InputLabel>전화번호</InputLabel>
                {item.tel}
            </InputLine>
            <InputLine>
                <InputLabel>주소</InputLabel>
                {item.address}
            </InputLine>
        </Box>
    </div>;
};