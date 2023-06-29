import DashboardOrder from "./Order";
import DashboardRequest from "./Request";
import DashboardStore from "./Store";

const Main = () => {
    return <div>
        {/* <img src={""} alt="로고" /> */}
        <DashboardOrder />
        <DashboardRequest />
        <DashboardStore />
    </div>;
};

export default Main;