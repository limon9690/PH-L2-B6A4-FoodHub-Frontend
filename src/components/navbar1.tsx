"use client";

import { ShoppingCart } from "lucide-react";


import { Menu } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import Link from "next/link";
import { ModeToggle } from "./ui/mode-toggler";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useCartCount } from "@/helper/cart-count";

interface MenuItem {
  title: string;
  url: string;
}

interface Navbar1Props {
  className?: string;
  publicMenu?: MenuItem[];
  authNotLoggedIn?: {
    login: { title: string; url: string };
    signup: { title: string; url: string };
  };
  authLoggedIn?: {
    dashboard: { title: string; url: string };
    logout: { title: string; url: string }
  };
}

const Navbar1 = ({
  publicMenu = [
    { title: "FoodHub", url: "/" },
    { title: "Browse Meals", url: "/meals" },
    { title: "Browse Providers", url: "/providers" },
  ],
  authNotLoggedIn = {
    login: { title: "Login", url: "/login" },
    signup: { title: "Register", url: "/register" },
  },
  authLoggedIn = {
    dashboard: { title: "Dashboard", url: "/dashboard" },
    logout: { title: "Logout", url: "/" }
  },
  className,
}: Navbar1Props) => {

  const router = useRouter();

  const cartCount = useCartCount();

  const handleLogout = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/");
        },
      },
    });

    toast.success("Logged Out Successfully!");
  }

  const { data: session, isPending, error } = authClient.useSession();

  if (isPending) return null;

  let isloggedIn = false;

  if (session?.user) {
    isloggedIn = true;
  }
  if (isloggedIn && session?.user?.role === "USER") {
    publicMenu.push({ title: "Become A Provider", url: "/become-a-provider" });
  }



  return (
    <section className={cn("py-4", className)}>
      <div className="container px-4 sm:px-6 lg:px-8">
        {/* Desktop */}
        <nav className="hidden items-center justify-between lg:flex">
          <NavigationMenu>
            <NavigationMenuList>

              {
                publicMenu.map((item) => (
                  <NavigationMenuItem key={item.title}>
                    <NavigationMenuLink asChild>

                      <Link
                        href={item.url}
                        className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-muted hover:text-accent-foreground"
                      >
                        {item.title}
                      </Link>

                    </NavigationMenuLink>
                  </NavigationMenuItem>
                ))
              }

            </NavigationMenuList>
          </NavigationMenu>

          <div className="flex gap-2">

            {
              (session?.user?.role !== "PROVIDER" && session?.user?.role !== "ADMIN") && (
                <Button asChild variant="outline" size="icon" className="relative">
                  <Link href="/cart" aria-label="Cart">
                    <ShoppingCart className="h-4 w-4" />

                    {cartCount > 0 && (
                      <span
                        className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-destructive text-[10px] font-semibold text-white"
                      >
                        {cartCount > 9 ? "9+" : cartCount}
                      </span>
                    )}
                  </Link>
                </Button>
              )
            }

            {
              !isloggedIn ? (
                <><Button asChild variant="outline" size="sm">
                  <Link href={authNotLoggedIn.login.url}>{authNotLoggedIn.login.title}</Link>
                </Button>
                  <Button asChild size="sm">
                    <Link href={authNotLoggedIn.signup.url}>{authNotLoggedIn.signup.title}</Link>
                  </Button> </>
              ) : (
                <>
                  <Button asChild variant="outline" size="sm">
                    <Link href={authLoggedIn.dashboard.url}>{authLoggedIn.dashboard.title}</Link>
                  </Button>
                  <Button asChild size="sm" onClick={handleLogout}>
                    <Link href={authLoggedIn.logout.url}>{authLoggedIn.logout.title}</Link>
                  </Button>
                </>
              )
            }

            <ModeToggle />
          </div>

        </nav>

        {/* Mobile */}
        <div className="block lg:hidden">
          <div className="flex items-center justify-between">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" className="cursor-pointer" size="icon">
                  <Menu className="size-4" />
                </Button>
              </SheetTrigger>

              <SheetContent className="overflow-y-auto">
                <div className="flex flex-col gap-6 p-4">
                  <div className="flex flex-col gap-4">
                    <SheetTitle className="sr-only">Navigation menu</SheetTitle>


                    {publicMenu.map((item) => (
                      <Link
                        key={item.title}
                        href={item.url}
                        className="text-md font-semibold"
                      >
                        {item.title}
                      </Link>
                    ))}

                    <Link href="/cart" className="relative inline-flex items-center">
                      <Button variant="outline" className="cursor-pointer" size="icon">
                        <ShoppingCart className="size-4" />
                      </Button>

                      {cartCount > 0 && (
                        <span className="absolute -top-1 -right-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-destructive px-1 text-xs font-medium text-white">
                          {cartCount}
                        </span>
                      )}
                    </Link>

                  </div>

                  {
                    !isloggedIn ? (
                      <div className="flex flex-col gap-3">
                        <ModeToggle />
                        <Button asChild variant="outline">
                          <Link href={authNotLoggedIn.login.url}>{authNotLoggedIn.login.title}</Link>
                        </Button>
                        <Button asChild>
                          <Link href={authNotLoggedIn.signup.url}>{authNotLoggedIn.signup.title}</Link>
                        </Button>

                      </div>
                    ) : (
                      <div className="flex flex-col gap-3">
                        <ModeToggle />
                        <Button asChild variant="outline">
                          <Link href={authLoggedIn.dashboard.url}>{authLoggedIn.dashboard.title}</Link>
                        </Button>
                        <Button asChild onClick={handleLogout}>
                          <Link href={authLoggedIn.logout.url}>{authLoggedIn.logout.title}</Link>
                        </Button>

                      </div>
                    )
                  }

                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </section>
  );
};

export { Navbar1 };
