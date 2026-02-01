"use client";

import { X } from "lucide-react";
import { useEffect, useState } from "react";

import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { cartService } from "@/service/cart.service";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface CartItem {
  id: string;
  name: string;
  image_url: string;
  price: number;
  quantity: number;
}


const ShoppingCart = () => {
  const [items, setItems] = useState([]);

  const session = authClient.useSession();

  const removeItem = (id: string) => {
    cartService.removeFromCart(id);
    setItems(cartService.getCartItems());
  };

  useEffect(() => {
    setItems(cartService.getCartItems());
  }, [])

  const subtotal = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(price);
  };

  const router = useRouter();

  const handleCheckoutButton = () => {
    if (!session?.data) {
      router.push("/login");
      return;
    }

    if (session?.data) {
      if (session?.data?.user?.role !== "USER") {
        toast.error("Only customers can place orders!");
        router.push("/dashboard");
        return;
      }
    }

    router.push('/checkout');
  }


  if (items.length === 0) {
    return (
      <section className="py-32">
        <div className="container max-w-lg text-center">
          <h1 className="mb-4 text-2xl font-semibold">Your cart is empty</h1>
          <p className="mb-8 text-muted-foreground">
            Looks like you haven't added anything yet.
          </p>
          <Button asChild className="cursor-pointer">
            <Link href="/meals">Continue Shopping</Link>
          </Button>
        </div>
      </section>
    );
  }

  return (
    <section className="py-32">
      <div className="container max-w-2xl">
        <h1 className="mb-8 text-3xl font-semibold">Shopping Cart</h1>

        <div className="space-y-4">
          {items.map((item) => (
            <div
              key={item.id}
              className="flex items-center gap-4 rounded-lg border p-4"
            >
              <div className="w-20 shrink-0">
                <AspectRatio ratio={1} className="overflow-hidden rounded-md">
                  <img
                    src={item.image_url}
                    alt={item.name}
                    className="size-full object-cover"
                  />
                </AspectRatio>
              </div>

              <div className="flex-1">
                <h3 className="font-medium">{item.name}</h3>
                <p className="text-sm text-muted-foreground">
                  Qty: {item.quantity}
                </p>
              </div>

              <div className="text-right">
                <p className="font-semibold">
                  {formatPrice(item.price * item.quantity)}
                </p>
              </div>

              <Button
                variant="ghost"
                size="icon"
                className="shrink-0 cursor-pointer"
                onClick={() => removeItem(item.id)}
              >
                <X className="size-4" />
              </Button>
            </div>
          ))}
        </div>

        <Separator className="my-6" />

        <div className="space-y-4">
          <div className="flex justify-between text-lg font-semibold">
            <span>Total</span>
            <span>{formatPrice(subtotal)}</span>
          </div>

          <Button size="lg" className="w-full cursor-pointer" onClick={handleCheckoutButton}>
            Checkout
          </Button>
        </div>
      </div>
    </section>
  );
};

export { ShoppingCart };
