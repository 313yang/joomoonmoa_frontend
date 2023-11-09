import { Button, Input } from "@/components/Styled";
import { StoreList, UserInfoType } from "../defines";
import Dropdown from "@/components/Styled/Dropdown";
import { useSettingStore } from "../hooks";

const SettingAddStore = () => {
    const { loading, storeInfo, handleSetStoreInfo, submitAddMarket, submitMarketSyncTest } = useSettingStore();
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