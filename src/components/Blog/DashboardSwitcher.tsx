"use client"
import Loader from '@/utils/Loader'
import { handleActiveTab } from '@/utils/Redux/slices/DashboardSlice'
import { RootState } from '@/utils/Redux/store'
import React, { Suspense } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import PageView from './PageView'
import PageViewCat from '../categories/PageViewCat'

const DashboardSwitcher = ({ blogs, categories, author, token, props }: { blogs: any[]; categories: any[], author: any; token: string; props: { deleteblog: any } }) => {
  const active = useSelector((state: RootState) => state.dashboard.active)
  const isactive = useSelector((state: RootState) => state.dashboard.isactive)

  const dispatch = useDispatch()
  return (
    <div className='mx-auto grid w-full max-w-6xl items-start gap-6 md:grid-cols-[180px_1fr] lg:grid-cols-[250px_1fr]'>
      <nav
        className="grid gap-4 group text-sm text-muted-foreground" x-chunk="dashboard-04-chunk-0"
      >
        <p onClick={() => {
          dispatch(handleActiveTab({ isactive: true, active: "blogs" }))
        }} className={` ${active === "blogs" && isactive ? "text-primary font-semibold" : ""} group-hover:cursor-pointer`}>
          Manage Blogs
        </p>
        <p onClick={() => {
          dispatch(handleActiveTab({ isactive: true, active: "categories" }))
        }} className={` ${active === "categories" && isactive ? "text-primary font-semibold" : ""} group-hover:cursor-pointer`}>Categories</p>

      </nav>

      <div className="grid gap-6">
        {active === "blogs" && isactive && (
          <Suspense fallback={<Loader />}>
            {blogs && categories && (
              <PageView blogs={blogs ?? []} categories={categories} author={author?.id ?? ""} token={token} props={props} />

            )}
          </Suspense>

        )}
        {active === "categories" && isactive && (
          <PageViewCat />

        )}



      </div >

    </div>
  )
}

export default DashboardSwitcher
