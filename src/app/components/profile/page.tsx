"use client";

import { useSession } from "@/hooks/useSession";
import { useState, useEffect } from "react";
import { getStudentBookings } from "@/app/services/booking.service"; // your booking service
import { Input } from "@/components/ui/input";

export default function StudentProfilePage() {
  const { user, loading: sessionLoading, refreshSession } = useSession();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
  });

  const [bookings, setBookings] = useState<any[]>([]);
  const [bookingsLoading, setBookingsLoading] = useState(true);
  const [bookingsError, setBookingsError] = useState<string | null>(null);

  // Populate form with session user data
  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        email: user.email,
      });
    }
  }, [user]);

  // Fetch student bookings
  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const data = await getStudentBookings();
        setBookings(data ?? []);
      } catch (err: any) {
        setBookingsError(err.message || "Failed to load bookings");
      } finally {
        setBookingsLoading(false);
      }
    };

    fetchBookings();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
    
      refreshSession(); // refresh session after profile update
    } catch (err: any) {
      setError(err.message || "Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  if (sessionLoading) {
    return <p className="p-6 text-gray-500">Loading profile...</p>;
  }

  if (!user) {
    return <p className="p-6 text-red-500">You must be logged in to view this page.</p>;
  }

  return (
    <div className="container mx-auto p-6 max-w-3xl space-y-8">
      {/* Profile Form */}
      <div className="p-6 border rounded shadow">
        <h1 className="text-2xl font-bold mb-4">Student Profile</h1>

        {error && <p className="text-red-500 mb-4">{error}</p>}
        {success && <p className="text-green-500 mb-4">{success}</p>}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Name</label>
            <Input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <Input
              type="email"
              name="email"
              value={formData.email}
              disabled
              className="w-full border px-3 py-2 rounded bg-gray-100 cursor-not-allowed"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? "Updating..." : "Update Profile"}
          </button>
        </form>
      </div>

      {/* Bookings Table */}
      <div className="p-6 border rounded shadow">
        <h2 className="text-xl font-bold mb-4">My Bookings</h2>

        {bookingsLoading && <p className="text-gray-500">Loading bookings...</p>}
        {bookingsError && <p className="text-red-500">{bookingsError}</p>}
        {!bookingsLoading && bookings.length === 0 && (
          <p className="text-gray-500">No bookings found.</p>
        )}

        {!bookingsLoading && bookings.length > 0 && (
          <div className="overflow-x-auto">
            <table className="min-w-full border border-gray-200 divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Booking ID</th>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Tutor</th>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Start Time</th>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">End Time</th>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Status</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {bookings.map((b) => (
                  <tr key={b.id}>
                    <td className="px-4 py-2 text-sm text-gray-600">{b.id}</td>
                    <td className="px-4 py-2 text-sm text-gray-600">{b.tutorId}</td>
                    <td className="px-4 py-2 text-sm text-gray-600">{new Date(b.startTime).toLocaleString()}</td>
                    <td className="px-4 py-2 text-sm text-gray-600">{new Date(b.endTime).toLocaleString()}</td>
                    <td className="px-4 py-2 text-sm font-semibold">
                      {b.status === "active" ? (
                        <span className="text-green-600">{b.status}</span>
                      ) : b.status === "cancelled" ? (
                        <span className="text-red-600">{b.status}</span>
                      ) : (
                        <span className="text-gray-600">{b.status}</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
