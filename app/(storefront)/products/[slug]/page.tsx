import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ChevronRight, ArrowRight, Star } from "lucide-react";
import { mockProductsList } from "@/lib/mock-data";
import { ProductGallery } from "@/components/storefront/product-gallery";
import { ProductInfo } from "@/components/storefront/product-info";

interface ProductPageProps {
  params: {
    slug: string;
  };
}

export default function ProductDetailPage({ params }: ProductPageProps) {
  // Find the product based on the dynamic slug route
  const product = mockProductsList.find((p) => p.id === params.slug);

  if (!product) {
    notFound();
  }

  // Get 4 random related products (excluding the current one)
  const relatedProducts = mockProductsList
    .filter((p) => p.id !== product.id)
    .sort(() => 0.5 - Math.random())
    .slice(0, 4);

  return (
    <main className="flex-grow">
      {/* Breadcrumb & Content Area */}
      <div className="max-w-[1440px] mx-auto px-6 md:px-16 py-12 md:py-16">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="flex text-sm font-medium text-muted-foreground mb-12">
          <ol className="inline-flex items-center space-x-1 md:space-x-2">
            <li className="inline-flex items-center">
              <Link className="hover:text-primary transition-colors" href="/">
                Home
              </Link>
            </li>
            <li>
              <div className="flex items-center">
                <ChevronRight className="w-4 h-4 mx-1" />
                <Link className="hover:text-primary transition-colors" href="/products">
                  Shop
                </Link>
              </div>
            </li>
            <li>
              <div className="flex items-center">
                <ChevronRight className="w-4 h-4 mx-1" />
                <span className="hover:text-primary transition-colors cursor-pointer">
                  Objects
                </span>
              </div>
            </li>
            <li>
              <div className="flex items-center">
                <ChevronRight className="w-4 h-4 mx-1" />
                <span className="text-foreground font-semibold">{product.name}</span>
              </div>
            </li>
          </ol>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Left: Imagery */}
          <ProductGallery
            mainImage={product.image}
            alt={product.alt}
            gallery={product.gallery}
          />

          {/* Right: Product Info */}
          <ProductInfo
            name={product.name}
            price={product.price}
            rating={product.rating}
            reviewCount={product.reviewCount}
            description={product.description}
            details={product.details}
          />
        </div>
      </div>

      {/* You Might Also Like */}
      <section className="bg-surface-variant/30 py-20 border-t border-border">
        <div className="max-w-[1440px] mx-auto px-6 md:px-16">
          <div className="flex justify-between items-end mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              You Might Also Like
            </h2>
            <Link
              href="/products"
              className="hidden sm:flex items-center text-sm font-semibold text-muted-foreground hover:text-primary transition-colors uppercase tracking-wider"
            >
              View All <ArrowRight className="w-4 h-4 ml-1" />
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {relatedProducts.map((relatedProduct) => (
              <Link
                key={relatedProduct.id}
                href={`/products/${relatedProduct.id}`}
                className="group block"
              >
                <div className="relative w-full aspect-[4/5] bg-surface-variant overflow-hidden rounded-2xl mb-4">
                  <Image
                    src={relatedProduct.image}
                    alt={relatedProduct.alt}
                    fill
                    className="object-cover mix-blend-multiply dark:mix-blend-normal transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 50vw, 25vw"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300"></div>
                </div>
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-base font-medium text-foreground group-hover:text-primary transition-colors">
                      {relatedProduct.name}
                    </h3>
                    <p className="text-muted-foreground font-medium mt-1">
                      ${relatedProduct.price.toFixed(2)}
                    </p>
                  </div>
                  {relatedProduct.rating && (
                    <div className="flex items-center text-muted-foreground hidden sm:flex">
                      <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                      <span className="text-xs font-bold ml-1">
                        {relatedProduct.rating}
                      </span>
                    </div>
                  )}
                </div>
              </Link>
            ))}
          </div>
          
          <div className="mt-8 sm:hidden">
            <Link
              href="/products"
              className="flex items-center justify-center text-sm font-semibold text-foreground border border-border py-3 rounded-lg hover:bg-surface-variant transition-colors uppercase tracking-wider"
            >
              View All
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
