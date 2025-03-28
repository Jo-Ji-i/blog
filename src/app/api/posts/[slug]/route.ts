import path from 'path';
import fs from 'fs';
import matter from 'gray-matter';
import { NextResponse } from 'next/server';

// 파일 저장 경로
const postsDirectory = path.join(process.cwd(), 'src/posts');

export async function GET(
    req: Request,
    context: { params: Record<string, string> } //  context 타입 유지
) {
    try {
        const params = await context.params; // `params`를 비동기적으로 가져오기
        const slug = params.slug; //  `slug`에 `await` 사용하지 않음 (params 자체만 `await`)

        const filePath = path.join(postsDirectory, `${slug}.md`);
        console.log(`Reading file: ${filePath}`);

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
