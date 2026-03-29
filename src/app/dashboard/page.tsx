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

interface EventCard {
  id: number;
  title: string;
  date: string;
  organizer: string;
  fee: "Free" | "Paid";
  type: "Public" | "Private";
}

interface InvitationCard {
  id: number;
  title: string;
  date: string;
  organizer: string;
}

export default function DashboardPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("My Events");

  const [events, setEvents] = useState<EventCard[]>([]);
  const [invitations, setInvitations] = useState<InvitationCard[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const sections = [
    { title: "My Events", icon: <Calendar className="h-5 w-5" /> },
    { title: "Pending Invitations", icon: <Inbox className="h-5 w-5" /> },
    { title: "My Reviews", icon: <Star className="h-5 w-5" /> },
    { title: "Settings", icon: <SettingsIcon className="h-5 w-5" /> },
  ];

  // ✅ Fetch events and invitations from backend
  useEffect(() => {
    const fetchAllData = async () => {
      try {
        setLoading(true);

        const res = await fetch("http://localhost:5000/api/events", {
          credentials: "include",
        });

        const result = await res.json();

        // ✅ Fix: detect correct array source
        const eventsArray = Array.isArray(result)
          ? result
          : Array.isArray(result.data)
            ? result.data
            : Array.isArray(result.events)
              ? result.events
              : Array.isArray(result.data?.events)
                ? result.data.events
                : [];

        // ❗ Debug (very important)
        console.log("API Response:", result);
        console.log("Events Array:", eventsArray);

        // ✅ Now map safely
        const formatted = eventsArray.map((event: any) => ({
          id: event.id,
          title: event.title,
          date: event.date
            ? new Date(event.date).toLocaleDateString()
            : "Invalid Date",
          organizer: event.organizer?.name || "Unknown",
          fee: event.fee === 0 ? "Free" : "Paid",
          type: event.isPublic ? "Public" : "Private",
        }));

        setEvents(formatted);

        /* INVITATIONS API */
        const inviteRes = await fetch("http://localhost:5000/api/invitations", {
          credentials: "include",
        });
        const inviteData = await inviteRes.json();

        const inviteArray =
          Array.isArray(inviteData) ? inviteData :
          Array.isArray(inviteData.data) ? inviteData.data :
          [];

        const formattedInvites = inviteArray.map((i: any) => ({
          id: i.id,
          title: i.event?.title || "Untitled",
          date: i.event?.date
            ? new Date(i.event.date).toLocaleDateString()
            : "N/A",
          organizer: i.event?.organizer?.name || "Unknown",
        }));

        setInvitations(formattedInvites);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAllData();
  }, []);

  // ✅ Action Button Logic
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
            {section.title}
          </button>
        ))}
      </aside>

      {/* Main */}
      <div className="flex-1">
        <header className="lg:hidden flex justify-between p-4">
          <button onClick={() => setSidebarOpen(true)}>
            <Menu />
          </button>
          <h2>{activeSection}</h2>
        </header>

        <main className="p-6">
          <h2 className="text-2xl font-bold mb-6">{activeSection}</h2>

          {/* ✅ Loading */}
          {loading && <p>Loading events...</p>}

          {/* ❌ Error */}
          {error && <p className="text-red-500">{error}</p>}

          {/* ✅ Events */}
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

                  <div className="mt-4">{renderActionButton(event)}</div>
                </div>
              ))}
            </div>
          )}
            {/* INVITATIONS */}
          {activeSection === "Pending Invitations" && !loading && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {invitations.map((invite) => (
                <div key={invite.id} className="bg-white p-4 rounded-xl shadow">
                  <h3 className="font-bold">{invite.title}</h3>
                  <p>{invite.date}</p>
                  <p>{invite.organizer}</p>
                </div>
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
