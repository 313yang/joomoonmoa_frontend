import { Chevron } from "@/components/Icons";
import { Box, Switch, Button, Confirm } from "@/components/Styled";
import style from "./style.module.scss";
import { useNavigate } from "react-router-dom";
import { BuildClass, formatPhoneNumber, getIsAutoLogin, setIsAutoLogin } from "@/libs/Function";
import { useEffect, useState } from "react";
import { useSettingStore } from "../hooks";
import { PlaceOrderStatuesMarket, StoreListType } from "@/libs/Defines";
import { setToken } from "@/libs/api";

interface SettingMainProps {
    phoneNumber: string;
    setSelectedMarket(val: PlaceOrderStatuesMarket | null): void;
}
const SettingMain = ({ phoneNumber, setSelectedMarket }: SettingMainProps) => {
    const route = useNavigate();
    const [isAutoLogin, setAutoLogin] = useState<boolean>(getIsAutoLogin());
    const { deleteMarketHandler, getMarket, market } = useSettingStore();
    const [deleteMarketId, setDeleteMarketId] = useState<number | null>(null);

    /** 로그아웃 */
    const handleLogout = () => {
        setToken("");
        window.location.href = "/";
    };


    /** 고객센터 */
    const handleCS = () => {
        window.open("https://open.kakao.com/o/gs0uS37g", "settingcs", "target=_blank");
    };

    const onClickSetAutoLogin = (val: boolean) => {
        setIsAutoLogin(val);
        setAutoLogin(val);
    };

    const onClickModifiedMarket = (market: PlaceOrderStatuesMarket) => {
        setSelectedMarket(market);
        route("/setting/addStore");
    };

    useEffect(() => {
        getMarket();
    }, []);

    return <>
        {!!deleteMarketId && <Confirm
            content="정말 채널을 삭제하실건가요?"
            onClose={() => setDeleteMarketId(null)}
            onClickConfirm={() => {
                deleteMarketHandler(deleteMarketId);
                setDeleteMarketId(null);
            }}
        />}
        <Box color="white" className={style.StoreContainer}>
            <div>
                <p>비밀번호</p>
                <button className={style.StoreUserName} onClick={() => route("/setting/changePassword")}>
                    <p className="text-primary">변경</p>
                    <Chevron direction="right" />
                </button>
            </div>
            <div>
                <p>전화번호</p>
                <button className={style.StoreUserName} onClick={() => route("/setting/changePhoneNumber")}>
                    <p>{formatPhoneNumber(phoneNumber)}</p>
                    <p className="text-primary">변경</p>
                    <Chevron direction="right" />
                </button>
            </div>
            <div>
                <p>앱 주문 알림</p>
                <Switch name="orderAlram" />
            </div>
            <div>
                <p>자동로그인</p>
                <Switch name="isAutoLoginSwitch" checked={!!isAutoLogin} onChange={(_, checked) => onClickSetAutoLogin(!!checked)} />
            </div>
            <div style={{ border: "none" }}>
                <p>판매채널</p>
                <Button onClick={() => route("/setting/addStore")}>+ 스토어추가</Button>
            </div>
            <article>
                {market.length > 0 ? <>
                    <div className={style.StoreSettingHeader}>
                        <span style={{ justifyContent: "flex-start" }}>판매채널</span>
                        <span style={{ justifyContent: "flex-start" }}>별명</span>
                    </div>
                </> : <div className={style.NoStore}>판매채널을 연결해주세요.</div>
                }
                <div className={BuildClass("store_table_header", "store_table_container")}>
                    {market.map(x =>
                        <div key={`dashboardOrder_${x.marketId}`} className={style.StoresContainer}>
                            <div>
                                <div className={BuildClass("StoreName", style.StoreSettingName)}>
                                    <p data-type={x.platform}>{StoreListType[x.platform]}</p>
                                </div>
                                <div className={style.StoreAlias}>{x.marketAlias}</div>
                            </div>
                            <div className={style.StoreButtons}>
                                <button className="text-primary" onClick={() => onClickModifiedMarket(x)}>수정</button>
                                <button className="text-primary" onClick={() => setDeleteMarketId(x.marketId)}>삭제</button>
                            </div>
                        </div>
                    )}
                </div>
            </article>
        </Box>
        {/* <Button width="100%" size="lg" className={style.UpgradeButton} onClick={() => route("/setting/payment")}>
            프로 버전 업그레이드
        </Button> */}
        <div className={style.Buttons}>
            <button onClick={handleCS} className={BuildClass(style.Logout, "text-primary")}>고객센터</button>
            <button onClick={handleLogout} className={BuildClass(style.Logout, "text-primary")}>로그아웃</button>
        </div>
    </>;
};
export default SettingMain;