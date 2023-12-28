import { Button, Input } from "@/components/Styled";
import { StoreList, UserInfoType } from "../defines";
import Dropdown from "@/components/Styled/Dropdown";
import { useSettingStore } from "../hooks";
import style from "../style.module.scss";

const SettingAddStore = () => {
    const { loading, storeInfo, handleSetStoreInfo, submitAddMarket, submitMarketSyncTest } = useSettingStore();
    const { clientId, clientSecret, marketAlias, platform } = storeInfo;

    if (!storeInfo?.platform)
        return <Dropdown className={style.Dropdown} placeholder={"판매 채널"} items={StoreList} value={platform} onClick={(val) => handleSetStoreInfo({ platform: val })} />;
    return <>
        <Dropdown className={style.Dropdown} placeholder={"판매 채널"} items={StoreList} value={platform} onClick={(val) => handleSetStoreInfo({ platform: val })} />
        <Input label="스토어 API" defaultValue={clientId} onInput={(val) => handleSetStoreInfo({ clientId: val })} />
        <Input label="API KEY" defaultValue={clientSecret} onInput={(val) => handleSetStoreInfo({ clientSecret: val })} />
        <Input label="별명" defaultValue={marketAlias} onInput={(val) => handleSetStoreInfo({ marketAlias: val })} />
        <Button width="100%" size="lg" disabled={loading} onClick={submitMarketSyncTest}>로그인 테스트</Button>
        <Button width="100%" size="lg" disabled={loading} onClick={submitAddMarket}>스토어 등록</Button>
    </>;
};
export default SettingAddStore;