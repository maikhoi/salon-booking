import dbConnect from "@/lib/mongodb";

export async function GET() {
  try {
    const conn = await dbConnect();
    return new Response(JSON.stringify({ message: "MongoDB connected!" }), { status: 200 });
  } catch (err: any) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}
