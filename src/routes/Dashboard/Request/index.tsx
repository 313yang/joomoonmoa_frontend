import { Box, Table } from "@/components/Styled";
import data from "./data.json";
import style from "../style.module.scss";
import { Link } from "react-router-dom";
import { Arrow } from "@/components/Icons";

/** 메인페이지 > 요청 컴포넌트 */
const DashboardRequest = () => {
  return <div className={style.Container}>
    <div className={style.ContainerHeader}>
      <h3>요청</h3>
      <Link to="/order"><Arrow /></Link>
    </div>
    <div className={style.DashboardOrderContainer}>
      <Box color="gray50" className={style.DashboardOrdeBox}>
        <span>문의</span>
        <h3>{data.order}</h3>
      </Box>
      <Box color="gray50" className={style.DashboardOrdeBox}>
        <span>교환</span>
        <h3>{data.pre}</h3>
      </Box>
      <Box color="gray50" className={style.DashboardOrdeBox}>
        <span>반품</span>
        <h3>{data.cancel}</h3>
      </Box>
    </div>
  </div>;
};

export default DashboardRequest;