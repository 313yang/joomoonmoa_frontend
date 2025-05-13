import { FormatNumberToPrice } from "@/libs/Function";
import { usePayment } from "./hooks";
import PaymentMethod from "./Method";
import PaymentPlanList from "./PlanList";
import style from "./style.module.scss";
import { Button } from "@/components/Styled";
import { useNavigate } from "react-router-dom";

const SettingPayment = () => {
    const { planList, selectedPlan, setSelectedPlan } = usePayment();
    const route = useNavigate();

    function getFutureDate(monthsToAdd: number) {
        const futureDate = new Date();
        futureDate.setMonth(futureDate.getMonth() + monthsToAdd);

        const year = futureDate.getFullYear();
        const month = futureDate.getMonth() + 1; // 월은 0부터 시작하므로 +1
        const day = futureDate.getDate();

        return `${year}년 ${month}월 ${day}일`;
    }

    return <>
        <h6>구독 기간</h6>
        {planList.map(li => <PaymentPlanList
            key={li.planPriceId}
            plan={li}
            selectedPlan={selectedPlan}
            setSelectedPlan={setSelectedPlan}
        />)}
        {selectedPlan && <>
            <div className={style.selectedPlanInfo}>
                <p>오늘 결제 금액</p>
                <h4>{FormatNumberToPrice(selectedPlan?.servingPrice)}원</h4>
            </div>
            <div className={style.selectedPlanInfo}>
                <p>다음 결제일</p>
                <h4>{getFutureDate(selectedPlan.durationMonths)}</h4>
            </div>
        </>
        }
        <div>
        <Button width="100%" size="lg" className={style.UpgradeButton} onClick={() => route("/toss-payment")}>
            결제하기
        </Button>
        </div>
    </>;
};
export default SettingPayment;