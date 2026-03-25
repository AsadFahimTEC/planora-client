"use client";

import Link from "next/link";
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
    <section
      className={cn(
        "py-16 border-t border-slate-300 dark:border-slate-700 bg-slate-100 dark:bg-slate-900",
        className
      )}
    >
      <div className="max-w-7xl mx-auto px-6">
        <footer>

          {/* Grid */}
          <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-6">

            {/* Logo Section */}
            <div className="lg:col-span-2">
              <Link
                href={logo.url}
                className="flex items-center gap-2"
              >
                <LogoImage
                  src={logo.src}
                  alt={logo.alt}
                  title={logo.title}
                  className="h-16 w-auto dark:invert"
                />
                <LogoText className="text-lg font-semibold tracking-tighter text-slate-800 dark:text-white">
                  {logo.title}
                </LogoText>
              </Link>

              <p className="mt-4 text-sm text-slate-600 dark:text-slate-400">
                {tagline}
              </p>
            </div>

            {/* Menu Sections */}
            {menuItems.map((section, idx) => (
              <div key={idx}>
                <h3 className="mb-4 text-base font-semibold text-slate-800 dark:text-white">
                  {section.title}
                </h3>

                <ul className="space-y-3 text-sm">
                  {section.links.map((link, linkIdx) => (
                    <li key={linkIdx}>
                      <Link
                        href={link.url}
                        className="text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
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
          <div className="mt-14 pt-6 border-t border-slate-300 dark:border-slate-700 text-sm">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

              <p className="text-slate-600 dark:text-slate-400">
                {copyright}
              </p>

              <ul className="flex flex-wrap gap-4">
                {bottomLinks.map((link, idx) => (
                  <li key={idx}>
                    <Link
                      href={link.url}
                      className="underline text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition"
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
    </section>
  );
};

export default Footer;