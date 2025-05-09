import { create } from "zustand";
import { persist } from "zustand/middleware";

interface IPayTypeStore {
    payType: string;
    setPayType: (val: string) => void;
}

const usePayTypeStore = create<IPayTypeStore>()(
    (set) => ({
        payType: "none",
        setPayType: (val: string) => set({ payType: val })
    }),
);
export const usePayType = () =>
    usePayTypeStore((state) => ({
        payType: state.payType,
    }));

export const usePayTypeAction = () =>
    usePayTypeStore((state) => ({
        setPayType: state.setPayType,
    }));