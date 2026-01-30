"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { providerService } from "@/service/providers.service";
import { ProviderMealCard } from "./meal-card-provider";


export default function MenuMangementPage() {
  const [meals, setMeals] = React.useState([]);

  React.useEffect(() => {
    const load = async () => {
      const provider = await providerService.getSingleProviderByUserId();
      const result = await providerService.getSingleProvider(provider.id);

      setMeals(result.meals);
    };
    load();
  }, []);

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
