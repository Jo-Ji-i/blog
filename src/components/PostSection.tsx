// components/PostSection.tsx
import React from 'react';
import PostCard from './PostCard';
import PostList from './PostList';
import { Post } from '@/lib/types';

interface PostSectionProps {
    posts: Post[];
    limit?: number;
}

export const PostSection = ({ posts, limit = 10 }: PostSectionProps) => {
    const latestPosts: Post[] = posts.slice(0, 3);
    const remainingPosts: Post[] = posts.slice(3, limit);
    return (
        <div className="flex flex-col gap-3 pt-3">
            <p className="pl-3 text-base font-pretendard">최신 포스트</p>

            <div className="flex flex-row items-center w-full gap-3 ml-4 overflow-x-auto whitespace-nowrap">
                {latestPosts.map((post, index) => (
                    <PostCard
                        key={post.slug}
                        title={post.title}
                        date={post.date}
                        image={post.image}
                        excerpt={post.excerpt}
                        height={250}
                        width={200}
                        priority={index === 0}
                        link={`/article/${post.slug}`}
                    />
                ))}
            </div>

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
        </div>
    );
};
