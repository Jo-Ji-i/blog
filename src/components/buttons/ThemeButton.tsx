'use client';

import { MoonIcon, SunIcon } from '@/style/icons';
import { useTheme } from 'next-themes';
import React, { useEffect, useState } from 'react';

export default function ThemeButton() {
    const [mounted, setMounted] = useState(false);
    const { systemTheme, theme, setTheme } = useTheme();

    const currentTheme = theme === 'system' ? systemTheme : theme;

    const toggleTheme = () => {
        setTheme(currentTheme === 'dark' ? 'light' : 'dark');
    };

    useEffect(() => setMounted(true), []);

    if (!mounted) return null;

    return (
        <div className="flex flex-col">
            <button onClick={toggleTheme}>
                {currentTheme === 'light' ? (
                    <SunIcon className="w-6 h-6 text-yellow-400" />
                ) : (
                    <MoonIcon className="w-6 h-6 text-gray-300" />
                )}
            </button>
        </div>
    );
}
