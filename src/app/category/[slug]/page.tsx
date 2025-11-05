// app/category/[slug]/page.tsx
import { HomeList } from '@/components/HomeList';
import { fetchPosts } from '@/lib/api';

interface PageProps {
    params: Promise<{ slug: string }>;
}

export default async function CategoryPage({ params }: PageProps) {
    const { slug } = await params; // await 필수
    const posts = await fetchPosts();

    // 소문자 + 하이픈 처리해서 slug와 매칭
    const filteredPosts = posts.filter(
        (post) => post.category.toLowerCase().replace(/\s+/g, '-') === slug
    );

    return (
        <main className="max-w-5xl px-6 mx-auto mt-10">
            <h1 className="mb-6 text-3xl font-bold">
                {slug.replace('-', ' ')}
            </h1>
            <HomeList
                title=""
                posts={filteredPosts}
                limit={filteredPosts.length} // 전체 표시
            />
        </main>
    );
}
