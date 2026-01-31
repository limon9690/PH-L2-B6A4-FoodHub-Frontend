// "use client";

// import { useEffect, useState } from "react";

// export function useCartCount() {
//   const [count, setCount] = useState(0);

//   useEffect(() => {
//     const updateCount = () => {
//       const items = JSON.parse(localStorage.getItem("cartItems") || "[]");
//       const total = items.reduce(
//         (sum: number, item: any) => sum + item.quantity,
//         0
//       );
//       setCount(total);
//     };

//     updateCount();

//     // optional: listen to changes from other tabs
//     window.addEventListener("storage", updateCount);
//     return () => window.removeEventListener("storage", updateCount);
//   }, []);

//   return count;
// }

"use client";

import { useEffect, useState } from "react";

const CART_EVENT = "cart-updated";

export function useCartCount() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const updateCount = () => {
      const items = JSON.parse(localStorage.getItem("cartItems") || "[]");
      const total = items.reduce(
        (sum: number, item: any) => sum + item.quantity,
        0
      );
      setCount(total);
    };

    updateCount();

    // same tab updates
    window.addEventListener(CART_EVENT, updateCount);

    // other tab updates
    window.addEventListener("storage", updateCount);

    return () => {
      window.removeEventListener(CART_EVENT, updateCount);
      window.removeEventListener("storage", updateCount);
    };
  }, []);

  return count;
}
