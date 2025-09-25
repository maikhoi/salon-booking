"use client";

import { useState } from "react";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

export default function Gallery() {
  // Your existing gallery images
  const images = [
    { src: "/images/gallery1.jpg" },
    { src: "/images/gallery2.jpg" },
    { src: "/images/gallery3.jpg" },
    { src: "/images/gallery4.jpg" },
    { src: "/images/gallery5.jpg" },
    { src: "/images/gallery6.jpg" },
    { src: "/images/gallery7.jpg" },
    { src: "/images/gallery8.jpg" },
  ];

  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);

  return (
    <section className="py-12 bg-pink-50">
            <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
          Gallery
        </h2>
<div className="grid grid-cols-3 md:grid-cols-4 gap-3">
  {images.map((img, i) => (
    <div key={i} className="relative group">
      <img
        src={img.src}
        alt={`Gallery ${i + 1}`}
        className="h-58 w-full object-cover rounded-lg shadow-md cursor-pointer transform transition duration-300 group-hover:scale-105"
        onClick={() => {
          setIndex(i);
          setOpen(true);
        }}
      />
    </div>
  ))}
</div>

      <Lightbox
        open={open}
        close={() => setOpen(false)}
        slides={images}
        index={index}
      />
      </div>
    </section>
  );
}
