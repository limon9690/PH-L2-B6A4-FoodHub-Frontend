"use client";

import * as React from "react";
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

  const handleLogout = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/");
          router.refresh();
        },
      },
    });

    toast.success("Logged Out Successfully!");
  }

  const { data: session, isPending, error } = authClient.useSession();
  let isloggedIn = false;

  if (session?.user) {
    isloggedIn = true;
    publicMenu.push({ title: "Become A Provider", url: "/providers" })
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

          {
            !isloggedIn ? (
              <div className="flex gap-2">
                <Button asChild variant="outline" size="sm">
                  <Link href={authNotLoggedIn.login.url}>{authNotLoggedIn.login.title}</Link>
                </Button>
                <Button asChild size="sm">
                  <Link href={authNotLoggedIn.signup.url}>{authNotLoggedIn.signup.title}</Link>
                </Button>

                <ModeToggle />
              </div>
            ) : (
              <div className="flex gap-2">
                <Button asChild variant="outline" size="sm">
                  <Link href={authLoggedIn.dashboard.url}>{authLoggedIn.dashboard.title}</Link>
                </Button>
                <Button asChild size="sm" onClick={handleLogout}>
                  <Link href={authLoggedIn.logout.url}>{authLoggedIn.logout.title}</Link>
                </Button>

                <ModeToggle />
              </div>
            )
          }


        </nav>

        {/* Mobile */}
        <div className="block lg:hidden">
          <div className="flex items-center justify-between">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon">
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
