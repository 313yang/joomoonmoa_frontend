import { Box, Button, Table } from "@/components/Styled";
import { DashboardItems } from "@/libs/Defines";
import style from "../style.module.scss";
import { Chevron } from "@/components/Icons";
import { Link, useNavigate } from "react-router-dom";
import { confirmItems } from "@/libs/api/dashboard";
import { onClickRefresh, toast } from "@/libs/Function";

/** 메인페이지 > 주문 컴포넌트 */
const DashboardOrder = ({ data }: { data: DashboardItems; }) => {
  const { notYetIdList } = data;
  const { ok, notYet, canceled } = data?.placeOrderStatuses;
  const route = useNavigate();
  const handleConfirmItems = async () => {
    try {
      const resp = await confirmItems(notYetIdList);
      if (resp.status === 200) {
        toast("발주 확인 완료. 제품을 발송해주세요 🚚");
        await onClickRefresh();
      }

    } catch (err) {
      console.error(err);
    }
  };
  return <div className={style.Container}>
    <div className={style.ContainerHeader} onClick={() => route("/order/news")}>
      <img src="/assets/images/paper.png" />
      <h3>주문</h3>
    </div>
    <div className={style.DashboardOrderContainer}>
      <div className={style.DashboardOrdeBoxrContainer}>
        <Box color="gray50" className={style.DashboardOrdeBox} onClick={() => route("/order/news")}>
          <div>
            <span>신규주문</span>
            <Chevron direction="right" width={8} />
          </div>
          <h2>{notYet}</h2>
        </Box>
        <Button disabled={notYet === 0} onClick={handleConfirmItems}>전체 발주확인</Button>
      </div>
      <div className={style.DashboardOrdeBoxrContainer}>
        <Box color="gray50" className={style.DashboardOrdeBox} onClick={() => route("/order/wait")}>
          <div>
            <span>발송준비</span>
            <Chevron direction="right" width={8} />
          </div>
          <h2>{ok}</h2>
        </Box>
        <Button onClick={() => route("/order/wait")} disabled={canceled === 0} className={style.DashboardOrderButtonCancel}>
          취소요청 : <strong>{canceled}</strong>
        </Button>
      </div>
    </div>
  </div>;
};

export default DashboardOrder;