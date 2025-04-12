import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface INaverSolutionTokenStore {
    NaverSolutionToken: string;
    setNaverSolutionToken: (val: string) => void;
}

const useNaverSolutionTokenStore = create<INaverSolutionTokenStore>()(
    persist(
        (set,) => ({
            NaverSolutionToken: "",
            setNaverSolutionToken: (val: string) => set({ NaverSolutionToken: val })
        }),
        {
            name: 'naverSolutionToken',
            storage: createJSONStorage(() => sessionStorage),
        },
    ),
);
export const useNaverSolutionToken = () =>
    useNaverSolutionTokenStore((state) => state.NaverSolutionToken);

export const useNaverSolutionTokenAction = () =>
    useNaverSolutionTokenStore((state) => ({
        setNaverSolutionToken: state.setNaverSolutionToken,
    }));