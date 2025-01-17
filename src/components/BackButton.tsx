"use client"

import { FC } from 'react'
import { useRouter } from 'next/navigation'

export const BackButton: FC = () => {
  const router = useRouter()

  return (
    <button
      className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
      onClick={() => router.back()}
    >
      戻る
    </button>
  )
}