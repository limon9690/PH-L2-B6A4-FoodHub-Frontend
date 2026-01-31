const url = "http://localhost:5000/api/meals";

export const mealService = {
    getAllMeals: async (query) => {
        const qs = new URLSearchParams();
        if (query?.searchParam) {
            qs.set("searchParam", query.searchParam);
        }

        if (query?.categoryId) {
            qs.set("categoryId", query.categoryId);
        }

        const res = await fetch(`http://localhost:5000/api/meals?${qs.toString()}`, {cache: "no-store"});

        const result = await res.json();
        return result;
    },

    getSingleMeal : async(mealId : string) => {
        const res = await fetch(`${url}/${mealId}`);

        return res.json();
    },

    createMeal : async(data) => {
        let response = await fetch("http://localhost:5000/api/provider/meals", {
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

    updateMeal : async (data, mealId ) => {
        let response = await fetch(`http://localhost:5000/api/provider/meals/${mealId}`, {
            method: 'PUT',
            credentials: 'include',
            body: JSON.stringify(data),
            headers: {
                'Content-type' : 'application/json'
            }
        })

        response = await response.json();
        return response;
    },

    deleteMeal : async (mealId) => {
        let response = await fetch(`http://localhost:5000/api/provider/meals/${mealId}`, {
            method: 'DELETE',
            credentials: 'include',
        })

        response = await response.json();
        return response;
    }
}
