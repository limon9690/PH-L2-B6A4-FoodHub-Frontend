"use server"

import { cookies } from "next/headers";

const url = `${process.env.NEXT_PUBLIC_API_URL ?? process.env.API_URL}/providers`;

export const getAllProviders = async () => {
        const res = await fetch(url, { cache: "no-store" });
        const data = await res.json();
        return data;
    }

export const getSingleProvider = async(providerId : string) => {
        const res = await fetch(`${url}/${providerId}`);

        const data = await res.json();
        return data;
    }

export const getSingleProviderByUserId = async () => {
     const cookieStore = await cookies();    
    const res = await fetch(`${url}/me`, {
            method: 'GET',
            credentials: "include",
            headers: {
                Cookie: cookieStore.toString()
            }
        })

        const data = await res.json();
        return data;
    }

export const createProvider = async(data) => {
    const cookieStore = await cookies(); 
        const response = await fetch(url, {
            method: 'POST',
            credentials: "include",
            body: JSON.stringify(data),
            headers: {
                'Content-type' : 'application/json',
                Cookie: cookieStore.toString()
            }
        });

        const json = await response.json();
        return json;
    }
