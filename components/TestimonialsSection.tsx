"use client";

import { useState, useEffect } from "react";

interface Testimonial {
  id: number;
  name: string;
  feedback: string;
  rating: number;
}

const testimonials: Testimonial[] = [
  { id: 1, name: "Elena S..", feedback: "Kate was amazing, very flexible with what time suited me best. She is very welcoming and kind!", rating: 5 },
  { id: 2, name: "Jess G.", feedback: "I have been seeing Kate every 2-3 weeks and she never disappoints! Her nails are absolutely stunning and her work is flawless. I will honestly never see another nail tech again! 💅🏼🥰 highly recommend!", rating: 5 },
  { id: 3, name: "Vanessa R.", feedback: "Amazing service!! I’ve been coming to Kate for a year now and she’s always pulled through with the most perfect and gorgeous nails for me. She’s always willing to try new and bizarre nail designs that I bring her and I’m never left disappointed. Highly recommend!!!", rating: 5 },
  { id: 4, name: "Tracy T.", feedback: "I did my pedicure and a full set with gel here. Kate did excellent work at a very good price. The place and tools are clean and new. Highly recommended!!!", rating: 5 },
  { id: 5, name: "Angie W.", feedback: "Good experience here. would like to share to everyone come and get Nail spa pedicure Very detailed clean very professional.Let come visit lovely lady .😊", rating: 5 },
];

export default function TestimonialsSection() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % testimonials.length);
    }, 5000); // auto change every 5s
    return () => clearInterval(timer);
  }, []);

  return (
    <section id="testimonials" className="py-16 bg-pink-50">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold text-pink-700 mb-8">What Our Clients Say</h2>

        <div className="relative bg-white shadow-lg rounded-lg p-8">
          <p className="text-lg italic text-gray-700 mb-4">
            "{testimonials[current].feedback}"
          </p>
          <p className="font-semibold text-pink-600">
            — {testimonials[current].name}
          </p>

          {/* Star rating */}
          <div className="flex justify-center mt-2">
            {Array.from({ length: 5 }).map((_, i) => (
              <span
                key={i}
                className={`text-2xl ${i < testimonials[current].rating ? "text-yellow-400" : "text-gray-300"}`}
              >
                ★
              </span>
            ))}
          </div>

          {/* Manual navigation */}
          <div className="flex justify-center gap-4 mt-6">
            {testimonials.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrent(idx)}
                className={`w-3 h-3 rounded-full ${current === idx ? "bg-pink-600" : "bg-pink-300"}`}
              ></button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
