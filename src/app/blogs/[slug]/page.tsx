import { decrypt } from '@/utils/EncryDecryTool'
import React, { Suspense } from 'react'
import { ScrollArea } from "@/components/ui/scroll-area"
import { Button } from '@/components/ui/button'
import { getBlogById } from '@/Actions/Blogs/blog'
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'
import Loader from '@/utils/Loader'
import Link from 'next/link'
import Blog, { BlogType } from '@/components/Blog/blog'

const page = async ({ params }: { params: { slug: string } }) => {

    const { getAccessTokenRaw } = await getKindeServerSession()


    const token = await getAccessTokenRaw()

    const blog = await getBlogById(token, parseInt(params.slug))
    

    let blogdata:BlogType ={
        id:blog[0]?.id,
        title:blog[0]?.title,
        content:blog[0]?.content,
        slug:blog[0]?.slug,
        author:blog[0]?.author,
        updated_at:blog[0]?.updated_at,
        comments:blog[0]?.comments,
    }


    return (
        <Suspense fallback={<Loader />}>
            {!blog ? (
                <div
                    className="flex flex-1 md:py-10 py-6 items-center justify-center rounded-lg border border-dashed shadow-sm"
                >
                    <div className="flex flex-col items-center gap-1 text-center">
                        <h3 className="text-2xl font-bold tracking-tight">
                            Blog does not exist
                        </h3>
                        <Link href={"/blogs"}><Button className="mt-4 bg-nav text-gray-950">Back to blogs</Button></Link>
                    </div>
                </div>
            ) : (
                <div className='min-h-screen grid place-content-center container'>

                  <Blog blog={blogdata}/>
                </div>
            )}

        </Suspense>


    )
}

export default page
