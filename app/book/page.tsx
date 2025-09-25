import { redirect } from "next/navigation";

export default function BookRedirectPage() {
  redirect("/");
}


{/*


"use client";
import { useState, useEffect } from "react";

export default function BookingForm() {
  const [services, setServices] = useState<any[]>([]);
  const [service, setService] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [notes, setNotes] = useState("");
  const [bookings, setBookings] = useState<any[]>([]);
  const [message, setMessage] = useState("");

  // Load services
  useEffect(() => {
    fetch("/api/services")
      .then((res) => res.json())
      .then((data) => setServices(data));
  }, []);

  // Load bookings for selected date
  useEffect(() => {
    if (!date) return;
    fetch(`/api/bookings?date=${date}`)
      .then((res) => res.json())
      .then((data) => setBookings(data));
  }, [date]);

  // Collect times that are unavailable (either booked or admin blocked)
  const bookedTimes = bookings
    .filter((b: any) => b.service || b.blocked) // both bookings & blocked slots
    .map((b: any) => b.time);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");

    const res = await fetch("/api/bookings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ service, name, email, phone, date, time, notes }),
    });

    if (res.ok) {
      setMessage("Booking successful!");
      setService("");
      setName("");
      setEmail("");
      setPhone("");
      setDate("");
      setTime("");
      setNotes("");
    } else {
      setMessage("Failed to create booking.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-lg space-y-4"
    >
      <h2 className="text-xl font-bold">Book an Appointment</h2>

      <select
        value={service}
        onChange={(e) => setService(e.target.value)}
        className="border rounded px-2 py-1 w-full"
        required
      >
        <option value="">Select a service</option>
        {services.map((s) => (
          <option key={s._id} value={s._id}>
            {s.name} (${s.price}, {s.duration} mins)
          </option>
        ))}
      </select>

      <input
        type="text"
        placeholder="Your name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="border rounded px-2 py-1 w-full"
        required
      />

      <input
        type="email"
        placeholder="Your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="border rounded px-2 py-1 w-full"
        required
      />

      <input
        type="text"
        placeholder="Your phone"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        className="border rounded px-2 py-1 w-full"
        required
      />

      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        className="border rounded px-2 py-1 w-full"
        required
      />

      <select
        value={time}
        onChange={(e) => setTime(e.target.value)}
        className="border rounded px-2 py-1 w-full"
        required
      >
        <option value="">Select time</option>
        {["09:00","10:00","11:00","12:00","13:00","14:00","15:00"].map((slot) => (
          <option key={slot} value={slot} disabled={bookedTimes.includes(slot)}>
            {slot} {bookedTimes.includes(slot) ? "(Unavailable)" : ""}
          </option>
        ))}
      </select>

      <textarea
        placeholder="Additional notes (optional)"
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
        className="border rounded px-2 py-1 w-full"
      />

      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Book Now
      </button>

      {message && <p className="text-green-600">{message}</p>}
    </form>
  );
}
*/}