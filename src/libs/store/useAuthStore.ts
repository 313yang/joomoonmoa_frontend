import { create } from "zustand";
import { persist } from "zustand/middleware";

interface IUsePlayerStore {
    accessToken: string;
    refreshToken: string;
    isAutoLogin: boolean;
    setAccessToken: (val: string) => void;
    setRefreshToken: (val: string) => void;
    setIsAutoLogin: (val: boolean) => void;
}

const usePlayerStore = create<IUsePlayerStore>()(
    persist(
        (set) => ({
            accessToken: "",
            refreshToken: "",
            isAutoLogin: false,
            setAccessToken: (val: string) => {
                document.cookie = `access=${val}`;
                set({ accessToken: val });
            },
            setRefreshToken: (val: string) => {
                document.cookie = `refresh=${val}`;
                set({ refreshToken: val });
            },
            setIsAutoLogin: (val: boolean) => {
                document.cookie = `isAutoLogin=${val}`;
                set({ isAutoLogin: val });
            }

        }),
        { name: "player" }
    )
);
export const useUserAuth = () =>
    usePlayerStore((state) => ({
        accessToken: state.accessToken,
        refreshToken: state.refreshToken,
        isAutoLogin: state.isAutoLogin
    }));

export const useUserAuthAction = () =>
    usePlayerStore((state) => ({
        setAccessToken: state.setAccessToken,
        setRefreshToken: state.setRefreshToken,
        setIsAutoLogin: state.setIsAutoLogin,
    }));
