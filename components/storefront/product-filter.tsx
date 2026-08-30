"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp, Check } from "lucide-react";

export function ProductFilter() {
  const [openSections, setOpenSections] = useState({
    price: true,
    material: true,
    color: true,
  });

  const toggleSection = (section: keyof typeof openSections) => {
    setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  return (
    <aside className="w-full md:w-64 flex-shrink-0">
      <div className="sticky top-28 space-y-8">
        {/* Price Filter */}
        <div className="border-b border-border pb-6">
          <button
            onClick={() => toggleSection("price")}
            className="flex items-center justify-between w-full text-left font-semibold text-foreground mb-4 focus:outline-none"
          >
            Price
            {openSections.price ? <ChevronUp className="w-4 h-4 text-muted-foreground" /> : <ChevronDown className="w-4 h-4 text-muted-foreground" />}
          </button>
          {openSections.price && (
            <div className="space-y-3">
              {["Under $50", "$50 - $100", "Over $100"].map((label) => (
                <label key={label} className="flex items-center gap-3 cursor-pointer group">
                  <div className="relative flex items-center justify-center w-5 h-5 border border-border rounded bg-surface group-hover:border-primary transition-colors">
                    <input type="checkbox" className="peer sr-only" />
                    <Check className="w-3.5 h-3.5 text-primary opacity-0 peer-checked:opacity-100 transition-opacity" />
                  </div>
                  <span className="text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors">
                    {label}
                  </span>
                </label>
              ))}
            </div>
          )}
        </div>

        {/* Material Filter */}
        <div className="border-b border-border pb-6">
          <button
            onClick={() => toggleSection("material")}
            className="flex items-center justify-between w-full text-left font-semibold text-foreground mb-4 focus:outline-none"
          >
            Material
            {openSections.material ? <ChevronUp className="w-4 h-4 text-muted-foreground" /> : <ChevronDown className="w-4 h-4 text-muted-foreground" />}
          </button>
          {openSections.material && (
            <div className="space-y-3">
              {["Ceramic", "Wood", "Glass", "Metal"].map((label) => (
                <label key={label} className="flex items-center gap-3 cursor-pointer group">
                  <div className="relative flex items-center justify-center w-5 h-5 border border-border rounded bg-surface group-hover:border-primary transition-colors">
                    <input type="checkbox" className="peer sr-only" />
                    <Check className="w-3.5 h-3.5 text-primary opacity-0 peer-checked:opacity-100 transition-opacity" />
                  </div>
                  <span className="text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors">
                    {label}
                  </span>
                </label>
              ))}
            </div>
          )}
        </div>

        {/* Color Filter */}
        <div className="pb-6">
          <button
            onClick={() => toggleSection("color")}
            className="flex items-center justify-between w-full text-left font-semibold text-foreground mb-4 focus:outline-none"
          >
            Color
            {openSections.color ? <ChevronUp className="w-4 h-4 text-muted-foreground" /> : <ChevronDown className="w-4 h-4 text-muted-foreground" />}
          </button>
          {openSections.color && (
            <div className="flex flex-wrap gap-3">
              {[
                { label: "White", bg: "bg-white", border: "border-border" },
                { label: "Black", bg: "bg-black", border: "border-black dark:border-white" },
                { label: "Brown", bg: "bg-[#8B5A2B]", border: "border-[#8B5A2B]" },
                { label: "Beige", bg: "bg-[#EADDCF]", border: "border-[#EADDCF]" },
                { label: "Green", bg: "bg-[#5E7954]", border: "border-[#5E7954]" },
              ].map((color) => (
                <button
                  key={color.label}
                  aria-label={color.label}
                  className={`w-8 h-8 rounded-full ${color.bg} border ${color.border} ring-offset-background hover:ring-2 hover:ring-primary hover:ring-offset-2 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2`}
                ></button>
              ))}
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}
