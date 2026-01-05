"use client";

import React, { useEffect, useState } from "react";
import Navbar from "@/components/layout/Navbar";
import { Package, Calendar, MapPin, CheckCircle2, Clock } from "lucide-react";
import { orderApi } from "@/lib/api";
import { motion } from "framer-motion";
import Link from "next/link";

const Orders = () => {
    const [orders, setOrders] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const email = localStorage.getItem("userEmail") || "guest@example.com";
                const data = await orderApi.getUserOrders(email);
                setOrders(data);
            } catch (error) {
                console.error("Failed to fetch orders:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchOrders();
    }, []);

    return (
        <main className="min-h-screen pb-24 md:pb-12 bg-muted/20">
            <Navbar />

            <div className="container mx-auto px-6 pt-32">
                <div className="max-w-4xl mx-auto">
                    <h1 className="text-4xl md:text-6xl font-bold font-heading mb-4">My Orders</h1>
                    <p className="text-muted-foreground mb-12">Track your scoops and sweetness.</p>

                    {loading ? (
                        <div className="space-y-6">
                            {[1, 2, 3].map((i) => (
                                <div key={i} className="h-48 bg-white dark:bg-card rounded-[2.5rem] animate-pulse" />
                            ))}
                        </div>
                    ) : orders.length > 0 ? (
                        <div className="space-y-8">
                            {orders.map((order, idx) => (
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: idx * 0.1 }}
                                    key={order.id}
                                    className="bg-white dark:bg-card rounded-[2.5rem] p-8 shadow-sm border border-transparent hover:border-primary/5 transition-all"
                                >
                                    <div className="flex flex-col md:flex-row justify-between gap-6 mb-8">
                                        <div className="flex items-start gap-4">
                                            <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary">
                                                <Package className="w-6 h-6" />
                                            </div>
                                            <div>
                                                <h3 className="text-xl font-bold font-heading">Order #{order.id}</h3>
                                                <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                                                    <Calendar className="w-4 h-4" />
                                                    {new Date(order.createdAt).toLocaleDateString()}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            {order.status === "COMPLETED" ? (
                                                <div className="px-4 py-2 bg-green-500/10 text-green-500 rounded-full text-sm font-bold flex items-center gap-2">
                                                    <CheckCircle2 className="w-4 h-4" /> Completed
                                                </div>
                                            ) : (
                                                <div className="px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-bold flex items-center gap-2">
                                                    <Clock className="w-4 h-4" /> {order.status}
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    <div className="space-y-4 mb-8">
                                        {order.items?.map((item: any, i: number) => (
                                            <div key={i} className="flex justify-between items-center py-2 border-b border-border last:border-0">
                                                <div className="flex gap-4 items-center">
                                                    <div className="font-bold">{item.name}</div>
                                                    <div className="text-sm text-muted-foreground">x{item.quantity}</div>
                                                </div>
                                                <div className="font-bold">${(item.price * item.quantity).toFixed(2)}</div>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="flex flex-col md:flex-row justify-between items-end md:items-center gap-6 pt-6 border-t border-border">
                                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                            <MapPin className="w-4 h-4" />
                                            {order.shippingAddress}
                                        </div>
                                        <div className="text-2xl font-bold">
                                            Total: <span className="text-primary">${order.totalAmount.toFixed(2)}</span>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    ) : (
                        <div className="py-20 text-center space-y-6 bg-white dark:bg-card rounded-[3rem] shadow-sm">
                            <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center mx-auto text-muted-foreground">
                                <Package className="w-10 h-10" />
                            </div>
                            <div>
                                <h2 className="text-2xl font-bold">No orders yet</h2>
                                <p className="text-muted-foreground">Your sweetness journey hasn't started yet.</p>
                            </div>
                            <Link href="/catalog" className="inline-block px-8 py-4 bg-primary text-white rounded-full font-bold hover:bg-primary-dark transition-all">
                                Start Ordering
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </main>
    );
};

export default Orders;
