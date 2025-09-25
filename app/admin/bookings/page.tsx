import { redirect } from "next/navigation";

export default function AdminBookingsPage() {
  redirect("/admin");
}


{/*


"use client";

import { useEffect, useState } from "react";
import { Booking } from "@/types/booking";
import { Service } from "@/types/service";

const ADMIN_PASSWORD = "your-secret-password"; // change this

export default function AdminBookingsPage() {
  const [authorized, setAuthorized] = useState(false);
  const [inputPassword, setInputPassword] = useState("");
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputPassword === ADMIN_PASSWORD) {
      setAuthorized(true);
    } else {
      alert("Incorrect password!");
    }
  };

  useEffect(() => {
    if (!authorized) return;

    async function fetchData() {
      try {
        const [resBookings, resServices] = await Promise.all([
          fetch("/api/bookings"),
          fetch("/api/services"),
        ]);

        if (!resBookings.ok || !resServices.ok) throw new Error("Failed to fetch data");

        const dataBookings: Booking[] = await resBookings.json();
        const dataServices: Service[] = await resServices.json();

        setBookings(dataBookings);
        setServices(dataServices);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [authorized]);

  const getServiceName = (serviceId: string) => {
    const service = services.find((s) => s._id === serviceId);
    return service ? service.name : serviceId;
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this booking?")) return;
    const res = await fetch(`/api/bookings/${id}`, { method: "DELETE" });
    if (res.ok) {
      setBookings(bookings.filter((b) => b._id !== id));
    } else {
      alert("Failed to delete booking");
    }
  };

  if (!authorized) {
    return (
      <div className="max-w-md mx-auto mt-20 p-6 border rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-4">Admin Login</h1>
        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="password"
            placeholder="Enter password"
            value={inputPassword}
            onChange={(e) => setInputPassword(e.target.value)}
            className="w-full border rounded-lg p-2"
          />
          <button type="submit" className="w-full bg-pink-500 text-white py-2 rounded-lg">
            Login
          </button>
        </form>
      </div>
    );
  }

  if (loading) return <p className="text-center mt-6">Loading bookings...</p>;
  if (bookings.length === 0) return <p className="text-center mt-6">No bookings yet.</p>;

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">All Bookings</h1>

      */} {/* Table for medium+ screens */} {/*
      <div className="hidden md:block overflow-x-auto">
        <table className="min-w-full border-collapse border text-center">
          <thead>
            <tr className="bg-gray-100">
              <th className="border p-2">Service</th>
              <th className="border p-2">Name</th>
              <th className="border p-2">Email</th>
              <th className="border p-2">Phone</th>
              <th className="border p-2">Date</th>
              <th className="border p-2">Time</th>
              <th className="border p-2">Notes</th>
              <th className="border p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((b) => (
              <tr key={b._id} className="text-center">
                <td className="border p-2 whitespace-nowrap">{getServiceName(b.service)}</td>
                <td className="border p-2 whitespace-nowrap">{b.name}</td>
                <td className="border p-2 whitespace-nowrap">{b.email}</td>
                <td className="border p-2 whitespace-nowrap">{b.phone}</td>
                <td className="border p-2 whitespace-nowrap">{b.date}</td>
                <td className="border p-2 whitespace-nowrap">{b.time}</td>
                <td className="border p-2 whitespace-nowrap">{b.notes}</td>
                <td className="border p-2">
                  <button
                    onClick={() => handleDelete(b._id)}
                    className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      */} {/* Cards for small screens */} {/*
      <div className="md:hidden space-y-4">
        {bookings.map((b) => (
          <div key={b._id} className="p-4 border rounded-lg shadow">
            <p><strong>Service:</strong> {getServiceName(b.service)}</p>
            <p><strong>Name:</strong> {b.name}</p>
            <p><strong>Email:</strong> {b.email}</p>
            <p><strong>Phone:</strong> {b.phone}</p>
            <p><strong>Date:</strong> {b.date}</p>
            <p><strong>Time:</strong> {b.time}</p>
            <p><strong>Notes:</strong> {b.notes}</p>
            <button
              onClick={() => handleDelete(b._id)}
              className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 mt-2"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
*/}