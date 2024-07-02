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
import Image from "next/image"
import { ModeToggle } from "../ThemeToggler"
import { RegisterLink, LoginLink, LogoutLink } from "@kinde-oss/kinde-auth-nextjs/components";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server"

import NavClient from "./navClient"

export async function NavBar() {
   
    const { isAuthenticated, getUser } = await getKindeServerSession()
    const authenticated= await isAuthenticated()
    const user = await getUser()

    


    return (
        <div className="flex w-full flex-col">
            <header className="sticky top-0 py-2 md:py-0 flex h-18 items-center gap-4 border-b bg-nav backdrop-blur-sm px-4 md:px-6">
                <NavClient authenticated ={authenticated}/>
                <div className="md:hidden">
                    <Image className="rounded-full" alt="user profile" src={"/techsmall.png"} width={150} height={150} />

                </div>
                <div className="flex w-full items-center justify-end gap-4 md:ml-auto md:gap-2 lg:gap-4">
                    <ModeToggle />
                    {await isAuthenticated() && (
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="secondary" size="icon" className="rounded-full">
                                    {user ? (
                                        <div className="rounded-full  uppercase text-xl md:text-2xl dark:text-white text-gray-950">
                                            <p>{user.given_name?.charAt(0)}</p></div>

                                    ) : (
                                        <CircleUser className="h-5 w-5" />

                                    )}
                                    <span className="sr-only">Toggle user menu</span>
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem>Settings</DropdownMenuItem>
                                <DropdownMenuItem>Support</DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem><LogoutLink>Logout</LogoutLink></DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    )}

                </div>
            </header>

        </div>
    )
}
