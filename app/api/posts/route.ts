import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
// import { posts } from '@/app/lib/placeholder-data'

const prisma = new PrismaClient();

export async function GET() {
  try {
    const posts = await prisma.post.findMany({
      orderBy: { createdAt: 'desc' },
    });

    // console.log(posts)

    return NextResponse.json({ success: true, posts: posts });
  } catch (error) {
    console.error('Error fetching posts:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  // console.log(request)
  try {
    const { title, content, author } = await request.json();
    const post = await prisma.post.create({
      data: { title, content, author },
    });
    return NextResponse.json({ success: true, post: post });
  } catch (error) {
    console.error('Error creating post:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}