"use client";

import { useEffect, useState } from "react";
import { cancelBooking, getStudentBookings } from "@/app/services/booking.service";
import { Button } from "@/components/ui/button";

interface Booking {
  id: string;
  studentId?: string;
  tutorId: string;
  startTime: string;
  endTime: string;
  status: string;
}

export default function TutorBookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  const loadBookings = async () => {
    try {
      setLoading(true);
      const data = await getStudentBookings(); // backend should return tutor bookings for tutor role
      setBookings(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error(error);
      setBookings([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadBookings();
  }, []);

  const handleCancel = async (bookingId: string) => {
    const confirm = window.confirm("Are you sure you want to cancel this session?");
    if (!confirm) return;

    try {
      await cancelBooking(bookingId);
      await loadBookings(); // refresh UI
    } catch (error) {
      console.error(error);
      alert("Failed to cancel booking");
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">My Bookings (Tutor)</h1>

      {loading && <p className="text-gray-500">Loading bookings...</p>}

      {!loading && bookings.length === 0 && (
        <p className="text-gray-500">No bookings found</p>
      )}

      <div className="grid gap-4 md:grid-cols-3">
        {bookings.map((booking) => (
          <div
            key={booking.id}
            className="border rounded-lg p-4 shadow-sm"
          >
            <p className="text-sm">
              <strong>Start:</strong>{" "}
              {new Date(booking.startTime).toLocaleString()}
            </p>
            <p className="text-sm">
              <strong>End:</strong>{" "}
              {new Date(booking.endTime).toLocaleString()}
            </p>

            <p
              className={`mt-2 font-semibold ${
                booking.status === "cancelled"
                  ? "text-red-600"
                  : "text-green-600"
              }`}
            >
              Status: {booking.status}
            </p>

            {booking.status !== "cancelled" && (
              <Button
                variant="destructive"
                className="mt-4 w-full"
                onClick={() => handleCancel(booking.id)}
              >
                Cancel Session
              </Button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
