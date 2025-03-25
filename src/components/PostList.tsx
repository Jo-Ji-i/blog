import React from 'react';
import Image from 'next/image';

type PostListProps = {
    title: string;
    date: string;
    excerpt: string;
};

const PostList = ({ title, excerpt, date }: PostListProps) => {
    return (
        <div className="flex flex-col">
            <div className="flex flex-col font-pretendard">
                <span className="text-xs">{date}</span>
                <h2 className="text-xl font-bold">{title}</h2>
                <p className="text-sm">{excerpt}</p>
            </div>
        </div>
    );
};

export default PostList;
