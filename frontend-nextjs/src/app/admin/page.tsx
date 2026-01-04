"use client";

import React from "react";
import Navbar from "@/components/layout/Navbar";
import { LayoutDashboard, Package, ShoppingCart, Users, TrendingUp, DollarSign } from "lucide-react";
import { cn } from "@/lib/utils";

const AdminDashboard = () => {
    const stats = [
        { label: "Total Revenue", value: "$12,450", icon: DollarSign, color: "bg-green-500", trend: "+12.5%" },
        { label: "Total Orders", value: "1,240", icon: ShoppingCart, color: "bg-blue-500", trend: "+8.2%" },
        { label: "Active Users", value: "850", icon: Users, color: "bg-purple-500", trend: "+5.1%" },
        { label: "Inventory Items", value: "45", icon: Package, color: "bg-orange-500", trend: "Stable" },
    ];

    return (
        <main className="min-h-screen bg-muted/30">
            <Navbar />

            <div className="container mx-auto px-6 pt-32 pb-20">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-10">
                    <div>
                        <h1 className="text-3xl font-bold font-heading">Admin Dashboard</h1>
                        <p className="text-muted-foreground">Manage your ice cream empire from here.</p>
                    </div>
                    <div className="flex gap-4">
                        <button className="px-6 py-3 bg-white border rounded-2xl font-bold hover:bg-muted transition-all">Export Data</button>
                        <button className="px-6 py-3 bg-primary text-white rounded-2xl font-bold hover:bg-primary-dark transition-all">Add Product</button>
                    </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                    {stats.map((stat, i) => (
                        <div key={i} className="bg-white dark:bg-card p-8 rounded-[2rem] shadow-sm border border-transparent">
                            <div className="flex justify-between items-start mb-6">
                                <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center text-white", stat.color)}>
                                    <stat.icon className="w-6 h-6" />
                                </div>
                                <span className={cn("text-xs font-bold px-2 py-1 rounded-full",
                                    stat.trend.startsWith("+") ? "bg-green-100 text-green-600" : "bg-muted text-muted-foreground"
                                )}>
                                    {stat.trend}
                                </span>
                            </div>
                            <p className="text-muted-foreground text-sm font-medium mb-1">{stat.label}</p>
                            <h3 className="text-3xl font-bold font-heading">{stat.value}</h3>
                        </div>
                    ))}
                </div>

                {/* Tables / Recent Activity Placeholder */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div className="bg-white dark:bg-card rounded-[2rem] p-8 shadow-sm">
                        <h3 className="text-xl font-bold mb-6">Recent Orders</h3>
                        <div className="space-y-6">
                            {[1, 2, 3, 4].map((_, i) => (
                                <div key={i} className="flex items-center justify-between pb-6 border-b last:border-0 last:pb-0">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 bg-muted rounded-2xl flex items-center justify-center font-bold text-primary">#ORD</div>
                                        <div>
                                            <p className="font-bold">Order #123456</p>
                                            <p className="text-sm text-muted-foreground">2 mins ago • 3 Items</p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="font-bold">$45.00</p>
                                        <p className="text-[10px] text-green-500 font-bold uppercase tracking-wider">Paid</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="bg-white dark:bg-card rounded-[2rem] p-8 shadow-sm">
                        <h3 className="text-xl font-bold mb-6">Inventory Alerts</h3>
                        <div className="space-y-6">
                            {[
                                { name: "Strawberry Bliss", stock: 12, status: "Low" },
                                { name: "Vanilla Velvet", stock: 5, status: "Critical" },
                                { name: "Choco Chip", stock: 15, status: "Low" },
                                { name: "Mango Tango", stock: 8, status: "Low" }
                            ].map((item, i) => (
                                <div key={i} className="flex items-center justify-between">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 bg-primary/5 rounded-2xl flex items-center justify-center">
                                            <Package className="w-6 h-6 text-primary" />
                                        </div>
                                        <div>
                                            <p className="font-bold">{item.name}</p>
                                            <p className="text-sm text-muted-foreground">{item.stock} boxes remaining</p>
                                        </div>
                                    </div>
                                    <span className={cn("px-4 py-2 rounded-xl text-xs font-bold",
                                        item.status === "Critical" ? "bg-red-100 text-red-600" : "bg-orange-100 text-orange-600"
                                    )}>
                                        {item.status}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default AdminDashboard;
