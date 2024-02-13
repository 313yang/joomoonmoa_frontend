import { Box, Table } from "@/components/Styled";
import data from "./data.json";
import style from "../style.module.scss";
import { Link, useNavigate } from "react-router-dom";
import { Chevron } from "@/components/Icons";

/** 메인페이지 > 요청 컴포넌트 */
const DashboardRequest = () => {
  const route = useNavigate();
  return <div className={style.Container}>
    <div className={style.ContainerHeader}>
      <img src="/assets/images/search.png" />
      <h3>고객문의</h3>
    </div>
    <div className={style.DashboardOrderContainer}>
      <Box color="gray50" className={style.DashboardOrdeBox}>
        <button onClick={() => route("/request")}>
          <span>문의</span>
          <Chevron direction="right" width={8} />
        </button>
        <h2>{data.order}</h2>
      </Box>
      <Box color="gray50" className={style.DashboardOrdeBox}>
        <button onClick={() => route("/request")}>
          <span>교환</span>
          <Chevron direction="right" width={8} />
        </button>
        <h2>{data.pre}</h2>
      </Box>
      <Box color="gray50" className={style.DashboardOrdeBox}>
        <button onClick={() => route("/request")}>
          <span>반품</span>
          <Chevron direction="right" width={8} />
        </button>
        <h2>{data.cancel}</h2>
      </Box>
    </div>
  </div>;
};

export default DashboardRequest;