// app/components/HeroBanner.tsx
"use client";

import Image from "next/image";
import Link from "next/link";

export default function HeroBanner() {
  return (
    <section className="relative w-full h-[80vh] flex items-center justify-center overflow-hidden">
      {/* Responsive banners */}
      <div className="absolute inset-0">
        {/* Mobile */}
        <Image
          src="/images/banner_mobile.png"
          alt="Kate's Nails & Beauty mobile banner"
          fill
          className="object-cover sm:hidden"
          priority
        />
        {/* Tablet */}
        <Image
          src="/images/banner-tablet.png"
          alt="Kate's Nails & Beauty tablet banner"
          fill
          className="hidden sm:block md:hidden object-cover"
          priority
        />
        {/* Desktop */}
        <Image
          src="/images/banner-desktop.png"
          alt="Kate's Nails & Beauty desktop banner"
          fill
          className="hidden md:block lg:hidden object-cover"
          priority
        />
        {/* Ultrawide */}
        <Image
          src="/images/banner-ultrawide.png"
          alt="Kate's Nails & Beauty ultrawide banner"
          fill
          className="hidden lg:block object-cover"
          priority
        />
      </div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40" />

      {/* Centered text + CTA */}
      <div className="relative z-10 text-center text-white px-4">
        <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold drop-shadow-lg">
          Kate’s Nails & Beauty
        </h1>
        <p className="mt-4 text-lg md:text-2xl drop-shadow-md">
          Pamper yourself at our home-based salon
        </p>

        {/* Custom CTA button */}
        <Link
          href="#booking"
          className="inline-block mt-6 bg-pink-600 hover:bg-pink-700 text-white text-lg font-semibold py-3 px-6 rounded-full shadow-lg transition-transform transform hover:scale-105"
        >
          Hurry, reserve your spot
        </Link>
      </div>
    </section>
  );
}
