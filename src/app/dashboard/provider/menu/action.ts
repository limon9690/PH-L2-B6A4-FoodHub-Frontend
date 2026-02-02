"use server"
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

const url = process.env.API_URL;

export async function getMealsForCurrentProvider() {
    const cookieStore = await cookies();

    const provider = await fetch(`${url}/providers/me`, {
        headers: {
            Cookie: cookieStore.toString(),
        },
        cache: "no-store",
    });

    const providerData = await provider.json();

    const data = await fetch(`${url}/providers/${providerData.id}`, {
        headers: {
            Cookie: cookieStore.toString(),
        },
        cache: "no-store",
    });

    const result = await data.json();

    return result.meals;
}

export async function deleteMealAction(mealId: string) {
    const cookieStore = await cookies();

    const res = await fetch(`${url}/provider/meals/${mealId}`, {
        method: "DELETE",
        headers: {
            Cookie: cookieStore.toString(),
        },
        cache: "no-store",
    });

    revalidatePath("/dashboard/provider/menu");
}