"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const CallToActionSection = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8 },
    },
  };

  return (
    <section className="relative py-32 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(99,102,241,0.35),_transparent_28%),radial-gradient(circle_at_bottom_left,_rgba(236,72,153,0.32),_transparent_24%),linear-gradient(180deg,_rgba(255,255,255,0.12),_rgba(15,23,42,0.5))] pointer-events-none" />
      
      <div className="absolute top-0 right-1/4 h-96 w-96 bg-gradient-to-br from-cyan-400/35 via-transparent to-fuchsia-500/25 rounded-full blur-3xl pointer-events-none animate-float" />
      <div className="absolute bottom-0 left-1/4 h-72 w-72 bg-gradient-to-tr from-emerald-400/30 via-transparent to-cyan-400/20 rounded-full blur-3xl pointer-events-none animate-float-slow" />
      <div className="absolute top-1/2 right-0 h-60 w-60 bg-gradient-to-l from-fuchsia-400/30 via-transparent to-purple-500/20 rounded-full blur-3xl pointer-events-none animate-float-slow reverse" />

      <div className="relative container mx-auto px-6">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center"
        >
          {/* Heading */}
          <motion.h2
            variants={itemVariants}
            className="text-5xl md:text-6xl lg:text-7xl font-black mb-6 bg-gradient-to-r from-cyan-300 via-indigo-400 to-fuchsia-500 bg-clip-text text-transparent leading-tight"
          >
            Ready to Get Started?
          </motion.h2>

          <motion.p
            variants={itemVariants}
            className="text-lg md:text-xl text-black/70 mb-12 max-w-2xl mx-auto leading-relaxed font-medium"
          >
            Create your own event or join exciting events happening around you and connect with like-minded people!
          </motion.p>

          {/* Buttons */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row justify-center gap-6 items-center"
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group"
            >
              <Link
                href="/create-event"
                className="inline-block relative px-10 py-4 font-bold text-lg rounded-full overflow-hidden transition-all duration-300"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-indigo-500 to-fuchsia-500 group-hover:shadow-[0_20px_100px_-40px_rgba(59,130,246,0.5)]" />
                <span className="relative text-white flex items-center gap-2">
                  🚀 Create Event
                </span>
              </Link>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group"
            >
              <Link
                href="/events"
                className="inline-block px-10 py-4 font-bold text-lg rounded-full border-2 border-white/60 text-black/70 hover:border-white/90 hover:bg-white/15 transition-all duration-300 backdrop-blur-xl shadow-lg"
              >
                🎉 Join Event
              </Link>
            </motion.div>
          </motion.div>

          {/* Floating stats or trust indicators */}
          <motion.div
            variants={itemVariants}
            className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6"
          >
            {[
              { number: "10K+", label: "Events", gradient: "from-cyan-500/50 to-cyan-600/35", borderColor: "border-cyan-300", glowColor: "shadow-[0_0_40px_rgba(34,211,238,0.6),inset_0_0_20px_rgba(34,211,238,0.2)]" },
              { number: "50K+", label: "Users", gradient: "from-indigo-500/50 to-indigo-600/35", borderColor: "border-indigo-300", glowColor: "shadow-[0_0_40px_rgba(99,102,241,0.6),inset_0_0_20px_rgba(99,102,241,0.2)]" },
              { number: "100+", label: "Cities", gradient: "from-fuchsia-500/50 to-fuchsia-600/35", borderColor: "border-fuchsia-300", glowColor: "shadow-[0_0_40px_rgba(232,121,249,0.6),inset_0_0_20px_rgba(232,121,249,0.2)]" },
              { number: "4.9★", label: "Rating", gradient: "from-emerald-500/50 to-emerald-600/35", borderColor: "border-emerald-300", glowColor: "shadow-[0_0_40px_rgba(52,211,153,0.6),inset_0_0_20px_rgba(52,211,153,0.2)]" },
            ].map((stat, idx) => (
              <motion.div
                key={idx}
                whileHover={{ y: -12, scale: 1.08 }}
                whileTap={{ scale: 0.96 }}
                className={`p-6 rounded-2xl bg-gradient-to-br ${stat.gradient} border-3 ${stat.borderColor} backdrop-blur-2xl transition-all duration-300 cursor-pointer group animate-pulse-glow`}
                style={{
                  boxShadow: stat.glowColor,
                }}
              >
                <p className="text-3xl md:text-4xl font-black bg-gradient-to-r from-white via-slate-50 to-slate-100 bg-clip-text text-transparent">
                  {stat.number}
                </p>
                <p className="text-base md:text-lg text-white/95 mt-3 font-semibold group-hover:text-white transition-colors">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
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

        @keyframes gradientShift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }

        .animate-gradient {
          animation: gradientShift 5s ease infinite;
        }

        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-12px); }
        }

        @keyframes floatSlow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }

        @keyframes pulseGlow {
          0%, 100% {
            filter: drop-shadow(0 0 8px currentColor);
            opacity: 1;
          }
          50% {
            filter: drop-shadow(0 0 16px currentColor);
            opacity: 1.05;
          }
        }

        .animate-float {
          animation: float 5.5s ease-in-out infinite;
        }

        .animate-float-slow {
          animation: floatSlow 7s ease-in-out infinite;
        }

        .animate-pulse-glow {
          animation: pulseGlow 3s ease-in-out infinite;
        }

        .reverse {
          animation-direction: reverse;
        }
      `}</style>
    </section>
  );
};

export default CallToActionSection;