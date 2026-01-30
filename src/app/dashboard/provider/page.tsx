// "use client";

// import * as React from "react";
// import { Button } from "@/components/ui/button";
// import { categoryService } from "@/service/category.service";
// import Link from "next/link";


// export default function MenuMangementPage() {
//     const [categories, setCategory] = React.useState([]);

//     React.useEffect(() => {
//         const load = async () => {
//             const data = await categoryService.getAllCategories();
//             setCategory(data);
//         }
//         load();
//     }, [])

//     console.log(categories);
//   return (
//     <div className="space-y-6">
//       {/* Header */}
//       <div className="flex items-center justify-between">
//         <div>
//           <h1 className="text-2xl font-semibold">Menus</h1>
//           <p className="text-sm text-muted-foreground">
//             Manage your meals
//           </p>
//         </div>


        
//             <Button className="gap-2 cursor-pointer">
//               <Link href="/dashboard/provider/menu/create-meal">
//               Add meal
//               </Link>
//             </Button>
         
//       </div>

//       {/* Placeholder for meals list */}
//       <div className="rounded-xl border bg-background p-6 text-sm text-muted-foreground">
//         Meals list will go here
//       </div>
//     </div>
//   );
// }
