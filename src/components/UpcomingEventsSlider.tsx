// "use client";

// import Link from "next/link";
// import { useState } from "react";

// interface EventCard {
//   id: number;
//   title: string;
//   date: string;
//   organizer: string;
//   fee: "Free" | "Paid";
//   link: string;
// }

// interface UpcomingEventsSliderProps {
//   events?: EventCard[]; // optional to avoid undefined
// }

// const UpcomingEventsSlider = ({ events = [] }: UpcomingEventsSliderProps) => {
//   const [currentIndex, setCurrentIndex] = useState(0);

//   if (events.length === 0) {
//     return (
//       <section className="py-16 bg-black text-white text-center">
//         <p className="text-lg md:text-xl">No upcoming events available.</p>
//       </section>
//     );
//   }

//   const slideLeft = () => {
//     setCurrentIndex((prev) => (prev - 1 + events.length) % events.length);
//   };

//   const slideRight = () => {
//     setCurrentIndex((prev) => (prev + 1) % events.length);
//   };

//   return (
//     <section className="py-16 bg-black text-white relative overflow-hidden">
//       <div className="container mx-auto px-4">
//         <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">
//           Upcoming Events
//         </h2>

//         {/* Slider Buttons */}
//         <div className="flex justify-between mb-4">
//           <button
//             onClick={slideLeft}
//             className="p-2 rounded-full bg-white text-black hover:bg-gray-300 transition"
//           >
//             &#8592;
//           </button>
//           <button
//             onClick={slideRight}
//             className="p-2 rounded-full bg-white text-black hover:bg-gray-300 transition"
//           >
//             &#8594;
//           </button>
//         </div>

//         {/* Slider Track */}
//         <div className="overflow-x-hidden">
//           <div
//             className="flex transition-transform duration-500 ease-in-out"
//             style={{ transform: `translateX(-${currentIndex * 100}%)` }}
//           >
//             {events.map((event) => (
//               <div
//                 key={event.id}
//                 className="min-w-full sm:min-w-1/2 md:min-w-1/3 p-3"
//               >
//                 <div className="bg-white text-black rounded-xl p-6 shadow-lg hover:shadow-2xl transition hover:-translate-y-2 duration-300">
//                   <h3 className="text-xl font-bold mb-2">{event.title}</h3>
//                   <p className="text-black/70 mb-1">{event.date}</p>
//                   <p className="text-black/60 mb-3">Organizer: {event.organizer}</p>
//                   <span
//                     className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${
//                       event.fee === "Free"
//                         ? "bg-green-500 text-black"
//                         : "bg-red-500 text-white"
//                     }`}
//                   >
//                     {event.fee}
//                   </span>
//                   <Link
//                     href={event.link}
//                     className="block mt-4 text-center bg-black text-white font-bold py-2 rounded-full hover:bg-white hover:text-black transition"
//                   >
//                     Join Now
//                   </Link>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>

//       {/* Tailwind Animations */}
//       <style jsx>{`
//         @layer utilities {
//           .animate-fadeInUp {
//             @apply opacity-0 translate-y-6 transition-all duration-700 ease-out;
//           }
//         }
//       `}</style>
//     </section>
//   );
// };

// export default UpcomingEventsSlider;

"use client";

import Link from "next/link";

interface EventCard {
  id: number;
  title: string;
  date: string;
  organizer: string;
  fee: "Free" | "Paid";
  link: string;
}

const dummyEvents: EventCard[] = [
  { id: 1, title: "Music Festival", date: "Apr 10, 2026", organizer: "ABC Corp", fee: "Free", link: "/events/1" },
  { id: 2, title: "Tech Meetup", date: "Apr 12, 2026", organizer: "Techies", fee: "Paid", link: "/events/2" },
  { id: 3, title: "Art Expo", date: "Apr 15, 2026", organizer: "Creative Minds", fee: "Free", link: "/events/3" },
  { id: 4, title: "Startup Pitch", date: "Apr 18, 2026", organizer: "InnovateX", fee: "Paid", link: "/events/4" },
  { id: 5, title: "Cooking Workshop", date: "Apr 20, 2026", organizer: "Chef Club", fee: "Free", link: "/events/5" },
  { id: 6, title: "Yoga Retreat", date: "Apr 22, 2026", organizer: "Healthy Life", fee: "Paid", link: "/events/6" },
  { id: 7, title: "Photography Walk", date: "Apr 25, 2026", organizer: "Photo Pros", fee: "Free", link: "/events/7" },
  { id: 8, title: "Dance Workshop", date: "Apr 28, 2026", organizer: "Dance Club", fee: "Paid", link: "/events/8" },
  { id: 9, title: "Startup Seminar", date: "May 1, 2026", organizer: "BizHub", fee: "Free", link: "/events/9" },
];

export default function UpcomingEventsSlider() {
  return (
    <section className="py-20 bg-slate-100 dark:bg-slate-900 transition-colors duration-500">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Heading */}
        <div className="text-center mb-14">
          <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white">
            Upcoming Events
          </h2>
          <p className="mt-4 text-lg text-slate-600 dark:text-slate-400">
            Discover and join exciting events happening soon
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {dummyEvents.map((event) => (
            <div
              key={event.id}
              className="rounded-3xl p-6 shadow-md hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2
              bg-slate-200/70 dark:bg-slate-800 border border-slate-300 dark:border-slate-700"
            >
              {/* Title */}
              <h3 className="text-2xl font-bold mb-2 text-slate-900 dark:text-white">
                {event.title}
              </h3>

              {/* Date */}
              <p className="text-sm text-slate-600 dark:text-slate-400 mb-1">
                {event.date}
              </p>

              {/* Organizer */}
              <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
                Organizer: {event.organizer}
              </p>

              {/* Fee Badge */}
              <span
                className={`inline-block px-3 py-1 rounded-full text-xs font-semibold mb-4 ${
                  event.fee === "Free"
                    ? "bg-emerald-200 text-emerald-800 dark:bg-emerald-500/20 dark:text-emerald-300"
                    : "bg-rose-200 text-rose-800 dark:bg-rose-500/20 dark:text-rose-300"
                }`}
              >
                {event.fee}
              </span>

              {/* Button */}
              <Link
                href={event.link}
                className="block text-center mt-4 px-4 py-2 rounded-full font-semibold transition-all duration-300
                bg-indigo-600 text-white hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600"
              >
                Join Now
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}