import { create } from "zustand";
import { persist } from "zustand/middleware";
import { SubscribeType } from "../Defines";

interface ISubscribeStatusStore {
    subscriptsion: SubscribeType | null;
    setSubscribe: (type: SubscribeType | null) => void;
}

const useSubscribeStatusStore = create<ISubscribeStatusStore>()(
    (set) => ({
        subscriptsion: null,
        setSubscribe: (val: SubscribeType | null) => set({ subscriptsion: val })
    }),
);
export const useSubscribe = () =>
    useSubscribeStatusStore((state) => ({
        subscriptsion: state.subscriptsion,
    }));

export const useSubscribeAction = () =>
    useSubscribeStatusStore((state) => ({
        setSubscribe: state.setSubscribe,
    }));