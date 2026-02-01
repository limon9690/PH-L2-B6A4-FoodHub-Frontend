import { cookies } from "next/headers";
const url = process.env.NEXT_PUBLIC_API_URL ?? process.env.API_URL;;


export const userService = {
  getSession: async function () {
    try {
      const cookieStore = await cookies();

      const res = await fetch(`${url}/auth/get-session`, {
        headers: {
          Cookie: cookieStore.toString(),
        },
        cache: "no-store",
      });

      const session = await res.json();

      if (session === null) {
        return { data: null, error: { message: "Session is missing." } };
      }

      return { data: session, error: null };
    } catch (err) {
      console.error(err);
      return { data: null, error: { message: "Something Went Wrong" } };
    }
  },

  getUserDetails: async function () {
    const session = await userService.getSession();
    return session?.data?.user;
  },

  getUserAddress: async function (userId) {
    const cookieStore = await cookies();
    const data = await fetch(`${url}/addresses`, {
      headers: {
        Cookie: cookieStore.toString()
      },
      cache: "no-store"
    })

    const result = data.json();
    return result;
  },

  getAllUsers: async function () {
    const cookieStore = await cookies();
    const data = await fetch(`${url}/admin/users`, {
      headers: {
        Cookie: cookieStore.toString()
      },
      cache: "no-store"
    })

    const result = data.json();
    return result;
  },
};

