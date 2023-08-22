import { Table } from "@/components/Styled";
import style from "../style.module.scss";
import { useEffect, useState } from "react";
import { getDashboardOrder } from "@/libs/api/dashboard";
import { PlaceOrderStatuses } from "@/libs/Defines";

/** 메인페이지 > 주문 컴포넌트 */
const DashboardOrder = ({data}:{data:PlaceOrderStatuses}) => {

  return <div className={style.Container}>
    <h3>주문</h3>
    <Table thead={["신규", "발송준비", "취소"]}>
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
    </Table>
  </div>;
};

export default DashboardOrder;