import { PlaceOrderStatuesMarket } from "@/libs/Defines";
import { getDashboardOrderMarket } from "@/libs/api/dashboard";
import { useEffect, useState } from "react";
import style from "./style.module.scss";
import DashboardStore from "../Dashboard/Store";
import { Table } from "@/components/Styled";
import { RequestGet } from "@/libs/Function";

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
        <h3>요청</h3>
        <Table thead={["스토어", "문의", "교환", "반품"]}>
            {market.map(x =>
                <tr key={x.marketId}>
                    <td>{x.title}</td>
                    <td>{x.notYet}</td>
                    <td>{x.ok}</td>
                    <td>{x.canceled}</td>
                </tr>)}
        </Table>
        <p>스토어에서 확인해주세요.</p>
    </div>;
};
export default Request;