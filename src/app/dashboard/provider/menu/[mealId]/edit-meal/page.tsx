import { mealService } from '@/service/meal.service';
import React from 'react'
import { UpdateMealForm } from './update-meal-form';

export default async function UpdateMealPage({
    params,
}: {
    params: { mealId: string };
}) {
    const { mealId } = await params;

    const meal = await mealService.getSingleMeal(mealId);
    return (
        <div>
            <UpdateMealForm
                submitLabel='Save Changes'
                initialValues={{
                    name: meal.name,
                    details: meal.details,
                    price: meal.price,
                    categoryId: meal.categoryId,
                    image_url: meal.image_url ?? "",
                    isAvailable: meal.isAvailable,
                }}
                mealId={mealId}
            />
        </div>
    )
}
