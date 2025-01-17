"use client"

import { useState } from 'react';
import { useRouter } from 'next/navigation'
import { BackButton } from '@/src/components/BackButton';

export default function NewPost() {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const response = await fetch('/api/posts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ title, content, author: 'hidepy-from-ui' }),
        });

        if (response.ok) {
            router.push('/blog');
            router.refresh();
        } else {
            console.error('Failed to create post');
        }
    };


    return (
        <>
            <BackButton />
            <div>
                <h1 className='text-2xl font-bold m-8 mb-0'>新規投稿</h1>
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
        </>
    );
}
