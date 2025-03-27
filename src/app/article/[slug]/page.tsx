// article/[slug]/page.tsx <post 상세>

import { notFound } from 'next/navigation';
import React from 'react';
import Image from 'next/image';
import PostRender from '@/components/PostRender';

type Post = {
    title: string;
    date: string;
    excerpt: string;
    content: string;
    image: string;
};

async function getPost(slug: string): Promise<Post | any> {
    if (!slug) return null;

    const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/posts/${slug}`
    );
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

    return (
        <div className="pl-5">
            <div className="flex flex-col font-pretendard">
                <h1 className="text-xl font-bold md:text-3xl lg:text-4xl">
                    {post.title}
                </h1>
                <p className="text-sm text-gray-500">{post.date} </p>
                <button className="btn btn-md w-12 rounded-md shadow-xs m-1 text-xs bg-black text-white p-0.5">
                    카테고리
                </button>
            </div>
            <div className="relative flex flex-col items-center h-auto p-2 justify-self-end w-100 xs:p-1">
                <Image
                    src={`/images/main/${post.image}`}
                    alt="coverIMG"
                    width={230}
                    height={190}
                    className="right-0 hidden pr-5 absoulte md:block"
                />
            </div>
            <div className="relative flex justify-end pb-5">
                <p className="right-0 hidden pt-2 pr-5 text-base absoulte md:block md:font-semibold lg:text-lg">
                    {post.excerpt}
                </p>
            </div>
            <div className="mt-5">
                {post.content && <PostRender content={post.content} />}
            </div>
        </div>
    );
}
