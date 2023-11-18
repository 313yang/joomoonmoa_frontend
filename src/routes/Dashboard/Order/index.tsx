import { Box, Button, Table } from "@/components/Styled";
import { PlaceOrderStatuses } from "@/libs/Defines";
import style from "../style.module.scss";
import { Chevron } from "@/components/Icons";
import { Link, useNavigate } from "react-router-dom";

/** 메인페이지 > 주문 컴포넌트 */
const DashboardOrder = ({ data }: { data: PlaceOrderStatuses; }) => {
  const { ok, notYet, canceled } = data;
  const route = useNavigate();

  return <div className={style.Container}>
    <Link to="/order" className={style.ContainerHeader}>
      <img src="/assets/images/paper.png" />
      <h3>주문</h3>
      <Chevron direction="right" width={8} />
    </Link>
    <div className={style.DashboardOrderContainer}>
      <div className={style.DashboardOrdeBoxrContainer}>
        <Box color="gray50" className={style.DashboardOrdeBox}>
          <button onClick={() => route("/order/news")}>
            <span>신규주문</span>
            <Chevron direction="right" width={8} />
          </button>
          <h2>{notYet}</h2>
        </Box>
        <Button disabled={notYet === 0} >전체 발주확인</Button>
      </div>
      <div className={style.DashboardOrdeBoxrContainer}>
        <Box color="gray50" className={style.DashboardOrdeBox}>
          <button onClick={() => route("/order/wait")}>
            <span>발송준비</span>
            <Chevron direction="right" width={8} />
          </button>
          <h2>{ok}</h2>
        </Box>
        <Button disabled={canceled === 0} className={style.DashboardOrderButtonCancel}>
          취소요청 : <strong>{canceled}</strong>
        </Button>
      </div>
    </div>
  </div>;
};

export default DashboardOrder;