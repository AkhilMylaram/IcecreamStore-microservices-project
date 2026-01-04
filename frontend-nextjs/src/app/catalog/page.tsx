"use client";

import React, { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Image from "next/image";
import { Filter, Search, ShoppingCart, Star, SlidersHorizontal } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

const MOCK_PRODUCTS = [
    {
        id: 1,
        name: "Strawberry Bliss",
        category: "Fruit",
        price: 4.99,
        rating: 4.8,
        image: "https://images.unsplash.com/photo-1567206563064-6f60f40a2b57?q=80&w=1000&auto=format&fit=crop",
        desc: "Creamy strawberry goodness with real chunks."
    },
    {
        id: 2,
        name: "Chocolate Heaven",
        category: "Chocolate",
        price: 5.50,
        rating: 4.9,
        image: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?q=80&w=1000&auto=format&fit=crop",
        desc: "Triple layer chocolate indulgence."
    },
    {
        id: 3,
        name: "Mango Tango",
        category: "Fruit",
        price: 4.75,
        rating: 4.7,
        image: "https://images.unsplash.com/photo-1505394033343-4339f3c03823?q=80&w=1000&auto=format&fit=crop",
        desc: "Exotic Alfonso mangoes for a tropical kick."
    },
    {
        id: 4,
        name: "Vanilla Velvet",
        category: "Classic",
        price: 4.25,
        rating: 4.6,
        image: "https://images.unsplash.com/photo-1570197788417-0e93323c9e90?q=80&w=1000&auto=format&fit=crop",
        desc: "Classic Madagascar vanilla beans."
    },
    {
        id: 5,
        name: "Pistachio Dream",
        category: "Nuts",
        price: 5.99,
        rating: 4.9,
        image: "https://images.unsplash.com/photo-1501443762994-82bd5dace89a?q=80&w=1000&auto=format&fit=crop",
        desc: "Roasted pistachios blended into perfection."
    },
    {
        id: 6,
        name: "Caramel Swirl",
        category: "Classic",
        price: 5.25,
        rating: 4.7,
        image: "https://images.unsplash.com/photo-1501443762994-82bd5dace89a?q=80&w=1000&auto=format&fit=crop",
        desc: "Salted caramel ribbons in every bite."
    }
];

const CATEGORIES = ["All", "Classic", "Fruit", "Chocolate", "Nuts"];

const Catalog = () => {
    const [activeCategory, setActiveCategory] = useState("All");
    const [searchQuery, setSearchQuery] = useState("");

    const filteredProducts = MOCK_PRODUCTS.filter(p =>
        (activeCategory === "All" || p.category === activeCategory) &&
        p.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <main className="min-h-screen pb-24 md:pb-12">
            <Navbar />

            <section className="pt-32 pb-12">
                <div className="container mx-auto px-6">
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12">
                        <div>
                            <h1 className="text-4xl md:text-6xl font-bold font-heading mb-4">Our Catalog</h1>
                            <p className="text-muted-foreground text-lg">Swipe, choose, and indulge. Find your perfect scoop.</p>
                        </div>

                        <div className="flex items-center gap-4 w-full md:w-auto">
                            <div className="relative flex-1 md:w-80">
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                                <input
                                    type="text"
                                    placeholder="Search flavors..."
                                    className="w-full pl-12 pr-6 py-4 bg-white dark:bg-card border-2 border-transparent focus:border-primary/20 rounded-2xl outline-none transition-all shadow-sm"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                            </div>
                            <button className="p-4 bg-white dark:bg-card border-2 border-transparent hover:border-primary/20 rounded-2xl transition-all shadow-sm">
                                <SlidersHorizontal className="w-6 h-6" />
                            </button>
                        </div>
                    </div>

                    {/* Categories Filter (Mobile Scrollable, Desktop Grid) */}
                    <div className="flex items-center gap-3 overflow-x-auto pb-6 scrollbar-hide mb-8">
                        {CATEGORIES.map(cat => (
                            <button
                                key={cat}
                                onClick={() => setActiveCategory(cat)}
                                className={cn(
                                    "px-8 py-3 rounded-full font-semibold whitespace-nowrap transition-all border-2",
                                    activeCategory === cat
                                        ? "bg-primary border-primary text-white shadow-lg shadow-primary/20"
                                        : "bg-white dark:bg-card border-transparent text-muted-foreground hover:border-primary/20"
                                )}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>

                    {/* Product Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                        <AnimatePresence mode="popLayout">
                            {filteredProducts.map((product) => (
                                <motion.div
                                    layout
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    transition={{ duration: 0.3 }}
                                    key={product.id}
                                    className="group bg-white dark:bg-card rounded-[2.5rem] p-4 shadow-sm hover:shadow-xl transition-all border border-transparent hover:border-primary/10"
                                >
                                    <div className="aspect-square relative rounded-[2rem] overflow-hidden mb-6 bg-primary/5">
                                        <Image
                                            src={product.image}
                                            alt={product.name}
                                            fill
                                            className="object-cover group-hover:scale-110 transition-transform duration-500"
                                        />
                                        <div className="absolute top-4 right-4 glass px-3 py-1 rounded-full flex items-center gap-1">
                                            <Star className="w-3 h-3 fill-orange-400 text-orange-400" />
                                            <span className="text-[10px] font-bold">{product.rating}</span>
                                        </div>
                                    </div>

                                    <div className="px-2 pb-2">
                                        <div className="flex justify-between items-start mb-2">
                                            <div>
                                                <p className="text-[10px] text-primary font-bold uppercase tracking-wider mb-1">{product.category}</p>
                                                <h3 className="text-xl font-bold font-heading">{product.name}</h3>
                                            </div>
                                            <p className="text-xl font-bold text-primary">${product.price}</p>
                                        </div>

                                        <p className="text-xs text-muted-foreground mb-6 line-clamp-2">{product.desc}</p>

                                        <button className="w-full py-4 bg-muted hover:bg-primary hover:text-white rounded-2xl font-bold transition-all flex items-center justify-center gap-2 group-hover:bg-primary group-hover:text-white">
                                            <ShoppingCart className="w-5 h-5" />
                                            Add to Cart
                                        </button>
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>

                    {filteredProducts.length === 0 && (
                        <div className="py-20 text-center">
                            <p className="text-2xl font-bold text-muted-foreground">No scoops found for "{searchQuery}"</p>
                        </div>
                    )}
                </div>
            </section>
        </main>
    );
};

export default Catalog;
