// src/components/Toc.tsx

import Link from 'next/link';
import React from 'react';

// 목차 컴포넌트
type TOCItem = {
    text: string;
    id: string; // 기존에 전달받은 id
    level: number;
};

type TOCProps = {
    tocData: TOCItem[];
};

export const Toc = ({ tocData }: TOCProps) => {
    if (!tocData || tocData.length === 0) return null;

    return (
        <nav className="pl-4 border-l-2">
            <p className="pb-3 font-bold">TOC</p>
            <ul className="space-y-2">
                {tocData.map(({ text, id, level }, idx) => (
                    // id + index 조합으로 고유 key 생성
                    <li
                        key={`${id}-${idx}`}
                        className={`ml-${(level - 1) * 2}`}
                    >
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
