import dbConnect from "@/lib/mongodb";
import Service from "@/models/Service";

export async function GET() {
  await dbConnect();
  const services = await Service.find();
  return new Response(JSON.stringify(services), { status: 200 });
}

export async function POST(req: Request) {
  await dbConnect();
  const data = await req.json();
  const service = await Service.create(data);
  return new Response(JSON.stringify(service), { status: 201 });
}
