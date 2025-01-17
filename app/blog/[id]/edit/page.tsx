"use client"

import { FC, useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation'
import { BackButton } from '@/src/components/BackButton';
import { useData } from '@/app/lib/hooks/useData';


/*const editPage: FC<Props> = props => {
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const [isLoading, setLoading] = useState(true)

    useEffect(() => {
        const { id } = useParams();
        fetch(`/api/posts/${id}`)
            .then((res) => res.json())
            .then((post) => {
                setTitle(post.title)
                setContent(post.content)
            })
    }, [])

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
            // router.push('/blog');
            // router.refresh();
            window.alert('投稿しました')
        } else {
            console.error('Failed to create post');
        }
    };

    if (isLoading) return <p>Loading...</p>
    if (!title) return <p>No data</p>

    return (
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
    )
}
*/
const editPage: FC<Props> = (props) => {
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const [isLoading, setLoading] = useState(true)
    const { id } = useParams();

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
            // router.push('/blog');
            // router.refresh();
            window.alert('投稿しました')
        } else {
            console.error('Failed to create post');
        }
    };

    console.log(id)

    useEffect(() => {

        fetch(`/api/posts/${id}`)
            .then((res) => res.json())
            .then((data) => {
                console.log(data)
                setTitle(data.post.title)
                setContent(data.post.content)
                setLoading(false)
            })
    }, [])


    if (isLoading) return <p>Loading...</p>
    if (!title) return <p>No profile data</p>

    console.log(title, content)

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

// const editPage: FC<Props> = props => {
//     const router = useRouter();
//     const { id } = useParams();

//     const res = useData('post', () => fetch(`/api/posts/${id}`).then(res => res.json())); // await fetch(`http://localhost:3000/api/posts/${id}`, { cache: 'no-store' });
//     console.log(res)

//     const postInfo = res.post

//     const [title, setTitle] = useState(postInfo.title);
//     const [content, setContent] = useState(postInfo.content);

//     const handleSubmit = async (e: React.FormEvent) => {
//         e.preventDefault();
//         const response = await fetch('/api/posts', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify({ title, content, author: 'hidepy-from-ui' }),
//         });

//         if (response.ok) {
//             router.push('/blog');
//             router.refresh();
//         } else {
//             console.error('Failed to create post');
//         }
//     };

//     return (
//         <>
//             <BackButton />
//             <div>
//                 <h1 className='text-2xl font-bold m-8 mb-0'>投稿を編集する</h1>
//                 <form className='m-8' onSubmit={handleSubmit}>
//                     <label className='block'>
//                         <span className='text-gray-700'>タイトル</span>
//                         <input
//                             type='text'
//                             value={title}
//                             onChange={(e) => setTitle(e.target.value)}
//                             className='mt-1 block w-full'
//                         />
//                     </label>
//                     <label className='block mt-4'>
//                         <span className='text-gray-700'>内容</span>
//                         <textarea
//                             value={content}
//                             onChange={(e) => setContent(e.target.value)}
//                             className='mt-1 block w-full'
//                         ></textarea>
//                     </label>
//                     <button
//                         type='submit'
//                         className='mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
//                     >
//                         投稿
//                     </button>
//                 </form>
//             </div>
//         </>
//     );
// }


export default editPage;