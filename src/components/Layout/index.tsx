import { Route, Routes } from "react-router-dom";
import Dashboard from "@/routes/Dashboard";
import Request from "@/routes/Request";
import Order from "@/routes/Order";
import Setting from "@/routes/Setting";
import Login from "@/routes/Login";
import Join from "@/routes/Join";
import Password from "@/routes/Join/password";
import { getToken } from "@/libs/api";
import Privacy from "@/routes/Privacy";
import { TossPayment } from "@/routes/Setting/Payment/TossPayment";
import PaymentResult from "@/routes/Setting/Payment/Result";


const BaseLayout = () => {
  const accessToken = getToken();
      
  return <Routes>
    <Route path="/" Component={Login} />
    {!!accessToken &&
      /** 로그인 후 기본 베이스 레이어 */
      <>
        <Route path="/dashboard" Component={Dashboard} />
        <Route path="/order/*" Component={Order} />
        <Route path="/request" Component={Request} />
        <Route path="/setting/*" Component={Setting} />
        <Route path="/toss-payment" Component={TossPayment} />
        <Route path="/payment-result/*" Component={PaymentResult} />
      </> 
    }
    <Route path="/join" Component={Join} />
    <Route path="/password" Component={Password} />
    <Route path="/privacy" Component={Privacy} />
  </Routes>;
};

export default BaseLayout;