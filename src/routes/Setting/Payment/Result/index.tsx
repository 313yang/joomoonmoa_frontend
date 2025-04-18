import { useLocation } from "react-router-dom";


export const PaymentResult = () => {
    const { pathname } = useLocation();
    console.log(pathname);

    return <div>
        {pathname.includes("success") ? <div>결제성공!</div>: <div>결제실패!</div>}
    </div>;
};
export default PaymentResult;