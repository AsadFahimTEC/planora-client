"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";

interface EventCard {
  id: string;
  title: string;
  date: string; // ISO string
  organizer: string;
  fee: "Free" | "Paid";
  type: "Public" | "Private";
  link?: string; // optional from API
  description?: string;
}

export default function EventDetailsPage() {
  const params = useParams();
  const eventId = params?.id;

  const [event, setEvent] = useState<EventCard | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!eventId) return;

    const fetchEvent = async () => {
      try {
        setLoading(true);
        setError("");

        const token = localStorage.getItem("token"); // JWT auth if needed
        const res = await fetch(`http://localhost:5000/api/events/${eventId}`, {
          headers: {
            "Content-Type": "application/json",
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
          },
          credentials: "include",
        });

        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.message || "Failed to fetch event");
        }

        setEvent(data.data || data); // backend might wrap data
      } catch (err: any) {
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
  }, [eventId]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-indigo-500 border-dashed rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error) {
    return (
      <section className="py-24 bg-slate-100 dark:bg-slate-900 min-h-screen flex items-center justify-center">
        <h2 className="text-2xl md:text-4xl font-bold text-red-500 text-center">{error}</h2>
      </section>
    );
  }

  if (!event) {
    return (
      <section className="py-24 bg-slate-100 dark:bg-slate-900 min-h-screen flex items-center justify-center">
        <h2 className="text-2xl md:text-4xl font-bold text-slate-900 dark:text-white text-center">
          Event not found
        </h2>
      </section>
    );
  }

  // Format date
  const formattedDate = new Date(event.date).toLocaleDateString("en-US", {
    weekday: "long",
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  // Ensure href is always defined
  const eventLink = event.link || `/events/${event.id}`;

  // Action button
  const getActionButton = () => {
    let label = "";
    let bgClass = "";

    if (event.type === "Public" && event.fee === "Free") {
      label = "Join";
      bgClass =
        "bg-emerald-500 hover:bg-emerald-600 dark:bg-emerald-400 dark:hover:bg-emerald-500";
    } else if (event.type === "Public" && event.fee === "Paid") {
      label = "Pay & Join";
      bgClass =
        "bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600";
    } else if (event.type === "Private" && event.fee === "Free") {
      label = "Request to Join";
      bgClass =
        "bg-yellow-500 hover:bg-yellow-600 dark:bg-yellow-400 dark:hover:bg-yellow-500";
    } else if (event.type === "Private" && event.fee === "Paid") {
      label = "Pay & Request";
      bgClass =
        "bg-rose-500 hover:bg-rose-600 dark:bg-rose-400 dark:hover:bg-rose-500";
    }

    return (
      <Link
        href={eventLink}
        className={`inline-block px-6 py-3 font-bold text-white rounded-full shadow-lg transition-all duration-300 ${bgClass}`}
      >
        {label}
      </Link>
    );
  };

  return (
    <section className="py-16 bg-slate-100 dark:bg-slate-900 transition-colors duration-500 min-h-screen">
      <div className="max-w-4xl mx-auto px-6">
        <div className="bg-slate-200/70 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-3xl p-8 shadow-md hover:shadow-xl transition-all duration-500">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-slate-900 dark:text-white text-center">
            {event.title}
          </h1>

          <div className="flex justify-center gap-4 mb-4">
            <span className="px-3 py-1 rounded-full text-sm font-semibold bg-indigo-200 text-indigo-800 dark:bg-indigo-500/20 dark:text-indigo-300">
              {event.type}
            </span>
            <span
              className={`px-3 py-1 rounded-full text-sm font-semibold ${
                event.fee === "Free"
                  ? "bg-emerald-200 text-emerald-800 dark:bg-emerald-500/20 dark:text-emerald-300"
                  : "bg-rose-200 text-rose-800 dark:bg-rose-500/20 dark:text-rose-300"
              }`}
            >
              {event.fee}
            </span>
          </div>

          <p className="text-center text-slate-700 dark:text-slate-400 text-md md:text-lg mb-2">
            Date: {formattedDate}
          </p>
          <p className="text-center text-slate-700 dark:text-slate-400 text-md md:text-lg mb-6">
            Organizer: {event.organizer}
          </p>

          <div className="bg-slate-300/50 dark:bg-slate-700 p-6 rounded-2xl mb-6 text-slate-800 dark:text-slate-200">
            <h2 className="text-2xl font-bold mb-2">Event Description</h2>
            <p>{event.description || "No description provided for this event."}</p>
          </div>

          <div className="flex justify-center">{getActionButton()}</div>
        </div>
      </div>
    </section>
  );
}