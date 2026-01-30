'use client'
import { Button } from "@/components/ui/button"
import {
    Card,
    CardAction,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

import Link from "next/link";
import { toast } from "sonner";
import { DeleteDialogue } from "./delete-dialogue";

import { startTransition } from "react";
import { deleteMealAction } from "./action";



export function ProviderMealCard(props) {
    const meal = props.mealDetails;


    const handleDelete = () => {
        startTransition(async () => {
            try {
                await deleteMealAction(meal.id);
                toast.success("Meal deleted successfully!");
            } catch (e: any) {
                toast.error(e?.message ?? "Failed to delete meal");
            }
        });
    };

    return (
        <Card className="relative mx-auto w-full max-w-sm pt-0">
            <div className="absolute inset-0 z-30 aspect-video bg-black/35" />
            <img
                src={meal.image_url}
                alt="Meal Cover"
                className="relative z-20 aspect-video w-full object-cover "
            />
            <CardHeader>
                <CardAction>
                    <p>${meal.price}</p>
                </CardAction>
                <CardTitle>{meal.name}</CardTitle>
                <CardDescription>
                    {meal.details}
                </CardDescription>
            </CardHeader>
            <CardFooter className="flex flex-col gap-2">
                <Button asChild className="w-full">
                    <Link href={`/meals/${meal.id}`}>View Details</Link>
                </Button>

                <Button variant="outline" className="w-full cursor-pointer">
                    <Link href={`/dashboard/provider/menu/${meal.id}/edit-meal`}>Edit Meal</Link>
                </Button>

                <DeleteDialogue
                    trigger={
                        <Button variant="destructive" className="w-full cursor-pointer">
                            Delete Meal
                        </Button>
                    }
                    title=""
                    description=""
                    onConfirm={handleDelete}
                />



            </CardFooter>

        </Card>
    )
}
