"use client";

import { useState } from "react";
import { Menu, X, Calendar, Inbox, Star, Settings as SettingsIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface EventCard {
  id: number;
  title: string;
  date: string;
  organizer: string;
  fee: "Free" | "Paid";
  type: "Public" | "Private";
  link: string;
}

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

const dummyInvites = [
  { id: 1, title: "Startup Pitch", date: "Apr 18, 2026", organizer: "InnovateX" },
  { id: 2, title: "Yoga Retreat", date: "Apr 22, 2026", organizer: "Healthy Life" },
];

const dummyReviews = [
  { id: 1, title: "Photography Walk", rating: 4 },
  { id: 2, title: "Cooking Workshop", rating: 5 },
];

export default function DashboardPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("My Events");

  const sections = [
    { title: "My Events", icon: <Calendar className="h-5 w-5" /> },
    { title: "Pending Invitations", icon: <Inbox className="h-5 w-5" /> },
    { title: "My Reviews", icon: <Star className="h-5 w-5" /> },
    { title: "Settings", icon: <SettingsIcon className="h-5 w-5" /> },
  ];

  // Render dynamic action buttons with Link to event details
  const renderActionButton = (event: EventCard) => {
    let buttonText = "";
    let buttonClass = "";

    if (event.type === "Public" && event.fee === "Free") {
      buttonText = "Join";
      buttonClass = "bg-emerald-500 text-white hover:bg-emerald-600";
    }
    if (event.type === "Public" && event.fee === "Paid") {
      buttonText = "Pay & Join";
      buttonClass = "bg-indigo-600 text-white hover:bg-indigo-700";
    }
    if (event.type === "Private" && event.fee === "Free") {
      buttonText = "Request to Join";
      buttonClass = "bg-yellow-500 text-black hover:bg-yellow-600";
    }
    if (event.type === "Private" && event.fee === "Paid") {
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
    <div className="flex h-screen bg-slate-100 dark:bg-slate-900 transition-colors duration-500">
      {/* Sidebar */}
      <aside
        className={cn(
          "bg-gradient-to-b from-indigo-500 via-purple-500 to-pink-500 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 text-white w-64 flex-shrink-0 transition-transform duration-300 fixed lg:relative h-full z-50",
          sidebarOpen ? "translate-x-0" : "-translate-x-64"
        )}
      >
        <div className="flex items-center justify-between px-6 py-6 border-b border-white/20">
          <h1 className="text-2xl font-extrabold">Dashboard</h1>
          <button className="lg:hidden text-white" onClick={() => setSidebarOpen(false)}>
            <X className="h-6 w-6" />
          </button>
        </div>

        <nav className="mt-6 flex flex-col gap-2 px-4">
          {sections.map((section) => (
            <button
              key={section.title}
              onClick={() => setActiveSection(section.title)}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-lg font-semibold transition-all duration-300",
                activeSection === section.title ? "bg-white/20 shadow-lg" : "hover:bg-white/10"
              )}
            >
              {section.icon}
              {section.title}
            </button>
          ))}
        </nav>
      </aside>

      {/* Mobile overlay */}
      {sidebarOpen && <div className="fixed inset-0 bg-black/40 z-40 lg:hidden" onClick={() => setSidebarOpen(false)}></div>}

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Mobile top bar */}
        <header className="lg:hidden flex items-center justify-between px-6 py-4 bg-slate-200 dark:bg-slate-800">
          <button className="text-slate-900 dark:text-white" onClick={() => setSidebarOpen(true)}>
            <Menu className="h-6 w-6" />
          </button>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">{activeSection}</h2>
          <div></div>
        </header>

        <main className="flex-1 overflow-auto p-6">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-6">{activeSection}</h2>

          {/* My Events */}
          {activeSection === "My Events" && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {dummyEvents.map((event) => (
                <div
                  key={event.id}
                  className="bg-slate-200/70 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-3xl p-6 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
                >
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">{event.title}</h3>
                    <p className="text-slate-700 dark:text-slate-400 mb-1">Date: {event.date}</p>
                    <p className="text-slate-700 dark:text-slate-400 mb-2">Organizer: {event.organizer}</p>
                    <span
                      className={cn(
                        "inline-block px-3 py-1 text-xs font-semibold rounded-full mb-4",
                        event.fee === "Free"
                          ? "bg-emerald-200 text-emerald-800 dark:bg-emerald-500/20 dark:text-emerald-300"
                          : "bg-rose-200 text-rose-800 dark:bg-rose-500/20 dark:text-rose-300"
                      )}
                    >
                      {event.fee}
                    </span>
                  </div>
                  <div>{renderActionButton(event)}</div>
                </div>
              ))}
            </div>
          )}

          {/* Pending Invitations */}
          {activeSection === "Pending Invitations" && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {dummyInvites.map((invite) => (
                <div
                  key={invite.id}
                  className="bg-slate-200/70 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-3xl p-6 shadow-md hover:shadow-xl transition-all duration-300"
                >
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">{invite.title}</h3>
                  <p className="text-slate-700 dark:text-slate-400">Date: {invite.date}</p>
                  <p className="text-slate-700 dark:text-slate-400">Organizer: {invite.organizer}</p>
                </div>
              ))}
            </div>
          )}

          {/* My Reviews */}
          {activeSection === "My Reviews" && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {dummyReviews.map((review) => (
                <div
                  key={review.id}
                  className="bg-slate-200/70 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-3xl p-6 shadow-md hover:shadow-xl transition-all duration-300"
                >
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">{review.title}</h3>
                  <p className="text-slate-700 dark:text-slate-400">Your Rating: {"⭐".repeat(review.rating)}</p>
                </div>
              ))}
            </div>
          )}

          {/* Settings */}
          {activeSection === "Settings" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-slate-200/70 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-3xl p-6 shadow-md hover:shadow-xl transition-all duration-300">
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Account Settings</h3>
                <p className="text-slate-700 dark:text-slate-400">Manage your account preferences, email, and password.</p>
              </div>
              <div className="bg-slate-200/70 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-3xl p-6 shadow-md hover:shadow-xl transition-all duration-300">
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Notification Settings</h3>
                <p className="text-slate-700 dark:text-slate-400">Enable or disable notifications for upcoming events.</p>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}