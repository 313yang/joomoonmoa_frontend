import { FormatNumberToPrice } from "@/libs/Function";

import style from "./style.module.scss";
import { Button } from "@/components/Styled";
import { useNavigate } from "react-router-dom";

const PaymentHistory = () => {
    // const { planList, selectedPlan, setSelectedPlan } = usePayment();
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
       
    </>;
};
export default PaymentHistory;