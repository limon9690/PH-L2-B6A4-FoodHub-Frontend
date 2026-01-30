import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ProviderMealCard } from "./meal-card-provider";
import {getMealsForCurrentProvider} from "./action"



export default async function MenuMangementPage() {

  const meals = await getMealsForCurrentProvider() ?? [];


  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Menus</h1>
          <p className="text-sm text-muted-foreground">
            Manage your meals
          </p>
        </div>



        <Button className="gap-2 cursor-pointer">
          <Link href="/dashboard/provider/menu/create-meal">
            Add meal
          </Link>
        </Button>

      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {meals.map((meal) => (
          <ProviderMealCard key={meal.id} mealDetails={meal} />
        ))}
      </div>
    </div>
  );
}
