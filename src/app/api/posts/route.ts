import path from 'path';
import fs from 'fs';
import matter from 'gray-matter';
import { NextResponse } from 'next/server';

//파일 저장 경로
const postsDirectory = path.join(process.cwd(), 'src/posts');

export async function GET() {
    try {
        const files = fs.readdirSync(postsDirectory);

        const posts = files.map((file) => {
            const filePath = path.join(postsDirectory, file);
            const fileContents = fs.readFileSync(filePath, 'utf-8');
            const { data, content } = matter(fileContents);

            return {
                slug: file.replace('.md', ''), // 파일명을 slug로 변환
                title: data.title,
                date: data.date,
                image: data.image,
                excerpt: data.excerpt,
                tags: data.tags || [],
            };
        });
        return NextResponse.json(posts);
    } catch (error) {
        console.error('Error reading posts:', error);
        return NextResponse.json(
            { error: 'Failed to load posts' },
            { status: 500 }
        );
    }
}
