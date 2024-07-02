"use client"
import React, { useEffect, useMemo, useState } from 'react'
import { DataTable } from '../Reusables/DataTable'
import { columns } from '@/app/dashboard/columns'
import { Button } from '../ui/button'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/utils/Redux/store'
import { handleEdit, handleFile } from '@/utils/Redux/slices/HandleDialogSlice'
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import MultiSelectDropdown from './MultiSelect'
import { useFormik } from 'formik'
import { File } from 'buffer'
import Loader from '@/utils/Loader'
import { useMutation } from '@tanstack/react-query'
import { deleteBlog, postBlog } from '@/Actions/Blogs/blog'
import { toast } from 'sonner'
import EditBlog from './EditBlog'
import { RevalidateAction } from '@/utils/RevalidateAction'


const PageView = ({ blogs, categories, author, token, props }: { blogs: any[]; categories: any[], author: string; token: string; props: { deleteblog: any } }) => {
    const isedit = useSelector((state: RootState) => state.handleaddedit.isedit)
    const deletedata = useSelector((state: RootState) => state.handleaddedit.deletedata)
    const todelete = useSelector((state: RootState) => state.handleaddedit.todelete)
    const dispatch = useDispatch()

    const [file, setFile] = useState<any>()





    const formik = useFormik({
        initialValues: {
            categories: [] as string[],
            title: "",
            slug: "",
            content: "",
            author_id: author


        },
        onSubmit(values, formikHelpers) {
            console.log(values)


            let formattedcategories = values.categories.join(",")

            console.log(formattedcategories)

            let formdata = new FormData()
            formdata.append("title", values.title)
            formdata.append("content", values.content)
            formdata.append("slug", values.slug)
            formdata.append("kinde_id", values.author_id)
            formdata.append("categorytype", formattedcategories)
            if (file) {
                formdata.append("image", file);
            }



            mutation.mutateAsync(formdata)




        },
    })

    const mutation = useMutation({
        mutationFn: async (data: FormData) => {
            const res = await postBlog(token, data)
            return res
        },
        onSuccess: () => {
            toast.success("article posted")
            RevalidateAction("getblogsbykindeid")
            formik.setSubmitting(false)
            formik.resetForm()
        },
        onError: (error, variables, context) => {
            toast.error("error posting article")
            formik.setSubmitting(false)
        },
    })
    const deletemutation = useMutation({
        mutationFn: async (row: any) => {
            const res = await deleteBlog(token, row)
            return res
        },
        onSuccess: () => {
            RevalidateAction("getblogsbykindeid")
            toast.success("article deleted")

        },
        onError: (error, variables, context) => {
            toast.error("error deleting article")

        },
    })

    useEffect(() => {
        if (todelete) {
            console.log("me");

            deletemutation.mutateAsync({ deletedata })
        }
    }, [todelete])









    return (
        <div>



            {blogs?.length > 0 ? (
                <div className="overflow-hidden w-full">
                    <Sheet open={isedit} onOpenChange={() => {
                        dispatch(handleEdit({ edit: false, data: {} }))
                    }}>
                        <SheetContent>

                            <SheetHeader>

                                <SheetDescription>
                                    <EditBlog author={author} token={token} categories={categories} />
                                </SheetDescription>
                            </SheetHeader>
                        </SheetContent>
                    </Sheet>
                    <div className="w-[100%] pr-6 inline-block ">
                        <DataTable columns={columns} data={blogs} props={props} />
                    </div>
                </div>
            )
                : (
                    <div
                        className="flex flex-1 md:py-10 py-6 items-center justify-center rounded-lg border border-dashed shadow-sm"
                    >
                        <div className="flex flex-col items-center gap-1 text-center">
                            <h3 className="text-2xl font-bold tracking-tight">
                                You have no posts yet
                            </h3>
                            <p className="text-sm text-muted-foreground">
                                You can start managing your blogs once you add one

                            </p>

                            <Sheet>
                                <SheetTrigger className='bg-nav mt-4 rounded-md dark:text-black hover:bg-gray-900 dark:hover:text-white hover:text-white p-2 hover:cursor-pointer'>Add Blog</SheetTrigger>
                                <SheetContent>
                                    <SheetHeader>

                                        <SheetDescription>


                                            <div className="mx-auto">
                                                <h2 className='text-2xl font-semibold my-4'>Post An article</h2>
                                                <form onSubmit={formik.handleSubmit} className="mx-auto mb-0 mt-2 max-w-md space-y-4" encType='multipart/form-data'>
                                                    <div>
                                                        <label htmlFor="email" className="sr-only">Title</label>

                                                        <div className="relative">
                                                            <input
                                                                type="text"
                                                                name="title"
                                                                onChange={formik.handleChange}
                                                                onBlur={formik.handleBlur}
                                                                defaultValue={formik.values.title}
                                                                className="w-full rounded-lg border-nav border-2 p-4 pe-12 text-sm shadow-sm"
                                                                placeholder="Enter title"
                                                            />
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <label htmlFor="email" className="sr-only">Slug</label>

                                                        <div className="relative">
                                                            <input
                                                                type="text"
                                                                name="slug"
                                                                onChange={formik.handleChange}
                                                                onBlur={formik.handleBlur}
                                                                defaultValue={formik.values.slug}
                                                                className="w-full rounded-lg border-nav border-2 p-4 pe-12 text-sm shadow-sm"
                                                                placeholder="Enter Slug"
                                                            />
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <label htmlFor="email" className="sr-only">Slug</label>

                                                        <div className="relative">
                                                            <MultiSelectDropdown formFieldName={"categories"} options={categories} onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.categories} />
                                                        </div>
                                                    </div>

                                                    <div>
                                                        <label htmlFor="email" className="sr-only">Content</label>

                                                        <div className="relative">

                                                            <textarea name="content"
                                                                onChange={formik.handleChange}
                                                                onBlur={formik.handleBlur}
                                                                defaultValue={formik.values.content} placeholder='enter article content' rows={50} className="w-full rounded-lg border-nav border-2 h-20 overflow-y-auto p-4 pe-12 text-sm shadow-sm"></textarea>
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <label htmlFor="email" className="sr-only">Post Image (Required)</label>

                                                        <div className="relative">
                                                            <input
                                                                type="file"
                                                                name="image"
                                                                onChange={(e) => {
                                                                    const file = e.target.files && e.target.files[0];
                                                                    if (file) {
                                                                        dispatch(handleFile({

                                                                            type: 'HANDLE_FILE',
                                                                            payload: {
                                                                                name: file.name,
                                                                                size: file.size,
                                                                                type: file.type,
                                                                                lastModified: file.lastModified,
                                                                            },

                                                                        }));

                                                                        setFile(file)
                                                                    }
                                                                }}
                                                                className="w-full rounded-lg border-nav border-2 p-4 pe-12 text-sm shadow-sm"
                                                                placeholder="Upload Image"
                                                                required
                                                                accept=".jpg, .jpeg"
                                                            />
                                                        </div>
                                                    </div>




                                                    <div className="flex items-center justify-between">
                                                        <Button
                                                            type="submit"
                                                            disabled={formik.isSubmitting}
                                                            className="inline-block rounded-lg bg-nav px-5 py-3 text-sm font-medium text-black"
                                                        >
                                                            {formik.isSubmitting ? <div className='h-6'><Loader /></div> : (
                                                                "Post Blog"
                                                            )}
                                                        </Button>
                                                    </div>
                                                </form>
                                            </div>
                                        </SheetDescription>
                                    </SheetHeader>
                                </SheetContent>
                            </Sheet>

                        </div>
                    </div>
                )
            }
        </div>
    )
}

export default PageView
