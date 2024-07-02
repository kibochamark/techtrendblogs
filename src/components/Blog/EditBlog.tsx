import React, { useEffect, useState } from 'react'
import { Button } from '../ui/button';
import MultiSelectDropdown from './MultiSelect';
import { useFormik } from 'formik';
import { useMutation } from '@tanstack/react-query';
import { postBlog, updateBlog } from '@/Actions/Blogs/blog';
import { toast } from 'sonner';
import { Loader } from 'lucide-react';
import Image from 'next/image';
import { useSelector } from 'react-redux';
import { RootState } from '@/utils/Redux/store';
import { title } from 'process';
import { RevalidateAction } from '@/utils/RevalidateAction';

const EditBlog = ({ author, token, categories }: { author: string; token: string; categories: any[] }) => {

    const data = useSelector((state:RootState)=> state.handleaddedit.data)
    console.log("data", data)
    const [file, setFile] = useState<any>()




    const formik = useFormik({
        initialValues: {
            categories: [] as string[],
            title: "",
            slug: "",
            content: "",
            id: ""


        },
        onSubmit(values, formikHelpers) {
           

            let formdata = {
                id:values.id,
                content:values.content,
                title:values.title,
                slug:values.slug
            }
            
           
           
          



            mutation.mutateAsync(formdata)




        },
    })

    useEffect(()=>{
        formik.setValues({
            categories: [] as string[],
            title: data?.title ?? "",
            slug: data?.slug ?? "",
            content: data?.content ?? "",
            id:data?.id ?? ""
        })
    }, [data])

    const mutation = useMutation({
        mutationFn: async (data: any) => {
            const res = await updateBlog(token, data)
            return res
        },
        onSuccess: () => {
            toast.success("article updated")
            RevalidateAction("getblogsbykindeid")
            formik.setSubmitting(false)
        },
        onError: (error, variables, context) => {
            toast.error("error updating article")
            formik.setSubmitting(false)
        },
    })
    return (
        <div>
            <div className="mx-auto">
                <h2 className='text-2xl font-semibold my-4'>Update An article</h2>
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
                        <label htmlFor="email" className="sr-only">Update Posted Image (Required)</label>

                        <div className='h-40 w-full overflow-hidden rounde-md'>

                            <Image src={data?.imagepath ? data?.imagepath : ""} alt="preview image" width={50} height={50} className="w-full h-full" />
                        </div>


                        <div className="relative">
                            <input
                                type="file"
                                name="image"
                                onChange={(e) => {
                                    const file = e.target.files && e.target.files[0];
                                    if (file) {
                                        // 

                                        setFile(file)
                                    }
                                }}
                                className="w-full rounded-lg border-nav border-2 p-4 pe-12 text-sm shadow-sm"
                                placeholder="Upload Image"
                                // required
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
        </div>
    )
}

export default EditBlog
