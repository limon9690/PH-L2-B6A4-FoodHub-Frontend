import Link from "next/link"
import { ShieldCheck, UtensilsCrossed, Star } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export function TrustSection() {
  return (
    <section className="border-t">
      <div className="container px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
            Why FoodHub?
          </h2>
          <p className="mt-2 text-muted-foreground">
            Simple, safe, and reliable home-cooked meals — from kitchens you can trust.
          </p>
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className="mt-1 rounded-md border p-2">
                  <ShieldCheck className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-semibold">Verified providers</h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Providers are reviewed before they can sell on FoodHub.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className="mt-1 rounded-md border p-2">
                  <UtensilsCrossed className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-semibold">Fresh, home-made meals</h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Cooked in small batches — warm, tasty, and made with care.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className="mt-1 rounded-md border p-2">
                  <Star className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-semibold">Honest reviews</h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Reviews are tied to real orders, so feedback stays trustworthy.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Button asChild>
            <Link href="/meals">Browse meals</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/providers">Browse providers</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
