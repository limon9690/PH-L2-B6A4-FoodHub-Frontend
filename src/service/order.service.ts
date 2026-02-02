"use server"
import { cookies } from "next/headers";

const url = process.env.NEXT_PUBLIC_API_URL ?? process.env.API_URL;

export const createOrder = async (data) => {
    const cookieStore = await cookies();
    let response = await fetch(`${url}/orders`, {
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

export const getOrder = async () => {
    const cookieStore = await cookies()
    let response = await fetch(`${url}/orders`, {
        method: 'GET',
        credentials: "include",
        headers: {
            Cookie: cookieStore.toString()
        }
    });

    response = await response.json();
    return response;
}

export const getOrderDetails = async (orderId) => {
    const cookieStore = await cookies()
    let response = await fetch(`${url}/orders/${orderId}`, {
        method: 'GET',
        credentials: "include",
        headers: {
            Cookie: cookieStore.toString()
        }
    });

    response = await response.json();
    return response;
}


