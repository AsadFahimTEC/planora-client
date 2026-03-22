// "use client";

// import { useState } from "react";
// import { Plus, Pencil, Trash, Users } from "lucide-react";
// import { cn } from "@/lib/utils";
// import Link from "next/link";

// // Event interface
// interface EventCard {
//   id: number;
//   title: string;
//   date: string;
//   time: string;
//   venue: string;
//   description: string;
//   organizer: string;
//   fee: "Free" | "Paid";
//   type: "Public" | "Private";
//   link: string;
//   participants?: string[];
//   approvals?: string[];
// }

// // Initial dummy events
// const initialEvents: EventCard[] = [
//   {
//     id: 1,
//     title: "Music Festival",
//     date: "Apr 10, 2026",
//     time: "6:00 PM",
//     venue: "City Park",
//     description: "Annual music festival",
//     organizer: "ABC Corp",
//     fee: "Free",
//     type: "Public",
//     link: "/events/1",
//     participants: ["Alice", "Bob"],
//     approvals: ["Alice"],
//   },
//   {
//     id: 2,
//     title: "Tech Meetup",
//     date: "Apr 12, 2026",
//     time: "5:00 PM",
//     venue: "Tech Hub",
//     description: "Networking & talks",
//     organizer: "Techies",
//     fee: "Paid",
//     type: "Public",
//     link: "/events/2",
//     participants: ["Charlie"],
//     approvals: [],
//   },
// ];

// export default function DashboardDetailsPage() {
//   const [events, setEvents] = useState(initialEvents);

//   // Create new event with a proper form prompt
//   const handleCreate = () => {
//     const title = prompt("Enter Title:") || "";
//     if (!title) return;

//     const date = prompt("Enter Date (e.g., Apr 20, 2026):") || "TBD";
//     const time = prompt("Enter Time (e.g., 6:00 PM):") || "TBD";
//     const venue = prompt("Enter Venue:") || "TBD";
//     const description = prompt("Enter Description:") || "";
//     const type = prompt("Type: Public or Private") === "Private" ? "Private" : "Public";
//     const fee = prompt("Fee: Free or Paid") === "Paid" ? "Paid" : "Free";

//     const newEvent: EventCard = {
//       id: events.length + 1,
//       title,
//       date,
//       time,
//       venue,
//       description,
//       organizer: "You",
//       type,
//       fee,
//       link: `/events/${events.length + 1}`,
//       participants: [],
//       approvals: [],
//     };

//     setEvents([newEvent, ...events]);
//   };

//   // Update event title
//   const handleUpdate = (id: number) => {
//     const newTitle = prompt("Enter new title:");
//     if (!newTitle) return;

//     setEvents(events.map(e => e.id === id ? { ...e, title: newTitle } : e));
//   };

//   // Delete event
//   const handleDelete = (id: number) => {
//     if (confirm("Are you sure you want to delete this event?")) {
//       setEvents(events.filter(e => e.id !== id));
//     }
//   };

//   return (
//     <div className="p-6 max-w-7xl mx-auto">
//       {/* Header */}
//       <div className="flex flex-col md:flex-row justify-between items-center mb-6">
//         <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-4 md:mb-0">
//           Event Details
//         </h1>
//         <button
//           onClick={handleCreate}
//           className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-full hover:bg-indigo-700 transition"
//         >
//           <Plus className="w-5 h-5" /> Create Event
//         </button>
//       </div>

//       {/* Event Cards */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//         {events.map(event => (
//           <div
//             key={event.id}
//             className="bg-slate-200/70 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-3xl p-6 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
//           >
//             {/* Event Info */}
//             <div>
//               <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">{event.title}</h3>
//               <p className="text-slate-700 dark:text-slate-400 mb-1">Date: {event.date}</p>
//               <p className="text-slate-700 dark:text-slate-400 mb-1">Time: {event.time}</p>
//               <p className="text-slate-700 dark:text-slate-400 mb-1">Venue: {event.venue}</p>
//               <p className="text-slate-700 dark:text-slate-400 mb-2">Description: {event.description}</p>
//               <p className="text-slate-700 dark:text-slate-400 mb-1">Organizer: {event.organizer}</p>

//               <span
//                 className={cn(
//                   "inline-block px-3 py-1 text-xs font-semibold rounded-full mb-4",
//                   event.fee === "Free"
//                     ? "bg-emerald-200 text-emerald-800 dark:bg-emerald-500/20 dark:text-emerald-300"
//                     : "bg-rose-200 text-rose-800 dark:bg-rose-500/20 dark:text-rose-300"
//                 )}
//               >
//                 {event.fee} - {event.type}
//               </span>

//               {/* Participants */}
//               <div className="mb-2">
//                 <p className="font-semibold text-slate-800 dark:text-slate-300">Participants:</p>
//                 <ul className="text-slate-700 dark:text-slate-400 text-sm">
//                   {event.participants && event.participants.length > 0
//                     ? event.participants.map((p, i) => <li key={i}>{p}</li>)
//                     : <li>No participants yet</li>}
//                 </ul>
//               </div>

//               {/* Approvals */}
//               <div>
//                 <p className="font-semibold text-slate-800 dark:text-slate-300">Approvals:</p>
//                 <ul className="text-slate-700 dark:text-slate-400 text-sm">
//                   {event.approvals && event.approvals.length > 0
//                     ? event.approvals.map((a, i) => <li key={i}>{a}</li>)
//                     : <li>Pending approvals</li>}
//                 </ul>
//               </div>
//             </div>

//             {/* Action Buttons */}
//             <div className="mt-4 flex flex-wrap gap-2">
//               <button
//                 onClick={() => handleUpdate(event.id)}
//                 className="flex items-center gap-1 px-3 py-2 bg-yellow-500 text-black rounded-full hover:bg-yellow-600 transition text-sm font-semibold"
//               >
//                 <Pencil className="w-4 h-4" /> Update
//               </button>
//               <button
//                 onClick={() => handleDelete(event.id)}
//                 className="flex items-center gap-1 px-3 py-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition text-sm font-semibold"
//               >
//                 <Trash className="w-4 h-4" /> Delete
//               </button>
//               <Link
//                 href={event.link}
//                 className="flex items-center gap-1 px-3 py-2 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 transition text-sm font-semibold"
//               >
//                 <Users className="w-4 h-4" /> View / Manage
//               </Link>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

"use client";

import { useState } from "react";
import { Plus, Pencil, Trash, Users } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";

// Interfaces
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

interface Invitation {
  id: number;
  title: string;
  date: string;
  organizer: string;
  fee: "Free" | "Paid";
}

interface Review {
  id: number;
  title: string;
  rating: number;
}

// Dummy data
const initialEvents: EventCard[] = [
  { id: 1, title: "Music Festival", date: "Apr 10, 2026", time: "6:00 PM", venue: "City Park", description: "Annual music festival", organizer: "ABC Corp", fee: "Free", type: "Public", link: "/events/1", participants: ["Alice", "Bob"], approvals: ["Alice"] },
  { id: 2, title: "Tech Meetup", date: "Apr 12, 2026", time: "5:00 PM", venue: "Tech Hub", description: "Networking & talks", organizer: "Techies", fee: "Paid", type: "Public", link: "/events/2", participants: ["Charlie"], approvals: [] },
  { id: 3, title: "Art Expo", date: "Apr 15, 2026", time: "2:00 PM", venue: "Art Gallery", description: "Exhibition of modern art", organizer: "Creative Minds", fee: "Free", type: "Private", link: "/events/3", participants: ["David", "Eve"], approvals: ["Eve"] },
  { id: 4, title: "Startup Pitch", date: "Apr 18, 2026", time: "4:00 PM", venue: "Innovation Hub", description: "Pitch your startup ideas", organizer: "InnovateX", fee: "Paid", type: "Private", link: "/events/4", participants: ["Frank"], approvals: [] },
  { id: 5, title: "Cooking Workshop", date: "Apr 20, 2026", time: "3:00 PM", venue: "Chef Club", description: "Learn to cook gourmet meals", organizer: "Chef Club", fee: "Free", type: "Public", link: "/events/5", participants: ["Grace"], approvals: ["Grace"] },
  { id: 6, title: "Yoga Retreat", date: "Apr 22, 2026", time: "6:00 AM", venue: "Mountain Resort", description: "Relaxing yoga retreat", organizer: "Healthy Life", fee: "Paid", type: "Private", link: "/events/6", participants: ["Hannah"], approvals: [] },
  { id: 7, title: "Photography Walk", date: "Apr 25, 2026", time: "7:00 AM", venue: "City Center", description: "Street photography walk", organizer: "Photo Pros", fee: "Free", type: "Public", link: "/events/7", participants: ["Ian"], approvals: ["Ian"] },
  { id: 8, title: "Dance Workshop", date: "Apr 28, 2026", time: "5:00 PM", venue: "Dance Studio", description: "Learn contemporary dance", organizer: "Dance Club", fee: "Paid", type: "Private", link: "/events/8", participants: ["Jack"], approvals: [] },
  { id: 9, title: "Startup Seminar", date: "May 1, 2026", time: "10:00 AM", venue: "Business Center", description: "Seminar for entrepreneurs", organizer: "BizHub", fee: "Free", type: "Public", link: "/events/9", participants: ["Karen"], approvals: ["Karen"] },
];

// Invitations
const dummyInvites: Invitation[] = [
  { id: 1, title: "Startup Pitch", date: "Apr 18, 2026", organizer: "InnovateX", fee: "Paid" },
  { id: 2, title: "Yoga Retreat", date: "Apr 22, 2026", organizer: "Healthy Life", fee: "Paid" },
];

// Reviews
const dummyReviews: Review[] = [
  { id: 1, title: "Photography Walk", rating: 4 },
  { id: 2, title: "Cooking Workshop", rating: 5 },
];

export default function DashboardDetailsPage() {
  const [events, setEvents] = useState(initialEvents);
  const [activeSection, setActiveSection] = useState<"Events" | "Invitations" | "Reviews" | "Settings">("Events");

  // Event creation
  const handleCreate = () => {
    const title = prompt("Enter Title:") || "";
    if (!title) return;
    const date = prompt("Enter Date (e.g., Apr 20, 2026):") || "TBD";
    const time = prompt("Enter Time (e.g., 6:00 PM):") || "TBD";
    const venue = prompt("Enter Venue:") || "TBD";
    const description = prompt("Enter Description:") || "";
    const type = prompt("Type (Public/Private)") === "Private" ? "Private" : "Public";
    const fee = prompt("Fee (Free/Paid)") === "Paid" ? "Paid" : "Free";

    const newEvent: EventCard = {
      id: events.length + 1,
      title,
      date,
      time,
      venue,
      description,
      organizer: "You",
      fee,
      type,
      link: `/events/${events.length + 1}`,
      participants: [],
      approvals: [],
    };
    setEvents([newEvent, ...events]);
  };

  const handleUpdate = (id: number) => {
    const newTitle = prompt("Enter new title:") || "";
    if (!newTitle) return;
    setEvents(events.map(e => e.id === id ? { ...e, title: newTitle } : e));
  };

  const handleDelete = (id: number) => {
    if (confirm("Are you sure you want to delete this event?")) {
      setEvents(events.filter(e => e.id !== id));
    }
  };

  return (
    <div className="p-4 md:p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-4 md:mb-0">Dashboard</h1>
        {activeSection === "Events" && (
          <button onClick={handleCreate} className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-full hover:bg-indigo-700 transition">
            <Plus className="w-5 h-5" /> Create Event
          </button>
        )}
      </div>

      {/* Section Tabs */}
      <div className="flex gap-4 flex-wrap mb-6">
        {["Events", "Invitations", "Reviews", "Settings"].map(section => (
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
                <p className="text-slate-700 dark:text-slate-400 mb-1">Date: {event.date}</p>
                <p className="text-slate-700 dark:text-slate-400 mb-1">Time: {event.time}</p>
                <p className="text-slate-700 dark:text-slate-400 mb-1">Venue: {event.venue}</p>
                <p className="text-slate-700 dark:text-slate-400 mb-2">Description: {event.description}</p>
                <p className="text-slate-700 dark:text-slate-400 mb-1">Organizer: {event.organizer}</p>
                <span className={cn("inline-block px-3 py-1 text-xs font-semibold rounded-full mb-4",
                  event.fee === "Free"
                    ? "bg-emerald-200 text-emerald-800 dark:bg-emerald-500/20 dark:text-emerald-300"
                    : "bg-rose-200 text-rose-800 dark:bg-rose-500/20 dark:text-rose-300")}>
                  {event.fee} - {event.type}
                </span>

                <div className="mb-2">
                  <p className="font-semibold text-slate-800 dark:text-slate-300">Participants:</p>
                  <ul className="text-slate-700 dark:text-slate-400 text-sm">
                    {event.participants?.length ? event.participants.map((p,i) => <li key={i}>{p}</li>) : <li>No participants yet</li>}
                  </ul>
                </div>

                <div>
                  <p className="font-semibold text-slate-800 dark:text-slate-300">Approvals:</p>
                  <ul className="text-slate-700 dark:text-slate-400 text-sm">
                    {event.approvals?.length ? event.approvals.map((a,i) => <li key={i}>{a}</li>) : <li>Pending approvals</li>}
                  </ul>
                </div>
              </div>

              <div className="mt-4 flex flex-wrap gap-2">
                <button onClick={() => handleUpdate(event.id)} className="flex items-center gap-1 px-3 py-2 bg-yellow-500 text-black rounded-full hover:bg-yellow-600 transition text-sm font-semibold"><Pencil className="w-4 h-4"/> Update</button>
                <button onClick={() => handleDelete(event.id)} className="flex items-center gap-1 px-3 py-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition text-sm font-semibold"><Trash className="w-4 h-4"/> Delete</button>
                <Link href={event.link} className="flex items-center gap-1 px-3 py-2 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 transition text-sm font-semibold"><Users className="w-4 h-4"/> View / Manage</Link>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Invitations Section */}
      {activeSection === "Invitations" && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {dummyInvites.map(invite => (
            <div key={invite.id} className="bg-slate-200/70 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-3xl p-6 shadow-md hover:shadow-xl transition">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">{invite.title}</h3>
              <p className="text-slate-700 dark:text-slate-400 mb-1">Date: {invite.date}</p>
              <p className="text-slate-700 dark:text-slate-400 mb-2">Organizer: {invite.organizer}</p>
              <div className="flex gap-2 mt-2">
                <button className="px-3 py-2 bg-green-500 text-white rounded-full hover:bg-green-600 transition text-sm font-semibold">Accept</button>
                <button className="px-3 py-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition text-sm font-semibold">Decline</button>
                {invite.fee === "Paid" && <button className="px-3 py-2 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 transition text-sm font-semibold">Pay & Accept</button>}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Reviews Section */}
      {activeSection === "Reviews" && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {dummyReviews.map(review => (
            <div key={review.id} className="bg-slate-200/70 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-3xl p-6 shadow-md hover:shadow-xl transition">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">{review.title}</h3>
              <p className="text-slate-700 dark:text-slate-400">Rating: {"⭐".repeat(review.rating)}</p>
              <div className="flex gap-2 mt-2">
                <button className="px-3 py-2 bg-yellow-500 text-black rounded-full hover:bg-yellow-600 transition text-sm font-semibold">Edit</button>
                <button className="px-3 py-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition text-sm font-semibold">Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Settings Section */}
      {activeSection === "Settings" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-slate-200/70 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-3xl p-6 shadow-md hover:shadow-xl transition">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Profile</h3>
            <p className="text-slate-700 dark:text-slate-400">Update your name, email, and password.</p>
            <button className="mt-2 px-4 py-2 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 transition text-sm font-semibold">Edit Profile</button>
          </div>
          <div className="bg-slate-200/70 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-3xl p-6 shadow-md hover:shadow-xl transition">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Notifications</h3>
            <p className="text-slate-700 dark:text-slate-400">Enable or disable event notifications.</p>
            <button className="mt-2 px-4 py-2 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 transition text-sm font-semibold">Manage Notifications</button>
          </div>
        </div>
      )}
    </div>
  );
}