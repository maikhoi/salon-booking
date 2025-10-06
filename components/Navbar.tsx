"use client"

import { useState, useEffect } from "react";
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X } from "lucide-react" // optional icons library (works by default in shadcn/lucide)


export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname()
  const isHome = pathname === "/"


  // Define anchor links for homepage navigation
  const anchorLinks = [
    { href: "#services", label: "Services" },
    { href: "#about", label: "About" },
    { href: "#contact", label: "Find Us" },
    { href: "#booking", label: "Book Now" },
  ]

  // Define normal page links for non-homepage navigation
  const pageLinks = [
    { href: "/services", label: "Services" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
    { href: "/#booking", label: "Book Now" },
  ]

  const linksToRender = isHome ? anchorLinks : pageLinks
 
  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>, href: string) => {
    if (href.startsWith("#")) {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
        target.scrollIntoView({ behavior: "smooth" });
        setMenuOpen(false);
        }
    }
  };

  const handleBookNow = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()

    if (pathname === "/") {
      // Already on homepage → smooth scroll
      const target = document.querySelector("#booking")
      if (target) {
        target.scrollIntoView({ behavior: "smooth" })
        setMenuOpen(false)
      }
    } else {
      // On another page → go to homepage and jump to booking section
      window.location.href = "/#booking"
    }
  }


  return (

    <div className="relative bg-gradient-to-r from-pink-400 to-purple-500 text-white">
        <nav className="flex items-center justify-between p-6 max-w-7xl mx-auto">
          <div className="text-2xl font-bold"><a href="/">Kate's Nails & Beauty</a></div>

          {/* Desktop Menu */}
          <ul className="hidden md:flex space-x-6 text-gray-700 font-medium items-center">
            {linksToRender.map(({ href, label }) => (
                <li key={href}>
                {isHome ? (
                    <a
                    href={href}
                    className="hover:text-pink-600 transition-colors"
                    onClick={() => setMenuOpen(false)}
                    >
                    {label}
                    </a>
                ) : (
                    <Link
                    href={href}
                    className="hover:text-pink-600 transition-colors"
                    onClick={() => setMenuOpen(false)}
                    >
                    {label}
                    </Link>
                )}
                </li>
            ))}
        </ul>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden p-2 text-gray-700 hover:text-pink-600 focus:outline-none"
          aria-label="Toggle menu"
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button> 

        {/* Mobile Menu Drawer */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200 shadow-lg">
          <ul className="flex flex-col items-center space-y-4 py-4 text-gray-700 font-medium">
            {linksToRender.map(({ href, label }) => (
              <li key={href}>
                {isHome ? (
                  <a
                    href={href}
                    className="hover:text-pink-600 transition-colors"
                    onClick={() => setMenuOpen(false)}
                  >
                    {label}
                  </a>
                ) : (
                  <Link
                    href={href}
                    className="hover:text-pink-600 transition-colors"
                    onClick={() => setMenuOpen(false)}
                  >
                    {label}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
        </nav>
    </div>
    
  )
}
