import { common } from ".";

export const getDeliveryCompanies = async () => await common.get("/delivery-companies");
