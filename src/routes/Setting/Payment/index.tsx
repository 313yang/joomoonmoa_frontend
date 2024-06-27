import { usePayment } from "./hooks";
import PaymentPlanList from "./PlanList";

const SettingPayment = () => {
    const { planList } = usePayment();


    return <>
        <h6>구독 기간</h6>
        {planList.map(li => <PaymentPlanList plan={li} />)}
        <h6>결제 수단</h6>
        <h6>쿠폰</h6>
        <div>

        </div>
    </>;
};
export default SettingPayment;