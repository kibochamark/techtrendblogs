"use client";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { Button } from "../ui/button";
import Link from "next/link";
import { encrypt } from "@/utils/EncryDecryTool";
import { timeSince } from "@/utils/datedistance";

export function BlogCard({ background, avatar, name, date, title, shortdescription, id, created, categories }: { background: string; avatar: string; name: string; date: string; title: string; shortdescription: string; id: number; created: string; categories: any }) {

    let distancedate = timeSince(new Date(created))

    return (
        <div className="max-w-xs w-full h-[400px] group/card">
            <div
                className={cn(
                    "cursor-pointer overflow-hidden relative card h-100 rounded-md shadow-xl max-w-sm mx-auto backgroundImage flex flex-col justify-between p-4",
                    "bg-cover"
                )}
                style={{
                    background: `url(${background})`,
                    opacity: "30"
                }}
            >
                <div className="absolute w-full h-full top-0 left-0 transition duration-300 bg-black group-hover/card:bg-black opacity-60"></div>
                <div className="flex flex-row items-center space-x-4 z-10">
                    <Image
                        height="100"
                        width="100"
                        alt="Avatar"
                        src={avatar}
                        className="h-10 w-10 rounded-full border-2 object-cover"
                    />
                    <div className="flex flex-col">

                        <p className="font-normal text-base text-gray-50 relative z-10">
                            {name}
                        </p>
                        <p className="text-sm text-gray-400 dark:text-muted-foreground">{distancedate}</p>
                    </div>
                </div>
                <div className="text content h-full">
                    <h1 className="font-bold text-xl md:text-2xl text-gray-50 relative h-40 mt- z-10">
                        {title}
                    </h1>
                    <div className="flex justify-start gap-2 items-center z-10">

                        {Array.isArray(categories) ? (
                            categories.map((cat: { name: string }, index) => {
                                return (
                                    <p key={index} className="whitespace-nowrap hover:cursor-pointer rounded-full bg-muted-foreground px-2.5 py-0.5 text-sm text-white tracking-tight leading-tight relative"># {cat.name}</p>

                                )
                            })
                        ) : (
                            <p className="whitespace-nowrap hover:cursor-pointer rounded-full bg-purple-100 px-2.5 py-0.5 text-sm text-purple-700">#{categories.name}</p>
                        )}
                    </div>
                    <p className="font-normal text-sm text-gray-50 relative z-10 my-4 whitespace-nowrap overflow-hidden text-ellipsis text-wrap h-20">
                        {shortdescription}
                    </p>
                    <div className="my-6 relative">
                        <Link href={`/blogs/${id}`} className="bg-nav text-black rounded-md p-2">ReadMore</Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
