"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, ShoppingBag, ShoppingCart, User, Search, Menu } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useCartStore } from "@/store/useCartStore";

const Navbar = () => {
    const pathname = usePathname();
    const items = useCartStore((state) => state.items);
    const cartCount = items.reduce((acc, item) => acc + item.quantity, 0);
    const [isLoggedIn, setIsLoggedIn] = React.useState(false);
    const [userInitial, setUserInitial] = React.useState<string | null>(null);

    React.useEffect(() => {
        const token = localStorage.getItem("token");
        setIsLoggedIn(!!token);
        if (token) {
            // Fetch minimal user info to display initial (via API Gateway -> Auth Service)
            import("@/lib/api").then(async ({ authApi }) => {
                try {
                    const data: any = await authApi.me();
                    if (data && data.email) {
                        setUserInitial((data.email as string)[0].toUpperCase());
                    }
                    // Refresh cart from server when user is authenticated
                    const cartStore = (await import("@/store/useCartStore")).useCartStore;
                    if (cartStore && cartStore.getState) {
                        await cartStore.getState().refreshFromServer();
                    }
                } catch (e) {
                    // silent fail
                }
            });
        }
    }, []);

    const navItems = [
        { name: "Home", href: "/", icon: Home },
        { name: "Catalog", href: "/catalog", icon: ShoppingBag },
        { name: "Cart", href: "/cart", icon: ShoppingCart },
        { name: "Profile", href: "/profile", icon: User },
    ];

    return (
        <>
            {/* Desktop Navbar */}
            <nav className="fixed top-0 left-0 right-0 z-50 hidden md:block border-b bg-background/80 backdrop-blur-md">
                <div className="container mx-auto px-6 h-20 flex items-center justify-between">
                    <Link href="/" className="flex items-center gap-2">
                        <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                            <span className="text-white font-bold text-xl">I</span>
                        </div>
                        <span className="text-2xl font-bold font-heading tracking-tight">
                            IceCream <span className="text-primary">Store</span>
                        </span>
                    </Link>

                    <div className="flex items-center gap-8">
                        {navItems.map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={cn(
                                    "text-sm font-medium transition-colors hover:text-primary",
                                    pathname === item.href ? "text-primary" : "text-muted-foreground"
                                )}
                            >
                                {item.name}
                            </Link>
                        ))}
                    </div>

                    <div className="flex items-center gap-4">
                        <button className="p-2 hover:bg-muted rounded-full transition-colors">
                            <Search className="w-5 h-5" />
                        </button>
                        <Link href="/cart" className="relative p-2 hover:bg-muted rounded-full transition-colors">
                            <ShoppingCart className="w-5 h-5" />
                            {cartCount > 0 && (
                                <span className="absolute top-0 right-0 w-4 h-4 bg-primary text-[10px] text-white rounded-full flex items-center justify-center">
                                    {cartCount}
                                </span>
                            )}
                        </Link>
                        {isLoggedIn ? (
                            <Link href="/profile">
                                <div className="w-10 h-10 bg-primary/10 text-primary rounded-full flex items-center justify-center font-bold">
                                    {userInitial || 'U'}
                                </div>
                            </Link>
                        ) : (
                            <Link href="/login">
                                <button className="px-6 py-2 bg-primary text-white rounded-full font-semibold hover:bg-primary-dark transition-all transform hover:scale-105">
                                    Login
                                </button>
                            </Link>
                        )}
                    </div>
                </div>
            </nav>

            {/* Mobile Navbar (Bottom) */}
            <nav className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-background/90 backdrop-blur-lg border-t px-6 py-3">
                <div className="flex items-center justify-between">
                    {navItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = pathname === item.href;
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className="flex flex-col items-center gap-1 group"
                            >
                                <div className={cn(
                                    "p-2 rounded-2xl transition-all",
                                    isActive ? "bg-primary text-white" : "text-muted-foreground group-hover:text-primary"
                                )}>
                                    <Icon className="w-6 h-6" />
                                </div>
                                <span className={cn(
                                    "text-[10px] font-medium",
                                    isActive ? "text-primary" : "text-muted-foreground"
                                )}>
                                    {item.name}
                                </span>
                                {isActive && (
                                    <motion.div
                                        layoutId="activeTab"
                                        className="absolute -top-3 w-1 h-1 bg-primary rounded-full"
                                    />
                                )}
                            </Link>
                        );
                    })}
                </div>
            </nav>
        </>
    );
};

export default Navbar;
