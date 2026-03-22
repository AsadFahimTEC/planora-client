// /* eslint-disable @typescript-eslint/no-explicit-any */
// "use client";

// import { useState } from "react";

// interface CategoryCard {
//   id: number;
//   title: string;
//   type: "Public" | "Private";
//   fee: "Free" | "Paid";
//   description: string;
// }

// // Dummy data for categories
// const categories: CategoryCard[] = [
//   { id: 1, title: "Community Meetup", type: "Public", fee: "Free", description: "Open to everyone, no cost to join." },
//   { id: 2, title: "Tech Workshop", type: "Public", fee: "Paid", description: "Learn from experts, registration required." },
//   { id: 3, title: "Private Networking", type: "Private", fee: "Free", description: "Invite-only, exclusive access." },
//   { id: 4, title: "VIP Seminar", type: "Private", fee: "Paid", description: "Premium private event with registration fee." },
//   { id: 5, title: "Startup Pitch", type: "Public", fee: "Paid", description: "Public event for entrepreneurs." },
//   { id: 6, title: "Yoga Retreat", type: "Private", fee: "Free", description: "Relaxing private event for wellness." },
// ];

// // Gradient colors for cards
// const gradients = [
//   "from-indigo-700 via-purple-600 to-pink-500",
//   "from-emerald-600 via-teal-500 to-cyan-400",
//   "from-yellow-500 via-orange-400 to-red-500",
//   "from-sky-600 via-blue-500 to-indigo-500",
//   "from-fuchsia-500 via-pink-500 to-rose-400",
//   "from-lime-500 via-green-500 to-teal-400",
// ];

// const EventCategories = () => {
//   // Active filter state
//   const [filter, setFilter] = useState<"All" | "Public Free" | "Public Paid" | "Private Free" | "Private Paid">("All");

//   // Dynamically filter categories
//   const filteredCategories = categories.filter((cat) => {
//     if (filter === "All") return true;
//     if (filter === "Public Free") return cat.type === "Public" && cat.fee === "Free";
//     if (filter === "Public Paid") return cat.type === "Public" && cat.fee === "Paid";
//     if (filter === "Private Free") return cat.type === "Private" && cat.fee === "Free";
//     if (filter === "Private Paid") return cat.type === "Private" && cat.fee === "Paid";
//     return true;
//   });

//   return (
//     <section className="py-20 bg-gray-50">
//       <div className="container mx-auto px-4">
//         <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 text-gray-800">
//           Event Categories
//         </h2>

//         {/* Filter Buttons */}
//         <div className="flex flex-wrap justify-center gap-4 mb-10">
//           {["All", "Public Free", "Public Paid", "Private Free", "Private Paid"].map((f) => (
//             <button
//               key={f}
//               onClick={() => setFilter(f as any)}
//               className={`px-5 py-2 rounded-full font-semibold transition-all duration-300 ${
//                 filter === f
//                   ? "bg-gradient-to-r from-indigo-600 via-teal-500 to-cyan-400 text-white shadow-lg"
//                   : "bg-white text-gray-800 hover:bg-gray-200 shadow-sm"
//               }`}
//             >
//               {f}
//             </button>
//           ))}
//         </div>

//         {/* Cards Grid */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//           {filteredCategories.length > 0 ? (
//             filteredCategories.map((cat, idx) => (
//               <div
//                 key={cat.id}
//                 className={`bg-gradient-to-tr ${gradients[idx % gradients.length]} rounded-3xl p-6 text-white shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-500`}
//               >
//                 <h3 className="text-2xl font-extrabold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-white/90 via-white/70 to-white/90">
//                   {cat.title}
//                 </h3>
//                 <p className="text-white/80 mb-2">
//                   <span className="font-semibold">{cat.type}</span> | <span className="font-semibold">{cat.fee}</span>
//                 </p>
//                 <p className="text-white/70 text-sm">{cat.description}</p>
//               </div>
//             ))
//           ) : (
//             <p className="text-center text-gray-500 col-span-full mt-8">
//               No events found for this category.
//             </p>
//           )}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default EventCategories;

"use client";

import { useState } from "react";

type EventType = "Public" | "Private";
type EventFee = "Free" | "Paid";
type FilterType =
  | "All"
  | "Public Free"
  | "Public Paid"
  | "Private Free"
  | "Private Paid";

interface CategoryCard {
  id: number;
  title: string;
  type: EventType;
  fee: EventFee;
  description: string;
}

const categories: CategoryCard[] = [
  {
    id: 1,
    title: "Community Meetup",
    type: "Public",
    fee: "Free",
    description: "Open to everyone, no cost to join.",
  },
  {
    id: 2,
    title: "Tech Workshop",
    type: "Public",
    fee: "Paid",
    description: "Learn from experts, registration required.",
  },
  {
    id: 3,
    title: "Private Networking",
    type: "Private",
    fee: "Free",
    description: "Invite-only, exclusive access.",
  },
  {
    id: 4,
    title: "VIP Seminar",
    type: "Private",
    fee: "Paid",
    description: "Premium private event with registration fee.",
  },
  {
    id: 5,
    title: "Startup Pitch",
    type: "Public",
    fee: "Paid",
    description: "Public event for entrepreneurs.",
  },
  {
    id: 6,
    title: "Yoga Retreat",
    type: "Private",
    fee: "Free",
    description: "Relaxing private event for wellness.",
  },
];

const filters: FilterType[] = [
  "All",
  "Public Free",
  "Public Paid",
  "Private Free",
  "Private Paid",
];

export default function EventCategories() {
  const [activeFilter, setActiveFilter] = useState<FilterType>("All");

  const filteredCategories = categories.filter((cat) => {
    if (activeFilter === "All") return true;
    const [type, fee] = activeFilter.split(" ") as [EventType, EventFee];
    return cat.type === type && cat.fee === fee;
  });

  return (
    <section className="py-24 bg-slate-100 dark:bg-slate-900 transition-colors duration-500">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Heading */}
        <div className="text-center mb-14">
          <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white">
            Event Categories
          </h2>
          <p className="mt-4 text-lg text-slate-600 dark:text-slate-400">
            Explore events by access type and pricing model
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-4 mb-14">
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 border ${
                activeFilter === filter
                  ? "bg-indigo-600 text-white border-indigo-600 shadow-lg scale-105"
                  : "bg-slate-300 text-slate-800 border-slate-400 hover:bg-slate-400 dark:bg-slate-700 dark:text-slate-200 dark:border-slate-600 dark:hover:bg-slate-600"
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCategories.length > 0 ? (
            filteredCategories.map((cat) => (
              <div
                key={cat.id}
                className="rounded-3xl p-6 transition-all duration-500 transform hover:-translate-y-2 shadow-md hover:shadow-xl 
                bg-slate-200/60 dark:bg-slate-800 border border-slate-300 dark:border-slate-700"
              >
                <h3 className="text-2xl font-bold mb-3 text-slate-900 dark:text-white">
                  {cat.title}
                </h3>

                <div className="flex gap-3 mb-4">
                  <span className="px-3 py-1 text-xs font-semibold rounded-full bg-indigo-200 text-indigo-800 dark:bg-indigo-500/20 dark:text-indigo-300">
                    {cat.type}
                  </span>
                  <span className="px-3 py-1 text-xs font-semibold rounded-full bg-emerald-200 text-emerald-800 dark:bg-emerald-500/20 dark:text-emerald-300">
                    {cat.fee}
                  </span>
                </div>

                <p className="text-slate-700 dark:text-slate-400 text-sm leading-relaxed">
                  {cat.description}
                </p>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center text-slate-500 dark:text-slate-400 text-lg">
              No events found for this category.
            </div>
          )}
        </div>
      </div>
    </section>
  );
}