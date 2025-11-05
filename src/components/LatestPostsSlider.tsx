// src/components/LatestPostsSlider.tsx
import { motion } from 'framer-motion';
import PostCard from './PostCard';
import { Post } from '@/lib/types';
import { useCardsPerView } from '@/Hooks/useCardsPerView';

interface LatestPostsSliderProps {
    posts: Post[];
}

/**
 * 최신 포스트를 슬라이드 형태로 보여주는 컴포넌트
 */
export default function LatestPostsSlider({ posts }: LatestPostsSliderProps) {
    const cardsPerView = useCardsPerView();
    const latestPosts = posts.slice(0, cardsPerView).reverse();

    return (
        <motion.div
            className="flex gap-3 py-3 ml-4 overflow-x-auto whitespace-nowrap scrollbar-hide"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
        >
            {latestPosts.map((post, index) => (
                <motion.div
                    key={post.slug}
                    className="inline-block min-w-[250px]"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                >
                    <PostCard
                        title={post.title}
                        date={post.date}
                        image={post.image}
                        excerpt={post.excerpt}
                        height={200}
                        width={300}
                        priority={index === 0}
                        link={`/article/${post.slug}`}
                    />
                </motion.div>
            ))}
        </motion.div>
    );
}
