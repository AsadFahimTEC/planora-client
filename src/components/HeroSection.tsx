// "use client";

// import Link from "next/link";

// interface HeroSectionProps {
//   event?: {
//     title: string;
//     date: string;
//     description: string;
//     link: string;
//     image?: string; // optional background image
//   };
// }

// const HeroSection = ({ event }: HeroSectionProps) => {
//   // If event is undefined, render nothing or a placeholder
//   if (!event) {
//     return (
//       <section className="py-28 bg-gray-900 text-white text-center">
//         <p className="text-lg md:text-xl">No featured event available.</p>
//       </section>
//     );
//   }

//   return (
//     <section
//       className="relative bg-gray-900 text-white overflow-hidden"
//       style={{
//         backgroundImage: event.image ? `url(${event.image})` : undefined,
//         backgroundSize: "cover",
//         backgroundPosition: "center",
//       }}
//     >
//       {/* Overlay */}
//       <div className="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>

//       <div className="container mx-auto px-4 py-28 relative z-10 flex flex-col items-start md:items-center md:text-center">
//         {/* Event Title */}
//         <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-4 transition duration-700 ease-out transform translate-y-6 opacity-0 animate-fadeIn">
//           {event.title}
//         </h1>

//         {/* Event Date */}
//         <p className="text-cyan-400 text-lg md:text-xl font-semibold mb-6 transition duration-700 ease-out transform translate-y-6 opacity-0 animate-fadeIn delay-150">
//           {event.date}
//         </p>

//         {/* Short Description */}
//         <p className="max-w-2xl text-white/80 text-md md:text-lg mb-8 transition duration-700 ease-out transform translate-y-6 opacity-0 animate-fadeIn delay-300">
//           {event.description}
//         </p>

//         {/* Join Button */}
//         <Link
//           href={event.link}
//           className="inline-block bg-cyan-400 text-gray-900 font-bold py-3 px-6 rounded-full hover:bg-white hover:text-cyan-400 transition-colors duration-300 transform translate-y-6 opacity-0 animate-fadeIn delay-450"
//         >
//           Join Now
//         </Link>
//       </div>

//       {/* Tailwind Animation */}
//       <style jsx>{`
//         @layer utilities {
//           .animate-fadeIn {
//             @apply opacity-100 translate-y-0;
//           }
//           .delay-150 {
//             transition-delay: 150ms;
//           }
//           .delay-300 {
//             transition-delay: 300ms;
//           }
//           .delay-450 {
//             transition-delay: 450ms;
//           }
//         }
//       `}</style>
//     </section>
//   );
// };

// export default HeroSection;

"use client";

import Link from "next/link";

interface HeroSectionProps {
  event?: {
    title: string;
    date: string;
    description: string;
    link: string;
    image?: string;
  };
}

// Dummy event
const dummyEvent = {
  title: "Spring Music Festival 🎶",
  date: "April 20, 2026",
  description:
    "Join the ultimate Spring Music Festival with live bands, food stalls, and unforgettable vibes! Don’t miss out on the celebration.",
  link: "/events/1",
};

const HeroSection = ({ event = dummyEvent }: HeroSectionProps) => {
  return (
    <section className="relative w-full bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 overflow-hidden">
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm"></div>

      {/* Floating Card */}
      <div className="container mx-auto px-4 py-32 relative z-10 flex justify-center">
        <div className="bg-black/20 backdrop-blur-3xl rounded-3xl p-8 md:p-16 text-center max-w-3xl shadow-[0_0_60px_rgba(0,255,255,0.2)] transform hover:scale-105 transition-transform duration-500">
          {/* Gradient Heading */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 animate-[textShimmer_3s_ease-in-out_infinite]">
            {event.title}
          </h1>

          {/* Event Date */}
          <p className="text-cyan-300 font-semibold mb-6 text-lg md:text-xl animate-fadeIn delay-200">
            {event.date}
          </p>

          {/* Description */}
          <p className="text-white/80 mb-8 text-md md:text-lg animate-fadeIn delay-400">
            {event.description}
          </p>

          {/* Join Button */}
          <Link
            href={event.link}
            className="inline-block bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 text-black font-bold py-3 px-8 rounded-full shadow-lg hover:shadow-2xl hover:scale-110 transition-all duration-300 animate-fadeIn delay-600"
          >
            Join Now
          </Link>
        </div>
      </div>

      {/* Tailwind Animations */}
      <style jsx>{`
        @keyframes textShimmer {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        .animate-[textShimmer_3s_ease-in-out_infinite] {
          background-size: 200% 200%;
          animation: textShimmer 3s ease-in-out infinite;
        }
        .animate-fadeIn {
          opacity: 0;
          transform: translateY(20px);
          animation: fadeIn 1s forwards;
        }
        .animate-fadeIn.delay-200 { animation-delay: 0.2s; }
        .animate-fadeIn.delay-400 { animation-delay: 0.4s; }
        .animate-fadeIn.delay-600 { animation-delay: 0.6s; }
        @keyframes fadeIn {
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  );
};

export default HeroSection;