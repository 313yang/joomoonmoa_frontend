import { Chevron } from "@/components/Icons";
import { Box, Switch, Button, Input } from "@/components/Styled";
import { UserInfoType } from "../defines";
import style from "./style.module.scss";
import { useNavigate } from "react-router-dom";
import Dropdown from "@/components/Styled/Dropdown";
import { useState } from "react";
const StoreList = [{
    name: "스마트스토어", value: "naver"
}, {
    name: "쿠팡", value: "cupang"
}, {
    name: "G마켓, G9", value: "gmarket"
}, {
    name: "옥션", value: "oction"
}, {
    name: "ESM 마스터", value: "esm"
}, {
    name: "인터파크", value: "interpark"
}, {
    name: "티몬", value: "tmon"
}, {
    name: "위메프", value: "wemakeprice"
}, {
    name: "롯데ON", value: "lotteon"
}, {
    name: "카카오톡스토어", value: "kakaotalk"
}, {
    name: "카페24", value: "cafe24"
}, {
    name: "SSG닷컴", value: "ssg"
}, {
    name: "셀러허브", value: "sellerhurb"
}, {
    name: "멸치쇼핑", value: "melchi"
}];

const SettingAddStore = ({ user }: { user: UserInfoType; }) => {
    const route = useNavigate();
    const [selectedStore, setSelectedStore] = useState("naver");
    return <>
        <Dropdown items={StoreList} value={selectedStore} onClick={setSelectedStore} />
        <Input label="스토어 API" />
        <Input label="API KEY" />
        <Input label="별명" />
        <Button width="100%">로그인 테스트</Button>
        <Button width="100%">스토어 등록</Button>
    </>;
};
export default SettingAddStore;