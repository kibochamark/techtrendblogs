import Link from "next/link"
import { CircleUser, Menu, Package2, Search } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { RegisterLink, LoginLink, LogoutLink } from "@kinde-oss/kinde-auth-nextjs/components";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { deleteBlog, getBlogByUser } from "@/Actions/Blogs/blog"
import { DataTable } from "@/components/Reusables/DataTable"
import { columns } from "./columns"
import PageView from "@/components/Blog/PageView"
import { getcategories } from "@/Actions/Categories/categories"
import { Suspense } from "react"
import Loader from "@/utils/Loader"
import DashboardSwitcher from "@/components/Blog/DashboardSwitcher"



const page = async () => {
    const {
        getAccessToken,
        getBooleanFlag,
        getFlag,
        getIdToken,
        getIntegerFlag,
        getOrganization,
        getPermission,
        getPermissions,
        getRoles,
        getStringFlag,
        getUser,
        getUserOrganizations,
        isAuthenticated,
        getAccessTokenRaw,
        getIdTokenRaw
    } = getKindeServerSession();


    const token = await getAccessTokenRaw()
    const user = await getUser()

    const blogs = await getBlogByUser(token, user?.id) || []
    const categories = await getcategories(token) || []

    console.log(blogs, categories)

    const handleDelete = async (data: any) => {
        "use server"
        console.log(data, "data")
        // const res = await deleteBlog(token, data)
        return {}
    }


    let props = {
        deleteblog: handleDelete
    }




    return (
        <div className="flex min-h-screen w-full flex-col">

            <main className="flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-4 bg-muted/40 p-4 md:gap-8 md:p-10">
                <div className="mx-auto grid w-full max-w-6xl gap-2">
                    <h1 className="text-3xl font-semibold">Dashboard</h1>
                </div>
                <DashboardSwitcher blogs={blogs ?? []} categories={categories} author={user ?? {}} token={token} props={props} />

            </main >
        </div >
    )
}


export default page