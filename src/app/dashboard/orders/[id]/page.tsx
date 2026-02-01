import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { orderService } from "@/service/order.service";
import { orderServiceServer } from "@/service/order.server";
import { userService } from "@/service/user.service";
import { providerService } from "@/service/providers.service";

export default async function OrderDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const {id} = await params;

  const orderDetails = await orderServiceServer.getOrderDetails(id);
  const userDetails = await userService.getUserDetails();
  const providerDetails = await providerService.getSingleProvider(orderDetails.providerId);
  const providerAddress = await orderServiceServer.getProviderAddress(providerDetails.userId);

  const order = {
    id: orderDetails.id,
    status: orderDetails.status,
    totalAmount: orderDetails.totalAmount,
    createdAt: orderDetails.createdAt,
    orderItems: orderDetails.orderItems
  };

  const user = { name: userDetails.name, email: userDetails.email }; 
  const provider = { name: providerDetails.shopName, phone: providerAddress.address, address: providerAddress.phone};

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold">Order Details</h1>
          <p className="text-sm text-muted-foreground">Order ID: {order.id}</p>
        </div>

        <Badge variant={order.status === "CANCELLED" ? "destructive" : "default"}>
          {order.status}
        </Badge>
      </div>

      {/* Top cards */}
      <div className="grid gap-4 md:grid-cols-2">
        {/* Order summary */}
        <div className="rounded-xl border p-4">
          <h2 className="font-semibold">Summary</h2>
          <Separator className="my-3" />

          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Placed on</span>
              <span>{new Date(order.createdAt).toLocaleString()}</span>
            </div>

            <div className="flex justify-between">
              <span className="text-muted-foreground">Total</span>
              <span className="font-semibold">${order.totalAmount}</span>
            </div>

          </div>
        </div>

        {/* Customer + provider */}
        <div className="rounded-xl border p-4">
          <h2 className="font-semibold">Customer & Provider</h2>
          <Separator className="my-3" />

          <div className="space-y-4 text-sm">
            <div>
              <p className="text-muted-foreground">Customer</p>
              <p className="font-medium">{user.name}</p>
              <p className="text-muted-foreground">{user.email}</p>
            </div>

            <div>
              <p className="text-muted-foreground">Provider</p>
              <p className="font-medium">{provider.name}</p>
              <p className="text-muted-foreground">{provider.phone}</p>
              <p className="text-muted-foreground">{provider.address}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Items */}
      <div className="rounded-xl border p-4">
        <h2 className="font-semibold">Items</h2>
        <Separator className="my-3" />

        <div className="space-y-3">
          {order.orderItems.map((it) => {
            const lineTotal = it.quantity * it.unitPriceSnapshot;
            return (
              <div key={it.id} className="flex items-center justify-between rounded-lg border p-3">
                <div>
                  <p className="font-medium">{it.mealNameSnapshot}</p>
                  <p className="text-sm text-muted-foreground">
                    Qty: {it.quantity} × ${it.unitPriceSnapshot}
                  </p>
                </div>
                <p className="font-semibold">${lineTotal}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Actions */}
      <div className="flex justify-end">
        <Button asChild>
          <Link href="/dashboard/orders">Back to Orders</Link>
        </Button>
      </div>
    </div>
  );
}
