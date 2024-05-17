"use client"


import { useEffect } from "react"
import MainLayout from "./layouts/MainLayout"
import { usePostStore } from "@/app/stores/post"
import ClientOnly from "./components/ClientOnly"
import PostMain from "./components/PostMain"

export default function Home() {
  let { allPosts, setAllPosts } = usePostStore();
  useEffect(() => { setAllPosts()}, [])
  return (
    <>
      <MainLayout>

      <h1 className='head-text header text-left border-b border-light-orange'>Hot</h1>

        <div className="mt-[80px]  w-[calc(100%-90px)] max-w-[690px] ml-auto">
          <ClientOnly>
            {allPosts.map((post, index) => (
              <PostMain post={post} key={index} />
            ))}
          </ClientOnly>
        </div>
      </MainLayout>
    </>
  )
}