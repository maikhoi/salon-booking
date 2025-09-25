import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Booking from "@/models/Booking";
import mongoose from "mongoose";
import { sendEmail } from "@/lib/email";


export async function GET() {
  try {
    await dbConnect();
    const bookings = await Booking.find().populate("service");
    return NextResponse.json(bookings);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}


export async function POST(req: Request) {
  try {
    await dbConnect();
    const body = await req.json();
     // Ensure service is a proper ObjectId
    const serviceId = new mongoose.Types.ObjectId(body.service);

    const booking = await Booking.create({
      service: serviceId, // ObjectId from form
      name: body.name,
      email: body.email,
      phone: body.phone,
      date: body.date,
      time: body.time,
      note: body.note || "", // 👈 must be passed here
    });

    // Email to customer
    await sendEmail(
      booking.email,
      "Your booking is confirmed",
      `<p>Hi ${booking.name},</p>
       <p>We’ve received your booking for <b>${booking.date}</b> at <b>${booking.time}</b>.</p>
       <p>Service: ${booking.service}</p>
       <p>See you soon!</p>`
    );

    // Email to your wife (salon owner)
    await sendEmail(
      process.env.OWNER_EMAIL!,
      "New booking received",
      `<p>You have a new booking:</p>
       <p>Name: ${booking.name}</p>
       <p>Email: ${booking.email}</p>
       <p>Phone: ${booking.phone}</p>
       <p>Date: ${booking.date} at ${booking.time}</p>
       <p>Notes: ${booking.notes}</p>`
    );
    
    return new Response(JSON.stringify(booking), { status: 201 });
  } catch (err: any) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}
