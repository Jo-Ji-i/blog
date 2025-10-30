// lib/api.ts
import { Post } from './types';

export const fetchPosts = async (): Promise<Post[]> => {
    const isLocal = process.env.NODE_ENV === 'development';
    const apiUrl = isLocal
        ? 'http://localhost:3000'
        : process.env.NEXT_PUBLIC_SITE_URL;

    const res = await fetch(`${apiUrl}/api/posts`, { cache: 'no-store' });
    if (!res.ok) {
        const errorText = await res.text();
        throw new Error(`게시물 조회 실패: ${errorText}`);
    }

    const posts: Post[] = await res.json();
    return posts.sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );
};
