"use client";

import React, { useState, useEffect } from "react";
import Navbar from "@/components/layout/Navbar";
import { CreditCard, Truck, ShieldCheck, MapPin, Loader2 } from "lucide-react";
import Link from "next/link";
import { useCartStore } from "@/store/useCartStore";
import { orderApi, paymentApi } from "@/lib/api";
import { useRouter } from "next/navigation";

const Checkout = () => {
    const router = useRouter();
    const { items, clearCart } = useCartStore();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [form, setForm] = useState({
        firstName: "",
        lastName: "",
        address: "",
        city: "",
        zipCode: ""
    });

    const subtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const delivery = items.length > 0 ? 2.50 : 0;
    const total = subtotal + delivery;

    useEffect(() => {
        if (items.length === 0 && !loading) {
            router.push("/catalog");
        }
    }, [items, router, loading]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handlePayment = async () => {
        if (!form.firstName || !form.address || !form.city) {
            setError("Please fill in all shipping details");
            return;
        }

        setLoading(true);
        setError("");

        try {
            const userEmail = localStorage.getItem("userEmail") || "guest@example.com";

            // 1. Process Payment
            await paymentApi.processPayment({
                amount: total,
                currency: "USD",
                method: "VISA",
                userEmail: userEmail
            });

            // 2. Create Order
            await orderApi.placeOrder({
                userEmail: userEmail,
                items: items.map(item => ({
                    productId: item.id,
                    name: item.name,
                    quantity: item.quantity,
                    price: item.price
                })),
                totalAmount: total,
                shippingAddress: `${form.address}, ${form.city}, ${form.zipCode}`
            });

            // 3. Success
            clearCart();
            router.push("/orders?success=true");
        } catch (err: any) {
            console.error("Checkout failed:", err);
            setError(err.message || "Something went wrong during checkout");
        } finally {
            setLoading(false);
        }
    };

    if (items.length === 0 && !loading) return null;

    return (
        <main className="min-h-screen pb-24 md:pb-12 bg-muted/20">
            <Navbar />

            <div className="container mx-auto px-6 pt-32">
                <h1 className="text-4xl md:text-6xl font-bold font-heading mb-12 text-center">Checkout</h1>

                <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-12">
                    <div className="lg:col-span-2 space-y-8">
                        {error && (
                            <div className="p-4 bg-red-500/10 border border-red-500/20 text-red-500 rounded-2xl text-center font-medium">
                                {error}
                            </div>
                        )}

                        {/* Shipping Info */}
                        <div className="bg-white dark:bg-card rounded-[3rem] p-8 md:p-10 shadow-sm border border-transparent">
                            <div className="flex items-center gap-4 mb-8">
                                <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary">
                                    <Truck className="w-6 h-6" />
                                </div>
                                <h3 className="text-2xl font-bold font-heading">Shipping Details</h3>
                            </div>

                            <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-sm font-semibold ml-1">First Name</label>
                                    <input
                                        type="text"
                                        name="firstName"
                                        value={form.firstName}
                                        onChange={handleInputChange}
                                        placeholder="John"
                                        className="w-full px-6 py-4 bg-muted border-2 border-transparent focus:border-primary/20 rounded-2xl outline-none transition-all"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-semibold ml-1">Last Name</label>
                                    <input
                                        type="text"
                                        name="lastName"
                                        value={form.lastName}
                                        onChange={handleInputChange}
                                        placeholder="Doe"
                                        className="w-full px-6 py-4 bg-muted border-2 border-transparent focus:border-primary/20 rounded-2xl outline-none transition-all"
                                    />
                                </div>
                                <div className="md:col-span-2 space-y-2">
                                    <label className="text-sm font-semibold ml-1">Street Address</label>
                                    <div className="relative">
                                        <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                                        <input
                                            type="text"
                                            name="address"
                                            value={form.address}
                                            onChange={handleInputChange}
                                            placeholder="123 Sweet Lane"
                                            className="w-full pl-12 pr-6 py-4 bg-muted border-2 border-transparent focus:border-primary/20 rounded-2xl outline-none transition-all"
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-semibold ml-1">City</label>
                                    <input
                                        type="text"
                                        name="city"
                                        value={form.city}
                                        onChange={handleInputChange}
                                        placeholder="Creamery City"
                                        className="w-full px-6 py-4 bg-muted border-2 border-transparent focus:border-primary/20 rounded-2xl outline-none transition-all"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-semibold ml-1">Postal Code</label>
                                    <input
                                        type="text"
                                        name="zipCode"
                                        value={form.zipCode}
                                        onChange={handleInputChange}
                                        placeholder="5678"
                                        className="w-full px-6 py-4 bg-muted border-2 border-transparent focus:border-primary/20 rounded-2xl outline-none transition-all"
                                    />
                                </div>
                            </form>
                        </div>

                        {/* Payment Info */}
                        <div className="bg-white dark:bg-card rounded-[3rem] p-8 md:p-10 shadow-sm border border-transparent">
                            <div className="flex items-center gap-4 mb-8">
                                <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary">
                                    <CreditCard className="w-6 h-6" />
                                </div>
                                <h3 className="text-2xl font-bold font-heading">Payment Information</h3>
                            </div>

                            <div className="space-y-6">
                                <div className="p-6 border-2 border-primary bg-primary/5 rounded-3xl flex items-center justify-between">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-8 bg-blue-600 rounded flex items-center justify-center text-white font-bold text-[10px]">VISA</div>
                                        <div>
                                            <p className="font-bold">Visa ending in 4242</p>
                                            <p className="text-xs text-muted-foreground">Expires 12/26</p>
                                        </div>
                                    </div>
                                    <div className="w-6 h-6 rounded-full border-4 border-primary bg-white" />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-8">
                        <div className="bg-white dark:bg-card rounded-[2.5rem] p-8 shadow-xl border border-primary/5 sticky top-28">
                            <h3 className="text-xl font-bold font-heading mb-6">Order Summary</h3>

                            <div className="space-y-4 mb-8">
                                {items.map((item) => (
                                    <div key={item.id} className="flex justify-between items-center text-sm">
                                        <div className="text-muted-foreground">
                                            <p className="font-bold text-foreground">{item.name} (x{item.quantity})</p>
                                        </div>
                                        <span className="font-bold">${(item.price * item.quantity).toFixed(2)}</span>
                                    </div>
                                ))}
                                <div className="h-[1px] bg-border my-2" />
                                <div className="flex justify-between text-muted-foreground">
                                    <span>Subtotal</span>
                                    <span className="font-bold text-foreground">${subtotal.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between text-muted-foreground">
                                    <span>Delivery</span>
                                    <span className="font-bold text-foreground">${delivery.toFixed(2)}</span>
                                </div>
                                <div className="h-[1px] bg-border my-2" />
                                <div className="flex justify-between text-2xl font-bold">
                                    <span>Total</span>
                                    <span className="text-primary">${total.toFixed(2)}</span>
                                </div>
                            </div>

                            <button
                                onClick={handlePayment}
                                disabled={loading}
                                className="w-full py-5 bg-primary text-white rounded-2xl font-bold text-lg hover:bg-primary-dark transition-all transform hover:scale-[1.02] shadow-lg shadow-primary/25 flex items-center justify-center gap-2 mb-6 disabled:opacity-50"
                            >
                                {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <ShieldCheck className="w-5 h-5" />}
                                {loading ? "Processing..." : "Pay Securely"}
                            </button>

                            <p className="text-center text-xs text-muted-foreground leading-relaxed">
                                By clicking pay, you agree to our <Link href="#" className="font-bold underline">Terms of Service</Link> and <Link href="#" className="font-bold underline">Refund Policy</Link>.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default Checkout;
