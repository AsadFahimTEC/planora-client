"use client";

import { useState, useEffect } from "react";
import {
  Menu,
  X,
  Calendar,
  Inbox,
  Star,
  Settings as SettingsIcon,
  Plus,
  Edit,
  Trash,
  Check,
  XCircle,
} from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { Toaster, toast } from "sonner"; // ✅ Sonner Toast

interface EventCard {
  id: number;
  title: string;
  date: string;
  time: string;
  venue: string;
  description: string;
  isPublic: boolean;
  fee: number;
}

interface InvitationCard {
  id: number;
  eventId: number;
  title: string;
  date: string;
  organizer: string;
  fee: number;
}

interface ReviewCard {
  id: number;
  eventTitle: string;
  rating: number;
  comment: string;
}

// -------------------- Main Component --------------------
export default function DashboardPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("My Events");

  const [events, setEvents] = useState<EventCard[]>([]);
  const [invitations, setInvitations] = useState<InvitationCard[]>([]);
  const [reviews, setReviews] = useState<ReviewCard[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [modalOpen, setModalOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState<EventCard | null>(null);
  const [editingReview, setEditingReview] = useState<ReviewCard | null>(null);

  const sections = [
    { title: "My Events", icon: <Calendar className="h-5 w-5" /> },
    { title: "Pending Invitations", icon: <Inbox className="h-5 w-5" /> },
    { title: "My Reviews", icon: <Star className="h-5 w-5" /> },
    { title: "Settings", icon: <SettingsIcon className="h-5 w-5" /> },
  ];

  // -------------------- Fetch All Data --------------------
  const fetchData = async () => {
    try {
      setLoading(true);

      // Fetch Events
      const resEvents = await fetch("http://localhost:5000/api/events", {
        credentials: "include",
      });
      const dataEvents = await resEvents.json();
      setEvents(Array.isArray(dataEvents) ? dataEvents : dataEvents.data || []);

      // Fetch Invitations
      const resInvites = await fetch("http://localhost:5000/api/invitations", {
        credentials: "include",
      });
      const dataInvites = await resInvites.json();
      setInvitations(
        Array.isArray(dataInvites) ? dataInvites : dataInvites.data || [],
      );

      // Fetch Reviews
      const resReviews = await fetch("http://localhost:5000/api/reviews", {
        credentials: "include",
      });
      const dataReviews = await resReviews.json();
      setReviews(
        Array.isArray(dataReviews) ? dataReviews : dataReviews.data || [],
      );
    } catch (err: any) {
      setError(err.message || "Failed to fetch data");
      toast.error(err.message || "Failed to fetch data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // -------------------- Event Actions --------------------
  const handleDeleteEvent = async (id: number) => {
    if (!confirm("Delete this event?")) return;
    try {
      const res = await fetch(`http://localhost:5000/api/events/${id}`, {
        method: "DELETE",
        credentials: "include",
      });
      if (!res.ok) throw new Error("Failed to delete event");
      toast.success("Event deleted successfully!");
      fetchData();
    } catch (err: any) {
      toast.error(err.message);
    }
  };

  // -------------------- Invitation Actions --------------------
  const handleAcceptInvite = async (invite: InvitationCard) => {
    try {
      const url =
        invite.fee > 0
          ? `http://localhost:5000/api/invitations/${invite.id}/pay`
          : `http://localhost:5000/api/invitations/${invite.id}/accept`;
      const res = await fetch(url, { method: "POST", credentials: "include" });
      if (!res.ok) throw new Error("Failed to accept invitation");
      toast.success("Invitation accepted successfully!");
      fetchData();
    } catch (err: any) {
      toast.error(err.message);
    }
  };

  const handleDeclineInvite = async (id: number) => {
    try {
      const res = await fetch(
        `http://localhost:5000/api/invitations/${id}/decline`,
        { method: "POST", credentials: "include" },
      );
      if (!res.ok) throw new Error("Failed to decline invitation");
      toast.success("Invitation declined");
      fetchData();
    } catch (err: any) {
      toast.error(err.message);
    }
  };

  // -------------------- Review Actions --------------------
  const handleDeleteReview = async (id: number) => {
    if (!confirm("Delete this review?")) return;
    try {
      const res = await fetch(`http://localhost:5000/api/reviews/${id}`, {
        method: "DELETE",
        credentials: "include",
      });
      if (!res.ok) throw new Error("Failed to delete review");
      toast.success("Review deleted successfully!");
      fetchData();
    } catch (err: any) {
      toast.error(err.message);
    }
  };

  const handleUpdateReview = async (e: any) => {
    e.preventDefault();
    const form = e.target;
    const body = {
      rating: Number(form.rating.value),
      comment: form.comment.value,
    };
    try {
      const res = await fetch(
        `http://localhost:5000/api/reviews/${editingReview?.id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify(body),
        },
      );
      if (!res.ok) throw new Error("Failed to update review");
      toast.success("Review updated successfully!");
      setEditingReview(null);
      fetchData();
    } catch (err: any) {
      toast.error(err.message);
    }
  };

  const renderActionButton = (event: EventCard) => {
    let buttonText = "";
    let buttonClass = "";

    if (event.type === "Public" && event.fee === "Free") {
      buttonText = "Join";
      buttonClass = "bg-emerald-500 text-white hover:bg-emerald-600";
    } else if (event.type === "Public" && event.fee === "Paid") {
      buttonText = "Pay & Join";
      buttonClass = "bg-indigo-600 text-white hover:bg-indigo-700";
    } else if (event.type === "Private" && event.fee === "Free") {
      buttonText = "Request";
      buttonClass = "bg-yellow-500 text-black hover:bg-yellow-600";
    } else {
      buttonText = "Pay & Request";
      buttonClass = "bg-red-500 text-white hover:bg-red-600";
    }

    return (
      <Link
        href={`/dashboard/${event.id}`}
        className={`px-4 py-2 rounded-full font-semibold transition ${buttonClass}`}
      >
        {buttonText}
      </Link>
    );
  };

  // -------------------- Render --------------------
  return (
    <div className="flex min-h-screen flex-col lg:flex-row bg-slate-100 dark:bg-slate-900 relative">
      {/* -------------------- Sonner Toast -------------------- */}
      <Toaster richColors position="top-right" />

      {/* Sidebar */}
      <aside
        className={cn(
          "bg-gradient-to-b from-indigo-500 to-pink-500 text-white w-64 fixed lg:relative h-full z-50 transition-transform",
          sidebarOpen ? "translate-x-0" : "-translate-x-64",
        )}
      >
        <div className="flex justify-between p-6">
          <h1 className="text-xl font-bold">Dashboard</h1>
          <button onClick={() => setSidebarOpen(false)} className="lg:hidden">
            <X />
          </button>
        </div>

        {sections.map((section) => (
          <button
            key={section.title}
            onClick={() => setActiveSection(section.title)}
            className={cn(
              "flex items-center gap-2 w-full px-6 py-3 hover:bg-white/20",
              activeSection === section.title && "bg-white/30",
            )}
          >
            {section.icon}
            {section.title}
          </button>
        ))}
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col">
        <header className="lg:hidden flex justify-between p-4">
          <button onClick={() => setSidebarOpen(true)}>
            <Menu className="h-6 w-6" />
          </button>
          <h2>{activeSection}</h2>
        </header>

        <main className="p-6">
          <h2 className="text-2xl font-bold mb-6">{activeSection}</h2>

          {/* Event Cards */}
          {!loading && !error && activeSection === "My Events" && (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {events.map((event) => (
                <div
                  key={event.id}
                  className="bg-white dark:bg-slate-800 p-5 rounded-xl shadow flex flex-col justify-between"
                >
                  <div>
                    <h3 className="text-lg font-bold">{event.title}</h3>
                    <p>Date: {event.date}</p>
                    <p>Organizer: {event.organizer}</p>
                    <span className="text-sm">{event.fee}</span>
                  </div>

                  <div className="flex gap-2 mt-4">
                    <button
                      onClick={() => {
                        setEditingEvent(event);
                        setModalOpen(true);
                      }}
                      className="bg-yellow-500 text-white px-3 py-1 rounded"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteEvent(event.id)}
                      className="bg-red-500 text-white px-3 py-1 rounded"
                    >
                      Delete
                    </button>
                    {renderActionButton(event)}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Modal for Editing Event */}
          {modalOpen && editingEvent && (
            <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
              <div className="bg-white dark:bg-slate-800 p-6 rounded-xl w-96">
                <h2 className="text-xl font-bold mb-4">Edit Event</h2>
                <form
                  onSubmit={async (e) => {
                    e.preventDefault();
                    const body = {
                      title: e.currentTarget.title.value,
                      date: e.currentTarget.date.value,
                      time: e.currentTarget.time.value,
                      venue: e.currentTarget.venue.value,
                      description: e.currentTarget.description.value,
                      fee: Number(e.currentTarget.fee.value),
                      isPublic: e.currentTarget.isPublic.checked,
                    };
                    try {
                      const res = await fetch(
                        `http://localhost:5000/api/events/${editingEvent.id}`,
                        {
                          method: "PUT",
                          headers: { "Content-Type": "application/json" },
                          credentials: "include",
                          body: JSON.stringify(body),
                        },
                      );
                      if (!res.ok) throw new Error("Failed to update event");
                      toast.success("Event updated successfully!");
                      setModalOpen(false);
                      setEditingEvent(null);
                      fetchAllData(); // refetch events
                    } catch (err: any) {
                      toast.error(err.message);
                    }
                  }}
                  className="flex flex-col gap-3"
                >
                  <input
                    type="text"
                    name="title"
                    defaultValue={editingEvent.title}
                    placeholder="Title"
                    className="border p-2 rounded"
                    required
                  />
                  <input
                    type="date"
                    name="date"
                    defaultValue={editingEvent.date}
                    className="border p-2 rounded"
                    required
                  />
                  <input
                    type="time"
                    name="time"
                    defaultValue={editingEvent.time}
                    className="border p-2 rounded"
                    required
                  />
                  <input
                    type="text"
                    name="venue"
                    defaultValue={editingEvent.venue}
                    placeholder="Venue"
                    className="border p-2 rounded"
                    required
                  />
                  <textarea
                    name="description"
                    defaultValue={editingEvent.description}
                    placeholder="Description"
                    className="border p-2 rounded"
                    required
                  />
                  <input
                    type="number"
                    name="fee"
                    defaultValue={editingEvent.fee}
                    placeholder="Fee"
                    className="border p-2 rounded"
                    required
                  />
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      name="isPublic"
                      defaultChecked={editingEvent.isPublic}
                    />
                    Public Event
                  </label>
                  <div className="flex justify-end gap-2 mt-2">
                    <button
                      type="button"
                      onClick={() => setModalOpen(false)}
                      className="px-4 py-2 rounded bg-gray-300"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 rounded bg-indigo-500 text-white"
                    >
                      Save
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
