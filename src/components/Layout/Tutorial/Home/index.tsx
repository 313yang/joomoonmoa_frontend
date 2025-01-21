import { useTutorialStepAction } from "@/libs/store/useTutorialStore";
import { useNavigate } from "react-router-dom";
import { TutorialStepType } from "@/libs/Defines";
import { Setting } from "@/components/Icons";
import style from "../style.module.scss";

export const TutorialHome = () => {
    const { setTutorialStep } = useTutorialStepAction();
    const route = useNavigate();

    const nextStep = () => {
        route("/setting");
        setTutorialStep(TutorialStepType.SETTING);
    };
    return <>
        <div className={style.tutorialSettingButton} onClick={nextStep}>
            <Setting />
            <span >설정</span>
        </div>
        {/* <img src={"/assets/images/tutorialArrow.png"} /> */}
        <h1>
            처음 오셨나요?
            <br />
            판매채널을 추가해보세요
        </h1>
    </>;
};