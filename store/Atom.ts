import { atom } from "jotai";

export const walletAtom =atom<string >("");
export const balanceAtom =atom<number | null>(0);
export const transactionAtom =atom<{signature: string; success: boolean} | null>(null);