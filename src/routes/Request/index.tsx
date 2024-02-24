import { PlaceOrderStatuesMarket, StoreListType } from "@/libs/Defines";
import { getDashboardOrderMarket } from "@/libs/api/dashboard";
import { useEffect, useState } from "react";
import style from "./style.module.scss";
import DashboardStore from "../Dashboard/Store";
import { Box, Table } from "@/components/Styled";
import { BuildClass, RequestGet } from "@/libs/Function";

const Request = () => {
    const [market, setMarket] = useState<PlaceOrderStatuesMarket[]>([]);

    // TODO:: 스토어 문의/교환/반품 api로 교체
    const getMarket = async () => {
        const marketRes = await RequestGet(getDashboardOrderMarket) || [];
        setMarket(marketRes);
    };

    useEffect(() => {
        getMarket();
    }, []);

    return <div className={style.Container}>
        <Box color="white">
            <div className="store_table_header">
                <span style={{ justifyContent: "flex-start" }}>판매채널</span>
                <div style={{ width: 150 }}>
                    <span>문의</span>
                    <span>교환</span>
                    <span>반품</span>
                </div>
            </div>
            <div className={BuildClass("store_table_header", "store_table_container")}>
                {market.map(x =>
                    <div key={`dashboardOrder_${x.marketId}`} className="store_table_content">
                        <div className="StoreName">
                            <p data-type={x.platform}>{StoreListType[x.platform]}</p>
                            <span>{x.marketAlias}</span>
                        </div>
                        <div className="store_table_header" style={{ width: 150 }}>
                            <span>{x.notYet}</span>
                            <span>{x.ok}</span>
                            <span>{x.canceled}</span>
                        </div>
                    </div>
                )}
            </div>
        </Box>
        <p>스토어에서 확인해주세요.</p>
    </div>;
};
export default Request;