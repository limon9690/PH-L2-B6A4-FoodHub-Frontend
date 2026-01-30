const url = "http://localhost:5000/api/categories";

export const categoryService = {
    getAllCategories : async () => {
        const res = await fetch(url);

        return res.json();
    }
}