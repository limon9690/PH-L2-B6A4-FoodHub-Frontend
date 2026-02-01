"use client"
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Link from 'next/link';
import { Separator } from "@/components/ui/separator"
import { cartService } from '@/service/cart.service';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { authClient } from '@/lib/auth-client';
import { categoryService } from '@/service/category.service';

export default function MealDetailPage() {
  const { id } = useParams();
  const [meal, setMeal] = useState(null);
  const [loading, setLoading] = useState(true);

  const session = authClient.useSession();

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/meals/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setMeal(data);
      }).finally(() =>
        setLoading(false))
  }, [id]);

  const addToCartHandler = () => {
    cartService.addToCart(meal);
  }

  if (loading) return <div className="p-6">Loading...</div>;
  if (!meal) return <div className="p-6">Meal not found</div>;

  return (
    <section className="container py-8 px-4 sm:px-6 lg:px-12">
      <div className="grid gap-8 lg:grid-cols-2">
        <div className="overflow-hidden rounded-xl border">
          <img
            src={meal.image_url}
            alt={meal.name}
            className="aspect-video w-full object-cover"
          />
        </div>

        <div className="flex flex-col gap-4">
          <div className="flex items-start justify-between gap-4">
            <h1 className="text-3xl font-bold tracking-tight">{meal.name}</h1>
            <p className="text-2xl font-semibold text-primary">${meal.price}</p>
          </div>

          <p className="text-muted-foreground">{meal.details}</p>

          {/* Buttons */}
          {
            (session?.data?.user?.role !== "PROVIDER" && session?.data?.user?.role !== "ADMIN") && (
              <div className="mt-2 flex flex-col gap-3 sm:flex-row">
                <Button variant="link" className="w-full sm:w-auto cursor-pointer" onClick={addToCartHandler}>
                  Add to cart
                </Button>
                {/* <Button variant="link" className="w-full sm:w-auto cursor-pointer">Order now</Button> */}
              </div>
            )
          }

          <Separator className="my-4" />

          {/* Provider Card */}
          <div className="block">
            <Card className="transition hover:bg-muted/40">
              <CardContent className="flex items-center justify-between p-4">
                <div>
                  <p className="text-sm text-muted-foreground">Prepared by</p>
                  <p className="font-semibold">
                    {meal.provider.shopName}
                  </p>
                </div>

                <Button variant="link" size="sm">
                  <Link href={`/providers/${meal.providerId}`}>
                    View more from this provider →
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Reviews */}
      <div className="mt-12">
        <div className="mb-4 flex items-end justify-between">
          <h2 className="text-xl font-semibold">Reviews</h2>
          <p className="text-sm text-muted-foreground">
            {meal.reviews.length} total
          </p>
        </div>

        {(!meal.reviews || meal.reviews.length === 0) ? (
          <div className="rounded-lg border p-6 text-sm text-muted-foreground">
            No reviews yet.
          </div>
        ) : (
          <div className="space-y-4">
            {meal.reviews.map((review: any) => (
              <Card key={review.id}>
                <CardContent className="p-4">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="font-semibold">
                        {review.user?.name ?? "Anonymous"}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {new Date(review.createdAt).toLocaleDateString()}
                      </p>
                    </div>

                    {/* Rating (simple) */}
                    <div className="text-sm font-medium">
                      ⭐ {review.rating}/5
                    </div>
                  </div>

                  {review.comment && (
                    <p className="mt-3 text-sm text-muted-foreground">
                      {review.comment}
                    </p>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
