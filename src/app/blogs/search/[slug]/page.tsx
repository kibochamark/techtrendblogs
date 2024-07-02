import { getBlogsByCat } from '@/Actions/Blogs/blog'
import { getcategories } from '@/Actions/Categories/categories'
import { BlogCard } from '@/components/Reusables/BlogCard'
import { Button } from '@/components/ui/button'
import Loader from '@/utils/Loader'
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'
import Link from 'next/link'
import React, { Suspense } from 'react'

const page = async ({ params }: { params: { slug: string } }) => {
    const { getAccessTokenRaw } = await getKindeServerSession()
    const token = await getAccessTokenRaw()
    const categories = await getcategories(token)

    function checkIfSlugExixts(param: string) {
        return categories.some((cat: { slug: string }) => cat.slug.toLowerCase() === param)
    }

    const blogs = await getBlogsByCat(token, params.slug)


    return (
        <Suspense fallback={<Loader />}>
            <div className='mx-auto container'>
                <h2 className='text-3xl my-4 font-semibold mt-4'>{params.slug.charAt(0).toUpperCase() + params.slug.slice(1)} Blogs</h2>

                <div className='my-6 p-1 flex justify-start gap-2  items-center flex-wrap md:shrink-0'>
                    <Link href={"/blogs"} className="whitespace-nowrap hover:cursor-pointer rounded-full bg-purple-100 px-2.5 py-0.5 text-sm text-purple-700">
                        All
                    </Link>
                    <Suspense fallback={<Loader />}>
                        {categories.length > 0 && categories.map((cat: { id: number; name: string; slug: string; }) => {
                            return (
                                <Link href={`/blogs/search/${cat.slug.toLowerCase()}`} key={cat.id} className={`whitespace-nowrap hover:cursor-pointer rounded-full ${params.slug === cat.slug.toLowerCase() ? "bg-rose-200 font-bold text-lg" : "bg-yellow-200 text-black"} px-2.5 py-0.5 text-sm`}>
                                    {cat.name}
                                </Link>
                            )
                        })}
                    </Suspense>
                </div>
                {checkIfSlugExixts(params.slug) ? (
                    <div className='mt-6 w-full md:grid md:grid-cols-2 lg:grid-cols-4 gap-4 place-self-center'>
                        <Suspense fallback={<Loader />}>
                            {blogs.length > 0 ? blogs?.map((item: {
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
                                <div className="flex flex-1 md:py-10 py-6 items-center md:col-span-2 lg:col-span-4 justify-center rounded-lg border border-dashed shadow-sm w-full">
                                    <div className="flex flex-col items-center gap-1 text-center">
                                        <h3 className="text-2xl font-bold tracking-tight">
                                            Sorry, no blogs under {params.slug} category have been posted
                                        </h3>
                                        <p className="text-sm text-muted-foreground">
                                            Add one of your own
                                        </p>
                                        <Link href={"/dashboard"} className="mt-4 bg-nav rounded-md text-gray-950 p-2 hover:bg-nav">Add Blog</Link>
                                    </div>
                                </div>
                            )}
                        </Suspense>
                    </div>
                ) : (
                    <div className="flex items-center justify-center w-full">
                        <div
                            className="flex flex-1 md:py-10 py-6 items-center justify-center rounded-lg border border-dashed shadow-sm"
                        >
                            <div className="flex flex-col items-center gap-1 text-center">
                                <h3 className="text-2xl font-bold tracking-tight">
                                    Sorry The search category does not exists
                                </h3>

                                <Link href={"/blogs"}> <Button className="mt-4 bg-nav text-gray-950 hover:bg-nav">Back to blogs</Button></Link>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </Suspense>
    )
}

export default page
