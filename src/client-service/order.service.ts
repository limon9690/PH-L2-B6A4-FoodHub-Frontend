export const orderService = {
     createOrder : async(data) => {
        let response = await fetch("http://localhost:5000/api/orders", {
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
}