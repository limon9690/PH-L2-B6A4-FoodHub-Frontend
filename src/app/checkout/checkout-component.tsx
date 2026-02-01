"use client"

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { useEffect, useState } from "react";
import { cartService } from "@/service/cart.service";
import { orderService } from "@/service/order.service";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

type MealItem = {
    mealId: string;
    quantity: number;
}

export type CreateOrderRequest = {
    meals: MealItem[];
}


export function CheckoutComponent({ user, address }) {
    const router = useRouter();
    const [items, setItems] = useState([]);


    useEffect(() => {
        setItems(cartService.getCartItems());
    }, [])

    const total = items.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0,
    );

    const handleConfirmOrder = async () => {
        const requestBody: CreateOrderRequest = {
            meals: []
        };

        items.map(item => {
            let it: MealItem = {
                mealId: item.id,
                quantity: item.quantity
            }
            requestBody.meals.push(it);
        })

        let sameProvider = "";

        items.map(it => {
            if (sameProvider === "") {
                sameProvider = it.providerId;
            }

            if (sameProvider !== it.providerId) {
                toast.error("Right now you can only order form one provider at a time");
                return;
            }
        }
        )

        const result = await orderService.createOrder(requestBody);

        if (result?.error) {
            toast.error(result?.error?.message);
            return;
        }

        toast.success("Order placed successfully!");
        cartService.clearCart();
        router.push('/dashboard/orders');
    }

    return (
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
                    <p>Address: {address.address}</p>
                    <p>
                        Phone: {address.phone}
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
                        <span>{total}</span>
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
                <Button variant="outline" className="cursor-pointer">
                    <Link href="/cart">
                        Modify Cart
                    </Link>
                </Button>

                <Button size="lg" className="cursor-pointer" onClick={handleConfirmOrder}>
                    Confirm Order
                </Button>
            </div>
        </div>
    )
}
