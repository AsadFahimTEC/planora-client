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

// --------------------- Types ---------------------
interface EventCard {
  id: number;
  title: string;

  date: string; // existing
  startDate?: string; // ✅ ADD
  endDate?: string; // ✅ ADD

  time: string;
  venue: string;
  description: string;
  organizer: string;
  fee: number;
  isPublic: boolean;
  type: "Public" | "Private";
  participants?: any[];
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

// --------------------- Dashboard ---------------------
export default function DashboardPage() {
  // --------------------- States ---------------------
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("My Events");

  const [events, setEvents] = useState<EventCard[]>([]);
  const [invitations, setInvitations] = useState<InvitationCard[]>([]);
  const [reviews, setReviews] = useState<ReviewCard[]>([]);
  const [users, setUsers] = useState<UserCard[]>([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [modalOpen, setModalOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState<EventCard | null>(null);

  const [invoiceOpen, setInvoiceOpen] = useState(false);
  const [invoiceData, setInvoiceData] = useState<any>(null);

  const [deletingId, setDeletingId] = useState<number | null>(null);

  // --------------------- Sections ---------------------
  const sections = [
    { title: "My Events", icon: <Calendar className="h-5 w-5" /> },
    { title: "Pending Invitations", icon: <Inbox className="h-5 w-5" /> },
    { title: "My Reviews", icon: <Star className="h-5 w-5" /> },
    { title: "Settings", icon: <SettingsIcon className="h-5 w-5" /> },
    { title: "Admin", icon: <User className="h-5 w-5" /> },
  ];

  // --------------------- Fetch Data ---------------------
  const fetchData = async () => {
    try {
      setLoading(true);

      // Events
      const resEvents = await fetch("http://localhost:5000/api/events", {
        credentials: "include",
      });
      const eventData = await resEvents.json();
      const eventsArray = Array.isArray(eventData)
        ? eventData
        : Array.isArray(eventData.data)
          ? eventData.data
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
          participants: e.participants || [],
          joinRequests: e.joinRequests || [],
        })),
      );

      // Invitations
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

      // Reviews
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

      // Admin Users
      const resUsers = await fetch("http://localhost:5000/api/admin/users", {
        credentials: "include",
      });
      const userData = await resUsers.json();
      const userArray = Array.isArray(userData)
        ? userData
        : Array.isArray(userData.data)
          ? userData.data
          : [];
      setUsers(
        userArray.map((u: any) => ({
          id: u.id,
          name: u.name,
          email: u.email,
          role: u.role,
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

  // --------------------- Actions ---------------------

  // Join / Request Free Event
  const handleFreeJoin = async (
    eventId: number,
    type: "Public" | "Private",
  ) => {
    try {
      const event = events.find((e) => e.id === eventId);
      if (!event) throw new Error("Event not found");

      const endpoint =
        type === "Public"
          ? `/api/events/${eventId}/join`
          : `/api/events/${eventId}/request`;

      const res = await fetch(`http://localhost:5000${endpoint}`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Request failed");

      toast.success(
        type === "Public"
          ? "Joined successfully!"
          : "Request sent successfully!",
      );

      setInvoiceData({
        transactionId: `FREE-${eventId}-${Date.now()}`,
        amount: event.fee,
        date: new Date().toLocaleString(),
        status: event.fee === 0 ? "Free" : "Paid",
      });
      setInvoiceOpen(true);
      fetchData();
    } catch (err: any) {
      toast.error(err.message || "Something went wrong");
    }
  };

  // Paid Event Payment
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

      if (!res.ok) throw new Error(data.message);

      if (data.GatewayPageURL) {
        window.location.href = data.GatewayPageURL;
      } else {
        toast.error("Payment URL missing");
      }
    } catch (err: any) {
      toast.error(err.message);
    }
  };

  const handleUpdateEvent = async () => {
    if (!editingEvent?.id) {
      toast.error("Event ID missing");
      return;
    }

    try {
      const loadingToast = toast.loading("Updating event...");

      // Only send allowed fields (IMPORTANT)
      const updatedData = {
        title: editingEvent.title,
        startDate: editingEvent.startDate,
        endDate: editingEvent.endDate,
        venue: editingEvent.venue,
        description: editingEvent.description,
        type: editingEvent.type,
        // feeType: editingEvent?.feeType,
        // registrationFee: editingEvent?.registrationFee,
        // maxParticipants: editingEvent?.maxParticipants,
        // category: editingEvent?.category,
        // status: editingEvent?.status,
      };

      const res = await fetch(
        `http://localhost:5000/api/events/${editingEvent.id}`,
        {
          method: "PUT",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedData),
        },
      );

      const data = await res.json();

      toast.dismiss(loadingToast);

      if (!res.ok) {
        throw new Error(data.message || "Update failed");
      }

      toast.success("Event updated successfully!");

      setModalOpen(false);
      setEditingEvent(null);
      fetchData();
    } catch (err: any) {
      toast.error(err.message || "Something went wrong");
    }
  };

  // Admin: Delete User
  const handleDeleteUser = async (userId: number) => {
    if (!confirm("Are you sure you want to delete this user?")) return;
    try {
      const res = await fetch(
        `http://localhost:5000/api/admin/users/${userId}`,
        { method: "DELETE", credentials: "include" },
      );
      if (!res.ok) throw new Error("Failed to delete user");
      toast.success("User deleted successfully!");
      fetchData();
    } catch (err: any) {
      toast.error(err.message);
    }
  };

  // --------------------- UI Rendering ---------------------
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
            {section.icon} {section.title}
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

        {/* --------------------- My Events --------------------- */}
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
                  <p>Fee: {event.fee === 0 ? "Free" : `৳ ${event.fee}`}</p>
                </div>

                {/* Owner Controls */}
                {event.joinRequests && event.joinRequests.length > 0 && (
                  <div className="mt-2">
                    <p className="font-semibold">Join Requests:</p>
                    {event.joinRequests.map((req: any) => (
                      <div
                        key={req.userId}
                        className="flex justify-between items-center mt-1"
                      >
                        <span>{req.userName}</span>
                        <div className="flex gap-1">
                          <button
                            onClick={() =>
                              event.fee === 0
                                ? handleFreeJoin(event.id, event.type)
                                : handlePayment(event)
                            }
                            className="bg-green-500 px-2 py-1 text-white rounded"
                          >
                            <Check size={14} />
                          </button>
                          <button
                            onClick={() =>
                              event.fee === 0
                                ? handleFreeJoin(event.id, event.type)
                                : handlePayment(event)
                            }
                            className="bg-red-500 px-2 py-1 text-white rounded"
                          >
                            <XCircle size={14} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

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
                    onClick={() => {
                      const id = toast(() => (
                        <div className="flex flex-col gap-3">
                          <p className="font-semibold">
                            ⚠️ Delete "{event.title}" permanently?
                          </p>

                          <div className="flex gap-2 justify-end">
                            <button
                              onClick={async () => {
                                try {
                                  const res = await fetch(
                                    `http://localhost:5000/api/events/${event.id}`,
                                    {
                                      method: "DELETE",
                                      credentials: "include",
                                    },
                                  );

                                  if (!res.ok) throw new Error("Delete failed");

                                  toast.success("Event deleted!");
                                  toast.dismiss(id);
                                  fetchData();
                                } catch (err: any) {
                                  toast.error(err.message);
                                }
                              }}
                              className="bg-red-500 text-white px-3 py-1 rounded"
                            >
                              Yes
                            </button>

                            <button
                              onClick={() => toast.dismiss(id)}
                              className="bg-gray-300 px-3 py-1 rounded"
                            >
                              Cancel
                            </button>
                          </div>
                        </div>
                      ));
                    }}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
                  >
                    Delete
                  </button>
                  <button
                    onClick={() => handleFreeJoin(event.id, event.type)}
                    className="bg-indigo-600 text-white px-3 py-1 rounded"
                  >
                    {event.fee === 0 ? "Join / Request" : `Pay & Join`}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* --------------------- Invitations --------------------- */}
        {activeSection === "Pending Invitations" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {invitations.map((invite) => (
              <div
                key={invite.id}
                className="bg-white dark:bg-slate-800 p-5 rounded-xl shadow"
              >
                <h3 className="font-bold">{invite.title}</h3>
                <p>Date: {invite.date}</p>
                <p>Organizer: {invite.organizer}</p>
                <p>Fee: {invite.fee === 0 ? "Free" : `৳ ${invite.fee}`}</p>

                <div className="flex gap-2 mt-2">
                  <button
                    onClick={() => handleFreeJoin(invite.eventId, "Private")}
                    className="bg-emerald-500 text-white px-3 py-1 rounded"
                  >
                    Accept / Pay
                  </button>
                  <button
                    onClick={() => toast("Decline invitation")}
                    className="bg-red-500 text-white px-3 py-1 rounded"
                  >
                    Decline
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* --------------------- Reviews --------------------- */}
        {modalOpen && editingEvent && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded w-[400px]">
              <h2 className="font-bold mb-3">Edit Event</h2>

              <input
                value={editingEvent.title}
                onChange={(e) =>
                  setEditingEvent({ ...editingEvent, title: e.target.value })
                }
                className="border p-2 w-full mb-2"
              />

              <input
                value={editingEvent.venue}
                onChange={(e) =>
                  setEditingEvent({ ...editingEvent, venue: e.target.value })
                }
                className="border p-2 w-full mb-2"
              />

              <input
                type="number"
                value={editingEvent.fee}
                onChange={(e) =>
                  setEditingEvent({
                    ...editingEvent,
                    fee: Number(e.target.value),
                  })
                }
                className="border p-2 w-full mb-2"
              />

              <div className="flex justify-between">
                <button
                  onClick={handleUpdateEvent}
                  className="bg-indigo-600 text-white px-3 py-1 rounded"
                >
                  Save
                </button>

                <button
                  onClick={() => setModalOpen(false)}
                  className="bg-gray-400 px-3 py-1 rounded"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {activeSection === "Settings" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Theme Toggle */}
            <div className="bg-white dark:bg-slate-800 p-5 rounded-xl shadow hover:scale-105 transform transition">
              <h3 className="font-bold text-lg mb-2">Theme</h3>
              <p className="text-sm text-gray-500 mb-3">
                Switch between Light and Dark mode.
              </p>
              <button
                onClick={() =>
                  document.documentElement.classList.toggle("dark")
                }
                className="bg-gradient-to-r from-indigo-500 to-pink-500 text-white px-4 py-2 rounded shadow hover:opacity-90 transition"
              >
                Toggle Theme
              </button>
            </div>

            {/* Notifications */}
            <div className="bg-white dark:bg-slate-800 p-5 rounded-xl shadow hover:scale-105 transform transition">
              <h3 className="font-bold text-lg mb-2">Notifications</h3>
              <p className="text-sm text-gray-500 mb-3">
                Enable or disable notifications for your account.
              </p>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  defaultChecked
                  className="w-5 h-5 accent-indigo-500"
                />
                <span>Enable Notifications</span>
              </label>
            </div>

            {/* Email Preferences */}
            <div className="bg-white dark:bg-slate-800 p-5 rounded-xl shadow hover:scale-105 transform transition">
              <h3 className="font-bold text-lg mb-2">Email Preferences</h3>
              <p className="text-sm text-gray-500 mb-3">
                Receive updates and newsletters by email.
              </p>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  defaultChecked
                  className="w-5 h-5 accent-pink-500"
                />
                <span>Subscribe to Emails</span>
              </label>
            </div>

            {/* Account Info */}
            <div className="bg-white dark:bg-slate-800 p-5 rounded-xl shadow hover:scale-105 transform transition col-span-full">
              <h3 className="font-bold text-lg mb-2">Account Info</h3>
              <p className="text-sm text-gray-500 mb-3">
                Static account information.
              </p>
              <ul className="space-y-1 text-gray-700 dark:text-gray-300">
                <li>
                  <strong>Name:</strong> John Doe
                </li>
                <li>
                  <strong>Email:</strong> johndoe@example.com
                </li>
                <li>
                  <strong>Role:</strong> Admin
                </li>
              </ul>
            </div>
          </div>
        )}

        {/* --------------------- Admin --------------------- */}
        {activeSection === "Admin" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {users.map((user) => (
              <div
                key={user.id}
                className="bg-white dark:bg-slate-800 p-5 rounded-xl shadow"
              >
                <p>Name: {user.name}</p>
                <p>Email: {user.email}</p>
                <p>Role: {user.role}</p>
                <div className="flex gap-2 mt-2">
                  <button
                    onClick={() => handleDeleteUser(user.id)}
                    className="bg-red-500 text-white px-3 py-1 rounded"
                  >
                    Delete User
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* --------------------- Invoice Modal --------------------- */}
        {invoiceOpen && invoiceData && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl p-6 w-[400px] shadow-lg relative">
              {/* ❌ Close Icon */}
              <button
                onClick={() => setInvoiceOpen(false)}
                className="absolute top-3 right-3 text-gray-500 hover:text-red-500"
              >
                <X size={20} />
              </button>

              <h2 className="text-xl font-bold mb-4 text-center">
                Payment Invoice
              </h2>

              <div className="space-y-2 text-sm">
                <p>
                  <strong>Transaction ID:</strong> {invoiceData.transactionId}
                </p>
                <p>
                  <strong>Amount:</strong> ৳ {invoiceData.amount}
                </p>
                <p>
                  <strong>Date:</strong> {invoiceData.date}
                </p>
                <p>
                  <strong>Status:</strong> {invoiceData.status}
                </p>
              </div>

              {/* Close Button */}
              <button
                onClick={() => setInvoiceOpen(false)}
                className="mt-4 w-full bg-indigo-600 text-white py-2 rounded"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
