"use client"
import React, { useEffect } from 'react'
import { Button } from '../ui/button'
import { ScrollArea } from '../ui/scroll-area'
import { formatDate, timeSince } from '@/utils/datedistance';
import { useFormik } from "formik"
import * as Yup from "yup"
import { useMutation } from '@tanstack/react-query';
import { Data, postComment } from '@/Actions/Comments/comment';
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs';
import { toast } from 'sonner';
import Loader from '@/utils/Loader';
import { RevalidateAction } from '@/utils/RevalidateAction';


export type BlogType = {
    id: number;
    title: string;
    content: string;
    author: { username: string; kinde_id: string; }
    slug: string;
    updated_at: string;
    comments: any[];
}

const Blog = ({ blog }: { blog: BlogType }) => {

    

    const { getAccessTokenRaw, user, isLoading } = useKindeBrowserClient()
    const token = getAccessTokenRaw()

    useEffect(()=>{
        formik.setFieldValue("author_id", user?.id)

    }, [user, isLoading])

    
 

    const formik = useFormik({
        initialValues: {
            content: "",
            post_id: blog.id,
            author_id: ""
        },
        validationSchema: Yup.object().shape({
            content: Yup.string().required("Required").max(50)
        }),
        onSubmit: (values) => {
            postmutataion.mutate({ ...values })
        }
    })

    const postmutataion = useMutation({
        mutationFn: async (data: Data) => {
            const res = await postComment(token ?? "", data)
            return res
        },
        onSuccess: (data, variables, context) => {
            RevalidateAction("getblogbyid")
            toast.success("comment posted")
            formik.setSubmitting(false)

        },
        onError(error, variables, context) {
            toast.error("error posting comment")
            formik.setSubmitting(false)
        },
    })

    // Utility function to group comments by author
    const groupCommentsByAuthor = (comments: any[]) => {
        return comments.reduce((acc: { [x: string]: any[]; }, comment: { author: { username: any; }; }) => {
            const { username } = comment.author;
            if (!acc[username]) {
                acc[username] = [];
            }
            acc[username].push(comment);
            return acc;
        }, {});
    };

    // if (isLoading){
    //     return <div><Loader/></div>
    // }
 
    return (

        <div className='flex flex-col w-full items-start my-10 justify-center gap-4 max-w-prose'>
            <h2 className='text-3xl font-semibold shrink-0'>
                {blog.title}
            </h2>
            <p className='text-muted-foreground my-2'>
                By {blog.author.username}
            </p>
            <p className='text-sm text-muted-foreground'>
                {formatDate(blog.updated_at)}
            </p>
            <div className='my-6 w-full'>
                <p className='text-balance tracking-tight leading-tight'>
                    {blog.content}
                </p>
            </div>

            <div className='flex items-start w-full flex-col gap-4 justify-center'>
                <h3 className='text-xl font-semibold shrink-0'>
                    Comments
                 
                </h3>


                <div className='space-y-4 w-full'>
                    <ScrollArea className="h-[350px] w-full rounded-md border p-4 space-y-4">
                        {blog.comments.length > 0 ? (
                            Object.entries(groupCommentsByAuthor(blog.comments)).map(([username, userComments]: [string, any]) => {
                                return (
                                    <div key={username} className="relative rounded-lg border border-nav my-2">
                                        <div className="flex items-center relative gap-4 p-4">
                                            <img
                                                alt=""
                                                src="https://images.unsplash.com/photo-1611432579699-484f7990b127?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
                                                className="size-12 rounded-lg object-cover"
                                            />
                                            <div className='overflow-y-auto'>
                                                <p className="font-medium text-gray-900 dark:text-white">{username}</p>
                                                {userComments.map((comment: any) => (
                                                    <div key={comment.id} className="mt-2 ml-2">
                                                        <p className="line-clamp-1 text-sm text-gray-500">
                                                            {comment.content}
                                                        </p>
                                                        <p>
                                                            {timeSince(new Date(comment.updated_at))}
                                                        </p>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                );
                            })
                        ) : (
                            <div className="flex flex-1 md:py-10 py-6 items-center justify-center rounded-lg border border-dashed shadow-sm">
                                <div className="flex flex-col items-center gap-1 text-center">
                                    <h3 className="text-2xl font-bold tracking-tight">No comments yet</h3>
                                </div>
                            </div>
                        )}
                    </ScrollArea>

                    <form className="w-full my-4" onSubmit={formik.handleSubmit}>
                        <label htmlFor="UserEmail" className="sr-only"> Add comment </label>

                        {formik.touched.content && formik.errors.content && (<p className='text-rose-500 text-sm'>{formik.errors.content}</p>)}
                        <div
                            className="border border-gray-950 dark:border-nav rounded-lg p-2 focus-within:ring sm:flex sm:items-center sm:gap-4"
                        >
                            <input
                                type="text"
                                disabled={formik.isSubmitting}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                name='content'

                                className="w-full border-none  focus:border-transparent focus:ring-transparent sm:text-sm"
                            />


                            <Button
                                type='submit'
                                disabled={formik.isSubmitting}

                                className="mt-1 w-full disabled:bg-gray-100 bg-nav text-black px-6 py-3 text-sm font-bold uppercase tracking-wide  transition-none hover:bg-nav sm:mt-0 sm:w-auto sm:shrink-0"
                            >
                                {formik.isSubmitting ? (
                                    <Loader />
                                ) : "Add Comment"}

                            </Button>
                        </div>
                    </form>

                </div >
            </div >
        </div >

    )
}

export default Blog
