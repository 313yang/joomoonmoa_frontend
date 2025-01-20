import { createPortal } from "react-dom";
import { useNavigate } from "react-router-dom";
import style from "./style.module.scss";

export const TutorialContainer = () => {
    const route = useNavigate();
    return createPortal(<div className={style.tutorialContainer}>
        <div>
            <div className={style.tutorialAddButton} onClick={() => route("/setting/addStore")}>
                <span className="text-primary">+ 판매채널 관리</span>
            </div>
            {/* <img src={"/assets/images/tutorialArrow.png"} /> */}
            <h1>
                처음 오셨나요?
                <br />
                판매채널을 추가해보세요
            </h1>
        </div>
    </div>, document.getElementById("root")!);
};