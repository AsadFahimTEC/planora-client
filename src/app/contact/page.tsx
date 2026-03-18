"use client";

const ContactPage = () => {
  return (
    <div className="bg-gray-900 min-h-screen text-white font-sans">

      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center text-center py-20 px-4 animate-fadeIn">
        <h1 className="text-4xl md:text-6xl font-bold mb-4 tracking-wide text-cyan-400">
          Contact Us
        </h1>
        <p className="text-lg md:text-xl max-w-2xl leading-relaxed text-white/80">
          Have questions or feedback? Reach out to us using the form below.  
          We’ll get back to you as soon as possible.
        </p>
      </section>

      {/* Contact Form Section */}
      <section className="flex justify-center px-4 md:px-20 pb-20">
        <form className="bg-white/10 backdrop-blur-md rounded-2xl p-8 w-full max-w-2xl shadow-lg border border-cyan-400/30 animate-slideUp">
          <h2 className="text-2xl font-semibold mb-6 text-center text-cyan-400">Send a Message</h2>

          {/* Name Input */}
          <div className="flex flex-col mb-4">
            <label htmlFor="name" className="mb-2 font-medium text-white/80">
              Name
            </label>
            <input
              type="text"
              id="name"
              placeholder="Your Name"
              className="p-3 rounded-lg bg-white/10 border border-cyan-400/40 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-cyan-400 transition"
              required
            />
          </div>

          {/* Email Input */}
          <div className="flex flex-col mb-4">
            <label htmlFor="email" className="mb-2 font-medium text-white/80">
              Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="you@example.com"
              className="p-3 rounded-lg bg-white/10 border border-cyan-400/40 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-cyan-400 transition"
              required
            />
          </div>

          {/* Message Textarea */}
          <div className="flex flex-col mb-6">
            <label htmlFor="message" className="mb-2 font-medium text-white/80">
              Message
            </label>
            <textarea
              id="message"
              rows={5}
              placeholder="Write your message..."
              className="p-3 rounded-lg bg-white/10 border border-cyan-400/40 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-cyan-400 transition"
              required
            ></textarea>
          </div>

          {/* Submit Button */}
          <div className="flex justify-center">
            <button
              type="submit"
              className="px-8 py-3 rounded-full border border-cyan-400 hover:bg-cyan-400 hover:text-gray-900 font-semibold transition-all duration-300"
            >
              Send Message
            </button>
          </div>
        </form>
      </section>

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

export default ContactPage;