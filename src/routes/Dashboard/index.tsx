import { useEffect, useState } from "react";
import DashboardOrder from "./Order";
import DashboardRequest from "./Request";
import DashboardStore from "./Store";
import { getDashboardOrder, getDashboardOrderMarket } from "@/libs/api/dashboard";
import { DashboardItems, PlaceOrderStatuesMarket, PlaceOrderStatuses, PlaceOrderStatusesInit } from "@/libs/Defines";
import style from "./style.module.scss";
import { Button } from "@/components/Styled";
import { RequestGet } from "@/libs/Function";


const Main = () => {
  const [data, setData] = useState<{
    order: any,
    market: PlaceOrderStatuesMarket[];
  }>({ order: PlaceOrderStatusesInit, market: [] });

  const getAllData = async () => {
    const orderRes = await RequestGet(getDashboardOrder) || PlaceOrderStatusesInit;
    const marketRes = await RequestGet(getDashboardOrderMarket) || [];

    setData({
      order: orderRes,
      market: marketRes,
    });
  };
  useEffect(() => {
    getAllData();
  }, []);


  return <div style={{marginBottom:60}}>
    <DashboardOrder data={data.order} />
    <DashboardRequest />
    <DashboardStore data={data.market} />
  </div>;
};

export default Main;