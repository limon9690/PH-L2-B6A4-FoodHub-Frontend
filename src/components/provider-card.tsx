import React from 'react'
import { Card, CardContent } from './ui/card'
import { Button } from './ui/button'
import Link from 'next/link';

export default function ProviderCard(props) {
    const {providerDetails} = props;
    return (
        <Card key={providerDetails.id} className="transition hover:shadow-md">
            <CardContent className="p-5">
                <div className="flex items-start justify-between gap-3">
                    <div>
                        <h3 className="text-lg font-semibold">{providerDetails.shopName}</h3>

                        {providerDetails.user?.address?.address && (
                            <p className="mt-1 text-sm text-muted-foreground">
                                Address: {providerDetails.user.address.address}
                            </p>
                        )}

                        {providerDetails.user?.address?.phone && (
                            <p
                                className="mt-3 inline-block text-sm font-medium text-muted-foreground"
                            >
                                Phone: {providerDetails.user?.address?.phone}
                            </p>
                        )}
                    </div>
                </div>

                <div className="mt-5">
                    <Button  className="w-full">
                        <Link href={`/providers/${providerDetails.id}`} className='cursor-pointer'>View shop</Link>
                    </Button>
                </div>
            </CardContent>
        </Card>
    )
}
