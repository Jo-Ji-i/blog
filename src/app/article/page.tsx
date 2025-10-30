import Intro from '@/components/Intro';
import PostSectionClient from '@/components/PostSectionClient';
import { fetchPosts } from '@/lib/api';

export default async function ArticlePage() {
    const posts = await fetchPosts(); // 서버에서 전체 fetch

    return (
        <div className="pl-2">
            <Intro title="Article" />
            <PostSectionClient posts={posts} initialLimit={10} loadStep={5} />
        </div>
    );
}
