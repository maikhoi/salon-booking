import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Booking from "@/models/Booking";
import Service from "@/models/Service";
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
    const { name, email, phone, serviceId, date, time, note } = body;

    // Lookup service by ID
    const service = await Service.findById(serviceId);
    if (!service) {
      return NextResponse.json(
        { error: "Invalid service selected" },
        { status: 400 }
      );
    }
    // Save booking with note
    const booking = await Booking.create({
      name,
      email,
      service: service._id,
      date,
      time,
      note,
    });

    // Email to customer
    // Send email with service name + note
    await sendEmail(
      email,
      "Booking Confirmation - Kate's Nails & Beauty",
      `
        <h2>Booking Confirmed</h2>
        <p>Dear ${name},</p>
        <p>Your booking is confirmed for:</p>
        <ul>
          <li><strong>Service:</strong> ${service.name}</li>
          <li><strong>Date:</strong> ${date}</li>
          <li><strong>Time:</strong> ${time}</li>
          ${note ? `<li><strong>Note:</strong> ${note}</li>` : ""}
        </ul>
        <p>Thank you for choosing Kate's Nails & Beauty 💅</p>
      `,
      process.env.LOG_EMAIL //
    );

    // Email to your wife (salon owner)
    await sendEmail(
      process.env.OWNER_EMAIL!,
      "New booking received",
      `<p>You have a new booking:</p>
       <p>Name: ${name}</p>
       <p>Email: ${email}</p>
       <p>Phone: ${phone}</p>
       <p>Phone: ${service.name}</p>
       <p>Date: ${date} at ${time}</p>
       <p>Notes: ${note}</p>`,
       process.env.LOG_EMAIL //
    );
    
    return new Response(JSON.stringify(booking), { status: 201 });
  } catch (err: any) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}
