import { Table } from "@/components/Styled";
import style from "../style.module.scss";
import { PlaceOrderStatuesMarket } from "@/libs/Defines";

/** 메인페이지 > 전체 주문 컴포넌트 */
const DashboardStore = ({ data }: { data: PlaceOrderStatuesMarket[]; }) => {
  return <div className={style.Container}>
    <h3>전체 주문</h3>
    <Table thead={["스토어", "신규", "준비", "취소"]}>
      {data.map(x =>
        <tr key={x.marketId}>
          <td>{x.title}</td>
          <td>{x.notYet}</td>
          <td>{x.ok}</td>
          <td>{x.canceled}</td>
        </tr>)}
    </Table>
  </div>;
};

export default DashboardStore;