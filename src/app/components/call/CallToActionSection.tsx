"use client";

import Link from "next/link";

const CallToActionSection = () => {
  return (
    <section className="py-24 bg-slate-100 dark:bg-slate-900 transition-colors duration-500">
      <div className="container mx-auto px-6 text-center">
        {/* Heading */}
        <h2 className="text-4xl md:text-5xl font-extrabold mb-6 animate-fadeIn">
          Ready to Get Started?
        </h2>
        <p className="text-lg md:text-xl text-black/80 dark:text-white/80 mb-12 animate-fadeIn delay-200">
          Create your own event or join exciting events happening around you!
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row justify-center gap-6">
          <Link
            href="/create-event"
            className="inline-block bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-[length:200%_200%] text-gray-900 dark:text-white font-bold py-3 px-8 rounded-full shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 animate-gradient"
          >
            Create Event
          </Link>
          <Link
            href="/events"
            className="inline-block bg-white text-indigo-600 dark:bg-slate-800 dark:text-cyan-400 font-bold py-3 px-8 rounded-full shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 animate-fadeIn delay-400"
          >
            Join Event
          </Link>
        </div>
      </div>

      {/* Animations */}
      <style jsx>{`
        @keyframes fadeIn {
          0% { opacity: 0; transform: translateY(20px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          opacity: 0;
          animation: fadeIn 0.8s ease forwards;
        }
        .delay-200 { animation-delay: 0.2s; }
        .delay-400 { animation-delay: 0.4s; }

        /* Gradient Animation */
        @keyframes gradientShift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-gradient {
          animation: gradientShift 5s ease infinite;
        }
      `}</style>
    </section>
  );
};

export default CallToActionSection;