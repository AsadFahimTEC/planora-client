"use client";

import Link from "next/link";

const CallToActionSection = () => {
  return (
    <section className="py-24 bg-gradient-to-b from-indigo-600 via-purple-600 to-pink-500 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 text-black dark:text-white">
      <div className="container mx-auto px-6 text-center">
        {/* Heading */}
        <h2 className="text-4xl md:text-5xl font-extrabold mb-6">
          Ready to Get Started?
        </h2>
        <p className="text-lg md:text-xl text-black/80 mb-12">
          Create your own event or join exciting events happening around you!
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row justify-center gap-6">
          <Link
            href="/create-event"
            className="inline-block bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 text-gray-900 dark:text-white font-bold py-3 px-8 rounded-full shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300"
          >
            Create Event
          </Link>
          <Link
            href="/events"
            className="inline-block bg-white text-indigo-600 dark:bg-slate-800 dark:text-cyan-400 font-bold py-3 px-8 rounded-full shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300"
          >
            Join Event
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CallToActionSection;