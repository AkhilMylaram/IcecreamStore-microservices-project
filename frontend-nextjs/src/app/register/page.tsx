"use client";

import React from "react";
import Navbar from "@/components/layout/Navbar";
import Link from "next/link";
import { Mail, Lock, User, ArrowRight } from "lucide-react";

const Register = () => {
    return (
        <main className="min-h-screen">
            <Navbar />

            <div className="container mx-auto px-6 pt-32 pb-20 flex items-center justify-center min-h-[calc(100vh-80px)]">
                <div className="w-full max-w-md">
                    <div className="bg-white dark:bg-card rounded-[3rem] p-10 shadow-2xl shadow-primary/5 border border-primary/5">
                        <div className="text-center mb-10">
                            <h1 className="text-3xl font-bold font-heading mb-3">Create Account</h1>
                            <p className="text-muted-foreground">Join the sweet club and start ordering.</p>
                        </div>

                        <form className="space-y-6">
                            <div className="space-y-2">
                                <label className="text-sm font-semibold ml-1">Full Name</label>
                                <div className="relative">
                                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                                    <input
                                        type="text"
                                        placeholder="John Doe"
                                        className="w-full pl-12 pr-6 py-4 bg-muted border-2 border-transparent focus:border-primary/20 rounded-2xl outline-none transition-all"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-semibold ml-1">Email Address</label>
                                <div className="relative">
                                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                                    <input
                                        type="email"
                                        placeholder="name@example.com"
                                        className="w-full pl-12 pr-6 py-4 bg-muted border-2 border-transparent focus:border-primary/20 rounded-2xl outline-none transition-all"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-semibold ml-1">Password</label>
                                <div className="relative">
                                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                                    <input
                                        type="password"
                                        placeholder="••••••••"
                                        className="w-full pl-12 pr-6 py-4 bg-muted border-2 border-transparent focus:border-primary/20 rounded-2xl outline-none transition-all"
                                    />
                                </div>
                            </div>

                            <div className="flex items-center gap-2 px-1">
                                <input type="checkbox" className="w-4 h-4 rounded text-primary accent-primary" />
                                <span className="text-xs text-muted-foreground">I agree to the <Link href="#" className="text-primary font-bold">Terms & Conditions</Link></span>
                            </div>

                            <button className="w-full py-5 bg-primary text-white rounded-2xl font-bold text-lg hover:bg-primary-dark transition-all transform hover:scale-[1.02] shadow-lg shadow-primary/25 flex items-center justify-center gap-2">
                                Join Now <ArrowRight className="w-5 h-5" />
                            </button>
                        </form>

                        <p className="text-center mt-10 text-muted-foreground">
                            Already have an account? <Link href="/login" className="text-primary font-bold">Sign in</Link>
                        </p>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default Register;
