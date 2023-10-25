import { Chevron } from "@/components/Icons";
import { Box, Switch, Button, Input } from "@/components/Styled";
import { StoreList, UserInfoType } from "../defines";
import style from "./style.module.scss";
import { useNavigate } from "react-router-dom";
import Dropdown from "@/components/Styled/Dropdown";
import { useState } from "react";
import { addsMarkets, marketsSyncTest } from "@/libs/api/market";
import { AddMarketsType } from "@/libs/Defines";
import { toast } from "@/libs/Function";
import { useAddClient } from "../hooks";




const SettingAddStore = ({ user }: { user: UserInfoType; }) => {
    const { loading, storeInfo, handleSetStoreInfo, submitAddMarket, submitMarketSyncTest } = useAddClient();
    const { clientId, clientSecret, marketAlias, platform } = storeInfo;

    return <>
        <Dropdown items={StoreList} value={platform} onClick={(val) => handleSetStoreInfo({ platform: val })} />
        <Input label="스토어 API" defaultValue={clientId} onInput={(val) => handleSetStoreInfo({ clientId: val })} />
        <Input label="API KEY" defaultValue={clientSecret} onInput={(val) => handleSetStoreInfo({ clientSecret: val })} />
        <Input label="별명" defaultValue={marketAlias} onInput={(val) => handleSetStoreInfo({ marketAlias: val })} />
        <Button width="100%" disabled={loading} onClick={submitMarketSyncTest}>로그인 테스트</Button>
        <Button width="100%" disabled={loading} onClick={submitAddMarket}>스토어 등록</Button>
    </>;
};
export default SettingAddStore;