import { create } from "zustand";
import { persist } from "zustand/middleware";
import { SubscriptionType } from "../Defines";

interface ISubscriptionStatusStore {
    subscriptsion: SubscriptionType | null;
    setSubscription: (type: SubscriptionType | null) => void;
}

const useSubscriptionStatusStore = create<ISubscriptionStatusStore>()(
    (set) => ({
        subscriptsion: null,
        setSubscription: (val: SubscriptionType | null) => set({ subscriptsion: val })
    }),
);
export const useSubscription = () =>
    useSubscriptionStatusStore((state) => ({
        subscriptsion: state.subscriptsion,
    }));

export const useSubscriptionAction = () =>
    useSubscriptionStatusStore((state) => ({
        setSubscription: state.setSubscription,
    }));