"use client";

import { useEffect, useState } from "react";

const ContactPage = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1200);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="bg-slate-100 dark:bg-slate-900 min-h-screen p-6">
        <div className="max-w-2xl mx-auto space-y-6 animate-pulse">
          <div className="h-10 bg-slate-300 dark:bg-slate-700 rounded w-1/2 mx-auto"></div>
          <div className="h-6 bg-slate-300 dark:bg-slate-700 rounded w-3/4 mx-auto"></div>

          <div className="p-8 bg-white dark:bg-slate-800 rounded-2xl shadow-lg space-y-5">
            <div className="h-12 bg-slate-300 dark:bg-slate-700 rounded"></div>
            <div className="h-12 bg-slate-300 dark:bg-slate-700 rounded"></div>
            <div className="h-28 bg-slate-300 dark:bg-slate-700 rounded"></div>
            <div className="h-12 bg-slate-300 dark:bg-slate-700 rounded w-1/2 mx-auto"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-slate-100 dark:bg-slate-900 min-h-screen text-slate-800 dark:text-white font-sans">

      {/* Hero */}
      <section className="flex flex-col items-center justify-center text-center py-20 px-6">
        <h1 className="text-4xl md:text-6xl font-bold mb-6">
          Contact Us
        </h1>

        <p className="text-lg md:text-xl max-w-2xl leading-relaxed text-slate-600 dark:text-slate-400">
          Have questions or feedback? Reach out to us using the form below.
          We’ll get back to you as soon as possible.
        </p>
      </section>

      {/* Form Section */}
      <section className="flex justify-center px-6 md:px-20 pb-20">

        {/* Wrapper keeps SAME max width */}
        <div className="max-w-2xl w-full relative">

          {/* RGB Border (absolute so size doesn't change) */}
          <div className="absolute inset-0 rounded-2xl p-[2px] bg-gradient-to-r from-red-500 via-green-400 via-blue-500 to-pink-500 animate-rgb blur-sm opacity-60"></div>

          {/* Original Form (unchanged size) */}
          <form className="relative bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-lg border border-slate-300 dark:border-slate-700">

            <h2 className="text-2xl font-semibold mb-6 text-center text-indigo-600 dark:text-indigo-400">
              Send a Message
            </h2>

            {/* Name */}
            <div className="flex flex-col mb-5">
              <label className="mb-2 font-medium text-slate-700 dark:text-slate-300">
                Name
              </label>
              <input
                type="text"
                placeholder="Your Name"
                className="p-3 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-600 dark:focus:ring-indigo-400 transition"
                required
              />
            </div>

            {/* Email */}
            <div className="flex flex-col mb-5">
              <label className="mb-2 font-medium text-slate-700 dark:text-slate-300">
                Email
              </label>
              <input
                type="email"
                placeholder="you@example.com"
                className="p-3 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-600 dark:focus:ring-indigo-400 transition"
                required
              />
            </div>

            {/* Message */}
            <div className="flex flex-col mb-6">
              <label className="mb-2 font-medium text-slate-700 dark:text-slate-300">
                Message
              </label>
              <textarea
                rows={5}
                placeholder="Write your message..."
                className="p-3 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-600 dark:focus:ring-indigo-400 transition"
                required
              ></textarea>
            </div>

            {/* Button */}
            <div className="flex justify-center">
              <button
                type="submit"
                className="px-8 py-3 rounded-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold transition-all duration-300 shadow-md hover:shadow-lg"
              >
                Send Message
              </button>
            </div>

          </form>
        </div>

      </section>

      {/* RGB Animation */}
      <style jsx>{`
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

    </div>
  );
};

export default ContactPage;