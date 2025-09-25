import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Booking from "@/models/Booking";

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    await dbConnect();

    // extract the id from the URL
    const url = new URL(req.url);
    const id = url.pathname.split("/").pop(); // last segment = id

    if (!id) return new Response("Missing booking ID", { status: 400 });

    const deleted = await Booking.findByIdAndDelete(id);
    if (!deleted) 
        return NextResponse.json({ error: "Booking not found" }, { status: 404 });

    return NextResponse.json({ message: "Booking deleted" });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}


export async function PATCH(req: NextRequest) {
  try {
    await dbConnect();

    // extract the id from the URL
    const url = new URL(req.url);
    const id = url.pathname.split("/").pop(); // last segment = id

    if (!id) return new Response("Missing booking ID", { status: 400 });

    const body = await req.json();
    const { blocked } = body;

    const booking = await Booking.findByIdAndUpdate(
      id,
      { blocked },
      { new: true }
    );

    if (!booking) return new Response("Booking not found", { status: 404 });

    return new Response(JSON.stringify(booking), { status: 200 });
  } catch (err) {
    console.error(err);
    return new Response("Failed to update booking", { status: 500 });
  }
}
