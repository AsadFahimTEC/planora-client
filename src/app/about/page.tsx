"use client";

const AboutPage = () => {
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

      {/* Feature Cards */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-8 px-6 md:px-20 pb-20">

        {/* Card 1 */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl p-8 text-center shadow-md border border-slate-300 dark:border-slate-700 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl animate-slideUp">
          <h2 className="text-2xl font-semibold mb-3 text-indigo-600 dark:text-indigo-400">
            Secure & Private
          </h2>
          <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
            All users are protected with JWT authentication, ensuring your data
            and event details remain private and secure.
          </p>
        </div>

        {/* Card 2 */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl p-8 text-center shadow-md border border-slate-300 dark:border-slate-700 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl animate-slideUp delay-100">
          <h2 className="text-2xl font-semibold mb-3 text-indigo-600 dark:text-indigo-400">
            Create & Manage Events
          </h2>
          <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
            Admins and users can easily create and manage events, whether public
            or private, with flexible registration and fee options.
          </p>
        </div>

        {/* Card 3 */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl p-8 text-center shadow-md border border-slate-300 dark:border-slate-700 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl animate-slideUp delay-200">
          <h2 className="text-2xl font-semibold mb-3 text-indigo-600 dark:text-indigo-400">
            Participate & Connect
          </h2>
          <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
            Users can discover events, register, and participate seamlessly,
            connecting with others in a secure and intuitive environment.
          </p>
        </div>

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

        .delay-100 {
          animation-delay: 0.2s;
        }

        .delay-200 {
          animation-delay: 0.4s;
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

export default AboutPage;