// import { posts } from '@/app/lib/placeholder-data'
import { BackButton } from '@/src/components/BackButton'

// export default async function BlogPost({params}: {params: {id: string}}) {
export default async function BlogPost({ params }: { params: { id: string } }) {
  // console.log(params)
  
  const _params = await params
  const res = await fetch(`http://localhost:3000/api/posts/${_params.id}`, { cache: 'no-store' });

  if (!res.ok) {
    if (res.status === 404) {
      return null;
    }

    throw new Error('Server Error Occurred...')
  }

  const post = (await res.json()).post

  // const _params = await params
  // const post = posts.find(post => post.id === Number(_params.id))

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
    </>
  )

}