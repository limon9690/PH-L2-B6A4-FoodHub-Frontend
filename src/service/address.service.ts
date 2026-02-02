"use server"
import { cookies } from "next/headers";

const url = `${process.env.NEXT_PUBLIC_API_URL ??
    process.env.API_URL}/addresses`;



export const getUserAddress = async () => {
    const cookieStore = await cookies();
    const res = await fetch(url,
        {
            method: 'GET',
            credentials: "include",
            headers: {
                Cookie: cookieStore.toString()
            },
        },

    );
    const data = await res.json();
    return data;
}

export const createAddress = async (data) => {
    const cookieStore = await cookies();
    let response = await fetch(url, {
        method: 'POST',
        credentials: "include",
        body: JSON.stringify(data),
        headers: {
            'Content-type': 'application/json',
            Cookie: cookieStore.toString()
        }
    });

    response = await response.json();
    return response;
}

