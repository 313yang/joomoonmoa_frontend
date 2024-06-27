import { Button } from "@/components/Styled";
import { notLoginPath } from "@/libs/Defines";
import { onClickRefresh } from "@/libs/Function";
import { marketRefresh } from "@/libs/api/market";
import { useLocation, useNavigate } from "react-router-dom";

const LogoContainer = () => {
    const { pathname } = useLocation();
    const route = useNavigate();

    if (notLoginPath.some(x => pathname === x)) return null;
    return <button className="logo_container" onClick={() => route("/dashboard")}>
        <img className="logo" src="/logo.svg" />
        <Button width="70px" onClick={onClickRefresh}>새로고침</Button>
    </button>;
};
export default LogoContainer;