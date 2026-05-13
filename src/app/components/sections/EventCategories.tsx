"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

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

        const res = await fetch("https://planora-server-eta.vercel.app/api/events", {
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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  return (
    <section className="relative py-24 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(99,102,241,0.16),_transparent_28%),radial-gradient(circle_at_bottom_left,_rgba(236,72,153,0.14),_transparent_24%),linear-gradient(180deg,_rgba(255,255,255,0.06),_rgba(15,23,42,0.4))] pointer-events-none" />
      <div className="absolute top-0 right-0 h-80 w-80 bg-gradient-to-br from-cyan-400/20 via-transparent to-fuchsia-500/15 rounded-full blur-3xl pointer-events-none animate-float" />
      <div className="absolute bottom-10 left-10 h-60 w-60 bg-gradient-to-tr from-emerald-400/20 via-transparent to-cyan-400/10 rounded-full blur-3xl pointer-events-none animate-float-slow" />

      <div className="relative max-w-7xl mx-auto px-6">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <h2 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-cyan-300 via-indigo-400 to-fuchsia-500 bg-clip-text text-transparent">
            Event Categories
          </h2>
          <p className="mt-4 text-lg text-black/70 dark:text-white/70 max-w-2xl mx-auto">
            Browse all upcoming events and filter by type & fee
          </p>
        </motion.div>

        {/* Filter Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-4 mb-14"
        >          {filters.map((filter) => (
            <motion.button
              key={filter}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setActiveFilter(filter)}
              className={`px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 border ${
                activeFilter === filter
                  ? "bg-gradient-to-r from-cyan-500 via-indigo-500 to-fuchsia-500 text-white border-transparent shadow-[0_15px_60px_-15px_rgba(59,130,246,0.4)]"
                  : "bg-white/10 text-slate-200 border-white/20 hover:bg-white/20 hover:border-white/30 backdrop-blur-xl"
              }`}
            >
              {filter}
            </motion.button>
          ))}
        </motion.div>

        {/* Loading / Error */}
        {loading && (
          <div className="flex items-center justify-center py-8">
            <div className="animate-spin h-8 w-8 border-t-2 border-cyan-500 rounded-full" />
          </div>
        )}
        {error && (
          <p className="text-center text-red-400 text-lg mb-4">{error}</p>
        )}

        {/* Event Cards */}
        {!loading && !error && (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {filteredEvents.length > 0 ? (
              filteredEvents.map((event, idx) => {
                const gradient = gradients[idx % gradients.length];
                const eventDateTime = new Date(`${event.date} ${event.time}`);
                return (
                  <motion.div
                    key={event.id}
                    variants={itemVariants}
                    whileHover={{ y: -8, scale: 1.02 }}
                    className={`rounded-2xl p-6 transition-all duration-500 shadow-lg hover:shadow-[0_20px_80px_-40px_rgba(59,130,246,0.3)] overflow-hidden group text-white ${gradient} border border-white/10`}
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="relative z-10">
                      <h3 className="text-2xl font-bold mb-3 group-hover:translate-x-1 transition-transform">{event.title}</h3>

                      <div className="flex gap-3 mb-4">
                        <span className="px-3 py-1 text-xs font-semibold rounded-full bg-white/25 text-white backdrop-blur">
                          {event.type}
                        </span>
                        <span className="px-3 py-1 text-xs font-semibold rounded-full bg-black/25 text-white backdrop-blur">
                          {event.fee}
                        </span>
                      </div>

                      {/* Format Date & Time dynamically */}
                      <p className="text-sm mb-2 flex items-center gap-2">
                        <span>📅</span>
                        {eventDateTime.toLocaleDateString("en-BD", {
                          weekday: "short",
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}
                      </p>
                      <p className="text-sm mb-2 flex items-center gap-2">
                        <span>🕐</span>
                        {eventDateTime.toLocaleTimeString("en-BD", {
                          hour: "2-digit",
                          minute: "2-digit",
                          hour12: true,
                        })}
                      </p>
                      <p className="text-sm mb-2 flex items-center gap-2">
                        <span>📍</span>
                        {event.venue}
                      </p>

                      <p className="text-sm leading-relaxed mt-4 text-white/90">
                        {event.description}
                      </p>
                    </div>
                  </motion.div>
                );
              })
            ) : (
              <div className="col-span-full text-center text-slate-400 text-lg py-12">
                No events found for this filter.
              </div>
            )}
          </motion.div>
        )}
      </div>

      {/* Animation Styles */}
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

        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-12px); }
        }

        @keyframes floatSlow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }

        .animate-float {
          animation: float 5.5s ease-in-out infinite;
        }

        .animate-float-slow {
          animation: floatSlow 7s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
}
