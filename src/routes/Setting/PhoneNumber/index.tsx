import { Button, Input } from "@/components/Styled";
import { StoreList, UserInfoType } from "../defines";
import Dropdown from "@/components/Styled/Dropdown";
import { useSettingStore } from "../hooks";

const SettingChangePhoneNumber = () => {
    const { loading, storeInfo, handleSetStoreInfo, submitAddMarket, phoneNumber, setChangePhoneNumber } = useSettingStore();
    const { clientId, clientSecret, marketAlias, platform } = storeInfo;

    return <>
        <div><p>현재 전화번호</p> <p>{phoneNumber}</p></div>
        <Input label="바꿀 전화번호" defaultValue={clientId} onInput={(val) => setChangePhoneNumber(val)} />
        <Input label="인증번호" defaultValue={clientSecret} onInput={(val) => handleSetStoreInfo({ clientSecret: val })} />
        <Button width="100%" size="lg" disabled={loading} onClick={submitAddMarket}>전화번호 변경</Button>
    </>;
};
export default SettingChangePhoneNumber;