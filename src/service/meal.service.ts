export const mealService = {
    getAllMeals: async () => {
        const res = await fetch('http://localhost:5000/api/meals');

        return res.json();
    },

    getSingleMeal : async(mealId : string) => {
        const res = await fetch(`http://localhost:5000/api/meals/${mealId}`);

        return res.json();
    }
}
