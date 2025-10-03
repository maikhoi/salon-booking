import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Kate Nails & Beauty",
  description:
    "Kate Nails & Beauty – Professional nail and beauty salon in Melbourne. Expert care, modern techniques, and a relaxing experience.",
  openGraph: {
    title: "Kate Nails & Beauty",
    description:
      "Professional nail and beauty salon in Melbourne. Expert care, modern techniques, and a relaxing experience.",
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
    title: "Kate Nails & Beauty",
    description:
      "Professional nail and beauty salon in Melbourne. Expert care, modern techniques, and a relaxing experience.",
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
      "https://www.instagram.com/katenailsandbeauty/",
    ],
  };

  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
