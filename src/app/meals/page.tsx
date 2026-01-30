import { MealCard } from "@/components/meal-card";
import { mealService } from "@/client-service/meal.service"

export default async function MealsPage() {
  const meals = await mealService.getAllMeals();
  
  return (
        <section className="container py-10 px-4 sm:px-6 lg:px-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Explore Meals</h1>
        <p className="mt-2 text-muted-foreground">
          Fresh, home-made meals from trusted providers
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {meals.data.map((meal) => (
          <MealCard key={meal.id} mealDetails={meal} />
        ))}
      </div>
    </section>
  )
}
