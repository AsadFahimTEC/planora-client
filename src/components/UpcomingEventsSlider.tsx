"use client";

import { useQuery } from "@tanstack/react-query";
import Link from "next/link";

interface Event {
  id: number;
  title: string;
  date: string;
  organizer: string;
  fee: string;
}

// Fetch function
const fetchEvents = async (): Promise<Event[]> => {
  const res = await fetch("http://localhost:5000/api/events");
  if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
  return res.json();
};

export default function UpcomingEventsSlider() {
  const { data, error, isLoading, refetch } = useQuery({
    queryKey: ["events"],
    queryFn: fetchEvents,
  });

  if (isLoading) return <p className="text-center py-10">Loading events...</p>;

  if (error instanceof Error)
    return (
      <div className="text-center py-10">
        <p className="text-red-500 mb-2">Error loading events: {error.message}</p>
        <button
          onClick={() => refetch()}
          className="px-4 py-2 bg-indigo-600 text-white rounded-full hover:bg-indigo-700"
        >
          Retry
        </button>
      </div>
    );

  if (!data || !Array.isArray(data) || data.length === 0)
    return <p className="text-center py-10">No upcoming events found.</p>;

  return (
    <section className="py-10 max-w-7xl mx-auto px-4">
      <h2 className="text-3xl font-bold mb-6 text-center">Upcoming Events</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {data.map((event) => (
          <div
            key={event.id}
            className="p-6 rounded-2xl shadow-md border border-gray-300 dark:border-gray-700 bg-gradient-to-br from-indigo-400 to-purple-500 text-white"
          >
            <h3 className="text-xl font-bold mb-2">{event.title}</h3>
            <p className="mb-1">Date: {event.date}</p>
            <p className="mb-1">Organizer: {event.organizer}</p>
            <span className="inline-block px-3 py-1 rounded-full bg-white/30 text-white text-sm">
              {event.fee}
            </span>
            <Link
              href="#"
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