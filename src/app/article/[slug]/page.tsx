// article/[slug]/page.tsx <post 상세>

import { notFound } from 'next/navigation';
import React from 'react';
import Image from 'next/image';
import PostRender from '@/components/PostRender';
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
    const isLocal = process.env.NODE_ENV === 'development'; // 실행 환경 체크
    const apiUrl = isLocal
        ? 'http://localhost:3000'
        : process.env.NEXT_PUBLIC_SITE_URL;

    // const apiUrl =
    //     process?.env?.NEXT_PUBLIC_SITE_URL ??
    //     `https://${process.env.NEXT_PUBLIC_VERCEL_URL?.replace(
    //         /^https?:\/\//,
    //         ''
    //     )}` ??
    //     'http://localhost:3000/';

    const res = await fetch(`${apiUrl}/api/posts/${slug}`, {
        cache: 'no-store',
    });

    console.log('응답 URL', apiUrl);
    console.log('응답 상태 코드:', res.status);
    console.log('응답 콘텐츠 타입:', res.headers.get('content-type'));

    if (!res.ok) throw new Error('포스트 상세 조회 실패');
    return res.json();
}

export default async function Page({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const slug = (await params).slug;
    const post = await getPost(slug);
    if (!post) return notFound();

    const toc = await getHeadingToc(post.content);
    console.log(post.tags);

    return (
        <div className="relative flex flex-col pl-10">
            <div className="flex flex-col font-pretendard">
                <h1 className="text-xl font-bold md:text-3xl lg:text-4xl">
                    {post.title}
                </h1>
                <p className="text-sm text-gray-500">{post.date} </p>
                <div>
                    <button className="btn btn-md w-auto px-2 py-1 m-2 inline-block rounded-md shadow-xs text-xs bg-black text-white p-0.5">
                        {post.category}
                    </button>
                    {post.tags.map((tag) => (
                        <button className="w-auto px-2 py-1 m-2 text-xs text-center text-black bg-white rounded-md shadow-xs btn btn-md">
                            {tag}
                        </button>
                    ))}
                </div>
            </div>
            {/* 사이드 영역 */}
            <div className="fixed hidden p-4 shadow-md w-60 right-10 top-20 md:block">
                <div className="relative flex flex-col items-center h-auto p-2 justify-self-end w-100 xs:p-1">
                    <Image
                        src={`/images/main/${post.image}`}
                        alt="coverIMG"
                        width={230}
                        height={190}
                        className="top-0 right-0 hidden pr-5 absoulte md:block"
                    />
                </div>
                <div className="relative flex justify-end pb-5">
                    <p className="top-0 right-0 hidden pt-2 pr-5 text-sm absoulte md:block md:font-semibold lg:text-lg">
                        {post.excerpt}
                    </p>
                </div>
                <div className="relative flex justify-end pb-5">
                    <div className="right-0 hidden pt-2 pl-3 pr-5 text-base absoulte md:block md:font-semibold lg:text-lg">
                        <Toc tocData={toc} />
                    </div>
                </div>
            </div>
            {/* 본문 영역 */}
            <div className="flex-1 mt-10 mb-20 pr-70">
                {post.content && <PostRender content={post.content} />}
            </div>
        </div>
    );
}
