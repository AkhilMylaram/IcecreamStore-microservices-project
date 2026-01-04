"use client";

import React from "react";
import Navbar from "@/components/layout/Navbar";
import { User, Mail, Phone, MapPin, Package, Settings, LogOut, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

const Profile = () => {
    const user = {
        name: "John Doe",
        email: "john@example.com",
        phone: "+1 234 567 890",
        address: "123 Sweet Lane, Creamery City, IC 5678"
    };

    const menuItems = [
        { label: "My Orders", icon: Package, count: "5" },
        { label: "Account Settings", icon: Settings },
        { label: "Support", icon: Phone },
    ];

    return (
        <main className="min-h-screen pb-24 md:pb-12 bg-muted/20">
            <Navbar />

            <div className="container mx-auto px-6 pt-32">
                <div className="max-w-4xl mx-auto">
                    {/* Header Card */}
                    <div className="bg-white dark:bg-card rounded-[3rem] p-8 md:p-12 shadow-sm border border-transparent mb-8 flex flex-col md:flex-row items-center gap-8">
                        <div className="w-32 h-32 md:w-40 md:h-40 bg-primary/10 rounded-[2.5rem] flex items-center justify-center text-primary relative overflow-hidden">
                            <User className="w-16 h-16 md:w-20 md:h-20" />
                            <div className="absolute bottom-0 inset-x-0 bg-primary/20 py-2 text-center text-[10px] font-bold uppercase tracking-widest">Premium</div>
                        </div>

                        <div className="text-center md:text-left flex-1">
                            <h1 className="text-3xl md:text-5xl font-bold font-heading mb-2">{user.name}</h1>
                            <div className="flex flex-wrap justify-center md:justify-start gap-4">
                                <div className="flex items-center gap-2 text-muted-foreground bg-muted px-4 py-2 rounded-xl text-sm">
                                    <Mail className="w-4 h-4" />
                                    {user.email}
                                </div>
                                <div className="flex items-center gap-2 text-muted-foreground bg-muted px-4 py-2 rounded-xl text-sm">
                                    <Phone className="w-4 h-4" />
                                    {user.phone}
                                </div>
                            </div>
                        </div>

                        <button className="md:self-start p-4 hover:bg-muted rounded-2xl transition-all">
                            <Settings className="w-6 h-6 text-muted-foreground" />
                        </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
                        {/* Sidebar Menu */}
                        <div className="md:col-span-2 space-y-4">
                            {menuItems.map((item, i) => (
                                <button
                                    key={i}
                                    className="w-full bg-white dark:bg-card p-6 rounded-3xl flex items-center justify-between group hover:bg-primary hover:text-white transition-all shadow-sm border border-transparent"
                                >
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 bg-primary/5 rounded-2xl flex items-center justify-center group-hover:bg-white/20">
                                            <item.icon className="w-6 h-6 text-primary group-hover:text-white" />
                                        </div>
                                        <span className="font-bold">{item.label}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        {item.count && <span className="bg-primary/10 group-hover:bg-white/20 px-3 py-1 rounded-full text-xs font-bold">{item.count}</span>}
                                        <ChevronRight className="w-5 h-5 opacity-30 group-hover:opacity-100" />
                                    </div>
                                </button>
                            ))}

                            <button className="w-full bg-red-50 text-red-500 p-6 rounded-3xl flex items-center gap-4 font-bold hover:bg-red-500 hover:text-white transition-all shadow-sm">
                                <div className="w-12 h-12 bg-red-100 rounded-2xl flex items-center justify-center group-hover:bg-white/20">
                                    <LogOut className="w-6 h-6" />
                                </div>
                                Sign Out
                            </button>
                        </div>

                        {/* Info Content */}
                        <div className="md:col-span-3 space-y-8">
                            <div className="bg-white dark:bg-card rounded-[3rem] p-8 md:p-10 shadow-sm">
                                <h3 className="text-xl font-bold font-heading mb-8">Personal Information</h3>

                                <div className="space-y-8">
                                    <div className="flex items-start gap-4">
                                        <div className="p-3 bg-muted rounded-2xl">
                                            <MapPin className="w-6 h-6 text-muted-foreground" />
                                        </div>
                                        <div className="flex-1">
                                            <p className="text-sm font-bold text-muted-foreground uppercase tracking-wider mb-2">Delivery Address</p>
                                            <p className="font-medium text-lg leading-relaxed">{user.address}</p>
                                        </div>
                                        <button className="text-primary font-bold text-sm">Edit</button>
                                    </div>

                                    <div className="flex items-start gap-4">
                                        <div className="p-3 bg-muted rounded-2xl">
                                            <Package className="w-6 h-6 text-muted-foreground" />
                                        </div>
                                        <div className="flex-1">
                                            <p className="text-sm font-bold text-muted-foreground uppercase tracking-wider mb-2">Favorite Flavor</p>
                                            <p className="font-medium text-lg">Strawberry Bliss</p>
                                        </div>
                                        <button className="text-primary font-bold text-sm">Change</button>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-primary/5 rounded-[3rem] p-8 md:p-10 border border-primary/10">
                                <h3 className="text-xl font-bold font-heading mb-4">Refer a Friend</h3>
                                <p className="text-muted-foreground mb-6">Give your friends 20% off and get a free scoop for yourself!</p>
                                <div className="flex gap-4">
                                    <input type="text" readOnly value="SWEET-COOP-2026" className="flex-1 bg-white border px-6 py-4 rounded-2xl font-mono text-primary font-bold" />
                                    <button className="px-8 py-4 bg-primary text-white rounded-2xl font-bold">Copy</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default Profile;
