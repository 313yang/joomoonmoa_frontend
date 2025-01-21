import { createPortal } from "react-dom";
import { useNavigate } from "react-router-dom";
import style from "./style.module.scss";
import { Setting } from "@/components/Icons";
import { useTutorialStep, } from "@/libs/store/useTutorialStore";
import { TutorialStepType } from "@/libs/Defines";
import { TutorialHome } from "./Home";
import { TutorialSetting } from "./Setting";

export const TutorialContainer = () => {
    const { tutorialStep } = useTutorialStep();

    return createPortal(<div className={style.tutorialContainer}>
        <div>
            {tutorialStep === TutorialStepType.HOME && <TutorialHome />}
            {tutorialStep === TutorialStepType.SETTING && <TutorialSetting />}
        </div>
    </div>, document.getElementById("root")!);
};