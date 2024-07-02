import { getBlogs } from '@/Actions/Blogs/blog'
import { getcategories } from '@/Actions/Categories/categories'
import { BlogCard } from '@/components/Reusables/BlogCard'
import { Button } from '@/components/ui/button'
import Loader from '@/utils/Loader'
import { RegisterLink, getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'
import Link from 'next/link'
import React, { Suspense } from 'react'

const page = async () => {
    const { getAccessTokenRaw } = await getKindeServerSession()
    
    const token = await getAccessTokenRaw()
    const blogs = await getBlogs(token)
    const categories = await getcategories(token)

    

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-transparent">
            <div className='container flex flex-col gap-2 w-full bg-gray-50 dark:bg-transparent '>
                <h2 className='text-3xl my-2 font-semibold mt-4'>Recent Blogs</h2>

                <div className='my-6 p-1 flex justify-start gap-2  items-center flex-wrap md:shrink-0'>
                    <Link href={"/blogs"} className="whitespace-nowrap hover:cursor-pointer rounded-full bg-purple-100 px-2.5 py-0.5 text-sm text-purple-700">
                        All
                    </Link>
                    <Suspense fallback={<Loader/>}>
                        {categories.length > 0 && categories.map((cat: { id: number; name: string; slug: string; }) => {
                            return (
                                <Link href={`/blogs/search/${cat.slug.toLowerCase()}`} key={cat.id} className="whitespace-nowrap hover:cursor-pointer rounded-full bg-yellow-100 px-2.5 py-0.5 text-sm text-black">
                                    {cat.name}
                                </Link>
                            )
                        })}
                    </Suspense>
                </div>

                <div className='mt-6 w-full md:grid md:grid-cols-2 lg:grid-cols-4 gap-4 place-self-center'>
                <Suspense fallback={<Loader/>}>
                    {blogs.length > 0 ? blogs.map((item: {
                        id: number;
                        updated_at: string;
                        title: string; content: string;
                        imagepath: string; slug: string; comments: any; author: { username: string; }; categories:any;
                    }, index: number) => {
                        return (
                            <div key={index} className='col-span-1 my-2'>
                                <BlogCard background={item.imagepath} avatar={''} name={item.author.username} date={''} title={item.title} shortdescription={item.slug} id={item.id} created={item.updated_at} categories={categories} />
                            </div>
                        )
                    }) : (
                        <div className="flex flex-1 md:py-10 py-6 items-center justify-center rounded-lg border border-dashed shadow-sm">
                            <div className="flex flex-col items-center gap-1 text-center">
                                <h3 className="text-2xl font-bold tracking-tight">
                                    Sorry, no blogs have been posted
                                </h3>
                                <p className="text-sm text-muted-foreground">
                                    Add one of your own
                                </p>
                                <Link href={"/dashboard"} className="mt-4 bg-nav text-gray-950">Add Blog</Link>
                            </div>
                        </div>
                    )}
                    </Suspense>
                </div>
            </div>
        </div>

    )
}

export default page
