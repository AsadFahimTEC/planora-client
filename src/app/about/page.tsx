"use client";

import { useEffect, useState } from "react";

const AboutPage = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="bg-slate-100 dark:bg-slate-900 min-h-screen p-6">
        <div className="space-y-6 max-w-6xl mx-auto">
          {/* Skeleton for Hero */}
          <div className="h-12 bg-slate-300 dark:bg-slate-700 rounded w-3/5 mx-auto animate-pulse"></div>
          <div className="h-6 bg-slate-300 dark:bg-slate-700 rounded w-2/3 mx-auto animate-pulse"></div>

          {/* Skeleton for Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="h-64 bg-slate-300 dark:bg-slate-700 rounded-2xl animate-pulse"
              ></div>
            ))}
          </div>

          {/* Skeleton for CTA */}
          <div className="h-48 bg-slate-300 dark:bg-slate-700 rounded-2xl animate-pulse mt-8"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-slate-100 dark:bg-slate-900 min-h-screen text-slate-800 dark:text-white font-sans">

      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center text-center py-20 px-6 animate-fadeIn">
        <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight text-slate-800 dark:text-white">
          About Planora
        </h1>

        <p className="text-lg md:text-xl max-w-2xl leading-relaxed text-slate-600 dark:text-slate-400">
          Planora is a secure, JWT-protected platform where Admins and registered
          Users can create, manage, and participate in events. Events can be Public
          or Private and may include registration fees.
        </p>
      </section>

      {/* Feature Cards with RGB border */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-8 px-6 md:px-20 pb-20">
        {[{
          title: "Secure & Private",
          desc: "All users are protected with JWT authentication, ensuring your data and event details remain private and secure."
        },{
          title: "Create & Manage Events",
          desc: "Admins and users can easily create and manage events, whether public or private, with flexible registration and fee options."
        },{
          title: "Participate & Connect",
          desc: "Users can discover events, register, and participate seamlessly, connecting with others in a secure and intuitive environment."
        }].map((card, i) => (
          <div key={i} className="relative rounded-2xl">
            {/* RGB border wrapper */}
            <div className="absolute inset-0 rounded-2xl p-[2px] bg-gradient-to-r from-red-500 via-green-400 via-blue-500 to-pink-500 animate-rgb blur-sm opacity-60"></div>
            
            {/* Card content */}
            <div className="relative bg-white dark:bg-slate-800 rounded-2xl p-8 text-center shadow-md border border-slate-300 dark:border-slate-700 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl animate-slideUp" style={{ animationDelay: `${i*0.2}s` }}>
              <h2 className="text-2xl font-semibold mb-3 text-indigo-600 dark:text-indigo-400">
                {card.title}
              </h2>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                {card.desc}
              </p>
            </div>
          </div>
        ))}
      </section>

      {/* CTA Section */}
      <section className="flex flex-col items-center justify-center text-center py-16 px-6 dark:bg-slate-800 border-t border-slate-300 dark:border-slate-700 animate-fadeIn">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-slate-800 dark:text-white">
          Ready to Explore Planora?
        </h2>
        <p className="mb-6 max-w-xl text-slate-600 dark:text-slate-400 leading-relaxed">
          Join today and start creating, managing, and participating in events
          with ease and security.
        </p>
        <a
          href="/register"
          className="px-8 py-3 rounded-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold transition-all duration-300 shadow-md hover:shadow-lg"
        >
          Get Started
        </a>
      </section>

      {/* Animations */}
      <style jsx>{`
        .animate-fadeIn {
          opacity: 0;
          animation: fadeIn 0.8s ease forwards;
        }
        .animate-slideUp {
          opacity: 0;
          transform: translateY(20px);
          animation: slideUp 0.7s ease forwards;
        }
        @keyframes fadeIn {
          to { opacity: 1; }
        }
        @keyframes slideUp {
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
    </div>
  );
};

export default AboutPage;