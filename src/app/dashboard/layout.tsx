'use client'
import { useEffect, useState, type ReactNode } from "react";
import { Separator } from "@/components/ui/separator";
import { authClient } from "@/lib/auth-client";
import Link from "next/link";

type OptionType = {
    id: number;
    path: string;
    label: string;
}

const optionsByRole = {
    admin: [
        { id: 1, path: '/dashboard', label: 'Overview' },
        { id: 2, path: '/dashboard/orders', label: 'View All Orders' },
        { id: 3, path: '/dashboard/admin/users', label: 'Manage Users' },
        { id: 4, path: '/dashboard/admin/categories', label: 'Manage Categories' },
    ],
    user: [
        { id: 1, path: '/dashboard', label: 'Overview' },
        { id: 2, path: '/dashboard/profile', label: 'My Profile' },
        { id: 3, path: '/dashboard/orders', label: 'My Orders' },
    ],
    provider: [
        { id: 1, path: '/dashboard', label: 'Overview' },
        { id: 2, path: '/dashboard/profile', label: 'Manage Profile' },
        { id: 3, path: '/dashboard/orders', label: 'Manage Orders' },
        { id: 4, path: '/dashboard/provider/menu', label: 'Manage Menu' },
        { id: 5, path: '/dashboard/statistics', label: 'Statistics' }
    ],
};

export default function DashboardLayout({ children }: { children: ReactNode }) {

    const { data: session } = authClient.useSession();
    let options: OptionType[] = [];

    const [mounted, setMounted] = useState(false);
    useEffect(() => setMounted(true), []);

    const user = session?.user;
    const role = mounted ? user?.role : null;

    if (user) {
        if (role === "USER") {
            options = optionsByRole.user;
        } else if (role === "PROVIDER") {
            options = optionsByRole.provider;
        } else {
            options = optionsByRole.admin;
        }
    }

    return (
        <div className="w-full">
            <div className="mx-auto max-w-7xl px-4 py-6">
                <div className="flex gap-6">
                    {/* Sidebar */}
                    <aside className="w-64 shrink-0">
                        <div className="rounded-xl border bg-background">
                            <div className="px-4 py-4">
                                <div className="text-lg font-semibold leading-none">
                                    Dashboard
                                </div>
                                <div className="mt-1 text-sm text-muted-foreground">
                                    {role ?? " "}
                                </div>
                            </div>

                            <Separator />

                            <nav className="p-2">
                                {
                                    !mounted ? (
                                        <div className="px-3 py-2 text-sm text-muted-foreground">
                                            Loading…
                                        </div>
                                    ) : (
                                        options.map(opt => (
                                            <Link key={opt.id}
                                                href={opt.path}
                                                className="block rounded-lg px-3 py-2 text-sm hover:bg-muted"
                                            >
                                                {opt.label}
                                            </Link>
                                        )))
                                }
                            </nav>
                        </div>
                    </aside>

                    {/* Content area */}
                    <main className="flex-1">
                        <div className="rounded-xl border bg-background p-4 md:p-6">
                            {children}
                        </div>
                    </main>
                </div>
            </div>
        </div>
    );
}
