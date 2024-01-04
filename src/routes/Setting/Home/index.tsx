import { Chevron } from "@/components/Icons";
import { Box, Switch, Button } from "@/components/Styled";
import { UserInfoType } from "../defines";
import style from "./style.module.scss";
import { useNavigate } from "react-router-dom";
import { PlaceOrderStatuesMarket } from "@/libs/Defines";
import { BuildClass, RequestGet } from "@/libs/Function";
import { getDashboardOrderMarket } from "@/libs/api/dashboard";
import { useState, useEffect } from "react";
import { deleteMarket } from "@/libs/api/market";
import { useSettingStore } from "../hooks";

const SettingMain = () => {
    const route = useNavigate();
    const { deleteMarketHandler, getConfigApi, getMarket, market } = useSettingStore();



    useEffect(() => {
        getMarket();
        getConfigApi();
    }, []);

    return <>
        <Box color="white" className={style.StoreContainer}>
            <div>
                <p>닉네임</p>
                <button className={style.StoreUserName} onClick={() => route("/setting/changeNickname")}>
                    <p className="text-primary">스마트한 호랑이</p>
                    <Chevron direction="right" />
                </button>
            </div>
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
                    <p className="text-primary">변경</p>
                    <Chevron direction="right" />
                </button>
            </div>
            <div>
                <p>주문수집알림</p>
                <Switch />
            </div>
            <div>
                <p>자동로그인</p>
                <Switch />
            </div>
            <div style={{ border: "none" }}>
                <p>판매채널</p>
                <Button onClick={() => route("/setting/addStore")}>+ 스토어추가</Button>
            </div>
            <article>
                <div className={style.StoreSettingHeader}>
                    <span style={{ justifyContent: "flex-start" }}>판매채널</span>
                    <span style={{ justifyContent: "flex-start" }}>별명</span>
                </div>
                <div className={BuildClass("store_table_header", "store_table_container")}>
                    {market.map(x =>
                        <div key={`dashboardOrder_${x.marketId}`} className={style.StoresContainer}>
                            <div className={BuildClass("StoreName", style.StoreSettingName)}>
                                <p data-type={"naver"}>네이버</p>
                            </div>
                            <div style={{ width: 110 }}>{x.marketAlias}</div>
                            <div className="">
                                <button className="text-primary">수정</button>
                                <button className="text-primary" onClick={() => deleteMarketHandler(x.marketId)}>삭제</button>
                            </div>
                        </div>
                    )}
                </div>
            </article>

        </Box>
    </>;
};
export default SettingMain;