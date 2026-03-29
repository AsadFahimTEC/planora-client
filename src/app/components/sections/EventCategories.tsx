"use client";

import { useState, useEffect } from "react";

type EventType = "Public" | "Private";
type EventFee = "Free" | "Paid";

interface EventCard {
  id: string;
  title: string;
  type: EventType;
  fee: EventFee;
  date: string;
  time: string;
  venue: string;
  description: string;
}

export default function EventDashboard() {
  const [events, setEvents] = useState<EventCard[]>([]);
  const [filters, setFilters] = useState<string[]>(["All"]);
  const [activeFilter, setActiveFilter] = useState<string>("All");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const gradients = [
    "bg-gradient-to-br from-indigo-400 to-purple-500",
    "bg-gradient-to-br from-pink-400 to-red-500",
    "bg-gradient-to-br from-green-400 to-teal-500",
    "bg-gradient-to-br from-yellow-400 to-orange-500",
    "bg-gradient-to-br from-cyan-400 to-blue-500",
    "bg-gradient-to-br from-purple-400 to-pink-500",
  ];

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true);
        setError("");

        // ✅ Use token if your backend requires auth
        const token = localStorage.getItem("token");

        const res = await fetch("http://localhost:5000/api/events", {
          headers: {
            "Content-Type": "application/json",
            Authorization: token ? `Bearer ${token}` : "",
          },
          credentials: "include", // if backend uses cookies
        });

        const result = await res.json();

        if (!res.ok) {
          throw new Error(result.message || "Failed to fetch events");
        }

        const data: EventCard[] = result.data || result;

        setEvents(data);

        // Generate dynamic filters
        const dynamicFilters = ["All"];
        data.forEach((event) => {
          const filterName = `${event.type} ${event.fee}`;
          if (!dynamicFilters.includes(filterName))
            dynamicFilters.push(filterName);
        });
        setFilters(dynamicFilters);
      } catch (err: any) {
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const filteredEvents = events.filter((event) => {
    if (activeFilter === "All") return true;
    const [type, fee] = activeFilter.split(" ") as [EventType, EventFee];
    return event.type === type && event.fee === fee;
  });

  return (
    <section className="py-24 bg-slate-100 dark:bg-slate-900 transition-colors duration-500">
      <div className="max-w-7xl mx-auto px-6">
        {/* Heading */}
        <div className="text-center mb-14">
          <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white">
            Event Categories
          </h2>
          <p className="mt-4 text-lg text-slate-600 dark:text-slate-400">
            Browse all upcoming events and filter by type & fee
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-4 mb-14">
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 border ${
                activeFilter === filter
                  ? "bg-indigo-600 text-white border-indigo-600 shadow-lg scale-105"
                  : "bg-slate-300 text-slate-800 border-slate-400 hover:bg-slate-400 dark:bg-slate-700 dark:text-slate-200 dark:border-slate-600 dark:hover:bg-slate-600"
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Loading / Error */}
        {loading && (
          <p className="text-center text-lg text-slate-600 dark:text-slate-400">
            Loading events...
          </p>
        )}
        {error && (
          <p className="text-center text-red-500 text-lg mb-4">{error}</p>
        )}

        {/* Event Cards */}
        {!loading && !error && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredEvents.length > 0 ? (
              filteredEvents.map((event, idx) => {
                const gradient = gradients[idx % gradients.length];
                const eventDateTime = new Date(`${event.date} ${event.time}`);
                return (
                  <div
                    key={event.id}
                    className={`rounded-3xl p-6 transition-all duration-500 transform hover:-translate-y-2 shadow-md hover:shadow-xl text-white ${gradient} animate-fadeUp`}
                    style={{ animationDelay: `${idx * 0.15}s` }}
                  >
                    <h3 className="text-2xl font-bold mb-3">{event.title}</h3>

                    <div className="flex gap-3 mb-4">
                      <span className="px-3 py-1 text-xs font-semibold rounded-full bg-white/30 text-white">
                        {event.type}
                      </span>
                      <span className="px-3 py-1 text-xs font-semibold rounded-full bg-black/30 text-white">
                        {event.fee}
                      </span>
                    </div>

                    {/* Format Date & Time dynamically */}
                    <p className="text-sm mb-2">
                      <span className="font-semibold">Date:</span>{" "}
                      {eventDateTime.toLocaleDateString("en-BD", {
                        weekday: "short",
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </p>
                    <p className="text-sm mb-2">
                      <span className="font-semibold">Time:</span>{" "}
                      {eventDateTime.toLocaleTimeString("en-BD", {
                        hour: "2-digit",
                        minute: "2-digit",
                        hour12: true,
                      })}
                    </p>
                    <p className="text-sm mb-2">
                      <span className="font-semibold">Venue:</span>{" "}
                      {event.venue}
                    </p>

                    <p className="text-sm leading-relaxed">
                      {event.description}
                    </p>
                  </div>
                );
              })
            ) : (
              <div className="col-span-full text-center text-slate-500 dark:text-slate-400 text-lg">
                No events found for this filter.
              </div>
            )}
          </div>
        )}
      </div>

      {/* Animation */}
      <style jsx>{`
        @keyframes fadeUp {
          0% {
            opacity: 0;
            transform: translateY(20px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeUp {
          opacity: 0;
          animation: fadeUp 0.7s ease forwards;
        }
      `}</style>
    </section>
  );
}
