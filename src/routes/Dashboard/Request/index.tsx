import { Table } from "@/components/Styled";
import data from "./data.json";
import style from "../style.module.scss";

/** 메인페이지 > 요청 컴포넌트 */
const DashboardRequest = () => {
  return <div className={style.Container}>
    <h3>요청</h3>
    <Table thead={["문의", "교환", "반품"]}>
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

export default DashboardRequest;