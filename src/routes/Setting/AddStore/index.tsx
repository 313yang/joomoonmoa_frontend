import { Button, Input } from "@/components/Styled";
import { StoreList, UserInfoType } from "../defines";
import Dropdown from "@/components/Styled/Dropdown";
import { useSettingStore } from "../hooks";
import style from "../style.module.scss";
import { PlaceOrderStatuesMarket } from "@/libs/Defines";
import { useEffect, useLayoutEffect } from "react";

const SettingAddStore = ({ selectedMarket }: { selectedMarket: PlaceOrderStatuesMarket | null; }) => {
    const { loading, storeInfo, handleSetStoreInfo, submitAddMarket, submitChangeMarket, submitMarketSyncTest } = useSettingStore();
    const { clientId, clientSecret, marketAlias, platform } = storeInfo;
    useLayoutEffect(() => {
        if (!!selectedMarket) handleSetStoreInfo(selectedMarket);
    }, []);

    if (!platform)
        return <Dropdown key={platform} className={style.Dropdown} placeholder={"판매 채널"} items={StoreList} value={platform} onClick={(val) => handleSetStoreInfo({ platform: val })} />;
    return <>
        <Dropdown disabled={!!selectedMarket} key={platform} className={style.Dropdown} placeholder={"판매 채널"} items={StoreList} value={platform} onClick={(val) => handleSetStoreInfo({ platform: val })} />
        <Input label="스토어 API" defaultValue={clientId} onInput={(val) => handleSetStoreInfo({ clientId: val })} />
        <Input label="API KEY" defaultValue={clientSecret} onInput={(val) => handleSetStoreInfo({ clientSecret: val })} />
        <Input label="별명" defaultValue={marketAlias} onInput={(val) => handleSetStoreInfo({ marketAlias: val })} />
        <Button width="100%" size="lg" disabled={loading} onClick={submitMarketSyncTest}>로그인 테스트</Button>
        <Button width="100%" size="lg" disabled={loading} onClick={selectedMarket ? submitChangeMarket : submitAddMarket}>스토어 {selectedMarket ? "수정" : "등록"}</Button>
    </>;
};
export default SettingAddStore;