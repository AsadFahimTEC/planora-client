"use client";

import { getAdminBookings } from "@/app/services/admin.service";
import { useEffect, useState } from "react";

interface Booking {
  id: string;
  userId: string;
  tutorId: string;
  startTime: string;
  endTime: string;
  status: string;
  createdAt: string;
}

export default function AdminBookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const data = await getAdminBookings(); // ✅ now array
        setBookings(data ?? []);
      } catch (err: any) {
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  if (loading) {
    return <p className="text-center mt-10">Loading bookings...</p>;
  }

  if (error) {
    return <p className="text-center mt-10 text-red-500">{error}</p>;
  }

  if (bookings.length === 0) {
    return <p className="text-center mt-10">No bookings found</p>;
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold mb-4">All Bookings</h1>

      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2">Booking ID</th>
              <th className="p-2">User</th>
              <th className="p-2">Tutor</th>
              <th className="p-2">Start</th>
              <th className="p-2">End</th>
              <th className="p-2">Status</th>
              <th className="p-2">Created</th>
            </tr>
          </thead>

          <tbody>
            {bookings.map((booking) => (
              <tr key={booking.id} className="border-t">
                <td className="p-2">{booking.id}</td>
                <td className="p-2">{booking.userId}</td>
                <td className="p-2">{booking.tutorId}</td>
                <td className="p-2">
                  {new Date(booking.startTime).toLocaleString()}
                </td>
                <td className="p-2">
                  {new Date(booking.endTime).toLocaleString()}
                </td>
                <td className="p-2 font-semibold">
                  {booking.status === "active" && (
                    <span className="text-green-600">active</span>
                  )}
                  {booking.status === "cancelled" && (
                    <span className="text-red-600">cancelled</span>
                  )}
                </td>
                <td className="p-2">
                  {new Date(booking.createdAt).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
