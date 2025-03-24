// api/page.tsx <메인 페이지>

import Image from 'next/image';
import { Suspense } from 'react';

type Post = {
    slug: string;
    title: string;
    date: string;
    excerpt: string;
    tags: string[];
};

// 메인 페이지에서 데이터 불러오기
const getPosts = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/posts`);
    if (!res.ok) throw new Error('불러오기 실패');
    return res.json();
};

// 비동기로 정의
const PostList = async () => {
    const posts = await getPosts();

    return (
        <div className="">
            <div>list</div>
            <ul>
                {posts.slice(0, 10).map((post: any) => (
                    <li key={post.slug}>
                        <h2> {post.title} </h2>
                        <p> {post.excerpt} </p>
                        <span> {post.date}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default async function Home() {
    return (
        <main>
            <h1> list </h1>
            <Suspense fallback={<p>Loading...</p>}>
                <PostList />
            </Suspense>
        </main>
    );
}
