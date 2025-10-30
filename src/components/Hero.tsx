'use client';

import { motion } from 'framer-motion';
import { Button } from './buttons/Button'; // 정확한 상대 경로

export function Hero() {
    return (
        <section className="w-full mt-24 text-center">
            <motion.h1
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-4xl font-bold text-gray-900 dark:text-white"
            >
                안녕하세요, 지민입니다 👋
            </motion.h1>

            <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.2 }}
                className="mt-3 text-lg text-gray-600 dark:text-gray-300"
            >
                프론트엔드와 UX를 좋아하는 개발자입니다.
                <br />
                코드로 사용자 경험을 디자인합니다.
            </motion.p>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.4 }}
                className="flex justify-center gap-4 mt-8"
            >
                <Button>깃허브 보기</Button>
                <Button variant="outline">최근 글 보기</Button>
            </motion.div>
        </section>
    );
}
