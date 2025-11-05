import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

type PostCardProps = {
    title: string;
    date: string;
    image: string;
    excerpt: string;
    height: number;
    width: number;
    priority?: boolean;
    link: string;
};

const PostCard = ({
    title,
    date,
    image,
    height,
    width,
    priority,
    link,
}: PostCardProps) => {
    return (
        <div className="flex flex-col items-center justify-center flex-shrink-0">
            <Link href={link} className="group">
                <div className="relative w-full h-full">
                    <Image
                        src={
                            image
                                ? `/images/main/${image}`
                                : `/images/main/default.png`
                        }
                        alt={title}
                        width={width}
                        height={height}
                        priority={priority}
                        className="object-cover rounded-lg"
                    />
                    <div className="absolute inset-0 flex flex-col items-start justify-end p-2 text-white transition-opacity opacity-50 bg-black/50 group-hover:opacity-100">
                        <h2 className="font-semibold text-md font-pretendard">
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
            </Link>
        </div>
    );
};

export default PostCard;
