import { subscriptions } from ".";
import { PlanType, SubscriptionType } from "../Defines";

export const getPlans = async () => await subscriptions.get<PlanType[]>("/plans");
export const getStatus = async () => await subscriptions.get<SubscriptionType>("/status");
