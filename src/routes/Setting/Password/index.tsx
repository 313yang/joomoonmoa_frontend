import { Button, Input } from "@/components/Styled";
import { StoreList, UserInfoType } from "../defines";
import Dropdown from "@/components/Styled/Dropdown";
import { useSettingStore } from "../hooks";

const SettingChangePassword = () => {
    const { loading, password, passwordConfirm, setPassword, setPasswordConfirm, submitChangePassword } = useSettingStore();

    return <>
        <Input label="새 비밀번호" type="password" defaultValue={password} onInput={setPassword} />
        <Input label="새 비밀번호 확인" type="password" defaultValue={passwordConfirm} onInput={setPasswordConfirm} />
        <Button width="100%" size="lg" disabled={loading} onClick={() => submitChangePassword()}>비밀번호 변경</Button>
    </>;
};
export default SettingChangePassword;