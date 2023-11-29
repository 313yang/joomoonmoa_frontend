import { useEffect, useState } from "react";
import DashboardOrder from "./Order";
import DashboardRequest from "./Request";
import DashboardStore from "./Store";
import { getDashboardOrder, getDashboardOrderMarket } from "@/libs/api/dashboard";
import { PlaceOrderStatuesMarket, PlaceOrderStatuses, PlaceOrderStatusesInit } from "@/libs/Defines";
import style from "./style.module.scss";
import { Button } from "@/components/Styled";
import { RequestGet } from "@/libs/Function";


const Main = () => {
  const [data, setData] = useState<{
    order: PlaceOrderStatuses,
    market: PlaceOrderStatuesMarket[];
  }>({ order: PlaceOrderStatusesInit.placeOrderStatuses, market: [] });

  const getAllData = async () => {
    const orderRes = await RequestGet(getDashboardOrder) || PlaceOrderStatusesInit;
    const marketRes = await RequestGet(getDashboardOrderMarket) || [];

    setData({
      order: orderRes.placeOrderStatuses,
      market: marketRes,
    });
  };
  useEffect(() => {
    getAllData();
  }, []);


  return <div>
    <DashboardOrder data={data.order} />
    <DashboardRequest />
    <DashboardStore data={data.market} />
  </div>;
};

export default Main;