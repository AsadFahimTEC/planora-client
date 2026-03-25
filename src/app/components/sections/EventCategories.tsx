"use client";

import { useState } from "react";

type EventType = "Public" | "Private";
type EventFee = "Free" | "Paid";
type FilterType =
  | "All"
  | "Public Free"
  | "Public Paid"
  | "Private Free"
  | "Private Paid";

interface CategoryCard {
  id: number;
  title: string;
  type: EventType;
  fee: EventFee;
  description: string;
}

const categories: CategoryCard[] = [
  { id: 1, title: "Community Meetup", type: "Public", fee: "Free", description: "Open to everyone, no cost to join." },
  { id: 2, title: "Tech Workshop", type: "Public", fee: "Paid", description: "Learn from experts, registration required." },
  { id: 3, title: "Private Networking", type: "Private", fee: "Free", description: "Invite-only, exclusive access." },
  { id: 4, title: "VIP Seminar", type: "Private", fee: "Paid", description: "Premium private event with registration fee." },
  { id: 5, title: "Startup Pitch", type: "Public", fee: "Paid", description: "Public event for entrepreneurs." },
  { id: 6, title: "Yoga Retreat", type: "Private", fee: "Free", description: "Relaxing private event for wellness." },
];

const filters: FilterType[] = [
  "All",
  "Public Free",
  "Public Paid",
  "Private Free",
  "Private Paid",
];

const gradients = [
  "bg-gradient-to-br from-indigo-400 to-purple-500",
  "bg-gradient-to-br from-pink-400 to-red-500",
  "bg-gradient-to-br from-green-400 to-teal-500",
  "bg-gradient-to-br from-yellow-400 to-orange-500",
  "bg-gradient-to-br from-cyan-400 to-blue-500",
  "bg-gradient-to-br from-purple-400 to-pink-500",
];

export default function EventCategories() {
  const [activeFilter, setActiveFilter] = useState<FilterType>("All");

  const filteredCategories = categories.filter((cat) => {
    if (activeFilter === "All") return true;
    const [type, fee] = activeFilter.split(" ") as [EventType, EventFee];
    return cat.type === type && cat.fee === fee;
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
            Explore events by access type and pricing model
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

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCategories.length > 0 ? (
            filteredCategories.map((cat, idx) => {
              const gradient = gradients[idx % gradients.length];
              return (
                <div
                  key={cat.id}
                  className={`rounded-3xl p-6 transition-all duration-500 transform hover:-translate-y-2 shadow-md hover:shadow-xl text-white ${gradient} animate-fadeUp`}
                  style={{ animationDelay: `${idx * 0.15}s` }}
                >
                  <h3 className="text-2xl font-bold mb-3">{cat.title}</h3>

                  <div className="flex gap-3 mb-4">
                    <span className="px-3 py-1 text-xs font-semibold rounded-full bg-white/30 text-white">
                      {cat.type}
                    </span>
                    <span className="px-3 py-1 text-xs font-semibold rounded-full bg-black/30 text-white">
                      {cat.fee}
                    </span>
                  </div>

                  <p className="text-sm leading-relaxed">{cat.description}</p>
                </div>
              );
            })
          ) : (
            <div className="col-span-full text-center text-slate-500 dark:text-slate-400 text-lg">
              No events found for this category.
            </div>
          )}
        </div>
      </div>

      {/* Animation */}
      <style jsx>{`
        @keyframes fadeUp {
          0% { opacity: 0; transform: translateY(20px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeUp {
          opacity: 0;
          animation: fadeUp 0.7s ease forwards;
        }
      `}</style>
    </section>
  );
}