"use client";

import { useState } from "react";
import {
  Home,
  Calendar,
  Inbox,
  Star,
  Settings as SettingsIcon,
  Menu,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function DashboardPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("My Events");

  const sections = [
    { title: "My Events", icon: <Calendar className="h-5 w-5" /> },
    { title: "Pending Invitations", icon: <Inbox className="h-5 w-5" /> },
    { title: "My Reviews", icon: <Star className="h-5 w-5" /> },
    { title: "Settings", icon: <SettingsIcon className="h-5 w-5" /> },
  ];

  return (
    <div className="flex h-screen bg-slate-100 dark:bg-slate-900 transition-colors duration-500">
      {/* Sidebar */}
      <aside
        className={cn(
          "bg-gradient-to-b from-indigo-500 via-purple-500 to-pink-500 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 text-white w-64 flex-shrink-0 transition-transform duration-300",
          sidebarOpen ? "translate-x-0" : "-translate-x-64",
          "fixed lg:relative h-full z-50"
        )}
      >
        <div className="flex items-center justify-between px-6 py-6 border-b border-white/20">
          <h1 className="text-2xl font-extrabold">Dashboard</h1>
          <button
            className="lg:hidden text-white"
            onClick={() => setSidebarOpen(false)}
          >
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
                activeSection === section.title
                  ? "bg-white/20 shadow-lg"
                  : "hover:bg-white/10"
              )}
            >
              {section.icon}
              {section.title}
            </button>
          ))}
        </nav>
      </aside>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Mobile top bar */}
        <header className="lg:hidden flex items-center justify-between px-6 py-4 bg-slate-200 dark:bg-slate-800">
          <button
            className="text-slate-900 dark:text-white"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu className="h-6 w-6" />
          </button>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">
            {activeSection}
          </h2>
          <div></div>
        </header>

        {/* Content Area */}
        <main className="flex-1 overflow-auto p-6">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-6">
            {activeSection}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Example content cards */}
            {[...Array(4)].map((_, idx) => (
              <div
                key={idx}
                className="bg-slate-200/70 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-3xl p-6 shadow-md hover:shadow-xl transition-all duration-300"
              >
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
                  {activeSection} Item {idx + 1}
                </h3>
                <p className="text-slate-700 dark:text-slate-400">
                  This is some placeholder content for the {activeSection}.
                </p>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}