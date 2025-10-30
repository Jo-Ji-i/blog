// app/article/[slug]/page.tsx
import React from 'react';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import ReactMarkdown from 'react-markdown';
import rehypeHighlight from 'rehype-highlight';
import 'highlight.js/styles/github-dark.css';
import { Toc } from '@/components/Toc';
import { getHeadingToc } from '@/components/getHeadingToc';

type Post = {
    title: string;
    date: string;
    excerpt: string;
    content: string;
    image: string;
    category: string;
    tags: string[];
};

async function getPost(slug: string): Promise<Post | null> {
    if (!slug) return null;
    const apiUrl =
        process.env.NODE_ENV === 'development'
            ? 'http://localhost:3000'
            : process.env.NEXT_PUBLIC_SITE_URL;

    const res = await fetch(`${apiUrl}/api/posts/${slug}`, {
        cache: 'no-store',
    });
    if (!res.ok) return null;
    return res.json();
}

export default async function Page({ params }: { params: { slug: string } }) {
    const { slug } = params;
    const post = await getPost(slug);
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
                    <span className="px-3 py-1 text-xs font-medium bg-gray-200 rounded">
                        {post.category}
                    </span>
                    {post.tags.map((tag) => (
                        <span
                            key={tag}
                            className="px-3 py-1 text-xs font-medium bg-gray-100 rounded"
                        >
                            {tag}
                        </span>
                    ))}
                </div>

                {/* 마크다운 렌더링 */}
                <div className="prose dark:prose-invert max-w-none">
                    <ReactMarkdown rehypePlugins={[rehypeHighlight]}>
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
