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
    const { service, name, email, phone, date, time, notes } = body;
    console.log("Booking request body:", service);
    // Lookup service by ID
    const aService = await Service.findById(service);
    if (!aService) {
      return NextResponse.json(
        { error: "Invalid service selected" },
        { status: 400 }
      );
    }
    // Save booking with note
    const booking = await Booking.create({
      name,
      email,
      service: aService._id,
      date,
      time,
      notes,
    });
    
    // Email to customer
    // Send email with service name + note
    const info = await sendEmail(
      email,
      "Booking Confirmation - Kate's Nails & Beauty",
      `
        <h2>Booking Received!</h2>
        <p>Dear ${name},</p>
        <p>Your booking is now received for:</p>
        <ul>
          <li><strong>Service:</strong> ${aService.name}</li>
          <li><strong>Date:</strong> ${date}</li>
          <li><strong>Time:</strong> ${time}</li>
          ${notes ? `<li><strong>Note:</strong> ${notes}</li>` : ""}
        </ul>
        <p>You will receive a confirmation email once we process your booking.</p>
        <p>Thank you for choosing Kate's Nails & Beauty 💅</p>
        <p>Looking forward to seeing you!</p>
        <p>Best regards,<br/>Kate's Nails & Beauty</p>
        <hr />
      `
    );
    // Email to (salon owner)
    const info2 = await sendEmail(
      process.env.OWNER_EMAIL!,
      "New booking received",
      `<p>Hello!<br/> You have a new booking below:</p>
       <p>Name: ${name}</p>
       <p>Email: ${email}</p>
       <p>Phone: ${phone}</p>
       <p>Service Name: ${aService.name}</p>
       <p>Date: ${date} at ${time}</p>
       <p>Notes: ${notes}</p>
       <p>Best regards,<br/>Kate's Nails & Beauty Webmaster Team</p>
       <hr />
       `
    );
    return NextResponse.json({ success: true, booking });
  } catch (error) {
    console.error("Booking error:", error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
