"use client";

import Link from "next/link";

interface HeroSectionProps {
  event?: {
    title: string;
    date: string;
    description: string;
    link: string;
    image?: string; // optional background image
  };
}

const HeroSection = ({ event }: HeroSectionProps) => {
  // If event is undefined, render nothing or a placeholder
  if (!event) {
    return (
      <section className="py-28 bg-gray-900 text-white text-center">
        <p className="text-lg md:text-xl">No featured event available.</p>
      </section>
    );
  }

  return (
    <section
      className="relative bg-gray-900 text-white overflow-hidden"
      style={{
        backgroundImage: event.image ? `url(${event.image})` : undefined,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>

      <div className="container mx-auto px-4 py-28 relative z-10 flex flex-col items-start md:items-center md:text-center">
        {/* Event Title */}
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-4 transition duration-700 ease-out transform translate-y-6 opacity-0 animate-fadeIn">
          {event.title}
        </h1>

        {/* Event Date */}
        <p className="text-cyan-400 text-lg md:text-xl font-semibold mb-6 transition duration-700 ease-out transform translate-y-6 opacity-0 animate-fadeIn delay-150">
          {event.date}
        </p>

        {/* Short Description */}
        <p className="max-w-2xl text-white/80 text-md md:text-lg mb-8 transition duration-700 ease-out transform translate-y-6 opacity-0 animate-fadeIn delay-300">
          {event.description}
        </p>

        {/* Join Button */}
        <Link
          href={event.link}
          className="inline-block bg-cyan-400 text-gray-900 font-bold py-3 px-6 rounded-full hover:bg-white hover:text-cyan-400 transition-colors duration-300 transform translate-y-6 opacity-0 animate-fadeIn delay-450"
        >
          Join Now
        </Link>
      </div>

      {/* Tailwind Animation */}
      <style jsx>{`
        @layer utilities {
          .animate-fadeIn {
            @apply opacity-100 translate-y-0;
          }
          .delay-150 {
            transition-delay: 150ms;
          }
          .delay-300 {
            transition-delay: 300ms;
          }
          .delay-450 {
            transition-delay: 450ms;
          }
        }
      `}</style>
    </section>
  );
};

export default HeroSection;