import { create } from "zustand";

interface CreaterSidebarStore {
  collapsed: boolean;
  OnExpand: () => void;
  onCollapse: () => void;
}

export const useCreatorSidebar = create<CreaterSidebarStore>((set) => ({
  collapsed: false,
  OnExpand: () => set(() => ({ collapsed: false })),
  onCollapse: () => set(() => ({ collapsed: true })),
}));
