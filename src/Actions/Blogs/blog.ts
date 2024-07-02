"use server"

import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server"
import axios from "axios"


interface ResponseData {
    message?: string;
    // Add other response fields if needed
}

export const getBlogs = async (token: string) => {
    const { getUser } = await getKindeServerSession()
    const user = await getUser()

    if (user) {
        try {
            const res = await fetch(process.env.BASE_URL! + "/getblogs", {
                method: "GET",
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
                next: { tags: ["getblogs"] }
            })
            const data = await res.json()

            return data

        } catch (e) {
            return {
                message: e
            }
        }

    }
    return null
}
export const getBlogsByCat = async (token: string, category: string) => {
    const { getUser } = await getKindeServerSession()
    const user = await getUser()



    if (user) {
        try {
            const res = await fetch(process.env.BASE_URL! + `/getblogbycat?categoryslug=${category}`, {
                method: "GET",
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
                next: { tags: ["getblogsbycat"] }
            })
            const data = await res.json()

            return data

        } catch (e) {
            return {
                message: e
            }
        }

    }
    return null
}

export const getBlogByUser = async (token: string, kinde_id: any) => {
    const { getUser } = await getKindeServerSession()
    const user = await getUser()

    if (user) {
        try {
            const res = await fetch(process.env.BASE_URL! + `/getBlogByuser?kinde_id=${kinde_id}`, {
                method: "GET",
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
                next: { tags: ["getblogsbykindeid"] }
            })
            const data = await res.json()

            return data

        } catch (e) {
            return {
                message: e
            }
        }

    }
    return null
}
export const getBlogById = async (token: string, id: number) => {
    const { getUser } = await getKindeServerSession()
    const user = await getUser()

    if (user) {
        try {
            const res = await fetch(process.env.BASE_URL! + `/getblog?id=${id}`, {
                method: "GET",
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
                next: { tags: ["getblogbyid"] }
            })
            const data = await res.json()

            return data

        } catch (e) {
            return {
                message: e
            }
        }

    }
    return null
}


export const postBlog = async (token: string, postData: FormData): Promise<ResponseData | null> => {
    const { getUser } = await getKindeServerSession();
    const user = await getUser();

    console.log(postData)

    if (user) {
        try {
            const res = await axios.post(`${process.env.BASE_URL}/createblog`, postData, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });
            if (res.status == 201) {
                const data = res.data;
                return data;
            }

            return null



        } catch (error) {
            console.error('Error posting blog:', error);
            return {
                message: error instanceof Error ? error.message : 'An unknown error occurred',
            };
        }
    }

    return null;
};
export const updateBlog = async (token: string, postData:any): Promise<ResponseData | null> => {
    const { getUser } = await getKindeServerSession();
    const user = await getUser();

    console.log('FormData:', postData);

    if (user) {
        try {
            const res = await axios.patch(`${process.env.BASE_URL}/updateblog`, {...postData}, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    // Axios will set the correct Content-Type for FormData automatically
                },
            });
            console.log('Response:', res); // Log the full response
            if (res.status === 201) {
                const data = res.data;
                return data;
            }
            return null;
        } catch (error) {
            if (axios.isAxiosError(error)) {
                console.error('Axios error:', error.response?.data);
            } else {
                console.error('Error updating blog:', error);
            }
            return {
                message: error instanceof Error ? error.message : 'An unknown error occurred',
            };
        }
    }

    return null;
};
export const deleteBlog = async (token: string, row: any): Promise<ResponseData | null> => {
    const { getUser } = await getKindeServerSession();
    const user = await getUser();



    if (user) {
        try {
            const res = await axios.delete(`${process.env.BASE_URL}/deleteblog`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
                params: {
                    id: row?.deletedata?.id
                }
            });
            if (res.status == 204) {
                const data = res.data;
                return data
            }

            return null



        } catch (error) {
            console.error('Error deleting blog:', error);
            return {
                message: error instanceof Error ? error.message : 'An unknown error occurred',
            };
        }
    }

    return null;
};
