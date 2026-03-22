"use client";

import Link from "next/link";
import { useParams } from "next/navigation";

// Event type
interface EventCard {
  id: number;
  title: string;
  date: string;
  organizer: string;
  fee: "Free" | "Paid";
  type: "Public" | "Private";
  link: string;
  description?: string;
}

// Dummy events data
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

export default function EventDetailsPage() {
  const params = useParams();
  const eventId = Number(params?.id);

  // Find the event dynamically from the array
  const event = dummyEvents.find((e) => e.id === eventId);

  if (!event) {
    return (
      <section className="py-24 bg-slate-100 dark:bg-slate-900 min-h-screen flex items-center justify-center">
        <h2 className="text-2xl md:text-4xl font-bold text-slate-900 dark:text-white text-center">
          Event not found
        </h2>
      </section>
    );
  }

  return (
    <section className="py-16 bg-slate-100 dark:bg-slate-900 transition-colors duration-500 min-h-screen">
      <div className="max-w-4xl mx-auto px-6">
        {/* Event Card */}
        <div className="bg-slate-200/70 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-3xl p-8 shadow-md hover:shadow-xl transition-all duration-500">
          
          {/* Title */}
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-slate-900 dark:text-white text-center">
            {event.title}
          </h1>

          {/* Type & Fee */}
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

          {/* Date & Organizer */}
          <p className="text-center text-slate-700 dark:text-slate-400 text-md md:text-lg mb-2">
            Date: {event.date}
          </p>
          <p className="text-center text-slate-700 dark:text-slate-400 text-md md:text-lg mb-6">
            Organizer: {event.organizer}
          </p>

          {/* Description */}
          <div className="bg-slate-300/50 dark:bg-slate-700 p-6 rounded-2xl mb-6 text-slate-800 dark:text-slate-200">
            <h2 className="text-2xl font-bold mb-2">Event Description</h2>
            <p>{event.description || "No description provided for this event."}</p>
          </div>

          {/* Join Button */}
          <div className="flex justify-center">
            <Link
              href={event.link}
              className="inline-block px-6 py-3 font-bold text-white bg-indigo-600 rounded-full shadow-lg hover:shadow-2xl hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 transition-all duration-300"
            >
              Join Event
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}