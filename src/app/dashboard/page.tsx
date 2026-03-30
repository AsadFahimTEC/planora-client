"use client";

import { useState, useEffect } from "react";
import {
  Menu,
  X,
  Calendar,
  Inbox,
  Star,
  Settings as SettingsIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { toast } from "sonner";

// Types
interface EventCard {
  id: number;
  title: string;
  date: string;
  time: string;
  venue: string;
  description: string;
  organizer: string;
  fee: number;
  isPublic: boolean;
  type: "Public" | "Private";
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
  eventId: number;
  rating: number;
  comment: string;
  reviewer: string;
}

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

  const [deletingId, setDeletingId] = useState<number | null>(null);

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
      const resultEvents = await resEvents.json();
      const eventsArray = Array.isArray(resultEvents)
        ? resultEvents
        : Array.isArray(resultEvents.data)
          ? resultEvents.data
          : [];
      setEvents(
        eventsArray.map((e: any) => ({
          id: e.id,
          title: e.title,
          date: e.date ? new Date(e.date).toLocaleDateString() : "N/A",
          time: e.time || "",
          venue: e.venue || "",
          description: e.description || "",
          organizer: e.organizer?.name || "Unknown",
          fee: e.fee || 0,
          isPublic: e.isPublic,
          type: e.isPublic ? "Public" : "Private",
        })),
      );

      // Fetch Invitations
      const resInvites = await fetch("http://localhost:5000/api/invitations", {
        credentials: "include",
      });
      const inviteData = await resInvites.json();
      const inviteArray = Array.isArray(inviteData)
        ? inviteData
        : Array.isArray(inviteData.data)
          ? inviteData.data
          : [];
      setInvitations(
        inviteArray.map((i: any) => ({
          id: i.id,
          eventId: i.event?.id,
          title: i.event?.title || "Untitled",
          date: i.event?.date
            ? new Date(i.event.date).toLocaleDateString()
            : "N/A",
          organizer: i.event?.organizer?.name || "Unknown",
          fee: i.event?.fee || 0,
        })),
      );

      // Fetch Reviews
      const resReviews = await fetch("http://localhost:5000/api/reviews", {
        credentials: "include",
      });
      const reviewData = await resReviews.json();
      const reviewArray = Array.isArray(reviewData)
        ? reviewData
        : Array.isArray(reviewData.data)
          ? reviewData.data
          : [];
      setReviews(
        reviewArray.map((r: any) => ({
          id: r.id,
          eventId: r.eventId,
          rating: r.rating,
          comment: r.comment,
          reviewer: r.reviewer?.name || "Anonymous",
        })),
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

  // -------------------- Action Buttons --------------------
  const renderActionButton = (event: EventCard) => {
    const buttonText =
      event.type === "Public"
        ? event.fee === 0
          ? "Join"
          : "Pay & Join"
        : event.fee === 0
          ? "Request"
          : "Pay & Request";

    const buttonClass =
      event.type === "Public"
        ? event.fee === 0
          ? "bg-emerald-500 text-white hover:bg-emerald-600"
          : "bg-indigo-600 text-white hover:bg-indigo-700"
        : event.fee === 0
          ? "bg-yellow-500 text-black hover:bg-yellow-600"
          : "bg-red-500 text-white hover:bg-red-600";

    return (
      <button
        onClick={
          () =>
            event.fee > 0
              ? handlePayment(event) // Paid → SSLCOMMERZ
              : handleFreeJoin(event.id, event.type) // Free → Request/Join
        }
        className={`px-4 py-2 rounded-full font-semibold transition ${buttonClass}`}
      >
        {buttonText}
      </button>
    );
  };

  // -------------------- Delete Event --------------------
  const handleDeleteEvent = (id: number) => {
    toast.custom((t) => (
      <div className="bg-white dark:bg-slate-800 p-4 rounded-lg shadow-lg border w-[300px]">
        <p className="font-semibold mb-3">Are you sure?</p>
        <p className="text-sm text-gray-500 mb-4">
          This event will be permanently deleted.
        </p>

        <div className="flex justify-end gap-2">
          <button
            onClick={() => toast.dismiss(t)}
            className="px-3 py-1 rounded bg-gray-200"
          >
            Cancel
          </button>

          <button
            onClick={async () => {
              try {
                setDeletingId(id);

                const res = await fetch(
                  `http://localhost:5000/api/events/${id}`,
                  {
                    method: "DELETE",
                    credentials: "include",
                  },
                );

                if (!res.ok) throw new Error("Failed to delete event");

                toast.success("Event deleted successfully!");
                toast.dismiss(t);
                fetchData();
              } catch (err: any) {
                toast.error(err.message || "Delete failed");
              } finally {
                setDeletingId(null);
              }
            }}
            className="px-3 py-1 rounded bg-red-500 text-white"
          >
            Delete
          </button>
        </div>
      </div>
    ));
  };
  // -------------------- Edit Event --------------------
  const handleEditEvent = (event: EventCard) => {
    setEditingEvent(event);
    setModalOpen(true);
  };

  // -------------------- Accept / Decline Invitation --------------------
  const handleInvitation = async (
    inviteId: number,
    action: "accept" | "decline",
  ) => {
    try {
      const res = await fetch(
        `http://localhost:5000/api/invitations/${inviteId}/${action}`,
        {
          method: "POST",
          credentials: "include",
        },
      );
      if (!res.ok) throw new Error("Failed to update invitation");
      toast.success(`Invitation ${action}ed successfully!`);
      fetchData();
    } catch (err: any) {
      toast.error(err.message);
    }
  };

  // -------------------- Edit / Delete Review --------------------
  const handleDeleteReview = async (reviewId: number) => {
    if (!confirm("Are you sure you want to delete this review?")) return;
    try {
      const res = await fetch(`http://localhost:5000/api/reviews/${reviewId}`, {
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

  // -------------------- Make Payment --------------------
  const handlePayment = async (event: EventCard) => {
    try {
      const res = await fetch("http://localhost:5000/api/payment/sslcommerz", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          eventId: event.id,
          amount: event.fee,
        }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message || "Payment initiation failed");

      // Redirect user to SSLCOMMERZ payment page
      window.location.href = data.GatewayPageURL;
    } catch (err: any) {
      toast.error(err.message || "Payment error");
    }
  };

  const handleFreeJoin = async (
    eventId: number,
    type: "Public" | "Private",
  ) => {
    try {
      const endpoint =
        type === "Public"
          ? `/api/events/${eventId}/join`
          : `/api/events/${eventId}/request`;

      const res = await fetch(`http://localhost:5000${endpoint}`, {
        method: "POST",
        credentials: "include",
      });

      if (!res.ok) throw new Error("Action failed");

      toast.success(
        type === "Public"
          ? "Joined successfully!"
          : "Request sent successfully!",
      );

      fetchData();
    } catch (err: any) {
      toast.error(err.message);
    }
  };

  // -------------------- Render --------------------
  return (
    <div className="flex min-h-screen flex-col lg:flex-row bg-slate-100 dark:bg-slate-900">
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
              "block w-full text-left px-6 py-3",
              activeSection === section.title && "bg-white/20",
            )}
          >
            {section.icon}
            {section.title}
          </button>
        ))}
      </aside>

      {/* Main Content */}
      <div className="flex-1 p-6">
        <header className="lg:hidden flex justify-between items-center mb-4">
          <button onClick={() => setSidebarOpen(true)}>
            <Menu />
          </button>
          <h2>{activeSection}</h2>
          <div></div>
        </header>

        {loading && <p>Loading data...</p>}
        {error && <p className="text-red-500">{error}</p>}

        {/* My Events */}
        {activeSection === "My Events" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.map((event) => (
              <div
                key={event.id}
                className="bg-white dark:bg-slate-800 p-5 rounded-xl shadow flex flex-col justify-between"
              >
                <div>
                  <h3 className="text-lg font-bold">{event.title}</h3>
                  <p>Date: {event.date}</p>
                  <p>Time: {event.time}</p>
                  <p>Venue: {event.venue}</p>
                  <p>Organizer: {event.organizer}</p>
                  <p>Fee: {event.fee === 0 ? "Free" : event.fee}</p>
                </div>
                <div className="flex gap-2 mt-4">
                  <button
                    onClick={() => handleEditEvent(event)}
                    className="bg-yellow-500 text-white px-3 py-1 rounded"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteEvent(event.id)}
                    disabled={deletingId === event.id}
                    className="bg-red-500 text-white px-3 py-1 rounded disabled:opacity-50"
                  >
                    {deletingId === event.id ? "Deleting..." : "Delete"}
                  </button>
                  {renderActionButton(event)}
                </div>
              </div>
            ))}
          </div>
        )}

        {activeSection === "Pending Invitations" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.isArray(invitations) && invitations.length > 0 ? (
              invitations.map((invite) => (
                <div
                  key={invite.id}
                  className="bg-white dark:bg-slate-800 p-5 rounded-xl shadow"
                >
                  <h3 className="font-bold">{invite.title}</h3>
                  <p>Date: {invite.date}</p>
                  <p>Organizer: {invite.organizer}</p>
                  <p>Fee: {invite.fee === 0 ? "Free" : invite.fee}</p>

                  <div className="flex gap-2 mt-2">
                    <button
                      onClick={() => handleInvitation(invite.id, "accept")}
                      className="bg-emerald-500 text-white px-3 py-1 rounded"
                    >
                      Accept
                    </button>

                    <button
                      onClick={() => handleInvitation(invite.id, "decline")}
                      className="bg-red-500 text-white px-3 py-1 rounded"
                    >
                      Decline
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p>No invitations found</p>
            )}
          </div>
        )}

        {/* Reviews */}
        {activeSection === "My Reviews" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {reviews.map((review) => (
              <div
                key={review.id}
                className="bg-white dark:bg-slate-800 p-5 rounded-xl shadow"
              >
                <h3 className="font-bold">Event ID: {review.eventId}</h3>
                <p>Rating: {review.rating}</p>
                <p>Comment: {review.comment}</p>
                <p>Reviewer: {review.reviewer}</p>
                <div className="flex gap-2 mt-2">
                  {/* For now, edit review could open a modal similar to edit event */}
                  <button
                    onClick={() => toast("Edit review not implemented yet")}
                    className="bg-yellow-500 text-white px-3 py-1 rounded"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteReview(review.id)}
                    className="bg-red-500 text-white px-3 py-1 rounded"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Settings */}
        {activeSection === "Settings" && (
          <p>Settings panel (update profile, notifications, etc.)</p>
        )}

        {/* Edit Modal */}
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
                    fetchData();
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
                  />{" "}
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
      </div>
    </div>
  );
}
