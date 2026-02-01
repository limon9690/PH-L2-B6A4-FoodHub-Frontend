const url =   process.env.NEXT_PUBLIC_API_URL ?? process.env.API_URL;;

export const orderService = {
     createOrder : async(data) => {
     console.log(url);
        let response = await fetch(`${url}/orders`, {
            method: 'POST',
            credentials: "include",
            body: JSON.stringify(data),
            headers: {
                'Content-type' : 'application/json'
            }
        });

        response = await response.json();
        return response;
    },

    getOrder : async () => {
        let response = await fetch(`${url}/orders`, {
            method: 'GET',
            credentials: "include"
        });

        response = await response.json();
        return response;
    },

    getOrderDetails: async (orderId) => {
        let response = await fetch(`${url}/orders/${orderId}`, {
            method: 'GET',
            credentials: "include"
        });

        response = await response.json();
        return response;
    }
}
