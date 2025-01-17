// "use client"
import { Post } from '@/app/lib/interface/Post';
// import { useState } from 'react';
import { BackButton } from '@/src/components/BackButton'
import React from 'react';

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
  const isEditable = _params.editable
  // let post: any = { fetched: false }

  // React.useEffect(() => {
  //   getPost(id).then((_post) => {
  //     post = _post
  //   })
  // }, [])

  // if (!post.fetched) {
  //   getPost(id).then((_post) => {
  //     post = {
  //       ..._post,
  //       fetched: true
  //     }
  //   })

  // }

  // const res = await fetch(`http://localhost:3000/api/posts/${id}`, { cache: 'no-store' });

  // if (!res.ok) {
  //   if (res.status === 404) {
  //     return null;
  //   }

  //   throw new Error('Server Error Occurred...')
  // }

  // const post = (await res.json()).post

  const post = await getPost(id)

  if (!post) {
    return (<div>Post not found...</div>)
  }

  // const [content, setContent] = useState('');

  return (
    <>
      <BackButton />
      <div className='m-8'>

        <h1 className='font-bold text-2xl'>{post.title}</h1>
        <p>{post.content}</p>
      </div>

      <button
        type='submit'
        className='mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
      >
        投稿
      </button>
    </>
  )

}