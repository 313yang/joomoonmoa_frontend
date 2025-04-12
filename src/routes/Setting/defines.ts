export interface UserInfoType {
    userName: string,
}
export const StoreList = [
    {
        name: "스마트스토어", value: "NAVER"
    },
    // {
    //     name: "쿠팡", value: "COUPANG"
    // },
    // {
    //     name: "G마켓, G9", value: "GMARKET"
    // },
    // {
    //     name: "옥션", value: "AUCTION"
    // },
    // {
    //     name: "ESM 마스터", value: "ESM"
    // },
    // {
    //     name: "인터파크", value: "INTERPARK"
    // },
    // {
    //     name: "티몬", value: "TMON"
    // },
    // {
    //     name: "위메프", value: "WEMAKEPRICE"
    // },
    // {
    //     name: "롯데ON", value: "LOTTEON"
    // },
    // {
    //     name: "카카오톡스토어", value: "KAKAOTALK"
    // },
    // {
    //     name: "카페24", value: "CAFE24"
    // },
    // {
    //     name: "SSG닷컴", value: "SSG"
    // },
    // {
    //     name: "셀러허브", value: "SELLERHURB"
    // },
    // {
    //     name: "멸치쇼핑", value: "MELCHI"
    // }
];

export enum PaymentMethodType {
    NAVER_PAY = 1,
    CREDIT_CARD = 2,
}

export const methodList = [
    {
        type: PaymentMethodType.NAVER_PAY,
        name: "네이버페이",
        icon: "naverpay.png"
    }, {
        type: PaymentMethodType.CREDIT_CARD,
        name: "카드",
        icon: "card.png"
    },
];

export interface CardInfoType {
    /** 카드 번호입니다. 최대 길이는 20자입니다. */
    cardNumber: string;
    /** 카드 유효 연도입니다. */
    cardExpirationYear: string;
    /** 카드 유효 월입니다. */
    cardExpirationMonth: string;
    /** 카드 소유자 정보입니다. 생년월일 6자리(YYMMDD) 혹은 사업자등록번호 10자리가 들어갑니다. */
    customerIdentityNumber: string;
}