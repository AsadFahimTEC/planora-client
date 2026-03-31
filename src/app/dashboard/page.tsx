"use client";

import { useState, useEffect } from "react";
import {
  Menu,
  X,
  Calendar,
  Inbox,
  Star,
  Settings as SettingsIcon,
  User,
  Trash2,
  Check,
  XCircle,
  Edit,
} from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

/* ================= TYPES ================= */

interface EventCard {
  id: number;
  title: string;
  date: string;
  time: string;
  venue: string;
  description: string;
  organizer: string;
  fee: number;
  type: "Public" | "Private";
  joinRequests?: any[];
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

interface UserCard {
  id: number;
  name: string;
  email: string;
  role: string;
}

/* ================= DASHBOARD ================= */

export default function DashboardPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("My Events");

  const [events, setEvents] = useState<EventCard[]>([]);
  const [invitations, setInvitations] = useState<InvitationCard[]>([]);
  const [reviews, setReviews] = useState<ReviewCard[]>([]);
  const [users, setUsers] = useState<UserCard[]>([]);

  const [loading, setLoading] = useState(true);
  const [invoiceOpen, setInvoiceOpen] = useState(false);
  const [invoiceData, setInvoiceData] = useState<any>(null);
  const [deletingId, setDeletingId] = useState<number | null>(null);

  const sections = [
    { title: "My Events", icon: <Calendar className="h-5 w-5" /> },
    { title: "Pending Invitations", icon: <Inbox className="h-5 w-5" /> },
    { title: "My Reviews", icon: <Star className="h-5 w-5" /> },
    { title: "Admin", icon: <User className="h-5 w-5" /> },
  ];

  /* ================= FETCH ================= */

  const fetchData = async () => {
    try {
      setLoading(true);

      const [e, i, r, u] = await Promise.all([
        fetch("http://localhost:5000/api/events", {
          credentials: "include",
        }),
        fetch("http://localhost:5000/api/invitations", {
          credentials: "include",
        }),
        fetch("http://localhost:5000/api/reviews", {
          credentials: "include",
        }),
        fetch("http://localhost:5000/api/admin/users", {
          credentials: "include",
        }),
      ]);

      const eventsData = await e.json();
      const inviteData = await i.json();
      const reviewData = await r.json();
      const userData = await u.json();

      setEvents(
        (eventsData.data || []).map((ev: any) => ({
          id: ev.id,
          title: ev.title,
          date: ev.date ? new Date(ev.date).toLocaleDateString() : "N/A",
          time: ev.time || "",
          venue: ev.venue || "",
          description: ev.description || "",
          organizer: ev.organizer?.name || "Unknown",
          fee: ev.fee || 0,
          type: ev.isPublic ? "Public" : "Private",
          joinRequests: ev.joinRequests || [],
        })),
      );

      setInvitations(
        (inviteData.data || []).map((inv: any) => ({
          id: inv.id,
          eventId: inv.event?.id,
          title: inv.event?.title,
          date: inv.event?.date
            ? new Date(inv.event.date).toLocaleDateString()
            : "N/A",
          organizer: inv.event?.organizer?.name,
          fee: inv.event?.fee || 0,
        })),
      );

      setReviews(
        (reviewData.data || []).map((rev: any) => ({
          id: rev.id,
          eventId: rev.eventId,
          rating: rev.rating,
          comment: rev.comment,
          reviewer: rev.reviewer?.name || "Anonymous",
        })),
      );

      setUsers(userData.data || []);
    } catch (err: any) {
      toast.error("Failed to fetch data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  /* ================= ACTIONS ================= */

  const handleDeleteEvent = async (eventId: number) => {
    toast(
      (t) => (
        <div className="flex flex-col gap-3">
          <p className="font-semibold">
            Are you sure you want to delete this event?
          </p>

          <div className="flex gap-2 justify-end">
            <button
              onClick={() => toast.dismiss(t)}
              className="px-3 py-1 bg-gray-200 rounded"
            >
              Cancel
            </button>

            <button
              onClick={async () => {
                toast.dismiss(t);

                const loadingToast = toast.loading("Deleting event...");

                try {
                  const res = await fetch(
                    `http://localhost:5000/api/events/${eventId}`,
                    {
                      method: "DELETE",
                      credentials: "include",
                    },
                  );

                  const data = await res.json();

                  if (!res.ok) {
                    throw new Error(data.message || "Delete failed");
                  }

                  toast.dismiss(loadingToast);
                  toast.success("Event deleted successfully!");

                  // Refresh UI
                  fetchData();
                } catch (error: any) {
                  toast.dismiss(loadingToast);
                  toast.error(error.message || "Something went wrong");
                }
              }}
              className="px-3 py-1 bg-red-500 text-white rounded"
            >
              Delete
            </button>
          </div>
        </div>
      ),
      {
        duration: 10000,
      },
    );
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

      if (!res.ok) throw new Error("Failed");

      toast.success("Success!");

      setInvoiceData({
        transactionId: `FREE-${Date.now()}`,
        amount: 0,
        date: new Date().toLocaleString(),
        status: "Free",
      });

      setInvoiceOpen(true);
      fetchData();
    } catch {
      toast.error("Join failed");
    }
  };

  const handlePayment = async (event: EventCard) => {
    try {
      const res = await fetch("http://localhost:5000/api/payments/sslcommerz", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          eventId: event.id,
          amount: event.fee,
        }),
      });

      const data = await res.json();
      if (data.GatewayPageURL) window.location.href = data.GatewayPageURL;
    } catch {
      toast.error("Payment failed");
    }
  };

  /* ================= UI ================= */

  return (
    <div className="flex min-h-screen bg-slate-100">
      {/* Sidebar */}
      <aside className="w-64 bg-indigo-600 text-white p-6 hidden lg:block">
        <h1 className="text-xl font-bold mb-6">Dashboard</h1>
        {sections.map((s) => (
          <button
            key={s.title}
            onClick={() => setActiveSection(s.title)}
            className={cn(
              "block w-full text-left px-4 py-2 rounded mb-2",
              activeSection === s.title && "bg-white/20",
            )}
          >
            {s.title}
          </button>
        ))}
      </aside>

      {/* Main */}
      <div className="flex-1 p-6">
        {loading && (
          <div className="flex justify-center items-center h-40">
            <div className="w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}

        {/* Events */}
        {activeSection === "My Events" && (
          <div className="grid md:grid-cols-3 gap-6">
            {events.map((event) => (
              <div key={event.id} className="bg-white p-5 rounded-xl shadow">
                <h3 className="font-bold">{event.title}</h3>
                <p>{event.date}</p>
                <p>৳ {event.fee}</p>

                <div className="flex gap-2 mt-4">
                  <button
                    onClick={() =>
                      event.fee === 0
                        ? handleFreeJoin(event.id, event.type)
                        : handlePayment(event)
                    }
                    className="bg-indigo-600 text-white px-3 py-1 rounded"
                  >
                    {event.fee === 0 ? "Join / Request" : "Pay & Join"}
                  </button>

                  <button
                    onClick={() => handleDeleteEvent(event.id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded transition"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Reviews */}
        {activeSection === "My Reviews" && (
          <div className="grid md:grid-cols-3 gap-6">
            {reviews.map((review) => (
              <div key={review.id} className="bg-white p-5 rounded-xl shadow">
                <p>Event ID: {review.eventId}</p>
                <p>Rating: {review.rating}</p>
                <p>{review.comment}</p>
              </div>
            ))}
          </div>
        )}

        {/* Admin */}
        {activeSection === "Admin" && (
          <div className="grid md:grid-cols-3 gap-6">
            {users.map((user) => (
              <div key={user.id} className="bg-white p-5 rounded-xl shadow">
                <p>{user.name}</p>
                <p>{user.email}</p>
                <p>{user.role}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Invoice Modal */}
      {invoiceOpen && invoiceData && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-xl w-[400px] relative">
            <button
              onClick={() => setInvoiceOpen(false)}
              className="absolute top-2 right-2"
            >
              ✕
            </button>
            <h2 className="text-xl font-bold mb-4 text-center">Invoice</h2>
            <p>ID: {invoiceData.transactionId}</p>
            <p>Amount: ৳ {invoiceData.amount}</p>
            <p>Status: {invoiceData.status}</p>
          </div>
        </div>
      )}
    </div>
  );
}
