// components/CategorySection.tsx
'use client';

import Link from 'next/link';

export function CategorySection() {
    const categories = [
        { name: 'Frontend', slug: 'frontend' },
        { name: 'React', slug: 'react' },
        { name: 'Next', slug: 'next' },
        { name: 'JavaScript', slug: 'javascript' },
        { name: 'TypeScript', slug: 'typescript' },
        { name: 'Server', slug: 'server' },
        { name: 'Algorithms', slug: 'algorithms' },
        { name: 'DevOps', slug: 'devops' },
        { name: 'UX/UI', slug: 'ux-ui' },
        { name: 'Etc', slug: 'etc' },
    ];

    return (
        <div>
            <h2 className="mb-6 text-2xl font-semibold">Categories</h2>
            <div className="flex flex-wrap gap-3">
                {categories.map((cat) => (
                    <Link
                        key={cat.slug}
                        href={`/category/${cat.slug}`}
                        className="px-4 py-2 text-sm text-gray-700 transition bg-gray-100 rounded-full dark:bg-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700"
                    >
                        {cat.name}
                    </Link>
                ))}
            </div>
        </div>
    );
}
