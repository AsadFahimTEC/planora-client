

"use client";

import { useState } from "react";

const PrivacyPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="bg-gray-900 min-h-screen text-white font-sans relative overflow-hidden">

      {/* Background blur decorative layer */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-800 via-gray-900 to-black opacity-50 backdrop-blur-sm -z-10"></div>

      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center text-center py-20 px-4 animate-fadeIn">
        <h1 className="text-4xl md:text-6xl font-bold mb-4 tracking-wide text-cyan-400">
          Privacy Policy
        </h1>
        <p className="text-lg md:text-xl max-w-3xl leading-relaxed text-white/80">
          Your privacy is very important to us. We are committed to protecting your personal information and ensuring transparency about how we use it.
        </p>

        <button
          onClick={() => setIsModalOpen(true)}
          className="mt-6 px-6 py-3 rounded-full border border-cyan-400 hover:bg-cyan-400 hover:text-gray-900 transition-all duration-300 font-semibold"
        >
          Read Important Notice
        </button>
      </section>

      {/* Privacy Content */}
      <section className="max-w-4xl mx-auto px-4 md:px-8 pb-20 animate-slideUp">
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 mb-6 border border-cyan-400/30 shadow-lg transition-transform hover:scale-102">
          <h2 className="text-2xl font-semibold mb-3 text-cyan-400">Information Collection</h2>
          <p className="text-white/80 leading-relaxed">
            We collect personal information when you register or interact with our platform. This includes your name, email, and other relevant details.
          </p>
        </div>

        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 mb-6 border border-cyan-400/30 shadow-lg transition-transform hover:scale-102">
          <h2 className="text-2xl font-semibold mb-3 text-cyan-400">Data Usage</h2>
          <p className="text-white/80 leading-relaxed">
            Your data is used to improve your experience, process registrations, and communicate important updates. We never sell your personal information.
          </p>
        </div>

        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 mb-6 border border-cyan-400/30 shadow-lg transition-transform hover:scale-102">
          <h2 className="text-2xl font-semibold mb-3 text-cyan-400">Cookies</h2>
          <p className="text-white/80 leading-relaxed">
            We use cookies and similar technologies to enhance your experience, analyze trends, and manage the website effectively.
          </p>
        </div>

        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 mb-6 border border-cyan-400/30 shadow-lg transition-transform hover:scale-102">
          <h2 className="text-2xl font-semibold mb-3 text-cyan-400">Third-Party Services</h2>
          <p className="text-white/80 leading-relaxed">
            We may use third-party services to help manage events or collect analytics. All third-party services are vetted for privacy compliance.
          </p>
        </div>
      </section>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/70 backdrop-blur-sm">
          <div className="bg-gray-900 rounded-2xl p-6 w-11/12 max-w-lg shadow-2xl animate-slideUp">
            <h3 className="text-2xl font-bold text-cyan-400 mb-4">Important Notice</h3>
            <p className="text-white/80 mb-6">
              Please note that by using our platform, you agree to our privacy practices and terms. We recommend reviewing all privacy guidelines carefully.
            </p>
            <button
              onClick={() => setIsModalOpen(false)}
              className="px-6 py-3 rounded-full border border-cyan-400 hover:bg-cyan-400 hover:text-gray-900 transition-all duration-300 font-semibold"
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
          animation: fadeIn 1s forwards;
        }
        .animate-slideUp {
          opacity: 0;
          transform: translateY(20px);
          animation: slideUp 0.8s forwards;
        }
        @keyframes fadeIn {
          to { opacity: 1; }
        }
        @keyframes slideUp {
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

export default PrivacyPage;