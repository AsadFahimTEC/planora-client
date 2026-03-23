"use client";

import { useState } from "react";

const PrivacyPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

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
          className="mt-8 px-6 py-3 rounded-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold transition-all duration-300 shadow-md hover:shadow-lg"
        >
          Read Important Notice
        </button>
      </section>

      {/* Privacy Content */}
      <section className="max-w-4xl mx-auto px-6 md:px-8 pb-20 animate-slideUp">

        {/* Card */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl p-8 mb-6 border border-slate-300 dark:border-slate-700 shadow-md transition-transform hover:-translate-y-1">
          <h2 className="text-2xl font-semibold mb-3 text-indigo-600 dark:text-indigo-400">
            Information Collection
          </h2>
          <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
            We collect personal information when you register or interact with
            our platform. This includes your name, email, and other relevant details.
          </p>
        </div>

        {/* Card */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl p-8 mb-6 border border-slate-300 dark:border-slate-700 shadow-md transition-transform hover:-translate-y-1">
          <h2 className="text-2xl font-semibold mb-3 text-indigo-600 dark:text-indigo-400">
            Data Usage
          </h2>
          <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
            Your data is used to improve your experience, process registrations,
            and communicate important updates. We never sell your personal information.
          </p>
        </div>

        {/* Card */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl p-8 mb-6 border border-slate-300 dark:border-slate-700 shadow-md transition-transform hover:-translate-y-1">
          <h2 className="text-2xl font-semibold mb-3 text-indigo-600 dark:text-indigo-400">
            Cookies
          </h2>
          <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
            We use cookies and similar technologies to enhance your experience,
            analyze trends, and manage the website effectively.
          </p>
        </div>

        {/* Card */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl p-8 mb-6 border border-slate-300 dark:border-slate-700 shadow-md transition-transform hover:-translate-y-1">
          <h2 className="text-2xl font-semibold mb-3 text-indigo-600 dark:text-indigo-400">
            Third-Party Services
          </h2>
          <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
            We may use third-party services to help manage events or collect
            analytics. All third-party services are vetted for privacy compliance.
          </p>
        </div>
      </section>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/60 backdrop-blur-sm">
          <div className="bg-white dark:bg-slate-800 rounded-2xl p-8 w-11/12 max-w-lg shadow-2xl border border-slate-300 dark:border-slate-700 animate-slideUp">
            
            <h3 className="text-2xl font-bold text-indigo-600 dark:text-indigo-400 mb-4">
              Important Notice
            </h3>

            <p className="text-slate-600 dark:text-slate-400 mb-6 leading-relaxed">
              By using our platform, you agree to our privacy practices and terms.
              We recommend reviewing all privacy guidelines carefully.
            </p>

            <button
              onClick={() => setIsModalOpen(false)}
              className="px-6 py-3 rounded-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold transition-all duration-300"
            >
              Close
            </button>
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

        @keyframes fadeIn {
          to { opacity: 1; }
        }

        @keyframes slideUp {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>

    </div>
  );
};

export default PrivacyPage;