import { BackButton } from '@/src/components/BackButton'
import React from 'react';
import Link from 'next/link';

async function getPost(id: String) {
  const res = await fetch(`http://localhost:3000/api/posts/${id}`, { cache: 'no-store' });

  if (!res.ok) {
    if (res.status === 404) {
      return null;
    }

    throw new Error('Server Error Occurred...')
  }

  return (await res.json()).post
}

export default async function BlogPost({ params }: { params: { id: string, editable: boolean } }) {
  const _params = await params
  const id = _params.id

  const post = await getPost(id)

  if (!post) {
    return (<div>Post not found...</div>)
  }

  return (
    <>
      <BackButton />
      <div className='m-8'>
        <h1 className='font-bold text-2xl'>{post.title}</h1>
        <p>{post.content}</p>
      </div>

      <Link href={`/blog/${id}/edit`}>
        <button
          className='mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
        >
          編集
        </button>
      </Link>
    </>
  )
}