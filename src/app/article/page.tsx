// article/page.tsx <포스트 리스트>

import React from 'react';

import PostCard from '@/components/PostCard';
import Image from 'next/image';
import { Suspense } from 'react';

// type Post = {
//     slug: string;
//     title: string;
//     date: string;
//     excerpt: string;
//     tags: string[];
// };

// 메인 페이지에서 데이터 불러오기
const getPosts = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/posts`);
    if (!res.ok) throw new Error('불러오기 실패');
    console.log('res', res); // 데이터 확인
    return res.json();
};

// 비동기로 정의
const PostList = async () => {
    const posts = await getPosts();
    return (
        <div className="py-10">
            <div className="flex flex-row items-center w-full gap-3 overflow-x-auto whitespace-nowrap">
                {posts.slice(0, 3).map((post: any, index: number) => (
                    <PostCard
                        key={post.slug}
                        title={post.title}
                        date={post.date}
                        image={post.image}
                        excerpt={post.excerpt}
                        height="200"
                        width="300"
                        priority={index === 0}
                    />
                ))}
            </div>
        </div>
    );
};

export default async function ListPage() {
    return (
        <main>
            <Suspense fallback={<p>Loading...</p>}>
                <PostList />
            </Suspense>
        </main>
    );
}
