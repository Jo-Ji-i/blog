import Link from 'next/link';
import React from 'react';

// 목차 컴포넌트

type TOCProps = {
    tocData: { text: string; id: string; level: number }[];
};

export const Toc = ({ tocData }: TOCProps) => {
    return (
        <nav className="pl-4 border-l-2">
            <p className="pb-3 font-bold">TOC</p>
            <ul className="space-y-2">
                {tocData.map(({ text, id, level }) => (
                    <li key={id} className={`ml-${(level - 1) * 2}`}>
                        <Link
                            href={`#${id}`}
                            className="text-sm font-pretendard hover:underline"
                        >
                            {text}
                        </Link>
                    </li>
                ))}
            </ul>
        </nav>
    );
};
