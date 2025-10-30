import React from 'react';
import ThemeButton from './buttons/ThemeButton';
import Link from 'next/link';

const HeaderDefault = () => {
    return (
        <>
            <div className="flex items-center justify-between h-10 gap-3 px-2 m-2 font-pretendard">
                <div className="text-3xl font-bold justify-self-start">
                    <Link href="/"> B </Link>
                </div>
                <div className="flex flex-row items-center justify-end gap-3 text-lg">
                    <div className="hover:underline">
                        <Link href="/article">article </Link>
                    </div>
                    {/* <div className="relative inline-block group">
                        <span className="cursor-pointer">category</span>
                        <div className="absolute items-center hidden p-2 text-sm text-center text-gray-600 list-none bg-white rounded-md min-w-max group-hover:block top-5 left-2">
                            <li className="hover:bg-gray-300">
                                <Link href="tag?category=fe"> FE </Link>
                            </li>
                            <li className="hover:bg-gray-300">
                                <Link href="tag?category=proj"> PROJ </Link>
                            </li>
                        </div>
                    </div> */}
                    <div className="hover:underline">etc</div>
                    <ThemeButton />
                </div>
            </div>
        </>
    );
};

export default HeaderDefault;
