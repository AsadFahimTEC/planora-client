"use client";

import Link from "next/link";

interface EventCard {
  id: number;
  title: string;
  date: string;
  organizer: string;
  fee: "Free" | "Paid";
  link: string;
}

const dummyEvents: EventCard[] = [
  { id: 1, title: "Music Festival", date: "Apr 10, 2026", organizer: "ABC Corp", fee: "Free", link: "/events/1" },
  { id: 2, title: "Tech Meetup", date: "Apr 12, 2026", organizer: "Techies", fee: "Paid", link: "/events/2" },
  { id: 3, title: "Art Expo", date: "Apr 15, 2026", organizer: "Creative Minds", fee: "Free", link: "/events/3" },
  { id: 4, title: "Startup Pitch", date: "Apr 18, 2026", organizer: "InnovateX", fee: "Paid", link: "/events/4" },
  { id: 5, title: "Cooking Workshop", date: "Apr 20, 2026", organizer: "Chef Club", fee: "Free", link: "/events/5" },
  { id: 6, title: "Yoga Retreat", date: "Apr 22, 2026", organizer: "Healthy Life", fee: "Paid", link: "/events/6" },
  { id: 7, title: "Photography Walk", date: "Apr 25, 2026", organizer: "Photo Pros", fee: "Free", link: "/events/7" },
  { id: 8, title: "Dance Workshop", date: "Apr 28, 2026", organizer: "Dance Club", fee: "Paid", link: "/events/8" },
  { id: 9, title: "Startup Seminar", date: "May 1, 2026", organizer: "BizHub", fee: "Free", link: "/events/9" },
];

const gradients = [
  "bg-gradient-to-br from-indigo-400 to-purple-500",
  "bg-gradient-to-br from-pink-400 to-red-500",
  "bg-gradient-to-br from-green-400 to-teal-500",
  "bg-gradient-to-br from-yellow-400 to-orange-500",
  "bg-gradient-to-br from-cyan-400 to-blue-500",
  "bg-gradient-to-br from-purple-400 to-pink-500",
  "bg-gradient-to-br from-rose-400 to-fuchsia-500",
  "bg-gradient-to-br from-lime-400 to-emerald-500",
  "bg-gradient-to-br from-indigo-300 to-sky-500",
];

export default function UpcomingEventsSlider() {
  return (
    <section className="py-20 bg-slate-100 dark:bg-slate-900 transition-colors duration-500">
      <div className="max-w-7xl mx-auto px-6">

        {/* Section Heading */}
        <div className="text-center mb-14">
          <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white">
            Upcoming Events
          </h2>
          <p className="mt-4 text-lg text-slate-600 dark:text-slate-400">
            Discover and join exciting events happening soon
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {dummyEvents.map((event, idx) => (
            <div
              key={event.id}
              className={`rounded-3xl p-6 shadow-md border border-slate-300 dark:border-slate-700
                          text-white transition-transform duration-500 transform hover:-translate-y-2 hover:shadow-xl
                          ${gradients[idx % gradients.length]} animate-fadeUp`}
              style={{ animationDelay: `${idx * 0.15}s` }}
            >
              {/* Title */}
              <h3 className="text-2xl font-bold mb-2">{event.title}</h3>

              {/* Date */}
              <p className="text-sm mb-1">{event.date}</p>

              {/* Organizer */}
              <p className="text-sm mb-4">Organizer: {event.organizer}</p>

              {/* Fee Badge */}
              <span
                className={`inline-block px-3 py-1 rounded-full text-xs font-semibold mb-4 ${
                  event.fee === "Free"
                    ? "bg-white/30 text-white"
                    : "bg-black/30 text-white"
                }`}
              >
                {event.fee}
              </span>

              {/* Button */}
              <Link
                href={event.link}
                className="block text-center mt-4 px-4 py-2 rounded-full font-semibold
                           bg-white text-black hover:bg-black hover:text-white transition-colors duration-300 shadow-md hover:shadow-lg"
              >
                Join Now
              </Link>
            </div>
          ))}
        </div>
      </div>

      {/* Simple Fade-Up Animation */}
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