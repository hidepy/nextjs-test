import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

// import { posts } from '@/app/lib/placeholder-data'

const prisma = new PrismaClient();

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const _params = await params
    const post = await prisma.post.findUnique({
      where: { id: parseInt(_params.id) },
    });

    if (!post) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, post: post });
  } catch (error) {
    console.error('Error fetching post:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const { id, title, content, author } = await request.json();

    const res = await prisma.post.update({
      where: { id: id },
      data: { title, content, author },
    })

    return NextResponse.json({ success: true, post: res });
  }
  catch (error) {
    console.error('Error creating post:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });

  }
}