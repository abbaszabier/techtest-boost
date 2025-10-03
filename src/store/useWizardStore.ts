import { create } from "zustand";
import { Post } from "@/lib/schemas";

type WizardState = {
  step: number;
  data: Partial<Post>;
  setData: (patch: Partial<Post>) => void;
  next: () => void;
  back: () => void;
  reset: () => void;
  posts: Post[];
  setPosts: (p: Post[]) => void;
};

export const useWizardStore = create<WizardState>((set) => ({
  step: 1,
  data: {},
  posts: [],
  setData: (patch) => set((s) => ({ data: { ...s.data, ...patch } })),
  next: () => set((s) => ({ step: Math.min(5, s.step + 1) })),
  back: () => set((s) => ({ step: Math.max(1, s.step - 1) })),
  reset: () => set({ step: 1, data: {} }),
  setPosts: (p) => set({ posts: p }),
}));
