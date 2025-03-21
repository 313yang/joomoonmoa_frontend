import { PlanType } from "@/libs/Defines";
import { RequestGet } from "@/libs/Function";
import { getPlans } from "@/libs/api/subscriptions";
import { useEffect, useState } from "react";

export const usePayment = () => {
    const [planList, setPlanList] = useState<PlanType[]>([]);
    const [selectedPlan, setSelectedPlan] = useState<PlanType | null>(null);
    const getPlanApi = async () => {
        const resp = await RequestGet(getPlans) || [];
        setPlanList(resp);
    };

    useEffect(() => {
        getPlanApi();
    }, []);

    useEffect(() => {
        if (planList.length > 0) setSelectedPlan(planList[0]);
    }, [planList]);

    return {
        planList,
        selectedPlan,
        setSelectedPlan
    };
};