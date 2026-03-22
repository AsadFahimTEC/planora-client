"use client";

import { useState } from "react";
import Link from "next/link";

interface EventCard {
  id: number;
  title: string;
  date: string;
  organizer: string;
  fee: "Free" | "Paid";
  type: "Public" | "Private";
  link: string;
}

const dummyEvents: EventCard[] = [
  { id: 1, title: "Music Festival", date: "Apr 10, 2026", organizer: "ABC Corp", fee: "Free", type: "Public", link: "/events/1" },
  { id: 2, title: "Tech Meetup", date: "Apr 12, 2026", organizer: "Techies", fee: "Paid", type: "Public", link: "/events/2" },
  { id: 3, title: "Art Expo", date: "Apr 15, 2026", organizer: "Creative Minds", fee: "Free", type: "Private", link: "/events/3" },
  { id: 4, title: "Startup Pitch", date: "Apr 18, 2026", organizer: "InnovateX", fee: "Paid", type: "Private", link: "/events/4" },
  { id: 5, title: "Cooking Workshop", date: "Apr 20, 2026", organizer: "Chef Club", fee: "Free", type: "Public", link: "/events/5" },
  { id: 6, title: "Yoga Retreat", date: "Apr 22, 2026", organizer: "Healthy Life", fee: "Paid", type: "Private", link: "/events/6" },
  { id: 7, title: "Photography Walk", date: "Apr 25, 2026", organizer: "Photo Pros", fee: "Free", type: "Public", link: "/events/7" },
  { id: 8, title: "Dance Workshop", date: "Apr 28, 2026", organizer: "Dance Club", fee: "Paid", type: "Private", link: "/events/8" },
  { id: 9, title: "Startup Seminar", date: "May 1, 2026", organizer: "BizHub", fee: "Free", type: "Public", link: "/events/9" },
];

const filters = ["All", "Public Free", "Public Paid", "Private Free", "Private Paid"];

export default function EventsPage() {
  const [search, setSearch] = useState("");
  const [activeFilter, setActiveFilter] = useState<string>("All");

  const filteredEvents = dummyEvents.filter((event) => {
    const matchesSearch =
      event.title.toLowerCase().includes(search.toLowerCase()) ||
      event.organizer.toLowerCase().includes(search.toLowerCase());

    if (activeFilter === "All") return matchesSearch;

    const [type, fee] = activeFilter.split(" ");
    return matchesSearch && event.type === type && event.fee === fee;
  });

  return (
    <section className="py-16 bg-slate-100 dark:bg-slate-900 transition-colors duration-500 min-h-screen">
      <div className="max-w-7xl mx-auto px-6">
        {/* Heading */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white">
            Explore Events
          </h1>
          <p className="mt-3 text-lg md:text-xl text-slate-600 dark:text-slate-400">
            Search and join events that match your interests
          </p>
        </div>

        {/* Search Input */}
        <div className="flex flex-col sm:flex-row justify-center gap-4 mb-8">
          <input
            type="text"
            placeholder="Search by title or organizer..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full sm:w-1/2 px-4 py-2 rounded-full border border-slate-300 dark:border-slate-700 dark:bg-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
          />
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
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

        {/* Event Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredEvents.length > 0 ? (
            filteredEvents.map((event) => (
              <div
                key={event.id}
                className="rounded-3xl p-6 shadow-md hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2
                  bg-slate-200/70 dark:bg-slate-800 border border-slate-300 dark:border-slate-700"
              >
                <h3 className="text-2xl font-bold mb-2 text-slate-900 dark:text-white">
                  {event.title}
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 mb-1">{event.date}</p>
                <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
                  Organizer: {event.organizer}
                </p>

                <span
                  className={`inline-block px-3 py-1 rounded-full text-xs font-semibold mb-4 ${
                    event.fee === "Free"
                      ? "bg-emerald-200 text-emerald-800 dark:bg-emerald-500/20 dark:text-emerald-300"
                      : "bg-rose-200 text-rose-800 dark:bg-rose-500/20 dark:text-rose-300"
                  }`}
                >
                  {event.fee}
                </span>

                <Link
                  href={event.link}
                  className="block text-center mt-4 px-4 py-2 rounded-full font-semibold transition-all duration-300
                    bg-indigo-600 text-white hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600"
                >
                  View Details
                </Link>
              </div>
            ))
          ) : (
            <p className="col-span-full text-center text-gray-500 dark:text-slate-400 text-lg">
              No events found.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}