import { create } from "zustand";

interface INaverSoultionTokenStore {
    NaverSoultionToken: string;
    setNaverSoultionToken: (val: string) => void;
}

const useNaverSoultionTokenStore = create<INaverSoultionTokenStore>()(
    (set) => ({
        NaverSoultionToken: "",
        setNaverSoultionToken: (val: string) => set({ NaverSoultionToken: val })
    }),
);
export const useNaverSoultionToken = () =>
    useNaverSoultionTokenStore((state) => ({
        NaverSoultionToken: state.NaverSoultionToken,
    }));

export const useNaverSoultionTokenAction = () =>
    useNaverSoultionTokenStore((state) => ({
        setNaverSoultionToken: state.setNaverSoultionToken,
    }));