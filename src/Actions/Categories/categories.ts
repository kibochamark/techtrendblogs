"use server"

import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server"


export const getcategories = async(token:string)=>{
    const {getUser}= await getKindeServerSession()
    const user= await getUser()

    if(user){
        try{
            const res= await fetch(process.env.BASE_URL! + "/retrievecategories", {
                method:"GET",
                headers:{
                    'Authorization': `Bearer ${token}`,
                },
                next:{tags:["getcategories"]}
            })
            const data = await res.json()

            return data

        }catch(e){
            return {
                message:e
            }
        }

    }
    return null
}