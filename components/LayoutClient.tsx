"use client"

import { usePathname } from "next/navigation"
import HeroBanner from "./HeroBanner"
import PageHeader from "./PageHeader"
import Navbar from "./Navbar"
import BackToTopButton from "./BackToTopButton"

export default function LayoutClient() {
  const pathname = usePathname()
  const isHome = pathname === "/"

  return (
    <>
      <Navbar />
      {isHome ? <HeroBanner /> : <PageHeader />}
      {isHome && <BackToTopButton />}
    </>
  )
}
