"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { LogoImage, LogoText } from "@/components/logo";

interface MenuItem {
  title: string;
  links: {
    text: string;
    url: string;
  }[];
}

interface FooterProps {
  logo?: {
    url: string;
    src: string;
    alt: string;
    title: string;
  };
  className?: string;
  tagline?: string;
  menuItems?: MenuItem[];
  copyright?: string;
  bottomLinks?: {
    text: string;
    url: string;
  }[];
}

const Footer = ({
  logo = {
    src: "https://i.ibb.co.com/xqTSJz4k/planorafinal.png",
    alt: "Planora Logo",
    title: "Planora 📅",
    url: "/",
  },
  className,
  tagline = "Smart Event Management",
  menuItems = [
    {
      title: "Platform",
      links: [
        { text: "Home", url: "/" },
        { text: "Events", url: "/events" },
        { text: "Dashboard", url: "/dashboard" },
      ],
    },
    {
      title: "Company",
      links: [
        { text: "About", url: "/about" },
        { text: "Contact", url: "/contact" },
        { text: "Privacy Policy", url: "/privacy" },
      ],
    },
    {
      title: "Account",
      links: [
        { text: "Login", url: "/login" },
        { text: "Register", url: "/register" },
      ],
    },
  ],
  copyright = "© 2026 Planora 📅 All rights reserved.",
  bottomLinks = [
    { text: "Terms and Conditions", url: "/terms" },
    { text: "Privacy Policy", url: "/privacy" },
  ],
}: FooterProps) => {
  return (
    <motion.section
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9, ease: "easeOut" }}
      className={cn(
        "relative overflow-hidden py-16 border-t border-white/10 bg-[radial-gradient(circle_at_top_right,_rgba(99,102,241,0.16),_transparent_28%),radial-gradient(circle_at_bottom_left,_rgba(236,72,153,0.14),_transparent_24%),linear-gradient(180deg,_rgba(255,255,255,0.06),_rgba(15,23,42,0.4))] text-white",
        className
      )}
    >
      <div className="pointer-events-none absolute inset-0 opacity-80 bg-[radial-gradient(circle_at_top_left,_rgba(59,130,246,0.18),_transparent_28%),radial-gradient(circle_at_bottom_right,_rgba(236,72,153,0.12),_transparent_24%)]" />
      <div className="pointer-events-none absolute left-1/4 top-0 h-44 w-44 rounded-full bg-cyan-400/20 blur-3xl" />
      <div className="pointer-events-none absolute right-0 bottom-0 h-72 w-72 rounded-full bg-fuchsia-500/20 blur-3xl" />
      <div className="max-w-7xl mx-auto px-6">
        <footer>

          {/* Grid */}
          <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-6">

            {/* Logo Section */}
            <div className="lg:col-span-2">
              <Link
                href={logo.url}
                className="flex items-center gap-3 group transition-transform duration-300 hover:-translate-y-0.5"
              >
                <LogoImage
                  src={logo.src}
                  alt={logo.alt}
                  title={logo.title}
                  className="h-12 w-auto rounded-full shadow-xl transition-transform duration-300 group-hover:scale-105"
                />
                <div>
                  <LogoText className="text-2xl font-semibold leading-tight bg-gradient-to-r from-cyan-500 to-purple-600 bg-clip-text text-transparent">
                    {logo.title}
                  </LogoText>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Smart scheduling for every student and tutor</p>
                </div>
              </Link>

              <div className="mt-6 rounded-3xl border border-white/10 bg-white/5 p-4 shadow-[0_25px_60px_-40px_rgba(59,130,246,0.35)] backdrop-blur-xl">
                <p className="text-sm text-black/70 leading-relaxed">
                  {tagline} with vibrant gradients, animated accents, and consistent navbar-inspired styling.
                </p>
              </div>
            </div>

            {/* Menu Sections */}
            {menuItems.map((section, idx) => (
              <div key={idx}>
                <h3 className="mb-4 text-base font-semibold text-white relative">
                  {section.title}
                  <span className="absolute left-0 -bottom-2 block h-1 w-12 rounded-full bg-gradient-to-r from-cyan-400 via-indigo-500 to-fuchsia-500" />
                </h3>

                <ul className="space-y-3 text-sm">
                  {section.links.map((link, linkIdx) => (
                    <li key={linkIdx}>
                      <Link
                        href={link.url}
                        className="text-black/70 hover:text-cyan-800 transition-colors duration-200"
                      >
                        {link.text}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Bottom Section */}
          <div className="mt-14 pt-6 border-t border-slate-700 text-sm">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

              <p className="text-black/70">
                {copyright}
              </p>

              <ul className="flex flex-wrap gap-4">
                {bottomLinks.map((link, idx) => (
                  <li key={idx}>
                    <Link
                      href={link.url}
                      className="underline text-black/70 hover:text-cyan-800 transition-colors duration-200"
                    >
                      {link.text}
                    </Link>
                  </li>
                ))}
              </ul>

            </div>
          </div>

        </footer>
      </div>
    </motion.section>
  );
};

export default Footer;