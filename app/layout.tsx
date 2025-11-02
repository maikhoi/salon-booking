import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import LayoutClient from "../components/LayoutClient"
import Footer from "../components/Footer"

export const metadata: Metadata = {
  title: "Kate Nails & Beauty | Hoppers Crossing Nail Salon",
  description:
    "Pamper yourself at Kate’s Nails & Beauty — a cozy, professional nail salon in Hoppers Crossing offering gel nails, manicures, and elegant nail art.",
  keywords: [
      "nail salon Hoppers Crossing",
      "gel nails Hoppers Crossing",
      "manicure Hoppers Crossing",
      "Kate’s Nails & Beauty",
    ],
  metadataBase: new URL("https://katenails.beauty"),
  openGraph: {
    title: "Kate Nails & Beauty | Hoppers Crossing Nail Salon",
    description:
      "Pamper yourself at Kate’s Nails & Beauty — a cozy, professional nail salon in Hoppers Crossing offering gel nails, manicures, and elegant nail art.",
    url: "https://katenails.beauty",
    siteName: "Kate Nails & Beauty",
    images: [
      {
        url: "/og-image.jpg", 
        width: 1200,
        height: 630,
        alt: "Kate Nails & Beauty Salon",
      },
    ],
    locale: "en_AU",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Kate Nails & Beauty | Hoppers Crossing Nail Salon",
    description:
      "Experience elegant, long-lasting nails in Hoppers Crossing — book your appointment today.",
    images: ["/og-image.jpg"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  const schemaData = {
    "@context": "https://schema.org",
    "@type": "BeautySalon",
    name: "Kate Nails & Beauty",
    image: "https://katenails.beauty/og-image.jpg",
    "@id": "https://katenails.beauty",
    url: "https://katenails.beauty",
    telephone: "+61 422 877 387", 
    "priceRange": "$$",
    address: {
      "@type": "PostalAddress",
      streetAddress: "24 Barber Drive",
      addressLocality: "Hoppers Crossing",
      addressRegion: "VIC",
      postalCode: "3029",
      addressCountry: "AU",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: -37.869365, 
      longitude: 144.681349,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Sunday"
        ],
        opens: "09:00",
        closes: "18:00",
      },
    ],
    sameAs: [
      "https://www.facebook.com/100094663601003",  
      "https://www.instagram.com/kate_nails_hopperscrossing/",
    ],
  };

  return (
    <html lang="en">
      <head>
      <meta name="google-site-verification" content="g60bdbOk_KhvKGkX949oJr1G5lFMHTQqyFwsNvuh4SM" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
        />
      </head>
      <body>
        <LayoutClient />
        <main>{children}</main>
        <Footer />
      {/*  <!-- Google tag (gtag.js) --> */}
      <Script async src="https://www.googletagmanager.com/gtag/js?id=G-GZH1PS11FW"
          strategy="afterInteractive"></Script>
      <Script id="ga-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', 'G-GZH1PS11FW', {
            page_path: window.location.pathname,
          });
        `}
      </Script>
        </body>
    </html>
  );
}
