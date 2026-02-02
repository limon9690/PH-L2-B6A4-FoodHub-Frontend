"use server"
import { cookies } from "next/headers";

const url = `${process.env.NEXT_PUBLIC_API_URL ?? process.env.API_URL}`;


export const getAllMeals = async (query) => {
    const qs = new URLSearchParams();
    if (query?.searchParam) {
        qs.set("searchParam", query.searchParam);
    }

    if (query?.categoryId) {
        qs.set("categoryId", query.categoryId);
    }

    const res = await fetch(`${url}/meals?${qs.toString()}`, { cache: "no-store" });

    const result = await res.json();
    return result;
}

export const getSingleMeal = async (mealId: string) => {
    const res = await fetch(`${url}/meals/${mealId}`);
    const data = await res.json();

    return data;
}


export const createMeal = async (data) => {
    const cookieStore = await cookies();
    let response = await fetch(`${url}/provider/meals`, {
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

export const updateMeal = async (data, mealId) => {
    const cookieStore = await cookies();
    let response = await fetch(`${url}/provider/meals/${mealId}`, {
        method: 'PUT',
        credentials: 'include',
        body: JSON.stringify(data),
        headers: {
            'Content-type': 'application/json',
            Cookie: cookieStore.toString()
        }
    })

    response = await response.json();
    return response;
}

export const deleteMeal = async (mealId) => {
    const cookieStore = await cookies();
    let response = await fetch(`${url}/provider/meals/${mealId}`, {
        method: 'DELETE',
        credentials: 'include',
        headers: {
            Cookie: cookieStore.toString()
        }
    })

    response = await response.json();
    return response;
}

