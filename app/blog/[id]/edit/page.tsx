"use client"

import { FC, useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation'

const editPage: FC<Props> = (props) => {
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const [isLoading, setLoading] = useState(true)
    const { id } = useParams();
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const response = await fetch(`/api/posts/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id, title, content, author: 'hidepy-from-ui' }),
        });

        if (response.ok) {
            router.back();
            router.refresh();
            window.alert('投稿しました')
        } else {
            console.error('Failed to create post');
        }
    };

    useEffect(() => {
        fetch(`/api/posts/${id}`)
            .then((res) => res.json())
            .then((data) => {
                setTitle(data.post.title)
                setContent(data.post.content)
                setLoading(false)
            })
    }, [])

    if (isLoading) return <p>Loading...</p>
    if (!title) return <p>No profile data</p>

    return (
        <div>
            <h1>{title}</h1>
            <p>{content}</p>

            <div>
                <h1 className='text-2xl font-bold m-8 mb-0'>投稿を編集する</h1>
                <form className='m-8' onSubmit={handleSubmit}>
                    <label className='block'>
                        <span className='text-gray-700'>タイトル</span>
                        <input
                            type='text'
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className='mt-1 block w-full'
                        />
                    </label>
                    <label className='block mt-4'>
                        <span className='text-gray-700'>内容</span>
                        <textarea
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            className='mt-1 block w-full'
                        ></textarea>
                    </label>
                    <button
                        type='submit'
                        className='mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
                    >
                        投稿
                    </button>
                </form>
            </div>
        </div>
    )
}

type Props = {
    params: {
        id: string
    }
}

export default editPage;