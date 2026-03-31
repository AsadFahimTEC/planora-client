"use client";

import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { useState } from "react";

interface Event {
  id: number;
  title: string;
  date: string;
  fee: number;
  organizer: string;
  isPublic: boolean;
}

export default function UpcomingEventsSlider() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  const fetchEvents = async (): Promise<Event[]> => {
    const res = await fetch("http://localhost:5000/api/events", {
      credentials: "include",
    });
    if (!res.ok) throw new Error("Failed to fetch events");

    const result = await res.json();

    // Normalize data: support { data: [...] } or direct array
    if (Array.isArray(result)) return result;
    if (Array.isArray(result.data)) return result.data;

    return []; // fallback to empty array
  };

  const queryOptions: UseQueryOptions<Event[], Error, Event[], ["events"]> = {
    queryKey: ["events"],
    queryFn: fetchEvents,
    retry: 1,
    // @ts-ignore
    onError: (err: Error) => {
      console.error("Fetch events error:", err.message);
      if (err.message.includes("Unauthorized")) {
        setIsLoggedIn(false);
      }
    },
  };

  const { data, error, isLoading } = useQuery(queryOptions);

  if (!isLoggedIn) return <p>Please log in to see events.</p>;
  if (isLoading) return <p>Loading events...</p>;
  if (error) return <p className="text-red-500">{error.message}</p>;

  // Make sure data is always an array
  const events = data ?? [];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {events.map((event) => (
        <div
          key={event.id}
          className="bg-white dark:bg-slate-800 p-5 rounded-xl shadow"
        >
          <h3 className="font-bold">{event.title}</h3>
          <p>Date: {new Date(event.date).toLocaleDateString()}</p>
          <p>Organizer: {event.organizer}</p>
          <p>Fee: {event.fee === 0 ? "Free" : `৳ ${event.fee}`}</p>
        </div>
      ))}
    </div>
  );
}