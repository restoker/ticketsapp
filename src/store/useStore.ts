import { create } from "zustand";

interface UserState {
    currenUserId: number;
    role: "user" | "agent" | "admin" | undefined;
    edit: boolean;
    setCurrenUserId: (currenUserId: number) => void;
    setRole: (role: "user" | "agent" | "admin") => void;
    setEdit: (edit: boolean) => void;
    cleanStore: () => void;
}


const useUserStore = create<UserState>((set) => ({
    currenUserId: 0,
    role: undefined,
    edit: false,
    setCurrenUserId: (currenUserId: number) => set({ currenUserId }),
    setRole: (role: "user" | "agent" | "admin") => set({ role }),
    setEdit: (edit: boolean) => set({ edit }),
    cleanStore: () => set({
        currenUserId: 0,
        role: undefined,
        edit: false,
    }),

}))

export default useUserStore;