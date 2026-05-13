"use client";

import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { useState } from "react";
import { motion } from "framer-motion";

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
    const res = await fetch("https://planora-server-eta.vercel.app/api/events", {
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

  if (!isLoggedIn) return <p className="text-center py-8 text-slate-600 dark:text-slate-400">Please log in to see events.</p>;
  if (isLoading) return <div className="flex items-center justify-center py-8"><div className="animate-spin h-8 w-8 border-t-2 border-cyan-500 rounded-full" /></div>;
  if (error) return <p className="text-red-500 text-center py-8">{error.message}</p>;

  // Make sure data is always an array
  const events = data ?? [];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
      },
    },
  };

  return (
    <section className="relative py-16 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(99,102,241,0.16),_transparent_28%),radial-gradient(circle_at_bottom_left,_rgba(236,72,153,0.14),_transparent_24%),linear-gradient(180deg,_rgba(255,255,255,0.06),_rgba(15,23,42,0.4))] pointer-events-none" />
      <div className="absolute top-0 right-0 h-80 w-80 bg-gradient-to-br from-cyan-400/20 via-transparent to-fuchsia-500/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 h-60 w-60 bg-gradient-to-tr from-emerald-400/20 via-transparent to-cyan-400/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-12 text-center"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-cyan-300 via-indigo-400 to-fuchsia-500 bg-clip-text text-transparent">
            Upcoming Events
          </h2>
          <p className="text-slate-300 max-w-2xl mx-auto">
            Discover and join exciting events happening near you. Don't miss out on amazing opportunities!
          </p>
        </motion.div>

        {events.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center py-12"
          >
            <p className="text-slate-400">No events available at the moment.</p>
          </motion.div>
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {events.map((event, index) => (
              <motion.div
                key={event.id}
                variants={cardVariants}
                whileHover={{ y: -8, scale: 1.02 }}
                className="group relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-slate-800/80 via-slate-900/60 to-slate-950/80 p-6 shadow-xl backdrop-blur-xl transition-all duration-300 hover:shadow-[0_20px_80px_-40px_rgba(59,130,246,0.3)] cursor-pointer"
              >
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-transparent to-fuchsia-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {/* Animated border */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-cyan-500/20 via-transparent to-fuchsia-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur" />

                {/* Content */}
                <div className="relative z-10">
                  <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs uppercase tracking-[0.12em] text-cyan-300">
                    <span className="h-2 w-2 rounded-full bg-cyan-400 animate-pulse" />
                    Event
                  </div>

                  <h3 className="text-xl font-bold mb-3 text-white group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-cyan-300 group-hover:to-fuchsia-400 group-hover:bg-clip-text transition-all duration-300">
                    {event.title}
                  </h3>

                  <div className="space-y-2 mb-4 text-sm text-slate-300">
                    <p className="flex items-center gap-2">
                      <span className="text-cyan-400">📅</span>
                      {new Date(event.date).toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })}
                    </p>
                    <p className="flex items-center gap-2">
                      <span className="text-emerald-400">👤</span>
                      {event.organizer}
                    </p>
                    <p className="flex items-center gap-2">
                      <span className="text-fuchsia-400">💰</span>
                      {event.fee === 0 ? (
                        <span className="font-semibold text-emerald-400">Free</span>
                      ) : (
                        <span className="font-semibold text-emerald-400">৳ {event.fee}</span>
                      )}
                    </p>
                  </div>

                  <button className="w-full mt-4 px-4 py-2 rounded-lg bg-gradient-to-r from-cyan-500 via-indigo-500 to-fuchsia-500 text-white font-semibold text-sm hover:shadow-[0_15px_60px_-15px_rgba(59,130,246,0.4)] transition-all duration-300 hover:-translate-y-0.5">
                    View Details
                  </button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>

      <style jsx>{`
        @keyframes pulse {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.5;
          }
        }

        .animate-pulse {
          animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
      `}</style>
    </section>
  );
}