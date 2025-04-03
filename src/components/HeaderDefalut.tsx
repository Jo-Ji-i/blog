import React from 'react';
import ThemeButton from './buttons/ThemeButton';
import Link from 'next/link';

const HeaderDefault = () => {
    return (
        <>
            <div className="flex items-center justify-between h-10 gap-3 px-2 m-2 font-pretendard">
                <div className="font-bold text-md justify-self-start">B</div>
                <div className="flex flex-row justify-end gap-3 text-sm">
                    <div className="hover:text-yellow-300">
                        <Link href="/article"> Article </Link>
                    </div>
                    <div className="hover:text-yellow-300">
                        <Link href="/category">Category </Link>
                    </div>
                    <div className="hover:text-yellow-300">Etc</div>
                    <ThemeButton />
                </div>
            </div>
        </>
    );
};

export default HeaderDefault;
