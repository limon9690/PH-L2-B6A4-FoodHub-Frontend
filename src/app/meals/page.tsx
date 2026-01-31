import { MealCard } from "@/components/meal-card";
import { mealService } from "@/service/meal.service"
import MealsControls from "./meal-controls";
import { categoryService } from "@/service/category.service";

type SearchParams = {
  searchParam? : string;
  categoryId? : string;
  minPrice? : number;
  maxPrice? : number;
  sortBy? : string;
  sortOrder? : string;
}

export default async function MealsPage({
  searchParams,
} : {
  searchParams : Promise<SearchParams>;
}) {

  const sp = await searchParams;

  const query = {
    searchParam : sp.searchParam ?? "",
    categoryId: sp.categoryId ?? "",
    minPirce : sp.minPrice ?? 1,
    maxPrice : sp.maxPrice ?? 100000,
    sortBy : sp.sortBy ?? "",
    sortOrder : sp.sortOrder ?? ""
  }

  const meals = await mealService.getAllMeals(query);
  const categories = await categoryService.getAllCategories();
  
  return (
        <section className="container py-10 px-4 sm:px-6 lg:px-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Explore Meals</h1>
        <p className="mt-2 text-muted-foreground">
          Fresh, home-made meals from trusted providers
        </p>
      </div>

      <MealsControls query = {query} categories = {categories}/>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {meals.data.map((meal) => (
          <MealCard key={meal.id} mealDetails={meal} />
        ))}
      </div>
    </section>
  )
}
