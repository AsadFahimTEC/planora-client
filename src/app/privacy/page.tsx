"use client";

import { useState, useEffect } from "react";

const PrivacyPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Simulate page loading
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    // Skeleton Loader
    return (
      <div className="min-h-screen bg-slate-100 dark:bg-slate-900 flex flex-col items-center justify-center space-y-6 px-6">
        {/* Hero Skeleton */}
        <div className="w-full max-w-3xl animate-pulse">
          <div className="h-10 md:h-12 bg-slate-300 dark:bg-slate-700 rounded-lg mb-4"></div>
          <div className="h-6 bg-slate-300 dark:bg-slate-700 rounded mb-2"></div>
          <div className="h-6 bg-slate-300 dark:bg-slate-700 rounded mb-2"></div>
          <div className="h-6 bg-slate-300 dark:bg-slate-700 rounded w-3/4"></div>
        </div>

        {/* Cards Skeleton */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 max-w-4xl w-full">
          {[1, 2, 3, 4].map((_, idx) => (
            <div
              key={idx}
              className="h-40 bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 rounded-2xl animate-pulse"
            ></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-slate-100 dark:bg-slate-900 min-h-screen text-slate-800 dark:text-white font-sans relative overflow-hidden">

      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center text-center py-20 px-6 animate-fadeIn">
        <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight text-slate-800 dark:text-white">
          Privacy Policy
        </h1>

        <p className="text-lg md:text-xl max-w-3xl leading-relaxed text-slate-600 dark:text-slate-400">
          Your privacy is very important to us. We are committed to protecting
          your personal information and ensuring transparency about how we use it.
        </p>

        <button
          onClick={() => setIsModalOpen(true)}
          className="mt-8 px-6 py-3 rounded-full bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 text-white font-semibold shadow-lg hover:shadow-2xl transition-all duration-300 animate-gradientButton"
        >
          Read Important Notice
        </button>
      </section>

      {/* Privacy Content */}
      <section className="max-w-4xl mx-auto px-6 md:px-8 pb-20 animate-slideUp">

        {[
          { title: "Information Collection", text: "We collect personal information when you register or interact with our platform. This includes your name, email, and other relevant details." },
          { title: "Data Usage", text: "Your data is used to improve your experience, process registrations, and communicate important updates. We never sell your personal information." },
          { title: "Cookies", text: "We use cookies and similar technologies to enhance your experience, analyze trends, and manage the website effectively." },
          { title: "Third-Party Services", text: "We may use third-party services to help manage events or collect analytics. All third-party services are vetted for privacy compliance." },
        ].map((item, idx) => (
          <div
            key={idx}
            className="bg-white dark:bg-slate-800 rounded-2xl p-8 mb-6 border border-slate-300 dark:border-slate-700 shadow-md transition-transform hover:-translate-y-1"
          >
            <h2 className="text-2xl font-semibold mb-3 text-indigo-600 dark:text-indigo-400">
              {item.title}
            </h2>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              {item.text}
            </p>
          </div>
        ))}

      </section>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/60 backdrop-blur-sm">
          <div className="relative w-11/12 max-w-lg rounded-3xl p-8 shadow-2xl border border-slate-300 dark:border-slate-700 overflow-hidden">
            
            {/* Gradient Background */}
            <div className="absolute inset-0 bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 animate-gradientModal blur-3xl opacity-40"></div>

            {/* Modal Content */}
            <div className="relative z-10 bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg">
              <h3 className="text-2xl font-bold text-indigo-600 dark:text-indigo-400 mb-4">
                Important Notice
              </h3>

              <p className="text-slate-600 dark:text-slate-400 mb-6 leading-relaxed">
                By using our platform, you agree to our privacy practices and terms.
                We recommend reviewing all privacy guidelines carefully.
              </p>

              <button
                onClick={() => setIsModalOpen(false)}
                className="px-6 py-3 rounded-full bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 text-white font-semibold shadow-lg hover:shadow-2xl transition-all duration-300 animate-gradientButton"
              >
                Close
              </button>
            </div>

          </div>
        </div>
      )}

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

        .animate-gradientModal {
          background-size: 200% 200%;
          animation: gradientShift 6s ease infinite;
        }

        .animate-gradientButton {
          background-size: 200% 200%;
          animation: gradientShift 4s ease infinite;
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

        @keyframes gradientShift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>

    </div>
  );
};

export default PrivacyPage;