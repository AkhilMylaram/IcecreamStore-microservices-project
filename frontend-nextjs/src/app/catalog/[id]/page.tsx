"use client";

import React, { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Image from "next/image";
import { Star, ShoppingCart, Minus, Plus, Heart, Share2, ShieldCheck, Clock, Award } from "lucide-react";
import { cn } from "@/lib/utils";

const ProductDetails = ({ params }: { params: { id: string } }) => {
    const [quantity, setQuantity] = useState(1);
    const [activeSize, setActiveSize] = useState("Medium");

    const product = {
        id: params.id,
        name: "Strawberry Bliss",
        description: "Our signature strawberry ice cream is made with farm-fresh organic strawberries and premium thick cream. Each scoop contains real chunks of sun-ripened berries, delivering an explosion of natural flavor in every bite.",
        price: 4.99,
        rating: 4.8,
        reviews: 128,
        image: "https://images.unsplash.com/photo-1567206563064-6f60f40a2b57?q=80&w=1000&auto=format&fit=crop",
        ingredients: ["Organic Strawberries", "Heavy Cream", "Cane Sugar", "Natural Vanilla"],
        sizes: ["Small", "Medium", "Large", "Tub"]
    };

    return (
        <main className="min-h-screen pb-24 md:pb-12">
            <Navbar />

            <div className="container mx-auto px-6 pt-32">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
                    {/* Image Gallery */}
                    <div className="space-y-6">
                        <div className="aspect-square relative rounded-[3rem] overflow-hidden shadow-2xl bg-muted">
                            <Image src={product.image} alt={product.name} fill className="object-cover" />
                            <button className="absolute top-6 right-6 p-4 bg-white/80 backdrop-blur-md rounded-2xl shadow-lg hover:bg-white transition-all group">
                                <Heart className="w-6 h-6 text-muted-foreground group-hover:text-primary transition-colors" />
                            </button>
                        </div>
                        <div className="grid grid-cols-4 gap-4">
                            {[1, 2, 3, 4].map((i) => (
                                <div key={i} className="aspect-square relative rounded-2xl overflow-hidden opacity-60 hover:opacity-100 transition-all cursor-pointer border-2 border-transparent hover:border-primary">
                                    <Image src={product.image} alt={product.name} fill className="object-cover" />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Product Info */}
                    <div className="space-y-8">
                        <div>
                            <div className="flex items-center gap-2 mb-4">
                                <div className="flex text-orange-400">
                                    {[...Array(5)].map((_, i) => <Star key={i} className={cn("w-4 h-4", i < 4 ? "fill-orange-400" : "fill-none")} />)}
                                </div>
                                <span className="text-sm font-bold">{product.rating} ({product.reviews} Reviews)</span>
                            </div>

                            <h1 className="text-4xl md:text-6xl font-bold font-heading mb-4">{product.name}</h1>
                            <p className="text-3xl font-bold text-primary">${product.price}</p>
                        </div>

                        <p className="text-lg text-muted-foreground leading-relaxed">
                            {product.description}
                        </p>

                        {/* Select Size */}
                        <div className="space-y-4">
                            <p className="text-sm font-bold uppercase tracking-widest text-muted-foreground">Select Serving Size</p>
                            <div className="flex flex-wrap gap-3">
                                {product.sizes.map((size) => (
                                    <button
                                        key={size}
                                        onClick={() => setActiveSize(size)}
                                        className={cn(
                                            "px-6 py-3 rounded-2xl font-bold transition-all border-2",
                                            activeSize === size
                                                ? "bg-primary border-primary text-white shadow-lg shadow-primary/20"
                                                : "bg-white border-border text-muted-foreground hover:border-primary/20"
                                        )}
                                    >
                                        {size}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Quantity and Actions */}
                        <div className="flex flex-col sm:flex-row gap-4 pt-4">
                            <div className="flex items-center gap-6 bg-muted px-6 py-4 rounded-2xl">
                                <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="hover:text-primary transition-colors"><Minus className="w-5 h-5" /></button>
                                <span className="text-xl font-bold w-4 text-center">{quantity}</span>
                                <button onClick={() => setQuantity(quantity + 1)} className="hover:text-primary transition-colors"><Plus className="w-5 h-5" /></button>
                            </div>
                            <button className="flex-1 py-5 bg-primary text-white rounded-2xl font-bold text-lg hover:bg-primary-dark transition-all transform hover:scale-[1.02] shadow-xl shadow-primary/25 flex items-center justify-center gap-2">
                                <ShoppingCart className="w-6 h-6" />
                                Add to Cart
                            </button>
                        </div>

                        {/* Features Row */}
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-8 border-y">
                            <div className="flex flex-col items-center text-center gap-2">
                                <ShieldCheck className="w-6 h-6 text-green-500" />
                                <span className="text-xs font-bold">100% Organic</span>
                            </div>
                            <div className="flex flex-col items-center text-center gap-2">
                                <Clock className="w-6 h-6 text-blue-500" />
                                <span className="text-xs font-bold">Fast Delivery</span>
                            </div>
                            <div className="flex flex-col items-center text-center gap-2">
                                <Award className="w-6 h-6 text-orange-500" />
                                <span className="text-xs font-bold">Chef Quality</span>
                            </div>
                            <div className="flex flex-col items-center text-center gap-2">
                                <Share2 className="w-6 h-6 text-purple-500" />
                                <span className="text-xs font-bold">Share Happiness</span>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </main>
    );
};

export default ProductDetails;
