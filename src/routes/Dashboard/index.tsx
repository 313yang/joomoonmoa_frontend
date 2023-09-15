import { useEffect, useState } from "react";
import DashboardOrder from "./Order";
import DashboardRequest from "./Request";
import DashboardStore from "./Store";
import { getDashboardOrder, getDashboardOrderMarket } from "@/libs/api/dashboard";
import { PlaceOrderStatuesMarket, PlaceOrderStatuses, PlaceOrderStatusesInit } from "@/libs/Defines";
import style from "./style.module.scss";
import { Button } from "@/components/Styled";

let isFetch = false;

const Main = () => {
  const [data, setData] = useState<{
    order: PlaceOrderStatuses,
    market: PlaceOrderStatuesMarket[];
  }>({ order: PlaceOrderStatusesInit, market: [] });

  const getAllData = async () => {
    if (isFetch) return;
    isFetch = true;
    const orderRes = await getDashboardOrder();
    const marketRes = await getDashboardOrderMarket();

    setData({
      order: orderRes,
      market: marketRes,
    });
    isFetch = false;
  };
  useEffect(() => {
    getAllData();
  }, []);


  return <div>
    <div className={style.logoContainer}>
      <img className={style.logo} src="./logo.svg" />
      <Button width="fit-content" >새로고침</Button>
    </div>
    <DashboardOrder data={data.order} />
    <DashboardRequest />
    <DashboardStore data={data.market} />
  </div>;
};

export default Main;