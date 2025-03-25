//components/providers/ThemeProvider.tsx
// System 값 사용, filckering 이슈 해결을 위해 next-themes 라이브러리 사용
'use client';

import React, { useEffect, useState } from 'react';
import {
    ThemeProvider as NextThemeProvider,
    ThemeProviderProps,
} from 'next-themes';

export default function ThemeProvider({ children }: ThemeProviderProps) {
    const [mouted, setMouted] = useState(false);

    useEffect(() => {
        setMouted(true);
    }, []);

    if (!mouted) return null;

    return (
        <NextThemeProvider attribute="class" defaultTheme="system">
            {children}
        </NextThemeProvider>
    );
}
