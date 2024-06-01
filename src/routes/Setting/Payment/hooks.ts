import { PlanType } from "@/libs/Defines";
import { useEffect, useState } from "react";

export const usePayment = (planList: PlanType[]) => {
    const [selectedPlan, setSelectedPlan] = useState<PlanType>();
    
    useEffect(() => {
        if (planList.length > 0) setSelectedPlan(planList[0]);
    }, [planList]);

    return {
        selectedPlan,
        setSelectedPlan
    };
};