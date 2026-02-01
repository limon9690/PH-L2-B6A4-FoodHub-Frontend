"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { authClient } from "@/lib/auth-client";
import { cartService } from "@/service/cart.service";
import Link from "next/link";

export function MealCard(props) {
  const meal = props.mealDetails;
  const session = authClient.useSession();

  const addToCartHandler = () => {
    cartService.addToCart(meal);
  }

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
      <CardFooter className="flex flex-col gap-5 sm:flex-row">
        <Link href={`/meals/${meal.id}`}>
          <Button className="w-full cursor-pointer">  View Details</Button>
        </Link>
        {
          session?.data?.user?.role === "USER" && (
            <Button className="cursor-pointer" onClick={addToCartHandler}>
              Add to Cart
            </Button>
          )
        }
      </CardFooter>
    </Card>
  )
}
