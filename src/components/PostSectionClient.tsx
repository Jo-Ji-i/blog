// src/components/PostSectionClient.tsx
'use client';

import LatestPostsSlider from './LatestPostsSlider';
import PostListSection from './PostListSection';
import { Post } from '@/lib/types';

interface PostSectionClientProps {
    posts: Post[];
}

/**
 * 전체 포스트 섹션 컴포넌트
 * - 최신 포스트 슬라이더
 * - 일반 포스트 리스트 + 무한 스크롤
 */
export default function PostSectionClient({ posts }: PostSectionClientProps) {
    return (
        <div className="flex flex-col gap-3 pt-3">
            <p className="pl-3 text-base font-pretendard">최신 포스트</p>
            <LatestPostsSlider posts={posts} />
            <PostListSection posts={posts.slice(3)} />
        </div>
    );
}
