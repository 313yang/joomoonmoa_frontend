import { Table } from "@/components/Styled/Table";
import data from "./data.json";

/** 메인페이지 > 스토어 현황 컴포넌트 */
const DashboardStore = () => {
  return <div>
    <h3>스토어 현황</h3>
    <Table thead={["스토어", "신규", "준비", "취소"]}>
      {data.map(x =>
        <tr key={x.store_idx}>
          <td>{x.store_name}</td>
          <td>{x.new}</td>
          <td>{x.pre}</td>
          <td>{x.cancel}</td>
        </tr>)}
    </Table>
  </div>;
};

export default DashboardStore;