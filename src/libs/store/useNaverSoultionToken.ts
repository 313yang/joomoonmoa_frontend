import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface INaverSoultionTokenStore {
    NaverSoultionToken: string;
    setNaverSoultionToken: (val: string) => void;
}

const useNaverSoultionTokenStore = create<INaverSoultionTokenStore>()(
    persist(
        (set,) => ({
            NaverSoultionToken: "",
            setNaverSoultionToken: (val: string) => set({ NaverSoultionToken: val })
        }),
        {
            name: 'naverSolutionToken',
            storage: createJSONStorage(() => sessionStorage),
        },
    ),
);
export const useNaverSoultionToken = () =>
    useNaverSoultionTokenStore((state) => state.NaverSoultionToken);

export const useNaverSoultionTokenAction = () =>
    useNaverSoultionTokenStore((state) => ({
        setNaverSoultionToken: state.setNaverSoultionToken,
    }));