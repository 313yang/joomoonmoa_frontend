
import { Box, Button, Confirm } from "@/components/Styled";
import style from "./style.module.scss";
import { BuildClass } from "@/libs/Function";
import { useState } from "react";
import Dropdown from "@/components/Styled/Dropdown";

const PaymentHistory = () => {
    const [isUnsubscribe, setIsUnsubscribe] = useState<boolean>(false);
    //  formatDateToDotFormat

    return <>
        {isUnsubscribe && <Confirm
            content="구독을 취소하시겠습니까?"
            onClickConfirm={() => { }}
            onClose={() => setIsUnsubscribe(false)}
            confirmText="구독 취소"
            cancelText="닫기"
        />}
        <Dropdown className={style.dropdown} items={[{ name: "2025", value: "2025" },]} value="2025" />
        <Box color="white">
            <div className={style.content}>
                <p>2025.01.01 - 프로플랜</p>
                <p>9,900원</p>
            </div>
            <div className={style.content}>
                <p>2025.01.01 프로플랜</p>
                <p>9,900원</p>
            </div>
            <div className={style.content}>
                <p>2025.01.01 프로플랜</p>
                <p>9,900원</p>
            </div>
        <button
                className={BuildClass(style.unsubscribe, "text-primary")}
                onClick={() => setIsUnsubscribe(true)}
            >
                구독 취소
            </button>
        </Box>
            {/* <Button
                className={BuildClass(style.unsubscribe, "text-primary")}
                onClick={() => setIsUnsubscribe(true)}
            >
                구독 취소
            </Button> */}
    </>;
};
export default PaymentHistory;