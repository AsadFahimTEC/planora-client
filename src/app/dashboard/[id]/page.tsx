"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { Toaster, toast } from "sonner";
import { Plus, Users } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import DashboardModal from "@/app/components/DashboardModal";

interface EventCard {
  id: number;
  title: string;
  date: string;
  time: string;
  venue: string;
  description: string;
  organizer: string;
  fee: "Free" | "Paid";
  type: "Public" | "Private";
  link: string;
  participants?: string[];
  approvals?: string[];
}

interface Review {
  id: number;
  title: string;
  rating: number;
  studentId?: string;
  tutorId?: string;
}

export default function DashboardDetailsPage() {
  const { id } = useParams(); // Can be used to fetch specific dashboard data
  const [events, setEvents] = useState<EventCard[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [activeSection, setActiveSection] = useState<"Events" | "Reviews">("Events");
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true);

  // Fetch Events
  const fetchEvents = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/events");
      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
      const data = await res.json();
      setEvents(data.data || []);
    } catch (err: any) {
      toast.error(`Failed to load events: ${err.message}`);
    }
  };

  // Fetch Reviews
  const fetchReviews = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/reviews");
      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
      const data = await res.json();
      setReviews(data.data || []);
    } catch (err: any) {
      toast.error(`Failed to load reviews: ${err.message}`);
    }
  };

  // Fetch all data on component mount
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await Promise.all([fetchEvents(), fetchReviews()]);
      setLoading(false);
    };
    fetchData();
  }, []);

  const handleCreateEvent = () => {
    setShowModal(true);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <div className="w-16 h-16 border-4 border-indigo-500 border-dashed rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-6 max-w-7xl mx-auto">
      <Toaster richColors position="top-right" />

      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Dashboard</h1>
        {activeSection === "Events" && (
          <button
            onClick={handleCreateEvent}
            className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-full hover:bg-indigo-700 transition"
          >
            <Plus className="w-5 h-5" /> Create Event
          </button>
        )}
      </div>

      {/* Tabs */}
      <div className="flex gap-4 mb-6">
        {["Events", "Reviews"].map((section) => (
          <button
            key={section}
            onClick={() => setActiveSection(section as any)}
            className={cn(
              "px-4 py-2 rounded-full font-semibold transition",
              activeSection === section
                ? "bg-indigo-600 text-white"
                : "bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-white hover:bg-indigo-500/80"
            )}
          >
            {section}
          </button>
        ))}
      </div>

      {/* Events Section */}
      {activeSection === "Events" && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.length > 0 ? (
            events.map((event) => (
              <div
                key={event.id}
                className="bg-slate-200/70 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-3xl p-6 shadow-md hover:shadow-xl transition flex flex-col justify-between"
              >
                <div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">{event.title}</h3>
                  <p className="text-slate-700 dark:text-slate-400 mb-1">Date: {event.date}</p>
                  <p className="text-slate-700 dark:text-slate-400 mb-1">Time: {event.time}</p>
                  <p className="text-slate-700 dark:text-slate-400 mb-1">Venue: {event.venue}</p>
                  <p className="text-slate-700 dark:text-slate-400 mb-2">Description: {event.description}</p>
                  <p className="text-slate-700 dark:text-slate-400 mb-1">Organizer: {event.organizer}</p>
                  <span
                    className={cn(
                      "inline-block px-3 py-1 text-xs font-semibold rounded-full mb-4",
                      event.fee === "Free"
                        ? "bg-emerald-200 text-emerald-800 dark:bg-emerald-500/20 dark:text-emerald-300"
                        : "bg-rose-200 text-rose-800 dark:bg-rose-500/20 dark:text-rose-300"
                    )}
                  >
                    {event.fee} - {event.type}
                  </span>
                </div>

                <div className="mt-4 flex flex-wrap gap-2">
                  <Link
                    href={event.link}
                    className="flex items-center gap-1 px-3 py-2 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 transition text-sm font-semibold"
                  >
                    <Users className="w-4 h-4" /> View / Manage
                  </Link>
                </div>
              </div>
            ))
          ) : (
            <p className="col-span-full text-center text-gray-500 dark:text-slate-400">No events found.</p>
          )}
        </div>
      )}

      {/* Reviews Section */}
      {activeSection === "Reviews" && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.length > 0 ? (
            reviews.map((review) => (
              <div
                key={review.id}
                className="bg-slate-200/70 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-3xl p-6 shadow-md hover:shadow-xl transition"
              >
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">{review.title}</h3>
                <p className="text-slate-700 dark:text-slate-400">Rating: {"⭐".repeat(review.rating)}</p>
                {review.studentId && <p className="text-slate-700 dark:text-slate-400 text-sm">Student ID: {review.studentId}</p>}
                {review.tutorId && <p className="text-slate-700 dark:text-slate-400 text-sm">Tutor ID: {review.tutorId}</p>}
              </div>
            ))
          ) : (
            <p className="col-span-full text-center text-gray-500 dark:text-slate-400">No reviews found.</p>
          )}
        </div>
      )}

      {/* Modal */}
      {showModal && <DashboardModal onClose={() => setShowModal(false)} />}
    </div>
  );
}