// prettier-ignore
"use client";

import React from 'react';
import Image from 'next/image';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { dracula } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import remarkGfm from 'remark-gfm';
import remarkSlug from 'remark-slug';

export default function PostRender({ content }: { content: string }) {
    const HeadingRenderer = (Tag: 'h1' | 'h2' | 'h3') => {
        const NamedHeading = ({ children }: { children?: React.ReactNode }) => {
            const id = children
                ? children.toString().toLowerCase().replace(/\s+/g, '-')
                : '';

            return <Tag id={id}>{children}</Tag>;
        };

        NamedHeading.displayName = `HeadingRenderer(${Tag})`; // Displayname 에러 방지
        return NamedHeading;
    };

    return (
        <div className="markdown font-pretendard">
            <ReactMarkdown
                remarkPlugins={[remarkGfm, remarkSlug]}
                components={{
                    // 코드
                    code({ className, children }) {
                        const match = /language-(\w+)/.exec(className || '');
                        return match ? (
                            <SyntaxHighlighter
                                style={dracula}
                                customStyle={{
                                    width: '70%',
                                    margin: '0 auto',
                                }}
                                language={match[1]}
                                PreTag="div"
                                className="respone-code"
                            >
                                {String(children)
                                    .replace(/\n$/, '')
                                    .replace(/\n&nbsp;\n/g, '')
                                    .replace(/\n&nbsp\n/g, '')}
                            </SyntaxHighlighter>
                        ) : (
                            <SyntaxHighlighter
                                style={dracula}
                                background="green"
                                language="textile"
                                className="respone-code-line"
                                PreTag="div"
                                customStyle={{
                                    padding: '4px', // 내부 여백 조정
                                    borderRadius: '8px', // 모서리 둥글게
                                    overflow: 'hidden', // 스크롤 조정
                                    margin: '3px', // 기본 마진 제거
                                }}
                            >
                                {String(children).replace(/\n$/, '')}
                            </SyntaxHighlighter>
                        );
                    },
                    // 인용문 (>)
                    blockquote({ children, ...props }) {
                        return (
                            <blockquote
                                style={{
                                    background: '#599AEE',
                                    padding: '1px 15px',
                                    borderRadius: '10px',
                                    margin: 0,
                                }}
                                className="respone-quote"
                                {...props}
                            >
                                {children}
                            </blockquote>
                        );
                    },
                    //이미지
                    img({ src }) {
                        const validSrc = src
                            ? src.replace('../../../../public/', '/')
                            : '';
                        return (
                            <Image
                                style={{ maxWidth: '40vw' }}
                                src={validSrc}
                                alt="MarkdownRenderer__Image"
                                width={500}
                                height={300}
                            />
                        );
                    },
                    // em
                    em({ children, ...props }) {
                        return (
                            <span style={{ fontStyle: 'italic' }} {...props}>
                                {children}
                            </span>
                        );
                    },
                    p: ({ node, ...props }) => <div {...props} />, // <p> 태그 대신 <div>로 렌더링
                    // heading 요소들에 id 추가
                    h1: HeadingRenderer('h1'),
                    h2: HeadingRenderer('h2'),
                    h3: HeadingRenderer('h3'),
                }}
            >
                {content}
            </ReactMarkdown>
        </div>
    );
}
