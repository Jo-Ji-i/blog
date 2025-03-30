// article/page.tsx <포스트 리스트>

import React from 'react';

import PostCard from '@/components/PostCard';
import { Suspense } from 'react';
import Intro from '@/components/Intro';
import PostList from '@/components/PostList';

type Post = {
    slug: string;
    title: string;
    date: string;
    excerpt: string;
    tags: string[];
    image: string;
};

// 메인 페이지에서 데이터 불러오기
const getPosts = async () => {
    const apiUrl =
        process?.env?.NEXT_PUBLIC_SITE_URL ??
        `https://${process.env.NEXT_PUBLIC_VERCEL_URL?.replace(
            /^https?:\/\//,
            ''
        )}` ??
        'http://localhost:3000/';

    const res = await fetch(`${apiUrl}/api/posts`, { cache: 'no-store' }); // 캐싱 방지

    console.log('API 요청 주소: ', apiUrl); // API 주소
    console.log('응답 상태 코드:', res.status); // 응답 상태 코드
    console.log('응답 콘텐츠 타입:', res.headers.get('content-type')); // 응답 타입 확인

    if (res.ok) {
        const post = await res.json();
        return post.sort(
            (a: Post, b: Post) =>
                new Date(b.date).getTime() - new Date(a.date).getTime()
        );
    } else {
        console.error('게시물 조회 실패');
        const errorText = await res.text(); // 오류 페이지 텍스트
        console.error('응답 오류 내용:', errorText); // 오류 내용 로깅
        return errorText; // JSON이 아닌 경우 HTML로 받은 내용을 텍스트로 반환
    }
};

// 비동기로 정의
const PostSection = async () => {
    const posts = await getPosts();

    return (
        <>
            <div className="flex flex-col gap-3 pt-3">
                <p className="pl-3 text-base font-pretendard"> 최신 포스트 </p>
                <div className="flex flex-row items-center w-full gap-3 ml-4 overflow-x-auto whitespace-nowrap ">
                    {posts.slice(0, 3).map((post: Post, index: number) => (
                        <PostCard
                            key={post.slug}
                            title={post.title}
                            date={post.date}
                            image={post.image}
                            excerpt={post.excerpt}
                            height="200"
                            width="250"
                            priority={index === 0}
                            link={`/article/${post.slug}`}
                        />
                    ))}
                </div>
                <div className="py-3 m-3">
                    <div className="flex flex-col gap-5 p-3">
                        {posts.slice(3, 10).map((post: Post) => (
                            <PostList
                                key={post.slug}
                                title={post.title}
                                date={post.date}
                                excerpt={post.excerpt}
                                link={`/article/${post.slug}`}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
};

export default async function ListPage() {
    return (
        <div className="pl-2">
            <Intro title="Article" />
            <Suspense fallback={<p>Loading...</p>}>
                <PostSection />
            </Suspense>
        </div>
    );
}
