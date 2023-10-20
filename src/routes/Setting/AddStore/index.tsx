import { Chevron } from "@/components/Icons";
import { Box, Switch, Button, Input } from "@/components/Styled";
import { UserInfoType } from "../defines";
import style from "./style.module.scss";
import { useNavigate } from "react-router-dom";
import Dropdown from "@/components/Styled/Dropdown";

const SettingAddStore = ({ user }: { user: UserInfoType; }) => {
    const route = useNavigate();

    return <>
        <Dropdown items={[{name:"네이버",value:1}]} />
        <Input />
        <Input />
    </>;
};
export default SettingAddStore;