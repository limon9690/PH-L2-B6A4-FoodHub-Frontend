"use server"

import { cookies } from "next/headers";

const url = process.env.NEXT_PUBLIC_API_URL ?? process.env.API_URL;

export const updateUserStatus = async function (userId, body) {
        const cookieStore = await cookies();
        const data = await fetch(`${url}/admin/users/${userId}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                Cookie : cookieStore.toString()
            },
            credentials: "include",
            body: JSON.stringify(body),
        })

        const result = await data.json();
        return result;
    }
