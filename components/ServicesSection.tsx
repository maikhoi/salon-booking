"use client";

import { useEffect, useState, useRef } from "react";

interface Service {
  _id: string;
  name: string;
  price: number;
  duration: number; // in minutes
}

export default function ServicesSection() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    async function fetchServices() {
      setLoading(true);
      try {
        const res = await fetch("/api/services");
        if (!res.ok) throw new Error("Failed to fetch services");
        const data = await res.json();
        setServices(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchServices();
  }, []);

  const scrollByAmount = (amount: number) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: amount, behavior: "smooth" });
    }
  };

  return (
    <section id="services" className="py-16 bg-pink-50">
      <div className="max-w-7xl mx-auto px-4 relative">
        <h2 className="text-3xl font-bold text-center text-pink-700 mb-8">
          Our Services
        </h2>

        {/* Arrow buttons for desktop */}
        <button
          onClick={() => scrollByAmount(-400)}
          className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2
                     bg-pink-600 text-white rounded-full w-10 h-10 items-center
                     justify-center shadow hover:bg-pink-700 z-10"
        >
          ‹
        </button>

        <button
          onClick={() => scrollByAmount(400)}
          className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2
                     bg-pink-600 text-white rounded-full w-10 h-10 items-center
                     justify-center shadow hover:bg-pink-700 z-10"
        >
          ›
        </button>

        {/* Scrollable grid */}
        <div
          ref={scrollRef}
          className="overflow-x-auto scrollbar-hide snap-x snap-mandatory"
        >
          <div
            className="
              grid grid-flow-col
              auto-cols-[50%]         /* mobile: 2 cols per row → 4 visible services */
              sm:auto-cols-[33.3%]    /* tablet: 3 cols per row → 6 visible services */
              lg:auto-cols-[25%]      /* desktop: 4 cols per row → 8 visible services */
              gap-4
              pb-4
              grid-rows-2
            "
          >
            {loading
              ? Array.from({ length: 8 }).map((_, idx) => (
                  <div
                    key={idx}
                    className="bg-white rounded-lg shadow animate-pulse
                               flex flex-col justify-between p-6 h-36"
                  >
                    <div className="h-4 bg-pink-200 rounded w-3/4 mb-4"></div>
                    <div className="h-4 bg-pink-100 rounded w-1/2"></div>
                  </div>
                ))
              : services.map((service) => (
                  <div
                    key={service._id}
                    className="
                      bg-white rounded-lg shadow hover:shadow-lg transition
                      p-6 text-center flex flex-col justify-between snap-start
                      h-40 sm:h-36
                    "
                  >
                    <h3 className="text-lg font-semibold text-gray-800">
                      {service.name}
                    </h3>
                    <p className="text-pink-600 font-bold mt-2">
                      ${service.price.toFixed(2)}
                    </p>
                    <p className="text-sm text-gray-500 mt-1">
                      {service.duration} mins
                    </p>
                  </div>
                ))}
          </div>
        </div>
      </div>
    </section>
  );
}
