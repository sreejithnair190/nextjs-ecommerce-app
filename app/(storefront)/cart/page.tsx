"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { ChevronRight, Minus, Plus, Trash2, ArrowRight } from "lucide-react";
import { mockProductsList } from "@/lib/mock-data";

export default function CartPage() {
  // Mock cart state based on the products we have
  const [cartItems, setCartItems] = useState([
    {
      product: mockProductsList.find((p) => p.id === "minimalist-vase")!,
      quantity: 1,
    },
    {
      product: mockProductsList.find((p) => p.id === "linen-throw-pillow")!,
      quantity: 2,
    },
  ]);

  const updateQuantity = (productId: string, newQuantity: number) => {
    if (newQuantity < 1) return;
    setCartItems((items) =>
      items.map((item) =>
        item.product.id === productId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const removeItem = (productId: string) => {
    setCartItems((items) => items.filter((item) => item.product.id !== productId));
  };

  const subtotal = cartItems.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0
  );

  const shipping = subtotal > 0 ? (subtotal > 150 ? 0 : 15) : 0;
  const total = subtotal + shipping;

  return (
    <main className="flex-grow w-full max-w-[1440px] mx-auto px-6 md:px-16 py-12 md:py-20">
      <div className="mb-12">
        <nav aria-label="Breadcrumb" className="flex text-sm font-medium text-muted-foreground mb-6">
          <ol className="inline-flex items-center space-x-1 md:space-x-2">
            <li className="inline-flex items-center">
              <Link className="hover:text-primary transition-colors" href="/">
                Home
              </Link>
            </li>
            <li>
              <div className="flex items-center">
                <ChevronRight className="w-4 h-4 mx-1" />
                <span className="text-foreground font-semibold">Your Cart</span>
              </div>
            </li>
          </ol>
        </nav>
        <h1 className="text-4xl md:text-5xl font-bold text-foreground tracking-tight">
          Your Cart
        </h1>
      </div>

      {cartItems.length === 0 ? (
        <div className="text-center py-20 bg-surface-variant rounded-2xl border border-border">
          <h2 className="text-2xl font-semibold text-foreground mb-4">Your cart is empty</h2>
          <p className="text-muted-foreground mb-8">Looks like you haven't added anything to your cart yet.</p>
          <Link
            href="/products"
            className="inline-flex items-center justify-center bg-primary text-primary-foreground font-semibold py-3 px-8 rounded-xl hover:opacity-90 transition-opacity"
          >
            Continue Shopping
          </Link>
        </div>
      ) : (
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16">
          {/* Cart Items List */}
          <div className="flex-grow space-y-8">
            <div className="hidden md:grid grid-cols-12 text-sm font-semibold text-muted-foreground uppercase tracking-wider pb-4 border-b border-border">
              <div className="col-span-6">Product</div>
              <div className="col-span-3 text-center">Quantity</div>
              <div className="col-span-3 text-right">Total</div>
            </div>

            <div className="space-y-6">
              {cartItems.map((item) => (
                <div key={item.product.id} className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center py-6 border-b border-border/50">
                  {/* Product Details */}
                  <div className="col-span-1 md:col-span-6 flex gap-6">
                    <Link href={`/products/${item.product.id}`} className="block relative w-24 h-32 md:w-32 md:h-40 bg-surface-variant rounded-xl overflow-hidden flex-shrink-0 group">
                      <Image
                        src={item.product.image}
                        alt={item.product.alt}
                        fill
                        className="object-cover mix-blend-multiply dark:mix-blend-normal group-hover:scale-105 transition-transform duration-500"
                      />
                    </Link>
                    <div className="flex flex-col justify-center">
                      <Link href={`/products/${item.product.id}`} className="text-lg font-medium text-foreground hover:text-primary transition-colors">
                        {item.product.name}
                      </Link>
                      <p className="text-muted-foreground font-medium mt-1 mb-4">${item.product.price.toFixed(2)}</p>
                      
                      <button
                        onClick={() => removeItem(item.product.id)}
                        className="flex items-center text-sm font-medium text-muted-foreground hover:text-destructive transition-colors w-fit"
                      >
                        <Trash2 className="w-4 h-4 mr-2" /> Remove
                      </button>
                    </div>
                  </div>

                  {/* Quantity (Mobile layout places this differently, using flex-wrap/gap) */}
                  <div className="col-span-1 md:col-span-3 flex md:justify-center items-center">
                    <div className="flex items-center border border-border rounded-lg bg-surface w-fit">
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                        className="px-3 py-2 text-muted-foreground hover:text-foreground transition-colors focus:outline-none"
                        aria-label="Decrease quantity"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="w-8 text-center text-foreground font-medium text-sm">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                        className="px-3 py-2 text-muted-foreground hover:text-foreground transition-colors focus:outline-none"
                        aria-label="Increase quantity"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  {/* Item Total */}
                  <div className="col-span-1 md:col-span-3 text-left md:text-right">
                    <p className="text-lg font-semibold text-foreground">
                      ${(item.product.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Order Summary Sidebar */}
          <aside className="w-full lg:w-96 flex-shrink-0">
            <div className="bg-surface rounded-2xl border border-border p-6 md:p-8 sticky top-28 shadow-sm">
              <h2 className="text-xl font-bold text-foreground mb-6">Order Summary</h2>
              
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
              
              <div className="flex justify-between items-center text-lg font-bold text-foreground mb-8">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>

              <Link
                href="/checkout"
                className="w-full flex items-center justify-center bg-primary text-primary-foreground font-semibold py-4 rounded-xl hover:opacity-90 transition-opacity active:scale-[0.98] shadow-sm group"
              >
                Proceed to Checkout
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>

              <div className="mt-6 text-center">
                <p className="text-xs text-muted-foreground">
                  Free shipping on all orders over $150.
                </p>
              </div>
            </div>
          </aside>
        </div>
      )}
    </main>
  );
}
