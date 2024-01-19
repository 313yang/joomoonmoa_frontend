import { Button } from "@/components/Styled";
import { notLoginPath } from "@/libs/Defines";
import { onClickRefresh } from "@/libs/Function";
import { marketRefresh } from "@/libs/api/market";
import { useLocation } from "react-router-dom";

const LogoContainer = () => {
    const { pathname } = useLocation();
    
    if (notLoginPath.some(x => pathname === x)) return null;
    return <div className="logo_container">
        <img className="logo" src="/logo.svg" />
        <Button width="70px" onClick={onClickRefresh}>새로고침</Button>
    </div>;
};
export default LogoContainer;