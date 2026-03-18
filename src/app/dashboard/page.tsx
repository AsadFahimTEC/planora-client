"use client";

/* eslint-disable @typescript-eslint/no-explicit-any */

import { useEffect, useState } from "react";
import { getStudentBookings } from "../services/booking.service";

interface Booking {
  id: string;
  tutorId: string;
  startTime: string;
  endTime: string;
  status: string;
  createdAt: string;
}

export default function StudentDashboardPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const data = await getStudentBookings(); // ✅ array
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
    return <p className="p-6 text-gray-500">Loading bookings...</p>;
  }

  if (error) {
    return <p className="p-6 text-red-500">{error}</p>;
  }

  if (bookings.length === 0) {
    return <p className="p-6 text-gray-500">No bookings found</p>;
  }

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">My Bookings</h1>

      <div className="space-y-3">
        {bookings.map((b) => (
          <div
            key={b.id}
            className="border rounded-md p-4 flex justify-between items-center"
          >
            <div>
              <p className="text-sm text-gray-500">Tutor ID</p>
              <p className="font-medium">{b.tutorId}</p>
            </div>

            <div>
              <p className="text-sm text-gray-500">Status</p>
              <p
                className={`font-semibold ${
                  b.status === "active"
                    ? "text-green-600"
                    : b.status === "cancelled"
                    ? "text-red-600"
                    : "text-gray-600"
                }`}
              >
                {b.status.toUpperCase()}
              </p>
            </div>

            <div className="text-sm text-gray-500">
              {new Date(b.startTime).toLocaleString()}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
