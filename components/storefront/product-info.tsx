"use client";

import { useState } from "react";
import { Star, ChevronDown, Minus, Plus } from "lucide-react";

interface ProductInfoProps {
  name: string;
  price: number;
  rating?: number;
  reviewCount?: number;
  description?: string;
  details?: string[];
}

export function ProductInfo({
  name,
  price,
  rating,
  reviewCount,
  description,
  details,
}: ProductInfoProps) {
  const [quantity, setQuantity] = useState(1);

  const increment = () => setQuantity((prev) => prev + 1);
  const decrement = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  return (
    <div className="flex flex-col pt-4 lg:pt-0">
      <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-2 tracking-tight">
        {name}
      </h1>
      <p className="text-xl font-semibold text-muted-foreground mb-6">
        ${price.toFixed(2)}
      </p>

      {/* Reviews */}
      {rating && (
        <div className="flex items-center gap-2 mb-8">
          <div className="flex text-amber-400">
            {[...Array(Math.floor(rating))].map((_, i) => (
              <Star key={i} className="w-5 h-5 fill-amber-400" />
            ))}
            {rating % 1 !== 0 && (
              <Star className="w-5 h-5 fill-amber-400 opacity-50" />
            )}
          </div>
          {reviewCount && (
            <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mt-1">
              {rating} ({reviewCount} REVIEWS)
            </span>
          )}
        </div>
      )}

      {/* Description */}
      {description && (
        <p className="text-lg text-muted-foreground mb-10 max-w-xl leading-relaxed">
          {description}
        </p>
      )}

      {/* Add to Cart Form */}
      <div className="flex flex-col gap-6 mb-10 border-t border-border pt-8">
        <div className="flex items-center gap-6">
          <label
            htmlFor="quantity"
            className="text-xs font-semibold text-muted-foreground uppercase tracking-wider w-12"
          >
            QTY
          </label>
          <div className="flex items-center border border-border rounded-lg bg-surface">
            <button
              onClick={decrement}
              className="px-4 py-3 text-muted-foreground hover:text-foreground transition-colors focus:outline-none focus:ring-2 focus:ring-primary rounded-l-lg"
              aria-label="Decrease quantity"
            >
              <Minus className="w-4 h-4" />
            </button>
            <input
              id="quantity"
              type="number"
              min="1"
              value={quantity}
              onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
              className="w-12 text-center bg-transparent border-none text-foreground font-medium focus:ring-0 p-0"
            />
            <button
              onClick={increment}
              className="px-4 py-3 text-muted-foreground hover:text-foreground transition-colors focus:outline-none focus:ring-2 focus:ring-primary rounded-r-lg"
              aria-label="Increase quantity"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 mt-2">
          <button className="flex-1 bg-primary text-primary-foreground font-semibold py-4 rounded-xl hover:opacity-90 transition-opacity active:scale-[0.98] shadow-sm">
            Buy Now
          </button>
          <button className="flex-1 border-2 border-border text-foreground font-semibold py-4 rounded-xl hover:bg-surface-variant transition-colors active:scale-[0.98]">
            Add to Cart
          </button>
        </div>
      </div>

      {/* Accordions */}
      <div className="border-t border-border">
        {details && details.length > 0 && (
          <details className="group py-6 border-b border-border" open>
            <summary className="flex justify-between items-center font-semibold text-lg cursor-pointer list-none text-foreground hover:text-primary transition-colors focus:outline-none">
              <span>Description & Details</span>
              <ChevronDown className="w-5 h-5 text-muted-foreground group-open:-rotate-180 transition-transform duration-300" />
            </summary>
            <div className="mt-4 text-base text-muted-foreground">
              <ul className="list-disc pl-5 space-y-2">
                {details.map((detail, index) => (
                  <li key={index}>{detail}</li>
                ))}
              </ul>
            </div>
          </details>
        )}

        <details className="group py-6 border-b border-border">
          <summary className="flex justify-between items-center font-semibold text-lg cursor-pointer list-none text-foreground hover:text-primary transition-colors focus:outline-none">
            <span>Shipping & Returns</span>
            <ChevronDown className="w-5 h-5 text-muted-foreground group-open:-rotate-180 transition-transform duration-300" />
          </summary>
          <div className="mt-4 text-base text-muted-foreground">
            <p>
              Free standard shipping on orders over $150. Returns accepted within
              30 days of delivery in original unused condition. See full policy for
              details.
            </p>
          </div>
        </details>
      </div>
    </div>
  );
}
