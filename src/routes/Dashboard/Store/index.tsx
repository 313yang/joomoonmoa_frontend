import { Box } from "@/components/Styled";
import style from "../style.module.scss";
import { PlaceOrderStatuesMarket, StoreListType } from "@/libs/Defines";
import { BuildClass } from "@/libs/Function";
import { useNavigate } from "react-router-dom";

/** 메인페이지 > 전체 주문 컴포넌트 */
const DashboardStore = ({ data }: { data: PlaceOrderStatuesMarket[]; }) => {
  const route = useNavigate();
  return <div className={style.Container}>
    <div className={style.AddMarketButton}>
      <div>
        <img src="/assets/images/chart.png" />
        <h3>현황</h3>
      </div>
      <span className="text-primary" onClick={() => route("/setting/addStore")}>+ 판매채널 관리</span>
    </div>
    <Box color="white">
      {data.length > 0 ? <>
        <div className="store_table_header">
          <span style={{ minWidth: 130, justifyContent: "flex-start" }}>판매채널</span>
          <span>신규</span>
          <span>준비</span>
          <span>취소</span>
          <span>문의</span>
          <span>교환</span>
          <span>반품</span>
        </div>
        <div className={BuildClass("store_table_header", "store_table_container")}>
          {data.map(x =>
            <div key={`dashboardOrder_${x.marketId}`} className="store_table_content">
              <div className="StoreName">
                <p data-type={x.platform}>{StoreListType[x.platform]}</p>
                <span>{x.marketAlias}</span>
              </div>
              <div className="store_table_header">
                <span>{x.notYet}</span>
                <span>{x.ok}</span>
                <span>{x.canceled}</span>
                <span>{x.inquiry}</span>
                <span>{x.exchange}</span>
                <span>{x.retrieve}</span>
              </div>
            </div>
          )}
        </div>
      </> :
        <div className={style.NoMarket} onClick={() => route("/setting/addStore")}>판매채널을 연결해주세요.</div>}
    </Box>
  </div>;
};

export default DashboardStore;