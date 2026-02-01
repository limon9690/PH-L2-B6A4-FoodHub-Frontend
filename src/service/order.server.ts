import { cookies } from "next/headers";
const url =   process.env.NEXT_PUBLIC_API_URL ??
  process.env.API_URL;;

export const orderServiceServer = {
    getOrderDetails: async (orderId: string) => {
        const cookieStore = await cookies();

        const res = await fetch(
            `${url}/orders/${orderId}`,
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
            `${url}/addresses/${userId}`,
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
