"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { ChevronRight, ArrowRight, Lock, ShieldCheck } from "lucide-react";
import { mockProductsList } from "@/lib/mock-data";

export default function CheckoutPage() {
  // Mock cart state based on the products we have
  const cartItems = [
    {
      product: mockProductsList.find((p) => p.id === "minimalist-vase")!,
      quantity: 1,
    },
    {
      product: mockProductsList.find((p) => p.id === "linen-throw-pillow")!,
      quantity: 2,
    },
  ];

  const subtotal = cartItems.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0
  );
  const shipping = subtotal > 150 ? 0 : 15;
  const total = subtotal + shipping;

  const [orderPlaced, setOrderPlaced] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate order processing
    setTimeout(() => {
      setOrderPlaced(true);
    }, 1500);
  };

  if (orderPlaced) {
    return (
      <main className="flex-grow flex items-center justify-center py-20 px-6">
        <div className="max-w-md w-full bg-surface rounded-3xl border border-border p-10 text-center shadow-xl">
          <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <ShieldCheck className="w-10 h-10 text-primary" />
          </div>
          <h1 className="text-3xl font-bold text-foreground mb-4">Order Confirmed</h1>
          <p className="text-muted-foreground mb-8">
            Thank you for your purchase! Your order #NL-{Math.floor(100000 + Math.random() * 900000)} has been received and is being processed.
          </p>
          <Link
            href="/products"
            className="w-full inline-flex items-center justify-center bg-primary text-primary-foreground font-semibold py-4 rounded-xl hover:opacity-90 transition-opacity"
          >
            Continue Shopping
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="flex-grow w-full max-w-[1440px] mx-auto px-6 md:px-16 py-12 md:py-16">
      <div className="mb-10">
        <nav aria-label="Breadcrumb" className="flex text-sm font-medium text-muted-foreground mb-6">
          <ol className="inline-flex items-center space-x-1 md:space-x-2">
            <li className="inline-flex items-center">
              <Link className="hover:text-primary transition-colors" href="/cart">
                Cart
              </Link>
            </li>
            <li>
              <div className="flex items-center">
                <ChevronRight className="w-4 h-4 mx-1" />
                <span className="text-foreground font-semibold">Checkout</span>
              </div>
            </li>
          </ol>
        </nav>
        <h1 className="text-3xl md:text-4xl font-bold text-foreground tracking-tight flex items-center gap-3">
          Checkout <Lock className="w-6 h-6 text-muted-foreground" />
        </h1>
      </div>

      <div className="flex flex-col lg:flex-row gap-12 lg:gap-16">
        {/* Left: Forms */}
        <div className="flex-grow">
          <form id="checkout-form" onSubmit={handleSubmit} className="space-y-12">
            
            {/* Contact Info */}
            <section>
              <h2 className="text-xl font-bold text-foreground mb-6">Contact Information</h2>
              <div className="space-y-4">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">Email address</label>
                  <input
                    type="email"
                    id="email"
                    required
                    className="w-full bg-surface border border-border rounded-xl px-4 py-3 text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                    placeholder="you@example.com"
                  />
                </div>
              </div>
            </section>

            {/* Shipping Address */}
            <section>
              <h2 className="text-xl font-bold text-foreground mb-6">Shipping Address</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium text-foreground mb-2">First name</label>
                  <input
                    type="text"
                    id="firstName"
                    required
                    className="w-full bg-surface border border-border rounded-xl px-4 py-3 text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                  />
                </div>
                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium text-foreground mb-2">Last name</label>
                  <input
                    type="text"
                    id="lastName"
                    required
                    className="w-full bg-surface border border-border rounded-xl px-4 py-3 text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                  />
                </div>
                <div className="md:col-span-2">
                  <label htmlFor="address" className="block text-sm font-medium text-foreground mb-2">Address</label>
                  <input
                    type="text"
                    id="address"
                    required
                    className="w-full bg-surface border border-border rounded-xl px-4 py-3 text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                    placeholder="123 Main St"
                  />
                </div>
                <div>
                  <label htmlFor="city" className="block text-sm font-medium text-foreground mb-2">City</label>
                  <input
                    type="text"
                    id="city"
                    required
                    className="w-full bg-surface border border-border rounded-xl px-4 py-3 text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="state" className="block text-sm font-medium text-foreground mb-2">State</label>
                    <input
                      type="text"
                      id="state"
                      required
                      className="w-full bg-surface border border-border rounded-xl px-4 py-3 text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                    />
                  </div>
                  <div>
                    <label htmlFor="zip" className="block text-sm font-medium text-foreground mb-2">ZIP</label>
                    <input
                      type="text"
                      id="zip"
                      required
                      className="w-full bg-surface border border-border rounded-xl px-4 py-3 text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                    />
                  </div>
                </div>
              </div>
            </section>

            {/* Payment Method (Mock) */}
            <section>
              <h2 className="text-xl font-bold text-foreground mb-6">Payment</h2>
              <div className="bg-surface-variant p-6 rounded-2xl border border-border text-center">
                <p className="text-muted-foreground font-medium mb-4">
                  This is a mock checkout. No real payment details are required.
                </p>
                <div className="inline-flex items-center justify-center p-3 bg-surface rounded-xl border border-border text-foreground">
                  <span className="font-semibold tracking-widest text-lg">•••• •••• •••• 4242</span>
                </div>
              </div>
            </section>

          </form>
        </div>

        {/* Right: Order Summary */}
        <aside className="w-full lg:w-[400px] flex-shrink-0">
          <div className="bg-surface rounded-3xl border border-border p-6 md:p-8 sticky top-28 shadow-lg">
            <h2 className="text-xl font-bold text-foreground mb-6">Order Summary</h2>
            
            {/* Cart Items Recap */}
            <div className="space-y-4 mb-6 pb-6 border-b border-border">
              {cartItems.map((item) => (
                <div key={item.product.id} className="flex gap-4">
                  <div className="relative w-16 h-20 bg-surface-variant rounded-lg overflow-hidden flex-shrink-0 border border-border/50">
                    <Image
                      src={item.product.image}
                      alt={item.product.alt}
                      fill
                      className="object-cover mix-blend-multiply dark:mix-blend-normal"
                    />
                    <div className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-xs w-5 h-5 flex items-center justify-center rounded-full font-bold">
                      {item.quantity}
                    </div>
                  </div>
                  <div className="flex-grow flex flex-col justify-center">
                    <h3 className="text-sm font-medium text-foreground line-clamp-1">{item.product.name}</h3>
                    <p className="text-sm font-semibold text-muted-foreground mt-1">
                      ${(item.product.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Totals */}
            <div className="space-y-4 text-sm font-medium text-muted-foreground mb-6 pb-6 border-b border-border">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="text-foreground">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span className="text-foreground">{shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}</span>
              </div>
            </div>
            
            <div className="flex justify-between items-center text-xl font-bold text-foreground mb-8">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>

            <button
              form="checkout-form"
              type="submit"
              className="w-full flex items-center justify-center bg-primary text-primary-foreground font-semibold py-4 rounded-xl hover:opacity-90 transition-opacity active:scale-[0.98] shadow-sm group"
            >
              Place Order
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </button>
            <div className="mt-4 flex items-center justify-center text-xs text-muted-foreground font-medium gap-1">
              <Lock className="w-3 h-3" /> Secure Checkout
            </div>
          </div>
        </aside>
      </div>
    </main>
  );
}
