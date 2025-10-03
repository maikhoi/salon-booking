import { getServices } from "@/lib/services"; // helper to fetch from DB 
import { IService } from "@/types/service";
import Link from "next/link";

export const metadata = {
  title: "Our Services | Kate’s Nails & Beauty",
  description: "Explore our professional nail and beauty services including manicures, pedicures, nail art, and more.",
};

export default async function ServicesPage() {
  //const services = await getServices();
  const services: IService[] = await getServices();

  return (
    <main className="max-w-6xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-center mb-10">Our Services</h1>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
        {services.map((service) => (
          <Link
            key={service._id}
            href={`/services/${service._id}`}
            className="p-4 border rounded-lg shadow hover:shadow-lg transition bg-white"
          >
            <h2 className="text-xl font-semibold">{service.name}</h2>
            <p className="text-gray-600 text-sm mt-2">
              {service.duration} • ${service.price}
            </p>
          </Link>
        ))}
      </div>
    </main>
  );
}
