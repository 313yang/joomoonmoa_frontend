import { useState } from "react";
import { Box, Input, Radio } from "@/components/Styled";
import { BuildClass } from "@/libs/Function";
import { CardInfoType, PaymentMethodType, methodList } from "../../defines";
import commonStyle from "../style.module.scss";
import style from "./style.module.scss";
import Dropdown from "@/components/Styled/Dropdown";

// const monthArray = Array.from({ length: 12 }, (_, i) => ({ name: i + 1, value: i + 1 }));
// const monthArray = Array.from({ length: 12 }, (_, i) => ({ name: i + 1, value: i + 1 }));

export const PaymentMethod = () => {
    const [selected, setSelected] = useState<PaymentMethodType>(PaymentMethodType.NAVER_PAY);
    const [cardInfo, setCardInfo] = useState<CardInfoType>({
        cardNumber: "",
        cardExpirationYear: "",
        cardExpirationMonth: "",
        customerIdentityNumber: ""
    });
    return <>
        {methodList.map(method => <Box
            key={`PaymentList_${method.name}`}
            color="white"
            className={BuildClass(commonStyle.PaymentListComponent, selected === method.type && commonStyle.SelectedPlan)}
            onClick={() => setSelected(method.type)}
        >
            <Radio name="payment" value={selected} checked={method.type === selected}>
                <div>
                    <h6>{method.name}</h6>
                    <img src={`/assets/images/${method.icon}`} alt={method.icon + "아이콘"} />
                </div>
            </Radio>
            {selected === PaymentMethodType.CREDIT_CARD && method.type === PaymentMethodType.CREDIT_CARD &&
                <div className={style.CreditInfoContainer}>
                    <div>
                        카드번호
                        <Input value={cardInfo.cardNumber} />
                    </div>
                    <div>
                        유효기간
                        <div className={style.CardExpiration}>
                            <Input value={cardInfo.cardExpirationMonth} /> 월 <Input value={cardInfo.cardExpirationMonth} /> 년
                        </div>
                    </div>
                    <div>
                        생년월일
                        <Input />
                    </div>
                </div>}
        </Box>)}
    </>

        ;
};
export default PaymentMethod;