"use client";

import React from "react";
import Navbar from "@/components/layout/Navbar";
import { CreditCard, Truck, ShieldCheck, ArrowRight, MapPin } from "lucide-react";
import Link from "next/link";

const Checkout = () => {
    return (
        <main className="min-h-screen pb-24 md:pb-12 bg-muted/20">
            <Navbar />

            <div className="container mx-auto px-6 pt-32">
                <h1 className="text-4xl md:text-6xl font-bold font-heading mb-12 text-center">Checkout</h1>

                <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-12">
                    <div className="lg:col-span-2 space-y-8">
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
                                    <input type="text" placeholder="John" className="w-full px-6 py-4 bg-muted border-2 border-transparent focus:border-primary/20 rounded-2xl outline-none transition-all" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-semibold ml-1">Last Name</label>
                                    <input type="text" placeholder="Doe" className="w-full px-6 py-4 bg-muted border-2 border-transparent focus:border-primary/20 rounded-2xl outline-none transition-all" />
                                </div>
                                <div className="md:col-span-2 space-y-2">
                                    <label className="text-sm font-semibold ml-1">Street Address</label>
                                    <div className="relative">
                                        <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                                        <input type="text" placeholder="123 Sweet Lane" className="w-full pl-12 pr-6 py-4 bg-muted border-2 border-transparent focus:border-primary/20 rounded-2xl outline-none transition-all" />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-semibold ml-1">City</label>
                                    <input type="text" placeholder="Creamery City" className="w-full px-6 py-4 bg-muted border-2 border-transparent focus:border-primary/20 rounded-2xl outline-none transition-all" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-semibold ml-1">Postal Code</label>
                                    <input type="text" placeholder="5678" className="w-full px-6 py-4 bg-muted border-2 border-transparent focus:border-primary/20 rounded-2xl outline-none transition-all" />
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

                                <button className="w-full py-4 border-2 border-dashed border-border rounded-3xl text-sm font-bold text-muted-foreground hover:bg-muted transition-all">
                                    + Add New Payment Method
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-8">
                        <div className="bg-white dark:bg-card rounded-[2.5rem] p-8 shadow-xl border border-primary/5 sticky top-28">
                            <h3 className="text-xl font-bold font-heading mb-6">Order Summary</h3>

                            <div className="space-y-4 mb-8">
                                <div className="flex justify-between items-center text-sm">
                                    <div className="text-muted-foreground">
                                        <p className="font-bold text-foreground">Strawberry Bliss (x2)</p>
                                        <p>Medium Scoop</p>
                                    </div>
                                    <span className="font-bold">$9.98</span>
                                </div>
                                <div className="flex justify-between items-center text-sm">
                                    <div className="text-muted-foreground">
                                        <p className="font-bold text-foreground">Chocolate Heaven (x1)</p>
                                        <p>Large Scoop</p>
                                    </div>
                                    <span className="font-bold">$5.50</span>
                                </div>
                                <div className="h-[1px] bg-border my-2" />
                                <div className="flex justify-between text-muted-foreground">
                                    <span>Subtotal</span>
                                    <span className="font-bold text-foreground">$15.48</span>
                                </div>
                                <div className="flex justify-between text-muted-foreground">
                                    <span>Delivery</span>
                                    <span className="font-bold text-foreground">$2.50</span>
                                </div>
                                <div className="h-[1px] bg-border my-2" />
                                <div className="flex justify-between text-2xl font-bold">
                                    <span>Total</span>
                                    <span className="text-primary">$17.98</span>
                                </div>
                            </div>

                            <button className="w-full py-5 bg-primary text-white rounded-2xl font-bold text-lg hover:bg-primary-dark transition-all transform hover:scale-[1.02] shadow-lg shadow-primary/25 flex items-center justify-center gap-2 mb-6">
                                Pay Securely <ShieldCheck className="w-5 h-5" />
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
