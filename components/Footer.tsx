"use client";

import { FaFacebookF, FaInstagram } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-pink-50 to-pink-100 border-t border-pink-200">
      <div className="max-w-7xl mx-auto px-4 py-10 flex flex-col items-center text-center">
        
        {/* Tagline */}
        <h3 className="text-2xl font-bold text-pink-700 mb-4">
          Follow Us &amp; Stay Connected
        </h3>
        <p className="text-gray-600 mb-6 max-w-md">
          Join our community for the latest nail trends, promotions, and behind-the-scenes fun at Kate’s Nails &amp; Beauty.
        </p>

        {/* Social Links */}
        <div className="flex gap-6">
          <a
            href="https://www.facebook.com/100094663601003"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative w-14 h-14 rounded-full bg-white shadow-lg hover:shadow-pink-200 flex items-center justify-center transition-all duration-300 hover:scale-110"
          >
            <FaFacebookF className="text-pink-600 text-2xl group-hover:text-pink-700 transition-colors duration-300" />
            <span className="absolute bottom-[-28px] text-xs text-pink-700 opacity-0 group-hover:opacity-100 transition-opacity">
              Facebook
            </span>
          </a>

          <a
            href="https://instagram.com/katenailsandbeauty"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative w-14 h-14 rounded-full bg-white shadow-lg hover:shadow-pink-200 flex items-center justify-center transition-all duration-300 hover:scale-110"
          >
            <FaInstagram className="text-pink-600 text-2xl group-hover:text-pink-700 transition-colors duration-300" />
            <span className="absolute bottom-[-28px] text-xs text-pink-700 opacity-0 group-hover:opacity-100 transition-opacity">
              Instagram
            </span>
          </a>
        </div>

        {/* Small print */}
        <div className="mt-8 text-sm text-gray-500">
          © {new Date().getFullYear()} Kate’s Nails &amp; Beauty — All Rights Reserved
        </div>
      </div>
    </footer>
  );
}
