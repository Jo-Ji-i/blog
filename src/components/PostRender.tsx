// prettier-ignore
"use client";

import React from 'react';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { dracula, nord } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import remarkGfm from 'remark-gfm';
import remarkSlug from 'remark-slug';

export default function PostRender({ content }: { content: string }) {
    return (
        <div className="markdown font-pretendard">
            <ReactMarkdown
                remarkPlugins={[remarkGfm, remarkSlug]}
                components={{
                    // 코드 블럭
                    code({ className, children }) {
                        const match = /language-(\w+)/.exec(className || '');
                        return match ? (
                            // 코드 (```)
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
                                style={nord}
                                background="green"
                                language="textile"
                                PreTag="div"
                                className="respone-code"
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
                    img({ ...props }) {
                        return (
                            <img
                                style={{ maxWidth: '40vw' }}
                                src={props.src?.replace(
                                    '../../../../public/',
                                    '/'
                                )}
                                alt="MarkdownRenderer__Image"
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
                    h1({ children, ...props }) {
                        const id = children
                            ? children
                                  .toString()
                                  .toLowerCase()
                                  .replace(/\s+/g, '-')
                            : '';
                        return (
                            <h1 id={id} {...props}>
                                {children}
                            </h1>
                        );
                    },
                }}
            >
                {content}
            </ReactMarkdown>
        </div>
    );
}
