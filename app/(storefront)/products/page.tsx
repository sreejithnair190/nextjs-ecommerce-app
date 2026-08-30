import Image from "next/image";
import Link from "next/link";
import { ChevronRight, Star, ChevronLeft } from "lucide-react";
import { mockProductsList } from "@/lib/mock-data";
import { ProductFilter } from "@/components/storefront/product-filter";

export default function ProductsPage() {
  return (
    <main className="flex-grow w-full max-w-[1440px] mx-auto px-6 md:px-16 py-12 md:py-20">
      {/* Breadcrumb & Header */}
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
                <span className="text-foreground font-semibold">Products</span>
              </div>
            </li>
          </ol>
        </nav>
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground tracking-tight">
          Products
        </h1>
      </div>

      <div className="flex flex-col md:flex-row gap-12 lg:gap-16">
        {/* Sidebar Filters */}
        <ProductFilter />

        {/* Product Grid Area */}
        <div className="flex-grow">
          {/* Top Bar (Count & Sort) */}
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-8 gap-4">
            <span className="text-sm font-medium text-muted-foreground">
              Showing 1-9 of 36 products
            </span>
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Sort by:
              </span>
              <select className="bg-transparent border-none text-sm font-medium text-primary cursor-pointer focus:ring-0 py-0 pl-1 pr-6 hover:text-primary/80 transition-colors">
                <option>Recommended</option>
                <option>Newest</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
              </select>
            </div>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {mockProductsList.map((product) => (
              <Link
                href={`/products/${product.id}`}
                key={product.id}
                className="group flex flex-col bg-surface rounded-2xl transition-all duration-300 hover:-translate-y-1 hover:shadow-xl border border-border overflow-hidden cursor-pointer"
              >
                <div className="relative w-full aspect-[4/5] bg-surface-variant overflow-hidden">
                  <Image
                    src={product.image}
                    alt={product.alt}
                    fill
                    className="object-cover mix-blend-multiply dark:mix-blend-normal transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300"></div>
                </div>
                <div className="flex flex-col p-5">
                  <div className="flex justify-between items-start mb-1">
                    <h3 className="text-lg font-medium text-foreground group-hover:text-primary transition-colors">
                      {product.name}
                    </h3>
                    {product.rating && (
                      <div className="flex items-center text-muted-foreground">
                        <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                        <span className="text-xs font-bold ml-1">{product.rating}</span>
                      </div>
                    )}
                  </div>
                  <p className="text-muted-foreground font-medium">${product.price.toFixed(2)}</p>
                </div>
              </Link>
            ))}
          </div>

          {/* Pagination */}
          <div className="mt-16 flex justify-center items-center gap-2">
            <button
              className="w-10 h-10 flex items-center justify-center rounded-lg border border-border text-foreground hover:bg-surface-variant transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              disabled
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button className="w-10 h-10 flex items-center justify-center rounded-lg bg-primary text-primary-foreground font-medium shadow-sm">
              1
            </button>
            <button className="w-10 h-10 flex items-center justify-center rounded-lg text-muted-foreground hover:bg-surface-variant hover:text-foreground transition-colors font-medium">
              2
            </button>
            <button className="w-10 h-10 flex items-center justify-center rounded-lg text-muted-foreground hover:bg-surface-variant hover:text-foreground transition-colors font-medium">
              3
            </button>
            <span className="text-muted-foreground px-1">...</span>
            <button className="w-10 h-10 flex items-center justify-center rounded-lg border border-border text-foreground hover:bg-surface-variant transition-colors">
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
