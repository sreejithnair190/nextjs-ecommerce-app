import Image from "next/image";
import { Button } from "@/components/ui/button";
import { mockProducts } from "@/lib/mock-data";

export function FeaturedProductsSection() {
  return (
    <section className="max-w-[1440px] mx-auto px-margin-desktop mb-xl">
      <div className="flex flex-col items-center mb-12">
        <h2 className="text-3xl md:text-4xl font-semibold text-foreground tracking-tight mb-4">
          Featured Products
        </h2>
        <div className="h-1 w-12 bg-primary rounded-full"></div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
        {mockProducts.map((product) => (
          <div
            key={product.id}
            className="group flex flex-col bg-surface rounded-2xl transition-all duration-300 hover:-translate-y-1 hover:shadow-xl border border-border overflow-hidden"
          >
            <div className="relative w-full aspect-square overflow-hidden bg-surface-variant">
              <Image
                src={product.image}
                alt={product.alt}
                fill
                className="object-cover mix-blend-multiply dark:mix-blend-normal transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300"></div>
            </div>
            <div className="flex flex-col p-5">
              <h3 className="text-lg font-medium text-foreground mb-1 group-hover:text-primary transition-colors">
                {product.name}
              </h3>
              <p className="text-muted-foreground font-medium">
                ${product.price}
              </p>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-12 flex justify-center">
        <Button variant="outline" className="px-8 py-6 rounded-full text-base border-2 hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all duration-300">
          View All Products
        </Button>
      </div>
    </section>
  );
}
