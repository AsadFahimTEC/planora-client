"use client";

const ContactPage = () => {
  return (
    <div className="bg-slate-100 dark:bg-slate-900 min-h-screen text-slate-800 dark:text-white font-sans">

      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center text-center py-20 px-6 animate-fadeIn">
        <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight text-slate-800 dark:text-white">
          Contact Us
        </h1>

        <p className="text-lg md:text-xl max-w-2xl leading-relaxed text-slate-600 dark:text-slate-400">
          Have questions or feedback? Reach out to us using the form below.
          We’ll get back to you as soon as possible.
        </p>
      </section>

      {/* Contact Form Section */}
      <section className="flex justify-center px-6 md:px-20 pb-20">
        <form className="bg-white dark:bg-slate-800 rounded-2xl p-8 w-full max-w-2xl shadow-lg border border-slate-300 dark:border-slate-700 animate-slideUp">

          <h2 className="text-2xl font-semibold mb-6 text-center text-indigo-600 dark:text-indigo-400">
            Send a Message
          </h2>

          {/* Name Input */}
          <div className="flex flex-col mb-5">
            <label
              htmlFor="name"
              className="mb-2 font-medium text-slate-700 dark:text-slate-300"
            >
              Name
            </label>

            <input
              type="text"
              id="name"
              placeholder="Your Name"
              className="p-3 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-800 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-600 dark:focus:ring-indigo-400 transition"
              required
            />
          </div>

          {/* Email Input */}
          <div className="flex flex-col mb-5">
            <label
              htmlFor="email"
              className="mb-2 font-medium text-slate-700 dark:text-slate-300"
            >
              Email
            </label>

            <input
              type="email"
              id="email"
              placeholder="you@example.com"
              className="p-3 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-800 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-600 dark:focus:ring-indigo-400 transition"
              required
            />
          </div>

          {/* Message Textarea */}
          <div className="flex flex-col mb-6">
            <label
              htmlFor="message"
              className="mb-2 font-medium text-slate-700 dark:text-slate-300"
            >
              Message
            </label>

            <textarea
              id="message"
              rows={5}
              placeholder="Write your message..."
              className="p-3 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-800 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-600 dark:focus:ring-indigo-400 transition"
              required
            ></textarea>
          </div>

          {/* Submit Button */}
          <div className="flex justify-center">
            <button
              type="submit"
              className="px-8 py-3 rounded-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold transition-all duration-300 shadow-md hover:shadow-lg"
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

export default ContactPage;