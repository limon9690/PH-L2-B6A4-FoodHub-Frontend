import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { providerService } from '@/service/providers.service'
import Link from 'next/link'

export default async function ProvidersPage() {
    const providers = await providerService.getAllProviders();
    console.log(providers);
    return (
        <section className="container py-10 px-4 sm:px-6 lg:px-12">
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold tracking-tight">Explore Providers</h1>
                <p className="mt-2 text-muted-foreground">
                    Choose a kitchen and explore their meals
                </p>
            </div>

            {/* Grid */}
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {providers.map((p) => (
                    <Card key={p.id} className="transition hover:shadow-md">
                        <CardContent className="p-5">
                            <div className="flex items-start justify-between gap-3">
                                <div>
                                    <h3 className="text-lg font-semibold">{p.shopName}</h3>

                                    {p.user?.address?.address && (
                                        <p className="mt-1 text-sm text-muted-foreground">
                                           Address: {p.user.address.address}
                                        </p>
                                    )}

                                    {p.user?.address?.phone && (
                                        <p
                                            className="mt-3 inline-block text-sm font-medium text-muted-foreground"
                                        >
                                            Phone: {p.user?.address?.phone}
                                        </p>
                                    )}
                                </div>
                            </div>

                            <div className="mt-5">
                                <Button asChild variant="outline" className="w-full">
                                    <Link href={`/providers/${p.id}`}>View shop</Link>
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </section>
    )
}
