"use client"

import { BackButton } from '@/src/components/BackButton'
import React, { FC, useEffect, useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';

type Props = {
  params: {
    id: string
  }
}

async function getPost(id: String) {
  const res = await fetch(`http://localhost:3000/api/posts/${id}`, { cache: 'no-store' });

  if (!res.ok) {
    if (res.status === 404) {
      return null;
    }

    throw new Error('Server Error Occurred...')
  }

  return await res.json()
}

const BlogPost: FC<Props> = props => {
  const { id } = useParams();

  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [isLoading, setLoading] = useState(true)

  if (!id) return <p>No data</p>

  useEffect(() => {
    getPost(id.toString())
      .then((data) => {
        setTitle(data.post.title)
        setContent(data.post.content)
        setLoading(false)
      })
  }, [])

  if (isLoading) return <p>Loading...</p>
  if (!title) return <p>No data</p>

  return (
    <>
      <BackButton />
      <div className='m-8'>
        <h1 className='font-bold text-2xl'>{title}</h1>
        <p>{content}</p>
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

export default BlogPost