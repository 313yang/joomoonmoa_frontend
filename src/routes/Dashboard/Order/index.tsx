import { Box, Button, Table } from "@/components/Styled";
import { PlaceOrderStatuses } from "@/libs/Defines";
import style from "../style.module.scss";
import { Arrow } from "@/components/Icons";
import { Link } from "react-router-dom";

/** 메인페이지 > 주문 컴포넌트 */
const DashboardOrder = ({ data }: { data: PlaceOrderStatuses; }) => {

  return <div className={style.Container}>
    <div className={style.ConainterHeader}>
      <h3>주문</h3>
      <Link to="/order"><Arrow /></Link>
    </div>
    <div className={style.DashboardOrderContainer}>
      <div className={style.DashboardOrdeBoxrContainer}>
        <Box color="gray50" className={style.DashboardOrdeBox}>
          <span>신규주문</span>
          <h3>{data.notYet}</h3>
        </Box>
        <Button>모두 발주확인</Button>
      </div>
      <img src="./assets/images/arrow_right.svg" />
      <div className={style.DashboardOrdeBoxrContainer}>
        <Box color="gray50" className={style.DashboardOrdeBox}>
          <span>발송준비</span>
          <h3>{data.ok}</h3>
        </Box>
        <div className={style.DashboardOrderButtonCancel}>
          취소요청 : {data.canceled}
        </div>
      </div>
    </div>
    {/* <Table thead={["신규", "발송준비", "취소"]}>
      <tr>
        <td>
          <span><h2>{data.notYet}</h2>건</span>
        </td>
        <td>
          <span><h2>{data.ok}</h2>건</span>
        </td>
        <td>
          <span><h2>{data.canceled}</h2>건</span>
        </td>
      </tr>
    </Table> */}
  </div>;
};

export default DashboardOrder;