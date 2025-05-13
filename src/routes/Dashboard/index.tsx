import { useEffect, useState } from "react";
import DashboardOrder from "./Order";
import DashboardRequest from "./Request";
import DashboardStore from "./Store";
import { getDashboardOrder, getDashboardOrderMarket } from "@/libs/api/dashboard";
import { DashboardItems, PlaceOrderStatuesMarket, PlaceOrderStatuses, PlaceOrderStatusesInit, TutorialStepType } from "@/libs/Defines";
import { RequestGet } from "@/libs/Function";
import { TutorialContainer } from "@/components/Layout/Tutorial";
import { useTutorialStep, useTutorialStepAction } from "@/libs/store/useTutorialStore";
import { getStatus } from "@/libs/api/subscriptions";


const Main = () => {
  const [data, setData] = useState<{
    order: DashboardItems,
    market: PlaceOrderStatuesMarket[];
  }>({ order: PlaceOrderStatusesInit, market: [] });
  const { tutorialStep } = useTutorialStep();
  const { setTutorialStep } = useTutorialStepAction();

  const getAllData = async () => {
    const orderRes = await RequestGet(getDashboardOrder) || PlaceOrderStatusesInit;
    const marketRes = await RequestGet(getDashboardOrderMarket);
    (marketRes && marketRes.length === 0) && setTutorialStep(TutorialStepType.HOME);
   
    setData({
      order: orderRes,
      market: marketRes || [],
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