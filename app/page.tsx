
"use client";
import { useState, useEffect } from "react";
import BookingForm from "@/components/BookingForm";
import Gallery from "@/components/Gallery";
import HeroBanner from "@/components/HeroBanner";

import Link from "next/link";
import ServicesSection from "@/components/ServicesSection";
import MapSection from "@/components/MapSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import Footer from "@/components/Footer";

export default function HomePage() {
  const [menuOpen, setMenuOpen] = useState(false);

  const [services, setServices] = useState<any[]>([]);
    // Load services
    useEffect(() => {
      fetch("/api/services")
        .then((res) => res.json())
        .then((data) => setServices(Array.isArray(data) ? data : JSON.parse(data)));
    }, []);

  const menuItems = [
    { label: "About Us", href: "#about" },
    { label: "Services", href: "#services" },
    { label: "Gallery", href: "#gallery" },
    { label: "Book Now", href: "#booking" },
  ];

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>, href: string) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
      setMenuOpen(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="relative bg-gradient-to-r from-pink-400 to-purple-500 text-white">
        <nav className="flex items-center justify-between p-6 max-w-7xl mx-auto">
          <div className="text-2xl font-bold">Kate's Nails & Beauty</div>

          {/* Desktop Menu */}
          <ul className="hidden md:flex space-x-6">
            {menuItems.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  onClick={(e) => handleScroll(e, item.href)}
                  className="hover:underline"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>

          {/* Mobile Hamburger */}
          <button
            className="md:hidden focus:outline-none"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              {menuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </nav>

        {/* Mobile Menu */}
        {menuOpen && (
          <ul className="flex flex-col space-y-4 p-6 bg-pink-500 md:hidden">
            {menuItems.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  onClick={(e) => handleScroll(e, item.href)}
                  className="block text-white font-semibold text-lg"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        )}

        {/* Hero */}
        <HeroBanner />
      </header>

      {/* About Section */}
      <section className="relative bg-gradient-to-r from-pink-50 to-pink-100 py-16 px-6 lg:px-20">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          {/* Image */}
          <div className="flex justify-center">
            <img
              src="/about-kate.png"
              alt="Kate at work"
              className="rounded-2xl shadow-lg w-full max-w-md object-cover"
            />
          </div>

          {/* Text */}
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-pink-700 mb-4">
              Your Neighborhood Escape for Beauty & Relaxation
            </h2>
            <p className="text-gray-700 leading-relaxed mb-6">
              Welcome to <span className="font-semibold">Kate’s Nails & Beauty</span> — 
              a cozy home-based salon where self-care meets artistry. 
              Whether you're here for elegant nail designs, soothing treatments, 
              or just a moment to unwind, Kate brings passion, skill, and a 
              personal touch to every appointment.
            </p>
            <p className="text-gray-700 leading-relaxed mb-6">
              With years of experience and a love for detail, Kate creates 
              styles that reflect your personality while giving you a chance 
              to relax and feel pampered.
            </p>
            {/* Custom CTA button */}
            <Link
              href="#booking"
              className="px-6 py-3 bg-pink-600 text-white font-medium rounded-full shadow-lg hover:bg-pink-700 transition"
            >
              Book Your Pamper Session
            </Link>    
          </div>
        </div>
      </section>


      {/* Services Section */}
      <ServicesSection />

      {/* Gallery Section */}
      <section id="gallery" className="py-20 bg-gray-50">
        <h2 className="text-3xl font-bold text-center mb-8">Our Gallery</h2>
        <Gallery />
      </section>

      {/* Testimonials Section */}
      <TestimonialsSection />

      {/* Map Section */}
      <MapSection defaultAddress="24 Barber Drive, Hoppers Crossing, VIC 3029, Australia" />

      {/* Booking Form Section */}
      <section id="booking" className="bg-pink-50 py-20 px-4">
        <h2 className="text-3xl font-bold mb-10 text-center">Book Your Appointment</h2>
        <BookingForm services={services} />
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}
