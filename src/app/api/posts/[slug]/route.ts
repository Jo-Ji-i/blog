import path from 'path';
import fs from 'fs';
import matter from 'gray-matter';
import { NextResponse } from 'next/server';

// 파일 저장 경로
const postsDirectory = path.join(process.cwd(), 'src/posts');

export async function GET(
    req: Request,
    { params }: { params: { slug: string } }
) {
    try {
        // params에서 slug 추출
        const { slug } = params;

        // 파일 경로 설정
        const filePath = path.join(postsDirectory, `${slug}.md`);

        if (!fs.existsSync(filePath)) {
            return NextResponse.json({ error: 'NOT FOUND' }, { status: 404 });
        }

        const fileContents = fs.readFileSync(filePath, 'utf-8');
        const { data, content } = matter(fileContents);

        return NextResponse.json({
            slug,
            title: data.title,
            date: data.date,
            image: data.image,
            excerpt: data.excerpt,
            tags: data.tags || [],
            content,
            format: 'markdown',
        });
    } catch (error) {
        console.error('Error reading posts:', error);
        return NextResponse.json(
            { error: 'Failed to load posts' },
            { status: 500 }
        );
    }
}
