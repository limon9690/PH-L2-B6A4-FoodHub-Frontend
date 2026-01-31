"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"


export function HeroSection() {
  return (
    <section className="border-b">
      <div className="container px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          {/* Left: Copy */}
          <div className="flex flex-col gap-5">
            {/* <Badge className="w-fit" variant="secondary">
              Fresh • Home-made • Delivered
            </Badge> */}

            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
              Home-cooked meals from local kitchens, delivered to you.
            </h1>

            <p className="text-base text-muted-foreground sm:text-lg">
              Discover meals made by trusted providers. Order in minutes — warm,
              tasty, and affordable.
            </p>

            {/* Actions */}
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <Button asChild size="lg" className="w-full sm:w-auto">
                <Link href="/meals">Browse meals</Link>
              </Button>

              <Button asChild size="lg" variant="outline" className="w-full sm:w-auto">
                <Link href="/providers">Browse Providers</Link>
              </Button>
            </div>

            {/* Micro trust row */}
            <div className="mt-2 flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted-foreground">
              <span>✓ Verified providers</span>
              <span>✓ Secure checkout</span>
              <span>✓ Honest reviews</span>
            </div>
          </div>

          {/* Right: Visual */}
          <div className="relative">
            <div className="overflow-hidden rounded-2xl border">
              <img
                src="https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?auto=format&fit=crop&w=1400&q=80"
                alt="Delicious meal"
                className="h-[320px] w-full object-cover sm:h-[380px]"
              />
            </div>

            {/* Overlay cards */}
            <div className="absolute -bottom-6 left-4 right-4 hidden sm:block">
              <div className="grid grid-cols-3 gap-3">
                <div className="rounded-xl border bg-background/90 p-3 backdrop-blur">
                  <p className="text-xs text-muted-foreground">Starting from</p>
                  <p className="text-lg font-semibold">$10</p>
                </div>
                <div className="rounded-xl border bg-background/90 p-3 backdrop-blur">
                  <p className="text-xs text-muted-foreground">Top cuisines</p>
                  <p className="text-lg font-semibold">Indian • Korean</p>
                </div>
                <div className="rounded-xl border bg-background/90 p-3 backdrop-blur">
                  <p className="text-xs text-muted-foreground">Providers</p>
                  <p className="text-lg font-semibold">Trusted kitchens</p>
                </div>
              </div>
            </div>
          </div>
          {/* end right */}
        </div>
      </div>
    </section>
  )
}
