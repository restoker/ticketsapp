import { create } from "zustand";


interface AdminState {
    currentTicketId: number;
    agentId: number;
    priority: 'low' | 'medium' | 'high' | undefined;
    edit: boolean;
    setTicketId: (currentTicketId: number) => void;
    setAgentId: (agentId: number) => void;
    setPriority: (priority: 'low' | 'medium' | 'high') => void;
    setEdit: (edit: boolean) => void;
}

const useAdminStore = create<AdminState>((set) => ({
    currentTicketId: 0,
    agentId: 0,
    priority: undefined,
    edit: false,
    setTicketId: (currentTicketId: number) => set({ currentTicketId }),
    setAgentId: (agentId: number) => set({ agentId }),
    setPriority: (priority: 'low' | 'medium' | 'high') => set({ priority }),
    setEdit: (edit: boolean) => set({ edit }),
}))


export default useAdminStore;