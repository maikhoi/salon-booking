"use client";
import { useState, useEffect } from "react";

export default function AdminBookings() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [passwordInput, setPasswordInput] = useState("");
  const [bookings, setBookings] = useState<any[]>([]);
  const [blockDate, setBlockDate] = useState("");
  const [blockTime, setBlockTime] = useState("");
  const [availableTimes, setAvailableTimes] = useState<string[]>([]);

  const ADMIN_PASSWORD =
    process.env.NEXT_PUBLIC_ADMIN_PASSWORD || "admin123";

  const timeSlots = [
    "09:00","10:00","11:00","12:00","13:00","14:00","15:00"
  ];

  // Load bookings and compute available times when date changes
  useEffect(() => {
    const auth = localStorage.getItem("adminAuth");
    if (auth) {
      const { authenticated, expires } = JSON.parse(auth);
      if (authenticated && Date.now() < expires) {
        setLoggedIn(true);
      }
    }

    if (loggedIn) loadBookings();
  }, [loggedIn]);

  useEffect(() => {
    if (!blockDate) {
      setAvailableTimes([]);
      setBlockTime("");
      return;
    }
    // filter out times already booked or blocked on selected date
    const freeTimes = timeSlots.filter((t) => !takenTimes.includes(t));
    setAvailableTimes(freeTimes);
    setBlockTime(""); // reset selection
}, [blockDate, bookings]);

  // Compute taken times
  const takenTimes = bookings
    .filter((b) => b.date === blockDate)
    .map((b) => b.time);

  const handleLogin = () => {
    if (passwordInput === ADMIN_PASSWORD) {
      localStorage.setItem(
        "adminAuth",
        JSON.stringify({
          authenticated: true,
          expires: Date.now() + 3 * 24 * 60 * 60 * 1000, // 3 days
        })
      );
      setLoggedIn(true);
      loadBookings();
    } else {
      alert("Wrong password");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("adminAuth");
    setLoggedIn(false);
  };

  const loadBookings = async () => {
    const res = await fetch("/api/bookings");
    const data = await res.json();
    setBookings(data);
  };

  const toggleBlocked = async (id: string, newStatus: boolean) => {
    try {
      const res = await fetch(`/api/bookings/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ blocked: newStatus }),
      });
      if (res.ok) {
        setBookings((prev) =>
          prev.map((b) => (b._id === id ? { ...b, blocked: newStatus } : b))
        );
      } else {
        alert("Failed to update blocked status");
      }
    } catch (err) {
      console.error(err);
      alert("Error updating blocked status");
    }
  };

  const blockSlot = async () => {
    if (!blockDate || !blockTime) return;

    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          date: blockDate,
          time: blockTime,
          blocked: true
        })
      });

      if (res.ok) {
        const newBlocked = await res.json();
        setBookings((prev) => [...prev, newBlocked]);
        setBlockDate("");
        setBlockTime("");
      } else {
        alert("Failed to block slot");
      }
    } catch (err) {
      console.error(err);
      alert("Error blocking slot");
    }
  };

  if (!loggedIn) {
    return (
      <div className="max-w-sm mx-auto p-6 mt-20 bg-white shadow-md rounded-lg">
        <h2 className="text-xl font-bold mb-4">Admin Login</h2>
        <input
          type="password"
          placeholder="Enter password"
          value={passwordInput}
          onChange={(e) => setPasswordInput(e.target.value)}
          className="border rounded px-2 py-2 w-full mb-4"
        />
        <button
          onClick={handleLogin}
          className="w-full bg-pink-500 text-white px-4 py-3 rounded-lg hover:bg-pink-600 font-semibold text-lg"
        >
          Login
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Admin Bookings</h1>
        <button
          onClick={handleLogout}
          className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
        >
          Logout
        </button>
      </div>

      {/* Block Slot Form */}
      <div className="mb-6 flex gap-2 items-end">
        <input
          type="date"
          value={blockDate}
          onChange={(e) => setBlockDate(e.target.value)}
          className="border px-2 py-1 rounded"
        />
        <select
                value={blockTime}
                onChange={(e) => setBlockTime(e.target.value)}
                className="border px-2 py-1 rounded"
                >
                <option value="">Select time</option>
                {timeSlots.map((t) => (
                    <option key={t} value={t} disabled={takenTimes.includes(t)}>
                    {t} {takenTimes.includes(t) ? "(Taken)" : ""}
                    </option>
                ))}
                </select>
        <button
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
          onClick={blockSlot}
          disabled={availableTimes.length === 0}
        >
          Block Slot
        </button>
      </div>

      <table className="w-full border-collapse border">
        <thead>
          <tr className="bg-gray-100 text-left">
            <th className="border px-2 py-1">Name</th>
            <th className="border px-2 py-1">Email</th>
            <th className="border px-2 py-1">Phone</th>
            <th className="border px-2 py-1">Service</th>
            <th className="border px-2 py-1">Date</th>
            <th className="border px-2 py-1">Time</th>
            <th className="border px-2 py-1">Notes</th>
            <th className="border px-2 py-1">Blocked</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((b: any) => (
            <tr key={b._id} className="text-center">
              <td className="border px-2 py-1">{b.name || "—"}</td>
              <td className="border px-2 py-1">{b.email || "—"}</td>
              <td className="border px-2 py-1">{b.phone || "—"}</td>
              <td className="border px-2 py-1">{b.service?.name || "—"}</td>
              <td className="border px-2 py-1">{b.date}</td>
              <td className="border px-2 py-1">{b.time}</td>
              <td className="border px-2 py-1 text-left max-w-xs truncate">
                {b.notes || "—"}
              </td>
              <td className="border px-2 py-1">
                <button
                  className={`px-2 py-1 rounded ${
                    b.blocked ? "bg-red-600 text-white" : "bg-green-600 text-white"
                  }`}
                  onClick={() => toggleBlocked(b._id, !b.blocked)}
                >
                  {b.blocked ? "Unblock" : "Block"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
