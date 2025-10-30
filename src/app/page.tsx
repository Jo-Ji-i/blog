// api/page.tsx <메인 페이지>

import { Hero } from '@/components/Hero';
import { HomeList } from '@/components/HomeList';
import { ProjectPreview } from '@/components/ProjectPreview';
import { CategorySection } from '@/components/CategorySection';
import { ContactSection } from '@/components/ContactSection';
import { fetchPosts } from '@/lib/api';

export default async function Home() {
    const posts = await fetchPosts(); // 서버에서 전체 포스트 가져오기

    return (
        <main className="flex flex-col items-center justify-center w-full">
            <Hero />
            <br />

            <section className="w-full max-w-5xl px-6 mt-20">
                <HomeList title="Latest Article" posts={posts} limit={3} />
            </section>

            <section className="w-full max-w-5xl px-6 mt-20">
                <ProjectPreview />
            </section>

            <section className="w-full max-w-5xl px-6 mt-20">
                <CategorySection />
            </section>

            <section className="w-full max-w-5xl px-6 mt-20 mb-24">
                <ContactSection />
            </section>
        </main>
    );
}
