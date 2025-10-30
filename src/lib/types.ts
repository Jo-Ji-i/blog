// lib/types.ts
export type Post = {
    slice(arg0: number, arg1: number): unknown;
    slug: string;
    title: string;
    date: string;
    excerpt: string;
    tags: string[];
    image: string;
    category: string;
};
