"use client";

const AboutPage = () => {
  return (
    <div className="bg-gray-900 min-h-screen text-white font-sans">

      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center text-center py-20 px-4 animate-fadeIn">
        <h1 className="text-4xl md:text-6xl font-bold mb-4 tracking-wide text-cyan-400">
          About Planora
        </h1>
        <p className="text-lg md:text-xl max-w-2xl leading-relaxed text-white/90">
          Planora is a secure, JWT-protected platform where Admins and registered
          Users can create, manage, and participate in events. Events can be Public
          or Private and may include registration fees.
        </p>
      </section>

      {/* Feature Cards */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-8 px-6 md:px-20 pb-20">
        {/* Card 1 */}
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 text-center shadow-lg border border-cyan-400/20 transition-transform duration-300 hover:scale-105 hover:shadow-2xl animate-slideUp">
          <h2 className="text-2xl font-semibold mb-2 text-cyan-300">Secure & Private</h2>
          <p className="text-white/90">
            All users are protected with JWT authentication, ensuring your data
            and event details remain private and secure.
          </p>
        </div>

        {/* Card 2 */}
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 text-center shadow-lg border border-cyan-400/20 transition-transform duration-300 hover:scale-105 hover:shadow-2xl animate-slideUp delay-100">
          <h2 className="text-2xl font-semibold mb-2 text-cyan-300">Create & Manage Events</h2>
          <p className="text-white/90">
            Admins and users can easily create and manage events, whether public
            or private, with flexible registration and fee options.
          </p>
        </div>

        {/* Card 3 */}
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 text-center shadow-lg border border-cyan-400/20 transition-transform duration-300 hover:scale-105 hover:shadow-2xl animate-slideUp delay-200">
          <h2 className="text-2xl font-semibold mb-2 text-cyan-300">Participate & Connect</h2>
          <p className="text-white/90">
            Users can discover events, register, and participate seamlessly,
            connecting with others in a secure and intuitive environment.
          </p>
        </div>
      </section>

      {/* CTA Section */}
      <section className="flex flex-col items-center justify-center text-center py-16 px-4 bg-white/5 backdrop-blur-sm border-t border-cyan-400/20 animate-fadeIn">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-cyan-400">Ready to Explore Planora?</h2>
        <p className="mb-6 max-w-xl text-white/90 leading-relaxed">
          Join today and start creating, managing, and participating in events
          with ease and security.
        </p>
        <a
          href="#"
          className="px-8 py-3 border border-cyan-400 rounded-full font-semibold text-cyan-400 hover:bg-cyan-400 hover:text-gray-900 transition-all duration-300"
        >
          Get Started
        </a>
      </section>

      {/* Animations CSS */}
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
        .delay-100 {
          animation-delay: 0.2s;
        }
        .delay-200 {
          animation-delay: 0.4s;
        }
        @keyframes fadeIn {
          to {
            opacity: 1;
          }
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