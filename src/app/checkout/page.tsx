"use client";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

const CheckoutPage = () => {
    // mock data for now (replace later)
    const user = {
        name: "John Doe",
        email: "john@example.com",
        phone: "+1 234 567 890",
    };

    const address = {
        line1: "123 Main Street",
        city: "New York",
        state: "NY",
        zip: "10001",
    };

    const total = 46.0;

    return (
        <section className="flex min-h-screen items-center justify-center bg-muted/40 px-4">
            <div className="container max-w-3xl space-y-6">
                {/* Page Title */}
                <h1 className="text-3xl font-semibold">Checkout</h1>

                {/* Customer Info */}
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between">
                        <CardTitle>Customer Information</CardTitle>
                        <Button variant="outline" size="sm" className="cursor-pointer">
                            <Link href="/dashboard/profile">
                                Edit
                            </Link>
                        </Button>
                    </CardHeader>

                    <CardContent className="text-sm text-muted-foreground space-y-1">
                        <p><strong>Name:</strong> {user.name}</p>
                        <p><strong>Email:</strong> {user.email}</p>
                        <p><strong>Phone:</strong> {user.phone}</p>
                    </CardContent>
                </Card>

                {/* Address */}
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between">
                        <CardTitle>Delivery Address</CardTitle>
                        <Button variant="outline" size="sm" className="cursor-pointer">
                            <Link href="/dashboard/profile">
                                Edit
                            </Link>
                        </Button>
                    </CardHeader>

                    <CardContent className="text-sm text-muted-foreground space-y-1">
                        <p>{address.line1}</p>
                        <p>
                            {address.city}, {address.state} {address.zip}
                        </p>
                    </CardContent>
                </Card>

                {/* Order Summary */}
                <Card>
                    <CardHeader>
                        <CardTitle>Order Summary</CardTitle>
                    </CardHeader>

                    <CardContent className="space-y-4">
                        <div className="flex justify-between text-sm">
                            <span>Subtotal</span>
                            <span>$46.00</span>
                        </div>

                        <div className="flex justify-between text-sm">
                            <span>Delivery</span>
                            <span>Free</span>
                        </div>

                        <Separator />

                        <div className="flex justify-between text-lg font-semibold">
                            <span>Total</span>
                            <span>${total.toFixed(2)}</span>
                        </div>
                    </CardContent>
                </Card>

                {/* Actions */}
                <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
                    <Button variant="outline">
                        Modify Cart
                    </Button>

                    <Button size="lg">
                        Confirm Order
                    </Button>
                </div>
            </div>
        </section>
    );
};

export default CheckoutPage;
