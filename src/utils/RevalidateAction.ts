"use server"

import { revalidateTag } from "next/cache"


export async function RevalidateAction(tag:string){
    return revalidateTag(tag)
}