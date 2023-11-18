import { Box } from "@/components/Styled";
import style from "../style.module.scss";
import { PlaceOrderStatuesMarket } from "@/libs/Defines";
import { BuildClass } from "@/libs/Function";

/** 메인페이지 > 전체 주문 컴포넌트 */
const DashboardStore = ({ data }: { data: PlaceOrderStatuesMarket[]; }) => {

  return <div className={style.Container}>
    <div className={BuildClass(style.ContainerHeader, style.AddMarketButton)}>
      <div>
        <img src="/assets/images/chart.png" />
        <h3>현황</h3>
      </div>
      <span className="text-primary">+ 판매처 관리</span>
    </div>
    <Box color="white">
      <div className={style.DashboardStoreHeader}>
        <div style={{ minWidth: 130 }} />
        <span>신규</span>
        <span>발송</span>
        <span>문의</span>
        <span>교환</span>
        <span>반품</span>
      </div>
      <div className={BuildClass(style.DashboardStoreHeader, style.DashboardStoreContainer)}>
        {data.map(x =>
          <div key={`dashboardOrder_${x.marketId}`} className={style.DashboardStoreContent}>
            <div className={style.StoreName}>
              <p data-type={"naver"}>네이버</p>
              <span>{x.marketAlias}</span>
            </div>
            <div className={style.DashboardStoreHeader}>
              <span>{x.notYet}</span>
              <span>{x.ok}</span>
              <span>{x.canceled}</span>
              <span>{x.canceled}</span>
              <span>{x.canceled}</span>
            </div>
          </div>
        )}
      </div>
    </Box>
  </div>;
};

export default DashboardStore;