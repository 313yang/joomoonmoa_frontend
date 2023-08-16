import { create } from "zustand";
import { persist } from "zustand/middleware";

interface IUsePlayerStore {
    accessToken: string;
    refreshToken: string;
    setAccessToken: (val: string) => void;
    setRefreshToken: (val: string) => void;
}

const usePlayerStore = create<IUsePlayerStore>()(
    persist(
        (set) => ({
            accessToken: "",
            refreshToken: "",

            setAccessToken: (val: string) => {
                set({ accessToken: val });
            },
            setRefreshToken: (val: string) => {
                set({ refreshToken: val });
            },

        }),
        { name: "player" }
    )
);
export const useUserAuth = () =>
    usePlayerStore((state) => ({
        accessToken: state.accessToken,
        refreshToken: state.refreshToken,
    }));

export const useUserAuthAction = () =>
    usePlayerStore((state) => ({
        setAccessToken: state.setAccessToken,
        setRefreshToken: state.setRefreshToken,
    }));
