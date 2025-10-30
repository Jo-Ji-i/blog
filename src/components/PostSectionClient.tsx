'use client';

import React, { useEffect, useState } from 'react';
import PostCard from './PostCard';
import PostList from './PostList';
import { Post } from '@/lib/types';

interface PostSectionClientProps {
    posts: Post[];
    initialLimit?: number; // 초기 표시 개수
    loadStep?: number; // Load More 클릭 시 추가 표시 개수
}

export default function PostSectionClient({
    posts,
    initialLimit = 10,
    loadStep = 5,
}: PostSectionClientProps) {
    const [displayCount, setDisplayCount] = useState(initialLimit);
    const [cardsPerView, setCardsPerView] = useState(3);

    // 화면 크기에 따라 cardsPerView 조정
    useEffect(() => {
        const updateCards = () => {
            const width = window.innerWidth;
            if (width >= 1280) setCardsPerView(5); // xl
            else if (width >= 1024) setCardsPerView(4); // lg
            else setCardsPerView(3); // md 이하
        };

        updateCards();
        window.addEventListener('resize', updateCards);
        return () => window.removeEventListener('resize', updateCards);
    }, []);

    const latestPosts = posts.slice(0, cardsPerView).reverse();
    const remainingPosts = posts.slice(cardsPerView, displayCount);

    const handleLoadMore = () => {
        setDisplayCount((prev) => Math.min(prev + loadStep, posts.length));
    };

    return (
        <div className="flex flex-col gap-3 pt-3">
            <p className="pl-3 text-base font-pretendard">최신 포스트</p>

            {/* 최신 카드 */}
            <div className="flex flex-row items-center w-full gap-3 ml-4 overflow-x-auto whitespace-nowrap">
                {latestPosts.map((post, index) => (
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

            {/* 나머지 포스트 */}
            <div className="py-3 m-3">
                <div className="flex flex-col gap-5 p-3">
                    {remainingPosts.map((post) => (
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

            {/* Load More 버튼 */}
            {displayCount < posts.length && (
                <div className="flex justify-center mt-4">
                    <button
                        onClick={handleLoadMore}
                        className="px-4 py-2 text-white transition bg-blue-600 rounded hover:bg-blue-700"
                    >
                        Load More
                    </button>
                </div>
            )}
        </div>
    );
}
