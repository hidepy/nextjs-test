import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

// import { posts } from '@/app/lib/placeholder-data'

const prisma = new PrismaClient();

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const _params = await params
    const post = await prisma.post.findUnique({
      where: { id: parseInt(params.id) },
    });

    if (!post) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    }

    // const post = posts.find(post => post.id === Number(_params.id))

    // return NextResponse.json({ post });
    return NextResponse.json({ success: true, post: post});
  } catch (error) {
    console.error('Error fetching post:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  console.log(request)
  try {
    const { title, content, author } = await request.json();

    console.log(title)

    const res = await prisma.post.create({
      data: {title, content, author},
    })

    return NextResponse.json({ success: true, post: res });
  }
  catch (error) {
    console.error('Error creating post:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });

  }
}