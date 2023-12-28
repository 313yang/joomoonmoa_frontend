import { Button, Input } from "@/components/Styled";
import { StoreList, UserInfoType } from "../defines";
import Dropdown from "@/components/Styled/Dropdown";
import { useSettingStore } from "../hooks";

const SettingChangeNickname = () => {
    const { loading, storeInfo, handleSetStoreInfo, submitAddMarket, submitMarketSyncTest } = useSettingStore();
    const { clientId, clientSecret, marketAlias, platform } = storeInfo;

    return <>
        <Input label="바꿀 닉네임" defaultValue={clientSecret} onInput={(val) => handleSetStoreInfo({ clientSecret: val })} />
        <Button width="100%" size="lg" disabled={loading} onClick={submitAddMarket}>닉네임 변경</Button>
    </>;
};
export default SettingChangeNickname;