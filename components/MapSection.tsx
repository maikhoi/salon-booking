"use client";

import { useState } from "react";

interface MapSectionProps {
  defaultAddress?: string;
}

export default function MapSection({ defaultAddress }: MapSectionProps) {
  const [address, setAddress] = useState(defaultAddress || "Kate Nails & Beauty, Sydney, Australia");

  const encodedAddress = encodeURIComponent(address);

  return (
    <section id="location" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold text-pink-700 mb-8">Find Us</h2>

        {/* Address Input */}
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-6">
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Enter your address"
            className="w-full sm:w-2/3 border border-pink-300 rounded-lg px-4 py-2 focus:outline-pink-400"
          />
        </div>

        {/* Map */}
        <div className="w-full h-[400px] rounded-lg overflow-hidden shadow-lg">
          <iframe
            title="location-map"
            width="100%"
            height="100%"
            loading="lazy"
            allowFullScreen
            src={`https://www.google.com/maps?q=${encodedAddress}&output=embed`} //embed map
          ></iframe>
        </div>
      </div>
    </section>
  );
}
