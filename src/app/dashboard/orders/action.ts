"use server"
import { cookies } from "next/headers";

const url = process.env.API_URL ?? process.env.NEXT_PUBLIC_API_URL;

export async function getOrders() {
  const cookieStore = await cookies();
  console.log(url);

  const res = await fetch(`${url}/orders`, {
    method: "GET",
    headers: {
      Cookie: cookieStore.toString(),
    },
    cache: "no-store",
  });

  const data = await res.json();
  console.log(data);
  return data;

}

export async function cancelOrder(orderId) {
  const cookieStore = await cookies();

  const res = await fetch(`${url}/orders/cancel/${orderId}`, {
    method: "PUT",
    headers: {
      Cookie: cookieStore.toString(),
    },
    cache: "no-store",
  });

  const data = await res.json();
  return data;
}

export async function updateOrderStatus(orderId, data) {
  const cookieStore = await cookies();

  const res = await fetch(`${url}/provider/orders/${orderId}`, {
    method: "PUT",
    headers: {
      Cookie: cookieStore.toString(),
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data),
    cache: "no-store",
  });

  const result = await res.json();
  return result;
}


export async function getOrderDetails(orderId) {
  const cookieStore = await cookies();

  const res = await fetch(`${url}/orders/${orderId}`, {
    method: "GET",
    headers: {
      Cookie: cookieStore.toString(),
    },
    cache: "no-store",
  });

  const data = await res.json();
  return data;;

}