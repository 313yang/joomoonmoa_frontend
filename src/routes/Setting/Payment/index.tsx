import { Box, Radio } from "@/components/Styled";
import { FormatNumberToPrice, RequestGet } from "@/libs/Function";
import style from "./style.module.scss";
import { getPlans } from "@/libs/api/subscriptions";
import { useEffect, useState } from "react";
import { PlanType } from "@/libs/Defines";

const paymentList = [
    { price: 13900, month: 1 },
    { price: 71400, month: 6 },
    { price: 118800, month: 12 },
];
const SettingPayment = () => {
    const [planList, setPlanList] = useState<PlanType[]>([]);

    const getPlanApi = async () => {
        const resp = await RequestGet(getPlans) || [];
        setPlanList(resp);
    };
    useEffect(() => {
        getPlanApi();
    }, []);
    return <>
        <h6>구독 기간</h6>
        {planList.map(li =>
            <Box key={`PaymentList_${li.planPriceId}`} color="white" className={style.PaymentListComponent}>
                <Radio name="payment">
                    <div>
                        <h6>{li.durationMonths}{li.durationMonths < 12 ? "개월" : "년"} 구독</h6>
                        <p>월 {FormatNumberToPrice(li.servingPrice / li.durationMonths)}원</p>
                    </div>
                </Radio>
            </Box>
        )}
    </>;
};
export default SettingPayment;