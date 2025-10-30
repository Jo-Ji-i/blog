import Link from 'next/link';

export function ProjectPreview() {
    const projects = [
        {
            title: '포트폴리오 리뉴얼',
            desc: 'Next.js + Framer Motion 기반',
            link: '#',
        },
        {
            title: '팀 협업 대시보드',
            desc: 'React + Zustand로 상태 관리',
            link: '#',
        },
    ];

    return (
        <div>
            <h2 className="mb-6 text-2xl font-semibold">Featured Projects</h2>
            <div className="grid gap-6 md:grid-cols-2">
                {projects.map((proj) => (
                    <div
                        key={proj.title}
                        className="p-5 border border-gray-200 dark:border-gray-700 rounded-2xl"
                    >
                        <h3 className="mb-2 text-lg font-semibold">
                            {proj.title}
                        </h3>
                        <p className="mb-3 text-gray-500">{proj.desc}</p>
                        <Link
                            href={proj.link}
                            className="text-sm text-blue-500 hover:underline"
                        >
                            View Project →
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
}
