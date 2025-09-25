"use client";
import { useState, useEffect } from "react";

interface BookingFormProps {
  services?: any[];
}

export default function BookingForm({ services: initialServices = [] }: BookingFormProps) {
  const [services, setServices] = useState<any[]>(initialServices);
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

  useEffect(() => setTime(""), [date]);

  const timeSlots = ["09:00","10:00","11:00","12:00","13:00","14:00","15:00"];

  //Date restriction
  const today = new Date();
  const yyyy = today.getFullYear();
  const mm = String(today.getMonth() + 1).padStart(2, "0");
  const dd = String(today.getDate()).padStart(2, "0");

  const minDate = `${yyyy}-${mm}-${dd}`;

  // Max date is today + 5 days
  const maxDateObj = new Date(today);
  maxDateObj.setDate(today.getDate() + 5);
  const maxY = maxDateObj.getFullYear();
  const maxM = String(maxDateObj.getMonth() + 1).padStart(2, "0");
  const maxD = String(maxDateObj.getDate()).padStart(2, "0");

  const maxDate = `${maxY}-${maxM}-${maxD}`;

  // 0 = Sunday, 1 = Monday, ..., 5 = Friday, 6 = Saturday
  const blockedWeekdays = [5,6]; // Friday & Saturday

  //Time restriction
  const now = new Date();
  const todayStr = `${yyyy}-${mm}-${dd}`;

  // Collect times that are unavailable
  const timeOptions = timeSlots.map((slot) => {
    const booking = bookings.filter((b) => b.date === date).find((b) => b.time === slot);
    if (booking?.blocked) return { time: slot, label: `${slot} (Blocked)`, disabled: true };
    if (booking?.service) return { time: slot, label: `${slot} (Booked)`, disabled: true };

    // Disable past times if booking for today
    if (date === todayStr) {
      const [hour, minute] = slot.split(":").map(Number);
      if (hour < now.getHours() || (hour === now.getHours() && minute <= now.getMinutes())) {
        return { time: slot, label: `${slot} (Past)`, disabled: true };
      }
    }
    return { time: slot, label: slot, disabled: false };
  });

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = new Date(e.target.value);
    if (blockedWeekdays.includes(selected.getDay())) {
      alert("Sorry, bookings are not available on Friday and Saturday.");
      setDate(""); // reset
      return;
    }
    setDate(e.target.value);
  };



  // Get selected service details
  const selectedService = services.find((s) => s._id === service);

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

      {/* Service Selection */}
      <select
        value={service}
        onChange={(e) => setService(e.target.value)}
        className="border rounded px-2 py-1 w-full"
        required
      >
        <option value="">Select a service</option>
        {services.map((s) => (
          <option key={s._id} value={s._id}>
            {s.name}
          </option>
        ))}
      </select>

      {/* Show service details if selected */}
      {selectedService && (
        <div className="p-3 bg-gray-50 border rounded">
          <p className="font-semibold">{selectedService.name}</p>
          <p className="text-sm text-gray-700">
            Price: ${selectedService.price} | Duration: {selectedService.duration} mins
          </p>
        </div>
      )}

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
        onChange={handleDateChange}
        className="border rounded px-2 py-1 w-full"
        min={minDate}
        max={maxDate}
        required
      />

      {/* Time Dropdown */}
      <select
        value={time}
        onChange={(e) => setTime(e.target.value)}
        className="border rounded px-2 py-1 w-full"
        required
      >
        <option value="">Select time</option>
        {timeOptions.map((opt) => (
          <option key={opt.time} value={opt.time} disabled={opt.disabled}>
            {opt.label}
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
        className="w-full bg-pink-500 text-white px-4 py-3 rounded-lg hover:bg-pink-600 font-semibold text-lg"
      >
        Book Now
      </button>

      {message && <p className="text-green-600">{message}</p>}
      
    </form>
  );
}
