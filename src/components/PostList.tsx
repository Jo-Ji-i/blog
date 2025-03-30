import React from 'react';
import Link from 'next/link';

type PostListProps = {
    title: string;
    date: string;
    excerpt: string;
    link: string;
};

const PostList = ({ title, excerpt, date, link }: PostListProps) => {
    return (
        <div className="flex flex-col">
            <Link href={link}>
                <div className="flex flex-col font-pretendard">
                    <span className="text-xs">{date}</span>
                    <h2 className="text-xl font-bold">{title}</h2>
                    <p className="text-sm">{excerpt}</p>
                </div>
            </Link>
        </div>
    );
};

export default PostList;
