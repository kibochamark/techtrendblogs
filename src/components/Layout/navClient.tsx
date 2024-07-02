"use client"
import { LoginLink, RegisterLink, useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs'
import Link from 'next/link'
import React from 'react'
import Image from 'next/image'
import { Button } from '../ui/button'
import { Sheet, SheetContent, SheetTrigger } from '../ui/sheet'
import { Menu } from 'lucide-react'
import { usePathname } from 'next/navigation'

const NavClient = ({authenticated}:{authenticated:boolean}) => {
    const pathname = usePathname()
    let activeurl = ""

    if (pathname) {
        let newpaths = pathname.split("/")
      

        activeurl = newpaths[1]


    }


    return (
        <div>
            {!authenticated ? (

                <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
                    <Link
                        href="/"
                        className="flex items-center gap-2 text-lg font-semibold md:text-base"
                    >
                        {/* <Package2 className="h-6 w-6" /> */}
                        <Image src={"/techsmall.png"} width={300} height={300} alt="logo" />
                        <span className="sr-only">Acme Inc</span>
                    </Link>
                    <Link
                        href="#"
                        className="text-muted-foreground  dark:hover:text-black transition-colors hover:text-foreground"
                    >
                        About
                    </Link>

                    <LoginLink className="text-nowrap dark:hover:text-black text-muted-foreground transition-colors hover:text-foreground tracking-tight leading-tight p-2 rounded-md  ">Sign in</LoginLink>
                    <Button
                        className="text-white dark:text-black transition-colors hover:text-foreground"
                    >
                        <RegisterLink>Get Started</RegisterLink>
                    </Button>

                </nav>) : (
                <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
                    <Link
                        href="/"
                        className="flex items-center gap-2 text-lg font-semibold md:text-base"
                    >
                        {/* <Package2 className="h-6 w-6" /> */}
                        <Image src={"/techsmall.png"} width={200} height={300} alt="logo" />
                        <span className="sr-only">Acme Inc</span>
                    </Link>
                    <Link
                        href="/dashboard"
                        className={`${activeurl === "dashboard" ? "text-foreground dark:text-gray-950" : "text-muted-foreground"} transition-colors hover:text-foreground`}
                    >
                        Dashboard
                    </Link>

                    <Link
                        href="/blogs"
                        className={`${activeurl === "blogs" ? "text-foreground dark:text-gray-950" : "text-muted-foreground"} transition-colors hover:text-foreground`}
                    >
                        Blogs
                    </Link>
                </nav>
            )}

            <Sheet>
                <SheetTrigger asChild>
                    <Button
                        variant="outline"
                        size="icon"
                        className="shrink-0 md:hidden"
                    >
                        <Menu className="h-5 w-5" />
                        <span className="sr-only">Toggle navigation menu</span>
                    </Button>
                </SheetTrigger>
                <SheetContent side="left" className="bg-nav">
                    <nav className="grid gap-6 text-lg font-medium">
                        <Link
                            href="/"
                            className="flex items-center gap-2 text-lg font-semibold"
                        >
                            <Image src={"/techsmall.png"} width={100} height={100} alt="logo" />
                            <span className="sr-only">Acme Inc</span>
                        </Link>
                        {!authenticated ? (
                            <>
                                <Link
                                    href="#"
                                    className="text-muted-foreground transition-colors hover:text-foreground"
                                >
                                    About
                                </Link>


                                <LoginLink className="text-nowrap dark:hover:text-black text-muted-foreground transition-colors hover:text-foreground tracking-tight leading-tight p-2 rounded-md  ">Sign in</LoginLink>
                                <Button
                                    className="text-white dark:text-black transition-colors hover:text-foreground"
                                >
                                    <RegisterLink>Get Started</RegisterLink>
                                </Button>


                            </>
                        ) : (
                            <>
                                <Link
                                    href="/dashboard"
                                    className={`${activeurl === "dashboard" ? "text-foreground dark:text-gray-950" : "text-muted-foreground"} transition-colors hover:text-foreground`}
                                >
                                    Dashboard
                                </Link>


                                <Link
                                    href="/blogs"
                                    className={`${activeurl === "blogs" ? "text-foreground dark:text-gray-950" : "text-muted-foreground"} transition-colors hover:text-foreground`}
                                >
                                    Blogs
                                </Link>
                            </>
                        )}
                    </nav>
                </SheetContent>
            </Sheet>
        </div>
    )
}

export default NavClient
