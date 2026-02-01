"use client"

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { orderService } from "@/service/order.service";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cancelOrder, updateOrderStatus } from "./action";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { EditOrderConfirmDialogue } from "./[id]/cancel-order-dialogue";

function formatDate(iso: string) {
  return new Date(iso).toLocaleString("en-US", {
    year: "numeric",
    month: "short",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function formatMoney(amount: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount);
}

const PROVIDER_STATUS_OPTIONS = [
  "ACCEPTED",
  "PREPARING",
  "READY",
  "DELIVERED",
  "CANCEL"
];

export function OrderCard({ order }) {
  const shortId = order.id.slice(0, 8).toUpperCase();
  const [orderDetails, setOrderDetails] = useState({});
  const [loading, setLoading] = useState(true);
  const [selectedStatus, setSelectedStatus] = useState(order.status);
  const [updating, setUpdating] = useState(false);

  const session = authClient.useSession();
  const user = session?.data?.user;
  const router = useRouter();

  useEffect(() => {
    const load = async () => {
      try {
        const data = await orderService.getOrderDetails(order.id);
        setOrderDetails(data);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);


  if (loading) return <div>Loading...</div>;

  const handleCancelOrder = async () => {
    const result = await cancelOrder(order.id);

    if (result?.error) {
      toast.error(result?.error?.message);
      return null;
    }

    toast.success('Order cancelled successfully!');
    router.refresh();
  }

  const handleUpdateStatus = async () => {
    setUpdating(true);
    const result = await updateOrderStatus(order.id, { status: selectedStatus });

    if (result?.error) {
      toast.error(result?.error?.message);
      return null;
    }

    toast.success("Order status updated successfully!");
    router.refresh();

    setUpdating(false);

  }

  return (
    <Card className="overflow-hidden">
      <CardHeader className="space-y-2">
        <div className="flex items-start justify-between gap-3">
          <div>
            <CardTitle className="text-lg">
              Order #{shortId}
            </CardTitle>
            <p className="text-sm text-muted-foreground">
              Placed on {formatDate(order.createdAt)}
            </p>
          </div>

          <Badge>
            {order.status}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Items */}
        <div className="space-y-1">
          <p className="text-sm font-medium">Items</p>
          <ul className="space-y-1 text-sm text-muted-foreground">
            {orderDetails.orderItems.map((it) => (
              <li key={it.id} className="flex justify-between gap-3">
                <span className="truncate">{it.mealNameSnapshot} -${it.unitPriceSnapshot}</span>
                <span className="shrink-0">×{it.quantity}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Total */}
        <div className="flex items-center justify-between rounded-md bg-muted/40 px-3 py-2">
          <span className="text-sm text-muted-foreground">Total</span>
          <span className="text-base font-semibold">{formatMoney(order.totalAmount)}</span>
        </div>
      </CardContent>


      <CardFooter className="flex flex-col gap-3">
        {/* Row 1: common actions */}
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-end">
          <Button asChild variant="outline">
            <Link href={`/dashboard/orders/${orderDetails.id}`}>View details</Link>
          </Button>

          {user?.role === "USER" && order.status === "PLACED" && (
            <EditOrderConfirmDialogue
              trigger={
                <Button
                  variant="destructive"
                  className="cursor-pointer"
                >
                  Cancel order
                </Button>
              }
              onConfirm={handleCancelOrder}
              description="This action cannot be undone. This will cancel the order permanently."
            />
          )}
        </div>

        {/* Row 2: provider actions */}
        {user?.role === "PROVIDER" && (order.status !== "CANCELLED" && order.status !== "DELIVERED") && (
          <div className="flex w-full flex-col gap-2 sm:flex-row sm:items-center sm:justify-end">
            <Select value={selectedStatus} onValueChange={setSelectedStatus}>
              <SelectTrigger className="w-full sm:w-64">
                <SelectValue placeholder="Update status" />
              </SelectTrigger>

              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Order Status</SelectLabel>
                  {PROVIDER_STATUS_OPTIONS.map((status) => (
                    <SelectItem key={status} value={status}>
                      {status}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>

            <EditOrderConfirmDialogue
              trigger={
                <Button
                  className="w-full sm:w-auto cursor-pointer"
                  disabled={selectedStatus === order.status || updating}
                >
                  {updating ? "Updating..." : "Update Status"}
                </Button>
              }
              onConfirm={handleUpdateStatus}
              description=""
            />
          </div>
        )}
      </CardFooter>


    </Card>
  );
}
