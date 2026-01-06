"use client";

import React from "react";
import Navbar from "@/components/layout/Navbar";
import { LayoutDashboard, Package, ShoppingCart, Users, TrendingUp, DollarSign } from "lucide-react";
import { cn } from "@/lib/utils";

const AdminDashboard = () => {
    const [stats, setStats] = React.useState<any>({ users: 0, orders: 0, payments: 0 });
    const [orders, setOrders] = React.useState<any[]>([]);
    const [inventory, setInventory] = React.useState<any[]>([]);
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        const fetchData = async () => {
            try {
                const [statsResp, ordersResp] = await Promise.all([
                    fetch('/api/admin/stats').then(r => r.json()),
                    fetch('/api/admin/orders').then(r => r.json())
                ]);
                setStats(statsResp || { users: 0, orders: 0, payments: 0 });
                setOrders(ordersResp || []);
                // inventory can be fetched from product service directly for now
                const prod = await fetch('/api/products').then(r => r.json()).catch(() => []);
                const alerts = (prod || []).filter((p: any) => p.inventory_count && p.inventory_count < 20).slice(0, 4).map((p: any) => ({ name: p.name, stock: p.inventory_count, status: p.inventory_count < 6 ? 'Critical' : 'Low' }));
                setInventory(alerts);
            } catch (e) {
                console.error('Failed to load admin data', e);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

n    return (
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
                    {[
                        { label: 'Users', value: stats.users, icon: Users, color: 'bg-purple-500' },
                        { label: 'Orders', value: stats.orders, icon: ShoppingCart, color: 'bg-blue-500' },
                        { label: 'Payments', value: stats.payments, icon: DollarSign, color: 'bg-green-500' },
                        { label: 'Inventory Items', value: inventory.length, icon: Package, color: 'bg-orange-500' },
                    ].map((stat, i) => (
                        <div key={i} className="bg-white dark:bg-card p-8 rounded-[2rem] shadow-sm border border-transparent">
                            <div className="flex justify-between items-start mb-6">
                                <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center text-white", stat.color)}>
                                    <stat.icon className="w-6 h-6" />
                                </div>
                                <span className={cn("text-xs font-bold px-2 py-1 rounded-full bg-muted text-muted-foreground")}>
                                    &nbsp;
                                </span>
                            </div>
                            <p className="text-muted-foreground text-sm font-medium mb-1">{stat.label}</p>
                            <h3 className="text-3xl font-bold font-heading">{stat.value}</h3>
                        </div>
                    ))}
                </div>

                {/* Tables / Recent Activity */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div className="bg-white dark:bg-card rounded-[2rem] p-8 shadow-sm">
                        <h3 className="text-xl font-bold mb-6">Recent Orders</h3>
                        <div className="space-y-6">
                            {loading ? (
                                <p>Loading...</p>
                            ) : orders.length === 0 ? (
                                <p>No recent orders</p>
                            ) : (
                                orders.map((o: any, i: number) => (
                                    <div key={i} className="flex items-center justify-between pb-6 border-b last:border-0 last:pb-0">
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 bg-muted rounded-2xl flex items-center justify-center font-bold text-primary">#ORD</div>
                                            <div>
                                                <p className="font-bold">Order #{o.id}</p>
                                                <p className="text-sm text-muted-foreground">{new Date(o.createdat ?? o.createdAt).toLocaleString()} • {/* TODO: items count */} </p>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <p className="font-bold">${(o.totalamount || o.totalAmount || 0).toFixed(2)}</p>
                                            <p className="text-[10px] text-green-500 font-bold uppercase tracking-wider">{(o.status || '').toUpperCase()}</p>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>

                    <div className="bg-white dark:bg-card rounded-[2rem] p-8 shadow-sm">
                        <h3 className="text-xl font-bold mb-6">Inventory Alerts</h3>
                        <div className="space-y-6">
                            {inventory.length === 0 ? (
                                <p>No inventory alerts</p>
                            ) : (
                                inventory.map((item, i) => (
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
                                ))
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default AdminDashboard;
