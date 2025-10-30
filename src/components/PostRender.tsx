'use client';
import React, { useEffect, useState } from 'react';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import rehypeHighlight from 'rehype-highlight';
import rehypeStringify from 'rehype-stringify';

interface PostRenderProps {
    content: string;
}

export default function PostRender({ content }: PostRenderProps) {
    const [html, setHtml] = useState('');

    useEffect(() => {
        async function parseMarkdown() {
            const file = await unified()
                .use(remarkParse)
                .use(remarkRehype)
                .use(rehypeHighlight) // highlight.js 적용
                .use(rehypeStringify)
                .process(content);
            setHtml(String(file));
        }

        parseMarkdown();
    }, [content]);

    return (
        <div
            className="mb-20 prose dark:prose-invert"
            dangerouslySetInnerHTML={{ __html: html }}
        />
    );
}
