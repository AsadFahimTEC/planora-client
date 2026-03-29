"use client";

import { useQuery } from "@tanstack/react-query";
import Link from "next/link";

// ✅ Match backend structure
interface Event {
  id: string;
  title: string;
  startDate: string;
  organizer: string;
  registrationFee: number;
}

// ✅ Fetch from API properly
const fetchEvents = async (): Promise<Event[]> => {
  try {
    const token = localStorage.getItem("token"); // If JWT auth

    const res = await fetch("http://localhost:5000/api/events", {
      headers: {
        "Content-Type": "application/json",
        Authorization: token ? `Bearer ${token}` : "",
      },
      credentials: "include", // if backend uses session cookie
    });

    const result = await res.json();

    if (!res.ok) {
      throw new Error(result.message || "Failed to fetch events");
    }

    return result.data || result;
  } catch (error: any) {
    console.error("Fetch Error:", error.message);
    throw new Error(error.message || "Failed to fetch events");
  }
};

export default function UpcomingEventsSlider() {
  const { data, error, isLoading, refetch } = useQuery({
    queryKey: ["events"],
    queryFn: fetchEvents,
  });

  // 🔄 Loading
  if (isLoading) {
    return (
      <p className="text-center py-10 text-gray-500">
        Loading events...
      </p>
    );
  }

  // ❌ Error
  if (error instanceof Error) {
    return (
      <div className="text-center py-10">
        <p className="text-red-500 mb-2">
          Error: {error.message}
        </p>
        <button
          onClick={() => refetch()}
          className="px-4 py-2 bg-indigo-600 text-white rounded-full"
        >
          Retry
        </button>
      </div>
    );
  }

  // 🚫 Empty
  if (!data || data.length === 0) {
    return (
      <p className="text-center py-10 text-gray-500">
        No upcoming events found
      </p>
    );
  }

  return (
    <section className="py-10 max-w-7xl mx-auto px-4">
      <h2 className="text-3xl font-bold mb-8 text-center">
        Upcoming Events
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {data.map((event) => (
          <div
            key={event.id}
            className="p-6 rounded-2xl shadow-lg border bg-gradient-to-br from-indigo-500 to-purple-600 text-white hover:scale-105 transition"
          >
            <h3 className="text-xl font-bold mb-2">
              {event.title}
            </h3>

            {/* ✅ Format Date */}
            <p className="mb-1">
              Date:{" "}
              {new Date(event.startDate).toLocaleDateString()}
            </p>

            <p className="mb-1">
              Organizer: {event.organizer}
            </p>

            {/* ✅ Fee */}
            <span className="inline-block px-3 py-1 rounded-full bg-white/30 text-sm">
              {event.registrationFee === 0
                ? "Free"
                : `৳ ${event.registrationFee}`}
            </span>

            {/* ✅ Dynamic Link */}
            <Link
              href={`/events/${event.id}`}
              className="block mt-4 text-center px-4 py-2 bg-white text-black rounded-full hover:bg-black hover:text-white transition"
            >
              Join Now
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}