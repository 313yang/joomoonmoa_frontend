import { Box, Radio } from "@/components/Styled";
import { FormatNumberToPrice } from "@/libs/Function";
import style from "./style.module.scss";

const paymentList = [
    { price: 13900, month: 1 },
    { price: 71400, month: 6 },
    { price: 118800, month: 12 },
];
const SettingPayment = () => {

    return <>
        <h6>구독 기간</h6>
        {paymentList.map(li =>
            <Box key={`PaymentList_${li.month}`} color="white" className={style.PaymentListComponent}>
                <Radio name="payment">
                    <div>
                        <h6>{li.month}{li.month < 12 ? "개월" : "년"} 구독</h6>
                        <p>월 {FormatNumberToPrice(li.price / li.month)}원</p>
                    </div>
                </Radio>
            </Box>
        )}
    </>;
};
export default SettingPayment;