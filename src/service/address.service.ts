const url = `${  process.env.NEXT_PUBLIC_API_URL ??
  process.env.API_URL}/categories`;

export const addressService = {
    getUserAddress : async() => {
        const res = await fetch(url,
            {
                method: 'GET',
                credentials: "include"
            }
        );

        return res.json();
    },

    createAddress : async(data) => {
        let response = await fetch(url, {
            method: 'POST',
            credentials: "include",
            body: JSON.stringify(data),
            headers: {
                'Content-type' : 'application/json'
            }
        });

        response = await response.json();
        return response;
    }
}