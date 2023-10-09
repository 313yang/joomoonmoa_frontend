import style from "../style.module.scss";
import { PlaceOrderStatuesMarket } from "@/libs/Defines";
import { BuildClass } from "@/libs/Function";

/** 메인페이지 > 전체 주문 컴포넌트 */
const DashboardStore = ({ data }: { data: PlaceOrderStatuesMarket[]; }) => {

  return <div className={style.Container}>
    <div className={BuildClass(style.ContainerHeader, style.AddMarketButton)}>
      <h3>현황</h3>
      <span className="text-primary">+ 판매처 관리</span>
    </div>
    <div className={style.DashboardStoreHeader}>
      <span>신규</span>
      <span>발송</span>
      <span>문의</span>
      <span>교환</span>
      <span>반품</span>
    </div>
    <div className={style.DashboardStoreHeader}>
      {data.map(x =>
        <div key={`dashboardOrder_${x.marketId}`} className={style.DashboardStoreContent}>
          <div>
          <p>네이버</p>
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
  </div>;
};

export default DashboardStore;