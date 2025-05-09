import { Box } from "@/components/Styled";
import { useLocation } from "react-router-dom";


export const PaymentStatus = () => {
    const { pathname } = useLocation();

    return <Box color="white">
        <div>
            <p>구독상태</p>
            <p>구독중</p>
        </div>
        <div>
            <p>구독 시작일</p>
            <p>2025.05.01</p>
        </div>
        <div>
            <p>다음 결제일</p>
            <p>2025.05.01</p>
        </div>
    </Box>;
};
export default PaymentStatus;