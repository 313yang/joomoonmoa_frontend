import { Table } from "@/components/Styled/Table";
import data from "./data.json";

/** 메인페이지 > 주문 컴포넌트 */
const DashboardOrder = () => {
  return <div>
    <h3>주문</h3>
    <Table thead={["신규", "발송준비", "취소"]}>
      <tr>
        <td>
          <span><h2>{data.order}</h2>건</span>
        </td>
        <td>
          <span><h2>{data.pre}</h2>건</span>
        </td>
        <td>
          <span><h2>{data.cancel}</h2>건</span>
        </td>
      </tr>
    </Table>
  </div>;
};

export default DashboardOrder;