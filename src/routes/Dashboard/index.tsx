import { useEffect, useState } from "react";
import DashboardOrder from "./Order";
import DashboardRequest from "./Request";
import DashboardStore from "./Store";
import { getDashboardOrder, getDashboardOrderMarket } from "@/libs/api/dashboard";
import { DashboardItems, PlaceOrderStatuesMarket, PlaceOrderStatuses, PlaceOrderStatusesInit } from "@/libs/Defines";
import { RequestGet } from "@/libs/Function";
import { TutorialContainer } from "@/components/Layout/Tutorial";


const Main = () => {
  const [data, setData] = useState<{
    order: DashboardItems,
    market: PlaceOrderStatuesMarket[];
  }>({ order: PlaceOrderStatusesInit, market: [] });
  const [isFirst, setIsFirst] = useState<boolean>(false);

  const getAllData = async () => {
    const orderRes = await RequestGet(getDashboardOrder) || PlaceOrderStatusesInit;
    const marketRes = await RequestGet(getDashboardOrderMarket);

    marketRes && setIsFirst(marketRes.length === 0);
    setData({
      order: orderRes,
      market: marketRes || [],
    });
  };
  useEffect(() => {
    getAllData();
  }, []);

  return <div>
    {isFirst && <TutorialContainer />}
    <DashboardOrder data={data.order} />
    <DashboardRequest />
    <DashboardStore data={data.market} />
  </div>;
};

export default Main;