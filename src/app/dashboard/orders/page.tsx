import { OrderCard } from './order-card';
import {getOrders } from './action';

export default async function OrdersPage() {
    const orders = await getOrders() ?? [];
    console.log(orders);

    return (
        <section className="container py-10">
            <div className="mb-6">
                <h1 className="text-3xl font-bold">My Orders</h1>
                <p className="mt-2 text-muted-foreground">
                    Track your recent orders and view details.
                </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                { orders && (orders.map((order) => (
                    <OrderCard
                        key={order.id}
                        order={order}
                    />
                )))}
            </div>
        </section>
    )
}
