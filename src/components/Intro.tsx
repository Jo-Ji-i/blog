import React from 'react';

type IntroProps = {
    title: string;
    category?: string;
};

export default function Intro({ title, category }: IntroProps) {
    const categoryUpper = category?.toUpperCase();
    return (
        <div className="flex flex-col gap-3">
            <h2 className="pl-2 text-2xl font-bold font-pretendard">{title}</h2>
            {/* {category && (
                <h2 className="pl-2 text-lg font-bold font-pretendard">
                    {categoryUpper}
                </h2>
            )} */}
            <div></div>
        </div>
    );
}
