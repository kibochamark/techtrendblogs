"use server"

import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import axios from "axios";

export type Data = {
    content: string;
    post_id: number;
    author_id: string;
}

export const postComment = async (token: string, posteddata: Data) => {
    const { getUser } = await getKindeServerSession();
    const user = await getUser();

    
    

    if (user) {
        try {
            const res = await axios.post(process.env.BASE_URL! + "/postcomment", posteddata, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });

            const data = await res.data;
            return data;

        } catch (e:any) {
          
            return {
                message: e.message
            };
        }
    }
    return null;
}
