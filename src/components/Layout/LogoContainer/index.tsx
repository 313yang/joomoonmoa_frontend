import { Button } from "@/components/Styled";
import { useLocation } from "react-router-dom";

const LogoContainer = () => {
    const { pathname } = useLocation();

    if (pathname === "/" || pathname === "/join") return null;
    return <div className="logo_container">
        <img className="logo" src="/logo.svg" />
        <Button width="70px" onClick={() => window.location.reload()}>새로고침</Button>
    </div>;
};
export default LogoContainer;