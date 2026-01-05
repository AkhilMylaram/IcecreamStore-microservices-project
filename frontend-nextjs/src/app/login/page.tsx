"use client";

import React, { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Link from "next/link";
import { Mail, Lock, ArrowRight, Github, Loader2 } from "lucide-react";
import { authApi } from "@/lib/api";
import { useRouter } from "next/navigation";

const Login = () => {
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
            const response = await authApi.login({ email, password });
            localStorage.setItem("token", response.token);
            router.push("/catalog");
        } catch (err: any) {
            setError(err.message || "Invalid credentials");
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
                            <h1 className="text-3xl font-bold font-heading mb-3">Welcome Back</h1>
                            <p className="text-muted-foreground">Sign in to continue your ice cream journey.</p>
                        </div>

                        <form className="space-y-6" onSubmit={handleSubmit}>
                            {error && (
                                <div className="p-4 bg-destructive/10 border border-destructive/20 text-destructive text-sm rounded-2xl text-center">
                                    {error}
                                </div>
                            )}
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
                                <div className="flex justify-between items-center ml-1">
                                    <label className="text-sm font-semibold">Password</label>
                                    <Link href="#" className="text-xs text-primary font-bold">Forgot?</Link>
                                </div>
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

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full py-5 bg-primary text-white rounded-2xl font-bold text-lg hover:bg-primary-dark transition-all transform hover:scale-[1.02] shadow-lg shadow-primary/25 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {loading ? (
                                    <>
                                        <Loader2 className="w-5 h-5 animate-spin" /> Signing In...
                                    </>
                                ) : (
                                    <>
                                        Sign In <ArrowRight className="w-5 h-5" />
                                    </>
                                )}
                            </button>

                            <div className="relative flex items-center gap-4 py-2">
                                <div className="h-[1px] bg-border flex-1" />
                                <span className="text-xs text-muted-foreground font-bold uppercase tracking-widest">Or continue with</span>
                                <div className="h-[1px] bg-border flex-1" />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <button className="flex items-center justify-center gap-2 py-4 border-2 border-border rounded-2xl hover:bg-muted transition-all font-semibold">
                                    <svg className="w-5 h-5" viewBox="0 0 24 24">
                                        <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                                        <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                                        <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" />
                                        <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.66l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                                    </svg>
                                    Google
                                </button>
                                <button className="flex items-center justify-center gap-2 py-4 border-2 border-border rounded-2xl hover:bg-muted transition-all font-semibold">
                                    <Github className="w-5 h-5" />
                                    GitHub
                                </button>
                            </div>
                        </form>

                        <p className="text-center mt-10 text-muted-foreground">
                            Don't have an account? <Link href="/register" className="text-primary font-bold">Sign up</Link>
                        </p>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default Login;
