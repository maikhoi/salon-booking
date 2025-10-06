
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



  return (
    <div className="min-h-screen flex flex-col">
      

      {/* About Section */}
      <section id="about" className="relative bg-gradient-to-r from-pink-50 to-pink-100 py-16 px-6 lg:px-20">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          {/* Image */}
          <div className="flex justify-center">
            <img
              src="/about-kate.jpg"
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
      <section  id="contact" className="scroll-mt-20">
        <MapSection defaultAddress="Kate's+Nails+and+Beauty, Hoppers Crossing, VIC 3029, Australia" />
      </section>
      
      {/* Booking Form Section */}
      <section id="booking" className="bg-pink-50 py-20 px-4">
        <h2 className="text-3xl font-bold mb-10 text-center">Book Your Appointment</h2>
        <BookingForm services={services} />
      </section>

      {/* Footer
      <Footer /> */}
    </div>
  );
}
