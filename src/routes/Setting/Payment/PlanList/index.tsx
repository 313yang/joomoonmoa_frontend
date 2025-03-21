import { Box, Radio } from "@/components/Styled";
import { PlanType } from "@/libs/Defines";
import { BuildClass, FormatNumberToPrice } from "@/libs/Function";
import commonStyle from "../style.module.scss";
import { usePayment } from "../hooks";

interface PaymentPlanListProps {
    plan: PlanType;
    selectedPlan: PlanType | null;
    setSelectedPlan: (val: PlanType) => void;
}
export const PaymentPlanList = ({ plan, selectedPlan, setSelectedPlan }: PaymentPlanListProps) => {
    const month = plan.durationMonths < 12 ? `${plan.durationMonths}개월` : `1년`;

    return <Box
        key={`PaymentList_${plan.planPriceId}`}
        color="white"
        className={BuildClass(commonStyle.PaymentListComponent, selectedPlan?.planPriceId === plan.planPriceId && commonStyle.SelectedPlan)}
        onClick={() => setSelectedPlan(plan)}
    >
        <Radio name="payment" value={selectedPlan?.planPriceId} checked={selectedPlan?.planPriceId === plan.planPriceId}>
            <div>
                <h6>{month} 구독</h6>
                <p>월 {FormatNumberToPrice(plan.servingPrice / plan.durationMonths)}원</p>
            </div>
        </Radio>
    </Box>;
};
export default PaymentPlanList;