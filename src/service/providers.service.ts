const url = `${process.env.NEXT_PUBLIC_API_URL ?? process.env.API_URL}/providers`;

export const providerService = {
    getAllProviders: async () => {
        const res = await fetch(url);

        return res.json();
    },

    getSingleProvider : async(providerId : string) => {
        const res = await fetch(`${url}/${providerId}`);

        return res.json();
    },

    getSingleProviderByUserId : async () => {
        const res = await fetch(`${url}/me`, {
            method: 'GET',
            credentials: "include"
        })

        return res.json();
    },

    createProvider : async(data) => {
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