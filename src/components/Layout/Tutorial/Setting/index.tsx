import { useTutorialStepAction } from "@/libs/store/useTutorialStore";
import { useNavigate } from "react-router-dom";
import { TutorialStepType } from "@/libs/Defines";
import { Setting } from "@/components/Icons";
import style from "../style.module.scss";
import { Button } from "@/components/Styled";

export const TutorialSetting = () => {
    const { setTutorialStep } = useTutorialStepAction();
    const route = useNavigate();

    const nextStep = () => {
        route("/setting/addStore");
        setTutorialStep(TutorialStepType.NONE);
    };
    return <>
        <Button className={style.tutorialAddButton} onClick={nextStep}>+ 스토어추가</Button>
        {/* <img src={"/assets/images/tutorialArrow.png"} /> */}
        <h1>
            스토어추가 버튼을 클릭해
            <br />
            판매채널을 연결해보세요
        </h1>
    </>;
};