"use client";

import { useEffect, useState } from "react";
import { getAdminBookings } from "@/app/services/admin.service";

interface Booking {
  id: string;
  userId: string;
  tutorId: string;
  startTime: string;
  endTime: string;
  status: string;
  createdAt: string;
}

export default function BookingTablePage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const data = await getAdminBookings(); // ✅ returns array
        setBookings(data ?? []);
      } catch (err: any) {
        setError(err.message || "Failed to load bookings");
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-gray-500 text-lg">Loading bookings...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-red-500 text-lg">{error}</p>
      </div>
    );
  }

  if (bookings.length === 0) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-gray-500 text-lg">No bookings found</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold mb-4">All Bookings</h1>

      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 text-left">Booking ID</th>
              <th className="px-4 py-2 text-left">User ID</th>
              <th className="px-4 py-2 text-left">Tutor ID</th>
              <th className="px-4 py-2 text-left">Start Time</th>
              <th className="px-4 py-2 text-left">End Time</th>
              <th className="px-4 py-2 text-left">Status</th>
              <th className="px-4 py-2 text-left">Created At</th>
            </tr>
          </thead>

          <tbody>
            {bookings.map((booking) => (
              <tr key={booking.id} className="border-t">
                <td className="px-4 py-2 text-sm">{booking.id}</td>
                <td className="px-4 py-2 text-sm">{booking.userId}</td>
                <td className="px-4 py-2 text-sm">{booking.tutorId}</td>
                <td className="px-4 py-2 text-sm">
                  {new Date(booking.startTime).toLocaleString()}
                </td>
                <td className="px-4 py-2 text-sm">
                  {new Date(booking.endTime).toLocaleString()}
                </td>
                <td className="px-4 py-2 text-sm font-semibold">
                  {booking.status === "active" ? (
                    <span className="text-green-600">ACTIVE</span>
                  ) : booking.status === "cancelled" ? (
                    <span className="text-red-600">CANCELLED</span>
                  ) : (
                    <span className="text-gray-600">{booking.status}</span>
                  )}
                </td>
                <td className="px-4 py-2 text-sm text-gray-500">
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
