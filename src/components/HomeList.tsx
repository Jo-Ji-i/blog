import Link from 'next/link';

export interface Post {
    title: string;
    slug: string;
    date: string;
}

interface HomeListProps {
    title: string;
    posts: Post[];
    limit?: number;
}

export function HomeList({ title, posts, limit = 3 }: HomeListProps) {
    return (
        <div>
            <h2 className="mb-6 text-2xl font-semibold">{title}</h2>
            <div className="grid gap-6 md:grid-cols-3">
                {posts
                    .slice(0, limit)
                    .reverse()
                    .map((post) => (
                        <Link
                            key={post.slug}
                            href={`/article/${post.slug}`}
                            className="block p-5 transition border border-gray-200 dark:border-gray-700 rounded-2xl hover:shadow-md"
                        >
                            <h3 className="mb-2 text-lg font-semibold">
                                {post.title}
                            </h3>
                            <p className="text-sm text-gray-500">{post.date}</p>
                        </Link>
                    ))}
            </div>
        </div>
    );
}
