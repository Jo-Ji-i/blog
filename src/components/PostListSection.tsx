// src/components/PostListSection.tsx
'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PostList from './PostList';
import { Post } from '@/lib/types';

interface PostListSectionProps {
    posts: Post[];
    initialLimit?: number;
    loadStep?: number;
}

/**
 * 일반 포스트 리스트 + 무한 스크롤 컴포넌트
 */
export default function PostListSection({
    posts,
    initialLimit = 10,
    loadStep = 5,
}: PostListSectionProps) {
    const [displayCount, setDisplayCount] = useState(initialLimit);
    const loaderRef = useRef<HTMLDivElement | null>(null);
    const visiblePosts = posts.slice(0, displayCount);

    useEffect(() => {
        const currentLoader = loaderRef.current; // 🔹 ref를 지역 변수에 복사
        if (!currentLoader) return;

        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {
                    setDisplayCount((prev) =>
                        Math.min(prev + loadStep, posts.length)
                    );
                }
            },
            { threshold: 0.8 }
        );

        observer.observe(currentLoader);

        return () => {
            observer.unobserve(currentLoader); // 🔹 지역 변수 사용
        };
    }, [posts.length, loadStep]);

    return (
        <div className="py-3 m-3">
            <div className="flex flex-col gap-5 p-3">
                <AnimatePresence>
                    {visiblePosts.map((post, index) => (
                        <motion.div
                            key={post.slug}
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.4, delay: index * 0.05 }}
                        >
                            <PostList
                                title={post.title}
                                date={post.date}
                                excerpt={post.excerpt}
                                link={`/article/${post.slug}`}
                            />
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>

            {displayCount < posts.length && (
                <div
                    ref={loaderRef}
                    className="h-10 mt-10 text-center opacity-50"
                >
                    <motion.span
                        animate={{ rotate: 360 }}
                        transition={{ repeat: Infinity, duration: 1 }}
                    >
                        🔄
                    </motion.span>
                </div>
            )}
        </div>
    );
}
