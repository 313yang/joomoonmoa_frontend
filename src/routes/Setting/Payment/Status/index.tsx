import { Box } from "@/components/Styled";
import style from "./style.module.scss";
import { SubscriptionType } from "@/libs/Defines";
import { formatDateToDotFormat } from "@/libs/Function";

export const PaymentStatus = ({ subscriptsion }: { subscriptsion: SubscriptionType; }) => {
    return <Box color="white">
        <div className={style.content}>
            <p>구독상태</p>
            <p>구독중</p>
        </div>
        <div className={style.content}>
            <p>구독 시작일</p>
            <p>{formatDateToDotFormat(subscriptsion.roundStartDate)}</p>
        </div>
        <div className={style.content}>
            <p>다음 결제일</p>
            <p>{formatDateToDotFormat(subscriptsion.roundEndDate)}</p>
        </div>
    </Box>;
};
export default PaymentStatus;