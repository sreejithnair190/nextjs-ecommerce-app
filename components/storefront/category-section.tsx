import Link from "next/link";
import Image from "next/image";
import { mockCategories } from "@/lib/mock-data";

export function CategorySection() {
  return (
    <section className="max-w-[1440px] mx-auto px-margin-desktop mb-xl">
      <h2 className="text-headline-xl text-primary mb-lg text-center">
        Shop by Category
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-gutter">
        {mockCategories.map((category) => (
          <Link
            key={category.id}
            href={`/categories/${category.id}`}
            className="group block relative rounded-2xl overflow-hidden bg-surface aspect-[4/5] shadow-sm hover:shadow-xl transition-all duration-300"
          >
            <Image
              src={category.image}
              alt={category.alt}
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="absolute bottom-0 left-0 p-6 w-full transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
              <h3 className="text-2xl font-semibold text-white tracking-wide">{category.name}</h3>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
