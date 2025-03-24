'use client';

import { MoonIcon, SunIcon } from '@/style/icons';
import { useTheme } from 'next-themes';
import React, { useCallback, useEffect, useState } from 'react';

export default function ThemeButton() {
    const [mounted, setMounted] = useState(false); // 마운트 상태
    const { systemTheme, theme, setTheme } = useTheme(); // 테마 상태

    const currentTheme = theme === 'system' ? systemTheme : theme; // 현재 테마가 시스템이면 가져오기

    const ThemeChange = (nowTheme: string | undefined) => {
        if (nowTheme === 'dark') {
            return 'light';
        }
        return 'dark';
    };

    const ThemeButtonHandler = () => {
        setTheme(ThemeChange(currentTheme));
    };

    useEffect(() => {
        setMounted(true);
        //클라이언트 사이드만 실행되게
    }, []);

    if (!mounted) return null;

    return (
        <div className="flex flex-col">
            <div onClick={ThemeButtonHandler}>
                {theme === 'light' ? <SunIcon /> : <MoonIcon />}
            </div>
        </div>
    );
}
