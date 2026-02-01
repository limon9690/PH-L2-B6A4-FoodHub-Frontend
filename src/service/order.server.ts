import { cookies } from "next/headers";

export const orderServiceServer = {
    getOrderDetails: async (orderId: string) => {
        const cookieStore = await cookies();

        const res = await fetch(
            `http://localhost:5000/api/orders/${orderId}`,
            {
                method: "GET",
                headers: {
                    Cookie: cookieStore.toString(),
                },
                cache: "no-store",
            }
        );

        return res.json();
    },
    getProviderAddress: async (userId: string) => {
        const cookieStore = await cookies();

        const res = await fetch(
            `http://localhost:5000/api/addresses/${userId}`,
            {
                method: "GET",
                headers: {
                    Cookie: cookieStore.toString(),
                },
                cache: "no-store",
            }
        );

        return res.json();
    },
};
