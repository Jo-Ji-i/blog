import { create } from 'zustand';

interface TagState {
    tags: Set<string>;
    setTags: (tags: Set<string>) => void;
}

export const useTagStore = create<TagState>((set) => ({
    tags: new Set(),
    setTags: (tags) => set({ tags }),
}));
