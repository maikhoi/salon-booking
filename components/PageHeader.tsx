"use client"

import { usePathname } from "next/navigation"

export default function PageHeader() {
  const pathname = usePathname()

  const titles: Record<string, string> = {
    "/services": "Our Services",
    "/about": "About Us",
    "/contact": "Get in Touch",
  }

  const title = titles[pathname] || ""

  if (!title) return null // no header on homepage

  return (
    <div className="relative h-48 bg-pink-100 flex items-center justify-center mt-16">
      <h1 className="text-4xl font-bold text-gray-800">{title}</h1>
    </div>
  )
}
