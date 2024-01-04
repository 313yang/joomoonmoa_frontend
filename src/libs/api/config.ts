import { config } from ".";

export const getConfig = async () => await config.get("/me");