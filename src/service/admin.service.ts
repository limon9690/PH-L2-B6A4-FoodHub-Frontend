const url = process.env.NEXT_PUBLIC_API_URL ?? process.env.API_URL;;

export const adminService = {
    updateUserStatus: async function (userId, body) {
        const data = await fetch(`${url}/admin/users/${userId}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: "include",
            body: JSON.stringify(body),
        })

        const result = data.json();
        return result;
    }
}