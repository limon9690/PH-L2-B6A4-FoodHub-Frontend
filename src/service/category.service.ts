const url = `${  process.env.NEXT_PUBLIC_API_URL ??
  process.env.API_URL}/categories`;

export const categoryService = {
    getAllCategories: async () => {
        const res = await fetch(url);

        return res.json();
    },
    createCategory: async (data) => {
        let response = await fetch(url, {
            method: 'POST',
            credentials: "include",
            body: JSON.stringify(data),
            headers: {
                'Content-type': 'application/json'
            }
        });

        response = await response.json();
        return response;
    },
    updateCategory: async (categoryId, data) => {
        let response = await fetch(`${url}/${categoryId}`, {
            method: 'PUT',
            credentials: "include",
            body: JSON.stringify(data),
            headers: {
                'Content-type': 'application/json'
            }
        });

        response = await response.json();
        return response;
    },
    deleteCategory: async (categoryId) => {
        let response = await fetch(`${url}/${categoryId}`, {
            method: 'DELETE',
            credentials: 'include',
        })

        response = await response.json();
        return response;
    }
}