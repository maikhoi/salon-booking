import { Metadata } from "next";
import { getServiceById } from "@/lib/services";
import { IService } from "@/types/service";


interface PageProps {
    params: Promise<{ id: string }>;
  }

export async function generateMetadata(
  { params }: PageProps
): Promise<Metadata> {
  const { id } = await params; // 👈 await params
  const service: IService | null = await getServiceById(id);

  if (!service) {
    return {
      title: "Service not found | Kate Nails & Beauty Salon",
      description: "This service does not exist.",
    };
  }

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
  const canonicalUrl = `${baseUrl}/services/${service._id}`;

  return {
    title: `${service.name} | Kate Nails & Beauty Salon`,
    description: service.description ?? `Book ${service.name} today at Kate Nails & Beauty Salon.`,
    openGraph: {
      title: `${service.name} | Kate Nails & Beauty Salon`,
      description: service.description ?? `Book ${service.name} today at Kate Nails & Beauty Salon.`,
      type: "website",
      url: canonicalUrl,
    },
    alternates: {
      canonical: canonicalUrl,
    },
  };
}

// Page content
export default async function ServicePage({ params }: PageProps) { 
  const { id } = await params;  
  const service = await getServiceById(id);

  if (!service) {
    return <div className="p-6 text-center">Service not found.</div>;
  }

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
  const canonicalUrl = `${baseUrl}/services/${service._id}`;

  // JSON-LD for Service
  const jsonLdService = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": service.name,
    "description": service.description ?? `Professional ${service.name} at Kate Nails & Beauty Salon.`,
    "offers": {
      "@type": "Offer",
      "price": service.price,
      "priceCurrency": "AUD", // 👈 adjust currency
      "availability": "https://schema.org/InStock",
    },
    "provider": {
      "@type": "Organization",
      "name": "Kate Nails & Beauty",
      "url": baseUrl,
    },
  };

  // JSON-LD for Breadcrumbs
  const jsonLdBreadcrumbs = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": baseUrl,
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Services",
        "item": `${baseUrl}/services`,
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": service.name,
        "item": canonicalUrl,
      },
    ],
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">{service.name}</h1>
      <p className="text-lg mb-2">{service.description}</p>
      <p className="text-md font-semibold">Duration: {service.duration}</p>
      <p className="text-md font-semibold">Price: ${service.price}</p>

      {/* Inject JSON-LD for Service */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdService) }}
      />
      {/* Inject JSON-LD for Breadcrumbs */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdBreadcrumbs) }}
      />
    </div>
  );
}
