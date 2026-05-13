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
    <section className="relative w-full overflow-hidden border-b border-slate-300 dark:border-slate-700">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(6,182,212,0.15),_transparent_28%),radial-gradient(circle_at_bottom_left,_rgba(168,85,247,0.12),_transparent_24%),linear-gradient(180deg,_rgba(255,255,255,0.04),_rgba(15,23,42,0.35))] pointer-events-none" />
      <div className="absolute -top-20 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-gradient-to-br from-cyan-400/30 via-transparent to-fuchsia-500/15 blur-3xl animate-float pointer-events-none" />
      <div className="absolute top-24 right-10 h-52 w-52 rounded-full bg-gradient-to-br from-emerald-400/25 via-transparent to-teal-400/10 blur-3xl animate-float-slow pointer-events-none" />
      <div className="absolute bottom-10 left-10 h-40 w-40 rounded-full bg-gradient-to-br from-red-500/20 via-transparent to-lime-400/15 blur-3xl animate-float-slow reverse pointer-events-none" />

      {/* Content */}
      <div className="relative max-w-7xl mx-auto px-6 py-28 flex justify-center">
        <div className="relative rounded-[2rem] max-w-3xl w-full overflow-hidden">
          {/* RGB Border Animation */}
          <div className="absolute inset-0 rounded-[2rem] p-[2px] bg-gradient-to-r from-red-500 via-green-400 via-blue-500 to-pink-500 animate-rgb blur-xl opacity-70" />

          {/* Card Content */}
          <div className="relative bg-slate-950/95 dark:bg-slate-900/95 rounded-[2rem] p-10 md:p-16 text-center shadow-2xl border border-white/10 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_30px_90px_-30px_rgba(14,165,233,0.35)]">
            <div className="mx-auto mb-8 inline-flex rounded-full bg-white/10 px-4 py-2 text-xs uppercase tracking-[0.24em] text-white/80 shadow-sm ring-1 ring-white/10">
              Featured Event
            </div>

            {/* Title */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 tracking-tight bg-gradient-to-r from-cyan-300 via-indigo-400 to-fuchsia-500 bg-clip-text text-transparent animate-slideInDown">
              {event.title}
            </h1>

            {/* Date */}
            <p className="text-emerald-300 font-semibold mb-6 text-lg md:text-xl animate-slideInLeft">
              {event.date}
            </p>

            {/* Description */}
            <p className="text-slate-200/85 mb-8 text-md md:text-lg leading-relaxed animate-slideInUp">
              {event.description}
            </p>

            {/* Button */}
            <Link
              href={event.link}
              className="inline-block bg-gradient-to-r from-cyan-500 via-indigo-500 to-fuchsia-500 text-white font-semibold py-3 px-8 rounded-full transition-all duration-300 shadow-[0_20px_80px_-40px_rgba(59,130,246,0.5)] hover:shadow-[0_22px_95px_-35px_rgba(168,85,247,0.5)] hover:-translate-y-1 hover:scale-105 animate-buttonPulse"
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

        .animate-slideInDown {
          opacity: 0;
          transform: translateY(-30px);
          animation: slideInDown 0.9s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
        }

        .animate-slideInLeft {
          opacity: 0;
          transform: translateX(-40px);
          animation: slideInLeft 0.9s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.15s forwards;
        }

        .animate-slideInUp {
          opacity: 0;
          transform: translateY(30px);
          animation: slideInUp 0.9s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.3s forwards;
        }

        .animate-buttonPulse {
          animation: buttonPulse 0.8s ease-out 0.5s forwards, buttonGlow 2.5s ease-in-out 0.5s infinite;
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

        @keyframes slideInDown {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideInLeft {
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes slideInUp {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes buttonPulse {
          0% { transform: scale(0.8); opacity: 0; }
          100% { transform: scale(1); opacity: 1; }
        }

        @keyframes buttonGlow {
          0%, 100% { 
            box-shadow: 0px 20px 80px -40px rgba(59, 130, 246, 0.5);
          }
          50% { 
            box-shadow: 0px 25px 100px -35px rgba(168, 85, 247, 0.65);
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

        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-12px); }
        }

        @keyframes floatSlow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }

        .animate-float {
          animation: float 5.5s ease-in-out infinite;
        }

        .animate-float-slow {
          animation: floatSlow 7s ease-in-out infinite;
        }

        .reverse {
          animation-direction: reverse;
        }
      `}</style>
    </section>
  );
};

export default HeroSection;