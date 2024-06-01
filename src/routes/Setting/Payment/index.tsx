import { Box, Radio } from "@/components/Styled";
import { BuildClass, FormatNumberToPrice, RequestGet } from "@/libs/Function";
import style from "./style.module.scss";
import { getPlans } from "@/libs/api/subscriptions";
import { useEffect, useState } from "react";
import { PlanType } from "@/libs/Defines";
import { usePayment } from "./hooks";

const SettingPayment = () => {
    const [planList, setPlanList] = useState<PlanType[]>([]);
    const { selectedPlan, setSelectedPlan } = usePayment(planList);

    const getPlanApi = async () => {
        const resp = await RequestGet(getPlans) || [];
        setPlanList(resp);
    };
    useEffect(() => {
        getPlanApi();
    }, []);
    return <>
        <h6>구독 기간</h6>
        {planList.map(li => {
            const month = li.durationMonths < 12 ? `${li.durationMonths}개월` : `1년`;

            return <Box
                key={`PaymentList_${li.planPriceId}`}
                color="white"
                className={BuildClass(style.PaymentListComponent, selectedPlan?.planPriceId === li.planPriceId && style.SelectedPlan)}
                onClick={() => setSelectedPlan(li)}
            >
                <Radio name="payment" value={selectedPlan?.planPriceId} checked={selectedPlan?.planPriceId === li.planPriceId}>
                    <div>
                        <h6>{month} 구독</h6>
                        <p>월 {FormatNumberToPrice(li.servingPrice / li.durationMonths)}원</p>
                    </div>
                </Radio>
            </Box>;
        }

        )}
        <h6>결제 수단</h6>
        <h6>쿠폰</h6>
        <div>

        </div>
    </>;
};
export default SettingPayment;