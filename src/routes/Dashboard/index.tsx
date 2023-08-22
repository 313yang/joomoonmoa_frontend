import { useEffect, useState } from "react";
import DashboardOrder from "./Order";
import DashboardRequest from "./Request";
import DashboardStore from "./Store";
import { getDashboardOrder, getDashboardOrderMarket } from "@/libs/api/dashboard";
import { PlaceOrderStatuesMarket, PlaceOrderStatuses, PlaceOrderStatusesInit } from "@/libs/Defines";

const Main = () => {
  const [order, setOrder] = useState<PlaceOrderStatuses>(PlaceOrderStatusesInit); // 주문
  const [market, setMarket] = useState<PlaceOrderStatuesMarket[]>([]); // 스토어 현황


  useEffect(() => {
    // 주문정보
    (async () => {
      const resp = await getDashboardOrder();
      setOrder(resp);
    })();
  }, []);

  useEffect(() => {
    // 스토어 현황
    (async () => {
      const resp = await getDashboardOrderMarket();
      setMarket(resp);
    })();
  }, []);

  return <div>
    {/* <img src={""} alt="로고" /> */}
    <DashboardOrder data={order} />
    <DashboardRequest />
    <DashboardStore data={market} />
  </div>;
};

export default Main;