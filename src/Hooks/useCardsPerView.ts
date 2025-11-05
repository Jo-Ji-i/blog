// src/hooks/useCardsPerView.ts

import { useEffect, useState } from 'react';

/**
 * 화면 크기에 따라 한 화면에 보여줄 카드 수 계산
 */
export function useCardsPerView() {
    const [cardsPerView, setCardsPerView] = useState(3);

    useEffect(() => {
        const updateCards = () => {
            const width = window.innerWidth;
            if (width >= 1280) setCardsPerView(5); // xl
            else if (width >= 1024) setCardsPerView(4); // lg
            else setCardsPerView(3); // md 이하
        };
        updateCards();
        window.addEventListener('resize', updateCards);
        return () => window.removeEventListener('resize', updateCards);
    }, []);

    return cardsPerView;
}
