// import { posts } from '@/app/lib/placeholder-data'
import Link from 'next/link'
import { BackButton } from '@/src/components/BackButton'
import { Post } from '../lib/interface/Post';
// import { useRouter } from 'next/navigation'
// import { useRouter } from 'next/router'

async function getPosts(): Promise<Post[]> {
    const res = await fetch('http://localhost:3000/api/posts', { cache: 'no-store' });
    if (!res.ok) {
      throw new Error('Failed to fetch posts');
    }
    const data = await res.json();

    console.log(data)

    return data.posts;
  }

export default async function Page() {
    // const router = useRouter()

    const posts = await getPosts();

    return (
        <>
            <BackButton />

            {
                /* <button
                    className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-4'
                    onClick={() => router.push("/blog/new")}
                >
                    新規投稿
                </button> */
            }

            <Link href="/blog/new">新規投稿</Link>

            <div>
                <h1 className='text-2xl font-bold m-8 mb-0'>ブログ投稿一覧</h1>
                <ul className='m-8 mt-4'>
                    {posts.map((post, index) => (
                        <Link href={`/blog/${post.id}`} key={post.id}>
                            <li key={index} className='mb-4'>
                                <h2 className='font-bold'>{post.title}</h2>
                                <p className='text-xs'>{post.content}</p>
                            </li>
                        </Link>
                    ))}
                </ul>
            </div>
        </>
    )
}
