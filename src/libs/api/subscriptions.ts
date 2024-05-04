import { subscriptions } from ".";
import { PlanType } from "../Defines";

export const getPlans = async () => await subscriptions.get<PlanType[]>("/plans");
