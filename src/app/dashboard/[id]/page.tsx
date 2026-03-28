"use client";

import { useEffect, useState } from "react";
import { Plus, X } from "lucide-react";
import { Toaster, toast } from "sonner";
import { cn } from "@/lib/utils";

// Interfaces
interface EventCard {
  id: number;
  title: string;
  startDate: string;
  endDate: string;
  venue: string;
  description: string;
  type: "Public" | "Private";
  feeType: "Free" | "Paid";
  registrationFee: number;
  organizer: string;
  maxParticipants: number;
  category: string;
  status: "Upcoming" | "Completed";
  participants?: string[];
  approvals?: string[];
}

interface Review {
  id: number;
  title: string;
  rating: number;
  eventId: number;
  tutorId?: string;
  studentId?: string;
}

export default function DashboardDetailsPage() {
  const [events, setEvents] = useState<EventCard[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [activeSection, setActiveSection] = useState<"Events" | "Reviews">("Events");
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Dummy event for modal creation
  const dummyEvent: EventCard = {
    id: 0,
    title: "Digital Marketing Masterclass 2026",
    startDate: "2026-11-15T10:00:00.000Z",
    endDate: "2026-11-15T16:00:00.000Z",
    venue: "BRAC CDM, Savar",
    description: "Advanced strategies for SEO, Ads, and Social Media Growth",
    type: "Public",
    feeType: "Paid",
    registrationFee: 1800,
    organizer: "Marketing Experts BD",
    maxParticipants: 300,
    category: "Marketing",
    status: "Upcoming",
    participants: [],
    approvals: [],
  };
  const [formData, setFormData] = useState<EventCard>({ ...dummyEvent });

  // Fetch events
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/events");
        if (!res.ok) throw new Error("Failed to fetch events");
        const data = await res.json();
        setEvents(data || []);
      } catch (err: any) {
        toast.error(err.message || "Error loading events");
      }
    };
    fetchEvents();
  }, []);

  // Fetch reviews
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/reviews");
        if (!res.ok) throw new Error("Failed to fetch reviews");
        const data = await res.json();
        setReviews(data || []);
      } catch (err: any) {
        toast.error(err.message || "Error loading reviews");
      }
    };
    fetchReviews();
  }, []);

  // Modal input handler
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name.includes("Fee") || name.includes("maxParticipants") ? Number(value) : value,
    }));
  };

  // Submit event locally (can connect to backend later)
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newEvent = { ...formData, id: events.length + 1 };
    setEvents([newEvent, ...events]);
    setIsModalOpen(false);
    toast.success("Event created successfully!");
  };

  return (
    <div className="p-4 md:p-6 max-w-7xl mx-auto">
      <Toaster richColors />

      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Dashboard</h1>
        {activeSection === "Events" && (
          <button onClick={() => setIsModalOpen(true)} className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-full hover:bg-indigo-700 transition">
            <Plus className="w-5 h-5" /> Create Event
          </button>
        )}
      </div>

      {/* Section Tabs */}
      <div className="flex gap-4 flex-wrap mb-6">
        {["Events", "Reviews"].map(section => (
          <button
            key={section}
            onClick={() => setActiveSection(section as any)}
            className={cn(
              "px-4 py-2 rounded-full font-semibold transition",
              activeSection === section ? "bg-indigo-600 text-white" : "bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-white hover:bg-indigo-500/80"
            )}
          >
            {section}
          </button>
        ))}
      </div>

      {/* Events Section */}
      {activeSection === "Events" && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map(event => (
            <div key={event.id} className="bg-slate-200/70 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-3xl p-6 shadow-md hover:shadow-xl transition flex flex-col justify-between">
              <div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">{event.title}</h3>
                <p className="text-slate-700 dark:text-slate-400 mb-1">Date: {new Date(event.startDate).toLocaleDateString()}</p>
                <p className="text-slate-700 dark:text-slate-400 mb-1">Time: {new Date(event.startDate).toLocaleTimeString()} - {new Date(event.endDate).toLocaleTimeString()}</p>
                <p className="text-slate-700 dark:text-slate-400 mb-1">Venue: {event.venue}</p>
                <p className="text-slate-700 dark:text-slate-400 mb-2">Description: {event.description}</p>
                <span className={cn("inline-block px-3 py-1 text-xs font-semibold rounded-full mb-4",
                  event.feeType === "Free"
                    ? "bg-emerald-200 text-emerald-800 dark:bg-emerald-500/20 dark:text-emerald-300"
                    : "bg-rose-200 text-rose-800 dark:bg-rose-500/20 dark:text-rose-300")}>
                  {event.feeType} - {event.type}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Reviews Section */}
      {activeSection === "Reviews" && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.map(review => (
            <div key={review.id} className="bg-slate-200/70 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-3xl p-6 shadow-md hover:shadow-xl transition">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">{review.title}</h3>
              <p className="text-slate-700 dark:text-slate-400">Rating: {"⭐".repeat(review.rating)}</p>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white dark:bg-slate-900 rounded-xl w-full max-w-3xl p-6 relative">
            <button onClick={() => setIsModalOpen(false)} className="absolute top-4 right-4 text-slate-700 dark:text-white"><X /></button>
            <h2 className="text-2xl font-bold mb-4">Create Event</h2>
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col">
                <label className="font-semibold mb-1">Title</label>
                <input type="text" name="title" value={formData.title} onChange={handleChange} className="p-2 border rounded" required />
              </div>
              <div className="flex flex-col">
                <label className="font-semibold mb-1">Venue</label>
                <input type="text" name="venue" value={formData.venue} onChange={handleChange} className="p-2 border rounded" required />
              </div>
              <div className="flex flex-col">
                <label className="font-semibold mb-1">Start Date & Time</label>
                <input type="datetime-local" name="startDate" value={formData.startDate.slice(0,16)} onChange={handleChange} className="p-2 border rounded" required />
              </div>
              <div className="flex flex-col">
                <label className="font-semibold mb-1">End Date & Time</label>
                <input type="datetime-local" name="endDate" value={formData.endDate.slice(0,16)} onChange={handleChange} className="p-2 border rounded" required />
              </div>
              <div className="flex flex-col md:col-span-2">
                <label className="font-semibold mb-1">Description</label>
                <textarea name="description" value={formData.description} onChange={handleChange} className="p-2 border rounded" rows={3} required />
              </div>
              <div className="flex flex-col">
                <label className="font-semibold mb-1">Type</label>
                <select name="type" value={formData.type} onChange={handleChange} className="p-2 border rounded">
                  <option value="Public">Public</option>
                  <option value="Private">Private</option>
                </select>
              </div>
              <div className="flex flex-col">
                <label className="font-semibold mb-1">Fee Type</label>
                <select name="feeType" value={formData.feeType} onChange={handleChange} className="p-2 border rounded">
                  <option value="Free">Free</option>
                  <option value="Paid">Paid</option>
                </select>
              </div>
              <div className="md:col-span-2 flex justify-end mt-2">
                <button type="submit" className="px-6 py-2 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 transition">Submit</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}