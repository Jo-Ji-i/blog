'use client';

import React from 'react';
import Image from 'next/image';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { dracula } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import remarkGfm from 'remark-gfm';
import remarkSlug from 'remark-slug';

const PostRender: React.FC<{ content: string }> = ({ content }) => {
    // Heading renderer with `displayName`
    const headingRenderer =
        (Tag: 'h1' | 'h2' | 'h3') =>
        ({ children, ...props }: { children?: React.ReactNode }) => {
            const id = children
                ? children.toString().toLowerCase().replace(/\s+/g, '-')
                : '';

            return (
                <Tag id={id} {...props}>
                    {children}
                </Tag>
            );
        };

    headingRenderer.displayName = 'HeadingRenderer';

    return (
        <div className="markdown font-pretendard">
            <ReactMarkdown
                remarkPlugins={[remarkGfm, remarkSlug]}
                components={{
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
                                    padding: '4px',
                                    borderRadius: '8px',
                                    overflow: 'hidden',
                                    margin: '3px',
                                }}
                            >
                                {String(children).replace(/\n$/, '')}
                            </SyntaxHighlighter>
                        );
                    },
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
                    img({ src, ...props }) {
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

                    em({ children, ...props }) {
                        return (
                            <span style={{ fontStyle: 'italic' }} {...props}>
                                {children}
                            </span>
                        );
                    },
                    p: ({ ...props }) => <div {...props} />,
                    h1: headingRenderer('h1'),
                    h2: headingRenderer('h2'),
                    h3: headingRenderer('h3'),
                }}
            >
                {content}
            </ReactMarkdown>
        </div>
    );
};

// Add `displayName` for the PostRender component
PostRender.displayName = 'PostRender';

export default PostRender;
