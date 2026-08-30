"use client";

import { useState } from "react";
import Image from "next/image";

interface ProductGalleryProps {
  mainImage: string;
  alt: string;
  gallery?: string[];
}

export function ProductGallery({ mainImage, alt, gallery = [] }: ProductGalleryProps) {
  const allImages = [mainImage, ...gallery];
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  return (
    <div className="flex flex-col gap-6">
      {/* Main Image */}
      <div className="w-full aspect-[4/5] bg-surface-variant rounded-2xl overflow-hidden shadow-sm relative group">
        <Image
          src={allImages[activeImageIndex]}
          alt={alt}
          fill
          priority
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          sizes="(max-width: 1024px) 100vw, 50vw"
        />
      </div>

      {/* Thumbnails */}
      {allImages.length > 1 && (
        <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-3 gap-4">
          {allImages.map((image, index) => (
            <button
              key={index}
              onClick={() => setActiveImageIndex(index)}
              className={`relative aspect-square bg-surface-variant rounded-xl overflow-hidden cursor-pointer border-2 transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 ${
                index === activeImageIndex
                  ? "border-primary"
                  : "border-transparent hover:border-outline-variant"
              }`}
            >
              <Image
                src={image}
                alt={`${alt} detail ${index + 1}`}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 25vw, 15vw"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
