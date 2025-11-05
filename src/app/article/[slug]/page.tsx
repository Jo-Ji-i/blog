// app/article/[slug]/page.tsx
import React from 'react';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import ReactMarkdown from 'react-markdown';
import rehypeHighlight from 'rehype-highlight';
import remarkGfm from 'remark-gfm';
import 'highlight.js/styles/github-dark.css';
import { Toc } from '@/components/Toc';
import { getHeadingToc } from '@/components/getHeadingToc';
import { fetchPosts } from '@/lib/api';
import { Post } from '@/lib/types';

export default async function Page({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;

    const posts: Post[] = await fetchPosts();

    const post = posts.find((p) => p.slug === slug);
    if (!post) return notFound();
    const toc = await getHeadingToc(post.content);

    return (
        <div className="flex flex-col max-w-6xl gap-8 px-4 mx-auto mt-10 md:px-10 md:flex-row">
            {/* 본문 영역 */}
            <main className="flex-1">
                <h1 className="mb-2 text-3xl font-bold md:text-4xl">
                    {post.title}
                </h1>
                <p className="mb-4 text-sm text-gray-500">{post.date}</p>
                <div className="flex flex-wrap gap-2 mb-6">
                    <span className="px-3 py-1 text-xs font-medium bg-blue-300 rounded">
                        {post.category}
                    </span>
                    {post.tags.map((tag) => (
                        <span
                            key={tag}
                            className="px-3 py-1 text-xs font-medium text-black bg-gray-200 rounded"
                        >
                            {tag}
                        </span>
                    ))}
                </div>

                {/* 마크다운 렌더링 */}
                <div className="py-10 pb-24 prose dark:prose-invert max-w-none">
                    <ReactMarkdown
                        remarkPlugins={[remarkGfm]} // GFM 지원
                        rehypePlugins={[rehypeHighlight]} // 코드 하이라이팅
                    >
                        {post.content}
                    </ReactMarkdown>
                </div>
            </main>

            {/* 사이드바 영역 */}
            <aside className="sticky flex-shrink-0 hidden space-y-6 md:block w-72 top-20">
                {/* 커버 이미지 */}
                <Image
                    src={`/images/main/${post.image}`}
                    alt={post.title}
                    width={288}
                    height={216}
                    className="rounded-md"
                />

                {/* 포스트 요약 */}
                <p className="text-sm text-gray-600">{post.excerpt}</p>

                {/* 목차 */}
                <div>
                    <h3 className="mb-2 font-semibold">Contents</h3>
                    <Toc tocData={toc} />
                </div>
            </aside>
        </div>
    );
}
