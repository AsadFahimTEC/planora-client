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

// Dummy event fallback
const dummyEvent = {
  title: "Spring Music Festival 🎶",
  date: "April 20, 2026",
  description:
    "Join the ultimate Spring Music Festival with live bands, food stalls, and unforgettable vibes! Don’t miss out on the celebration.",
  link: "/events/1",
};

const HeroSection = ({ event = dummyEvent }: HeroSectionProps) => {
  return (
    <section className="relative w-full bg-slate-100 dark:bg-slate-900 overflow-hidden border-b border-slate-300 dark:border-slate-700">

      {/* Content */}
      <div className="max-w-7xl mx-auto px-6 py-28 flex justify-center">
        <div className="relative rounded-3xl max-w-3xl w-full">
          {/* RGB Border Animation */}
          <div className="absolute inset-0 rounded-3xl p-[2px] bg-gradient-to-r from-red-500 via-green-400 via-blue-500 to-pink-500 animate-rgb blur-md opacity-60"></div>

          {/* Card Content */}
          <div className="relative bg-white dark:bg-slate-800 rounded-3xl p-10 md:p-16 text-center shadow-md border border-slate-300 dark:border-slate-700 transition-all duration-500 hover:-translate-y-2 hover:shadow-xl">
            
            {/* Title */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 tracking-tight text-slate-800 dark:text-white animate-fadeIn">
              {event.title}
            </h1>

            {/* Date */}
            <p className="text-indigo-600 dark:text-indigo-400 font-semibold mb-6 text-lg md:text-xl animate-fadeIn delay-200">
              {event.date}
            </p>

            {/* Description */}
            <p className="text-slate-600 dark:text-slate-400 mb-8 text-md md:text-lg leading-relaxed animate-fadeIn delay-400">
              {event.description}
            </p>

            {/* Button */}
            <Link
              href={event.link}
              className="inline-block bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-8 rounded-full transition-all duration-300 shadow-md hover:shadow-lg animate-fadeIn delay-600"
            >
              Join Now
            </Link>
          </div>
        </div>
      </div>

      {/* Animations */}
      <style jsx>{`
        .animate-fadeIn {
          opacity: 0;
          transform: translateY(20px);
          animation: fadeIn 0.8s ease forwards;
        }

        .delay-200 { animation-delay: 0.2s; }
        .delay-400 { animation-delay: 0.4s; }
        .delay-600 { animation-delay: 0.6s; }

        @keyframes fadeIn {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes rgbAnimation {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }

        .animate-rgb {
          background-size: 400% 400%;
          animation: rgbAnimation 6s ease infinite;
        }
      `}</style>
    </section>
  );
};

export default HeroSection;