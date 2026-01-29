export const providerService = {
    getAllProviders: async () => {
        const res = await fetch('http://localhost:5000/api/providers');

        return res.json();
    },

    getSingleProvider : async(providerId : string) => {
        const res = await fetch(`http://localhost:5000/api/providers/${providerId}`);

        return res.json();
    }
}