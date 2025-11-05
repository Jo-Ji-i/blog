// src/app/article/page.tsx
import Intro from '@/components/Intro';
import PostSectionClient from '@/components/PostSectionClient';
import { fetchPosts } from '@/lib/api';

export default async function ArticlePage() {
    const posts = await fetchPosts(); // 서버사이드 fetch

    return (
        <div className="relative min-h-screen overflow-hidden ">
            <div className="relative z-10 pt-8 pl-2">
                <Intro title="Article" />
                <PostSectionClient posts={posts} />
            </div>
        </div>
    );
}
