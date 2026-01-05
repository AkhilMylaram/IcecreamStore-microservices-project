import React from "react";
import Navbar from "@/components/layout/Navbar";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Star, Clock, Truck } from "lucide-react";
import { cn } from "@/lib/utils";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden">
        <div className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="relative z-10 space-y-8 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-full font-semibold text-sm">
              <Star className="w-4 h-4 fill-primary" />
              <span>Rated #1 Ice Cream Store in Town</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold font-heading leading-tight tracking-tight">
              Handcrafted <br />
              <span className="text-primary">Gourmet Cravings</span> <br />
              Delivered to You.
            </h1>

            <p className="text-lg text-muted-foreground max-w-xl mx-auto lg:mx-0">
              Indulge in our collection of AI-inspired, chef-perfected frozen delights.
              Made with 100% natural ingredients and a dash of magic.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start">
              <Link href="/catalog" className="w-full sm:w-auto px-8 py-4 bg-primary text-white rounded-full font-bold text-lg hover:bg-primary-dark transition-all transform hover:scale-105 shadow-lg shadow-primary/25 flex items-center justify-center gap-2">
                Order Now <ArrowRight className="w-5 h-5" />
              </Link>
              <Link href="/catalog" className="w-full sm:w-auto px-8 py-4 bg-white text-primary border-2 border-primary/20 rounded-full font-bold text-lg hover:bg-primary/5 transition-all flex items-center justify-center">
                View Catalog
              </Link>
            </div>

            <div className="grid grid-cols-3 gap-8 pt-8 border-t">
              <div>
                <p className="text-3xl font-bold font-heading">50+</p>
                <p className="text-sm text-muted-foreground text-nowrap">Unique Flavors</p>
              </div>
              <div>
                <p className="text-3xl font-bold font-heading">15m</p>
                <p className="text-sm text-muted-foreground text-nowrap">Fast Delivery</p>
              </div>
              <div>
                <p className="text-3xl font-bold font-heading">4.9/5</p>
                <p className="text-sm text-muted-foreground text-nowrap">Customer Rating</p>
              </div>
            </div>
          </div>

          <div className="relative">
            {/* Background Decorative Circles */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-primary/5 rounded-full blur-3xl" />

            {/* Main Product Image */}
            <div className="relative z-10 w-full aspect-square rounded-[3rem] overflow-hidden shadow-2xl rotate-3 hover:rotate-0 transition-transform duration-500">
              <div className="w-full h-full bg-primary-light flex items-center justify-center text-white text-4xl">
                {/* Since I cannot guarantee the image path yet, I'll use a placeholder or assume image is there */}
                <Image
                  src="https://images.unsplash.com/photo-1567206563064-6f60f40a2b57?q=80&w=1000&auto=format&fit=crop"
                  alt="Premium Strawberry Ice Cream"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>

            {/* Floating Cards */}
            <div className="absolute -bottom-6 -left-6 md:-left-12 z-20 glass p-5 rounded-2xl shadow-xl max-w-[180px] animate-bounce-subtle">
              <div className="flex gap-3 items-center mb-2">
                <div className="w-10 h-10 bg-green-500/20 text-green-600 rounded-full flex items-center justify-center">
                  <Truck className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider">Status</p>
                  <p className="text-xs font-bold">On its way!</p>
                </div>
              </div>
            </div>

            <div className="absolute -top-6 -right-6 z-20 glass p-5 rounded-2xl shadow-xl animate-float">
              <div className="flex gap-3 items-center">
                <div className="w-10 h-10 bg-orange-500/20 text-orange-600 rounded-full flex items-center justify-center">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider">Fast Delivery</p>
                  <p className="text-xs font-bold">Within 15 Min</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-white dark:bg-card">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl md:text-5xl font-bold font-heading mb-6">Why Choose Us?</h2>
            <p className="text-muted-foreground text-lg">We don't just sell ice cream; we deliver happiness in a cone.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Premium Quality",
                desc: "We use only the finest ingredients sourced from local farms.",
                icon: Star,
                color: "bg-blue-50 text-blue-600"
              },
              {
                title: "Swift Delivery",
                desc: "Our delivery partners ensure your ice cream arrives frozen and fresh.",
                icon: Truck,
                color: "bg-green-50 text-green-600"
              },
              {
                title: "AI Crafted",
                desc: "Unique flavor combinations generated by our proprietary AI taste lab.",
                icon: Clock,
                color: "bg-purple-50 text-purple-600"
              }
            ].map((benefit, i) => (
              <div key={i} className="p-8 rounded-[2rem] border border-transparent hover:border-primary/10 hover:bg-primary/[0.02] transition-all group">
                <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform", benefit.color)}>
                  <benefit.icon className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold mb-4">{benefit.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{benefit.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="bg-primary rounded-[3rem] p-12 md:p-20 text-center text-white relative overflow-hidden shadow-2xl shadow-primary/30">
            <div className="relative z-10">
              <h2 className="text-3xl md:text-6xl font-bold font-heading mb-8">Ready to melt your heart?</h2>
              <p className="text-primary-light text-lg mb-12 max-w-2xl mx-auto">Join thousands of ice cream lovers and get 20% off on your first order.</p>
              <Link href="/register" className="px-12 py-5 bg-white text-primary rounded-full font-bold text-xl hover:shadow-xl hover:scale-105 transition-all inline-block">
                Get Started Now
              </Link>
            </div>

            {/* Background Decorations */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t">
        <div className="container mx-auto px-6 text-center">
          <p className="text-muted-foreground">© 2026 IceCream Store. All rights reserved.</p>
        </div>
      </footer>
    </main>
  );
}
