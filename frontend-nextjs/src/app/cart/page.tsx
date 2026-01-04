"use client";

import React, { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Image from "next/image";
import { Trash2, Plus, Minus, ArrowRight, ShoppingBag } from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

const MOCK_CART = [
    {
        id: 1,
        name: "Strawberry Bliss",
        price: 4.99,
        quantity: 2,
        image: "https://images.unsplash.com/photo-1567206563064-6f60f40a2b57?q=80&w=1000&auto=format&fit=crop"
    },
    {
        id: 2,
        name: "Chocolate Heaven",
        price: 5.50,
        quantity: 1,
        image: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?q=80&w=1000&auto=format&fit=crop"
    }
];

const Cart = () => {
    const [items, setItems] = useState(MOCK_CART);

    const subtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const delivery = 2.50;
    const total = subtotal + delivery;

    const updateQuantity = (id: number, delta: number) => {
        setItems(items.map(item =>
            item.id === id ? { ...item, quantity: Math.max(1, item.quantity + delta) } : item
        ));
    };

    const removeItem = (id: number) => {
        setItems(items.filter(item => item.id !== id));
    };

    return (
        <main className="min-h-screen pb-24 md:pb-12">
            <Navbar />

            <div className="container mx-auto px-6 pt-32">
                <h1 className="text-4xl md:text-6xl font-bold font-heading mb-12">Your Cart</h1>

                {items.length > 0 ? (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                        <div className="lg:col-span-2 space-y-6">
                            <AnimatePresence mode="popLayout">
                                {items.map((item) => (
                                    <motion.div
                                        layout
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: 20 }}
                                        key={item.id}
                                        className="bg-white dark:bg-card rounded-[2rem] p-4 flex items-center gap-6 shadow-sm border border-transparent hover:border-primary/5 transition-all"
                                    >
                                        <div className="w-24 h-24 md:w-32 md:h-32 relative rounded-2xl overflow-hidden bg-muted">
                                            <Image src={item.image} alt={item.name} fill className="object-cover" />
                                        </div>

                                        <div className="flex-1">
                                            <div className="flex justify-between items-start mb-2">
                                                <h3 className="text-lg md:text-xl font-bold font-heading">{item.name}</h3>
                                                <p className="font-bold text-primary">${item.price}</p>
                                            </div>

                                            <div className="flex items-center justify-between mt-4">
                                                <div className="flex items-center gap-4 bg-muted rounded-xl p-1">
                                                    <button
                                                        onClick={() => updateQuantity(item.id, -1)}
                                                        className="w-8 h-8 flex items-center justify-center hover:bg-white rounded-lg transition-all"
                                                    >
                                                        <Minus className="w-4 h-4" />
                                                    </button>
                                                    <span className="font-bold w-4 text-center">{item.quantity}</span>
                                                    <button
                                                        onClick={() => updateQuantity(item.id, 1)}
                                                        className="w-8 h-8 flex items-center justify-center hover:bg-white rounded-lg transition-all"
                                                    >
                                                        <Plus className="w-4 h-4" />
                                                    </button>
                                                </div>

                                                <button
                                                    onClick={() => removeItem(item.id)}
                                                    className="p-2 text-muted-foreground hover:text-red-500 transition-colors"
                                                >
                                                    <Trash2 className="w-5 h-5" />
                                                </button>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        </div>

                        <div className="space-y-6">
                            <div className="bg-white dark:bg-card rounded-[2.5rem] p-8 shadow-xl border border-primary/5">
                                <h3 className="text-xl font-bold font-heading mb-6">Order Summary</h3>

                                <div className="space-y-4 mb-8">
                                    <div className="flex justify-between text-muted-foreground">
                                        <span>Subtotal</span>
                                        <span className="font-bold text-foreground">${subtotal.toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between text-muted-foreground">
                                        <span>Delivery</span>
                                        <span className="font-bold text-foreground">${delivery.toFixed(2)}</span>
                                    </div>
                                    <div className="h-[1px] bg-border my-2" />
                                    <div className="flex justify-between text-xl font-bold">
                                        <span>Total</span>
                                        <span className="text-primary">${total.toFixed(2)}</span>
                                    </div>
                                </div>

                                <Link href="/checkout">
                                    <button className="w-full py-5 bg-primary text-white rounded-2xl font-bold text-lg hover:bg-primary-dark transition-all transform hover:scale-[1.02] shadow-lg shadow-primary/25 flex items-center justify-center gap-2">
                                        Checkout Now <ArrowRight className="w-5 h-5" />
                                    </button>
                                </Link>

                                <p className="text-center mt-6 text-xs text-muted-foreground">
                                    Secure checkout powered by <span className="font-bold text-primary">IcePay</span>
                                </p>
                            </div>

                            <div className="bg-primary/5 rounded-[2rem] p-6 border border-primary/10">
                                <p className="text-sm font-semibold text-primary mb-2">💡 Pro Tip</p>
                                <p className="text-xs text-muted-foreground">Add one more scoop to get 50% off on delivery!</p>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="py-20 text-center space-y-6 bg-white dark:bg-card rounded-[3rem] shadow-sm">
                        <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center mx-auto text-muted-foreground">
                            <ShoppingBag className="w-10 h-10" />
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold">Your cart is empty</h2>
                            <p className="text-muted-foreground">Looks like you haven't added any magic yet.</p>
                        </div>
                        <Link href="/catalog" className="inline-block px-8 py-4 bg-primary text-white rounded-full font-bold hover:bg-primary-dark transition-all">
                            Browse Catalog
                        </Link>
                    </div>
                )}
            </div>
        </main>
    );
};

export default Cart;
