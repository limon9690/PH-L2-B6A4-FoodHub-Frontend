"use server"

import { cookies } from "next/headers";

const url = `${process.env.NEXT_PUBLIC_API_URL ??
    process.env.API_URL}/categories`;

export const getAllCategories = async () => {
    const res = await fetch(url, { cache: "no-store" });
    const data = await res.json();
    return data;
}

// export const createCategory = async (data) => {
//         let response = await fetch(url, {
//             method: 'POST',
//             credentials: "include",
//             body: JSON.stringify(data),
//             headers: {
//                 'Content-type': 'application/json'
//             }
//         });

//         const res = await response.json();
//         return res;
//     }

export const createCategory = async (data) => {
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

    const res = await response.json();
    return res;
}

export const updateCategory = async (categoryId, data) => {
    const cookieStore = await cookies();
    let response = await fetch(`${url}/${categoryId}`, {
        method: 'PUT',
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

export const deleteCategory = async (categoryId) => {
    const cookieStore = await cookies();
    let response = await fetch(`${url}/${categoryId}`, {
        method: 'DELETE',
        credentials: 'include',
        headers: {
            Cookie: cookieStore.toString()
        }
    })

    response = await response.json();
    return response;
}