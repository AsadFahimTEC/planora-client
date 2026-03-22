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

const UpcomingEventsSlider= () => {
  return (
    <section className="py-16 bg-gray-100">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold mb-12 text-center text-gray-800">
          Upcoming Events
        </h2>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
          {dummyEvents.map((event) => (
            <div
              key={event.id}
              className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white rounded-xl p-6 shadow-lg hover:shadow-2xl hover:scale-105 transform transition-all duration-300"
            >
              <h3 className="text-2xl font-bold mb-2">{event.title}</h3>
              <p className="text-white/80 mb-1">{event.date}</p>
              <p className="text-white/70 mb-3">Organizer: {event.organizer}</p>
              <span
                className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${
                  event.fee === "Free"
                    ? "bg-green-300 text-black"
                    : "bg-red-400 text-white"
                }`}
              >
                {event.fee}
              </span>
              <Link
                href={event.link}
                className="block mt-4 text-center bg-white text-gray-800 font-bold py-2 rounded-full hover:bg-gray-200 hover:text-gray-900 transition"
              >
                Join Now
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default UpcomingEventsSlider;