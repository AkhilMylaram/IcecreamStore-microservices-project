"use client";

import React, { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Link from "next/link";
import { Mail, Lock, User, ArrowRight, Loader2 } from "lucide-react";
import { authApi } from "@/lib/api";
import { useRouter } from "next/navigation";

const Register = () => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        try {
            console.log("Attempting registration with:", { firstName, lastName, email, password: "***" });
            const response = await authApi.signup({ firstName, lastName, email, password });
            console.log("Registration response:", response);
            
            if (!response.token) {
                throw new Error("No token received from server");
            }
            
            localStorage.setItem("token", response.token);
            localStorage.setItem("userEmail", email);
            router.push("/catalog");
        } catch (err: any) {
            console.error("Registration error:", err);
            setError(err.message || "Registration failed. Email might already be in use.");
        } finally {
            setLoading(false);
        }
    };

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

                        <form className="space-y-6" onSubmit={handleSubmit}>
                            {error && (
                                <div className="p-4 bg-destructive/10 border border-destructive/20 text-destructive text-sm rounded-2xl text-center">
                                    {error}
                                </div>
                            )}

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-sm font-semibold ml-1">First Name</label>
                                    <div className="relative">
                                        <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                        <input
                                            type="text"
                                            required
                                            value={firstName}
                                            onChange={(e) => setFirstName(e.target.value)}
                                            placeholder="John"
                                            className="w-full pl-10 pr-4 py-3 bg-muted border-2 border-transparent focus:border-primary/20 rounded-2xl outline-none transition-all text-sm"
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-semibold ml-1">Last Name</label>
                                    <div className="relative">
                                        <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                        <input
                                            type="text"
                                            required
                                            value={lastName}
                                            onChange={(e) => setLastName(e.target.value)}
                                            placeholder="Doe"
                                            className="w-full pl-10 pr-4 py-3 bg-muted border-2 border-transparent focus:border-primary/20 rounded-2xl outline-none transition-all text-sm"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-semibold ml-1">Email Address</label>
                                <div className="relative">
                                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                                    <input
                                        type="email"
                                        required
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
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
                                        required
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder="••••••••"
                                        className="w-full pl-12 pr-6 py-4 bg-muted border-2 border-transparent focus:border-primary/20 rounded-2xl outline-none transition-all"
                                    />
                                </div>
                            </div>

                            <div className="flex items-center gap-2 px-1">
                                <input type="checkbox" required className="w-4 h-4 rounded text-primary accent-primary" />
                                <span className="text-xs text-muted-foreground">I agree to the <Link href="#" className="text-primary font-bold">Terms & Conditions</Link></span>
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full py-5 bg-primary text-white rounded-2xl font-bold text-lg hover:bg-primary-dark transition-all transform hover:scale-[1.02] shadow-lg shadow-primary/25 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {loading ? (
                                    <>
                                        <Loader2 className="w-5 h-5 animate-spin" /> Joining...
                                    </>
                                ) : (
                                    <>
                                        Join Now <ArrowRight className="w-5 h-5" />
                                    </>
                                )}
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
