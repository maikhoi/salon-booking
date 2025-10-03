import { IService } from "@/types/service";

export function mapService(s: any): IService {
    return {   
        _id: String(s._id),
        name: s.name,
        price: s.price,
        duration: s.duration,
    };
}