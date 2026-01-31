"use server"

import { cookies } from "next/headers";

export async function getOrders() {
  const cookieStore = await cookies();

  const res = await fetch("http://localhost:5000/api/orders", {
    method: "GET",
    headers: {
      Cookie: cookieStore.toString(),
    },
    cache: "no-store",
  });

  return res.json();

}

export async function cancelOrder(orderId) {
  const cookieStore = await cookies();

  const res = await fetch(`http://localhost:5000/api/orders/cancel/${orderId}`, {
    method: "PUT",
    headers: {
      Cookie: cookieStore.toString(),
    },
    cache: "no-store",
  });

  return res.json();
}

export async function updateOrderStatus(orderId, data) {
  const cookieStore = await cookies();

  const res = await fetch(`http://localhost:5000/api/provider/orders/${orderId}`, {
    method: "PUT",
    headers: {
      Cookie: cookieStore.toString(),
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data),
    cache: "no-store",
  });

  return res.json();
}


export async function getOrderDetails(orderId) {
  const cookieStore = await cookies();

  const res = await fetch(`http://localhost:5000/api/orders/${orderId}`, {
    method: "GET",
    headers: {
      Cookie: cookieStore.toString(),
    },
    cache: "no-store",
  });

  return res.json();

}