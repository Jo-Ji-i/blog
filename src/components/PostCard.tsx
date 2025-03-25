import React from 'react';
import Image from 'next/image';

type PostCardProps = {
    title: string;
    date: string;
    image: string;
    excerpt: string;
    height: string;
    width: string;
    priority?: boolean;
};

{
    /* <div
                        className="flex flex-col items-center justify-center"
                        key={post.slug}
                    >
                        <h2> {post.title} </h2>
                        <Image
                            src={`/images/main/${post.image}`}
                            alt={post.title}
                            width={300}
                            height={200}
                            className="rounded-lg"
                        />
                        <p> {post.excerpt} </p>
                        <span> {post.date}</span>
                    </div> */
}

const PostCard = ({
    title,
    excerpt,
    date,
    image,
    height,
    width,
    priority,
}: PostCardProps) => {
    return (
        <div className="flex flex-col items-center justify-center">
            <div className="relative w-full h-full">
                <Image
                    src={`/images/main/${image}`}
                    alt={title}
                    width={Number(width)}
                    height={Number(height)}
                    className="object-cover rounded-lg"
                />
                <div className="absolute inset-0 flex flex-col items-start justify-end p-2 text-white transition-opacity opacity-50 bg-black/50 group-hover:opacity-100">
                    <h2 className="text-xl font-semibold font-pretendard">
                        {title}
                        <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
                            ...
                        </span>
                    </h2>
                    <p className="m-0 max-w-[30ch] text-sm opacity-50">
                        {date}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default PostCard;
