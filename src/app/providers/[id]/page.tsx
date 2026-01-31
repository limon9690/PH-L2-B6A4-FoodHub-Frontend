import { MealCard } from '@/components/meal-card';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { providerService } from '@/service/providers.service';
import Link from 'next/link';

export default async function ProviderDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
    const {id} = await params;
    const provider = await providerService.getSingleProvider(id);
    const meals = await provider.meals;
    console.log(provider);
  return (
    <section className="container py-10 px-4 sm:px-6 lg:px-12">
      {/* Provider Info */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-2xl">{provider.shopName}</CardTitle>
        </CardHeader>

        <CardContent className="flex flex-col gap-3">
          {provider.user?.address?.address && (
            <div>
              <p className="text-sm text-muted-foreground">Address</p>
              <p className="font-medium">{provider.user?.address?.address}</p>
            </div>
          )}

          {provider.user?.address?.phone && (
            <div>
              <p className="text-sm text-muted-foreground">Phone</p>
              <p
                className="font-medium"
              >
                {provider.user?.address?.phone}
              </p>
            </div>
          )}

          <div className="pt-2">
            <Button asChild variant="outline" size="sm">
              <Link href="/providers">← Back to providers</Link>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Meals */}
      <div className="mt-10">
        <div className="mb-5 flex items-end justify-between">
          <h2 className="text-xl font-semibold">Meals by this provider</h2>
          <p className="text-sm text-muted-foreground">{meals.length} meals</p>
        </div>

        {meals.length === 0 ? (
          <div className="rounded-lg border p-8 text-sm text-muted-foreground">
            No meals available from this provider yet.
          </div>
        ) : (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {meals.map((meal: any) => (
              <MealCard key={meal.id} mealDetails={meal} />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
