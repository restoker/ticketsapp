import { create } from 'zustand'

interface MenuState {
    open: boolean;
    setOpen: (open: boolean) => void;
}

const useMenuStore = create<MenuState>((set) => ({
    open: false,
    setOpen: (open: boolean) => set({ open }),
}));

export default useMenuStore;