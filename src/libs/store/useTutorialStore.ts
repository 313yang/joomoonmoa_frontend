import { create } from "zustand";
import { persist } from "zustand/middleware";
import { TutorialStepType } from "../Defines";

interface ITutorialStepStore {
    tutorialStep: number;
    setTutorialStep: (val: number) => void;
}

const useTutorialStepStore = create<ITutorialStepStore>()(
    (set) => ({
        tutorialStep: TutorialStepType.NONE,
        setTutorialStep: (val: number) => set({ tutorialStep: val })
    }),
);
export const useTutorialStep = () =>
    useTutorialStepStore((state) => ({
        tutorialStep: state.tutorialStep,
    }));

export const useTutorialStepAction = () =>
    useTutorialStepStore((state) => ({
        setTutorialStep: state.setTutorialStep,
    }));