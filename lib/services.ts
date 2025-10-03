import dbConnect from "@/lib/mongodb";
import Service from "@/models/Service";
import { IService } from "@/types/service"; 
import { mapService } from "@/lib/mappers";

export async function getServices(): Promise<IService[]> {
  await dbConnect();
  const services = await Service.find().lean();

  // Ensure _id is always a string
  return services.map((s) => ({    
    _id: s._id as string,
    name: s.name,
    price: s.price,
    duration: s.duration,
  }));
}

export async function getServiceById(id: string): Promise<IService | null> {
  await dbConnect();
  const service = await Service.findById(id).lean();
  return service ? mapService(service) : null;
}