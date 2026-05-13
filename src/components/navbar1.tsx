"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Menu } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import StudentMenu from "@/app/components/navbar/StudentMenu";
import TutorMenu from "@/app/components/navbar/TutorMenu";
import AdminMenu from "@/app/components/navbar/AdminMenu";
import { useSession } from "@/hooks/useSession";

interface MenuItem {
  title: string;
  url: string;
  items?: MenuItem[];
}

interface NavbarProps {
  className?: string;
  logo?: {
    url: string;
    src: string;
    alt: string;
    title: string;
  };
  menu?: MenuItem[];
  auth?: {
    login: { title: string; url: string };
    signup: { title: string; url: string };
  };
}

export default function Navbar1({
  logo = {
    url: "/",
    src: "https://i.ibb.co.com/xqTSJz4k/planorafinal.png",
    alt: "logo",
    title: "Planora 📅",
  },
  menu = [
    { title: "Home", url: "/" },
    { title: "Events", url: "/events" },
    { title: "Dashboard", url: "/dashboard" },
  ],
  auth = {
    login: { title: "Login", url: "/login" },
    signup: { title: "Sign up", url: "/register" },
  },
  className,
}: NavbarProps) {
  const { user, loading, refreshSession } = useSession();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (loading) return null;
  const isLoggedIn = Boolean(user);

  const renderRoleMenu = () => {
    if (!user) return null;
    switch (user.role) {
      case "STUDENT":
        return <StudentMenu refreshSession={refreshSession} />;
      case "TUTOR":
        return <TutorMenu refreshSession={refreshSession} />;
      case "ADMIN":
        return <AdminMenu refreshSession={refreshSession} />;
      default:
        return null;
    }
  };

  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(99,102,241,0.16),_transparent_28%),radial-gradient(circle_at_bottom_left,_rgba(236,72,153,0.14),_transparent_24%),linear-gradient(180deg,_rgba(255,255,255,0.06),_rgba(15,23,42,0.4))] pointer-events-none" />

      <motion.div
        animate={{ rotate: ["0deg", "360deg"] }}
        transition={{ repeat: Infinity, duration: 50, ease: "linear" }}
        className="absolute -top-16 -right-16 w-72 h-72 rounded-full bg-gradient-to-br from-fuchsia-400/20 via-violet-300/10 to-cyan-400/20 blur-3xl pointer-events-none"
      />

      <motion.div
        animate={{ x: ["-100%", "100%"] }}
        transition={{ repeat: Infinity, duration: 22, ease: "linear" }}
        className="absolute top-1/2 left-0 text-5xl font-black opacity-5 whitespace-nowrap pointer-events-none select-none bg-gradient-to-r from-cyan-400 via-fuchsia-500 to-purple-500 bg-clip-text text-transparent"
      >
        Planora · Learn · Book · Connect · Planora · Learn · Book · Connect
      </motion.div>

      <motion.div
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className={cn(
          "relative z-40 py-4 border-b transition-all duration-300",
          scrolled
            ? "bg-white/80 dark:bg-slate-950/80 backdrop-blur-xl shadow-2xl border-slate-200/80 dark:border-slate-700"
            : "bg-white/40 dark:bg-slate-950/40 backdrop-blur-md border-transparent",
          className
        )}
      >
        <div className="max-w-7xl mx-auto px-6">
          <nav className="hidden lg:flex items-center justify-between gap-10">
            <a href={logo.url} className="flex items-center gap-3 group transition-transform duration-300 hover:-translate-y-0.5">
              <img
                src={logo.src}
                alt={logo.alt}
                className="h-10 w-auto rounded-full shadow-xl transition-transform duration-300 group-hover:scale-105"
              />
              <div>
                <p className="text-xl font-semibold leading-tight bg-gradient-to-r from-cyan-500 to-purple-600 bg-clip-text text-transparent">
                  {logo.title}
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400">Smart scheduling for every student and tutor</p>
              </div>
            </a>

            <div className="flex items-center gap-8">
              {!isLoggedIn && (
                <NavigationMenu>
                  <NavigationMenuList className="flex items-center gap-6">
                    {menu.map((item) => renderMenuItem(item))}
                  </NavigationMenuList>
                </NavigationMenu>
              )}

              {renderRoleMenu()}
            </div>

            {!isLoggedIn && (
              <div className="flex items-center gap-3">
                <Button asChild variant="outline" className="border-slate-300 text-slate-700 hover:border-indigo-500 hover:text-indigo-600 transition-all">
                  <a href={auth.login.url}>{auth.login.title}</a>
                </Button>

                <Button
                  asChild
                  className="bg-gradient-to-r from-cyan-500 via-fuchsia-500 to-purple-600 text-white shadow-[0_20px_80px_-40px_rgba(79,70,229,0.7)] hover:scale-[1.02] transition-transform duration-300"
                >
                  <a href={auth.signup.url}>{auth.signup.title}</a>
                </Button>
              </div>
            )}
          </nav>

          <div className="flex items-center justify-between lg:hidden">
            <a href={logo.url} className="flex items-center gap-3">
              <img src={logo.src} alt={logo.alt} className="h-9 w-auto rounded-full shadow-lg" />
              <span className="text-lg font-semibold bg-gradient-to-r from-cyan-500 to-purple-600 bg-clip-text text-transparent">
                {logo.title}
              </span>
            </a>

            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon" className="border-slate-300 text-slate-700">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>

              <SheetContent
                side="right"
                className="w-72 bg-white/90 dark:bg-slate-950/90 backdrop-blur-2xl"
              >
                <SheetHeader>
                  <SheetTitle>{logo.title}</SheetTitle>
                </SheetHeader>

                <div className="flex flex-col gap-6 p-4">
                  {!isLoggedIn && (
                    <Accordion type="single" collapsible>
                      {menu.map((item) => renderMobileMenuItem(item))}
                    </Accordion>
                  )}

                  {renderRoleMenu()}

                  {!isLoggedIn && (
                    <div className="flex flex-col gap-3">
                      <Button asChild variant="outline" className="border-slate-300 text-slate-700">
                        <a href={auth.login.url}>{auth.login.title}</a>
                      </Button>

                      <Button
                        asChild
                        className="bg-gradient-to-r from-cyan-500 via-fuchsia-500 to-purple-600 text-white"
                      >
                        <a href={auth.signup.url}>{auth.signup.title}</a>
                      </Button>
                    </div>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

/* Desktop Menu */
const renderMenuItem = (item: MenuItem) => {
  if (item.items) {
    return (
      <NavigationMenuItem key={item.title}>
        <NavigationMenuTrigger>
          {item.title}
        </NavigationMenuTrigger>
        <NavigationMenuContent>
          {item.items.map((subItem) => (
            <NavigationMenuLink asChild key={subItem.title}>
              <a href={subItem.url}>{subItem.title}</a>
            </NavigationMenuLink>
          ))}
        </NavigationMenuContent>
      </NavigationMenuItem>
    );
  }

  return (
    <NavigationMenuItem key={item.title}>
      <NavigationMenuLink
        href={item.url}
        className="relative hover:text-indigo-600 transition"
      >
        {item.title}
      </NavigationMenuLink>
    </NavigationMenuItem>
  );
};

/* Mobile Menu */
const renderMobileMenuItem = (item: MenuItem) => {
  if (item.items) {
    return (
      <AccordionItem key={item.title} value={item.title}>
        <AccordionTrigger>{item.title}</AccordionTrigger>
        <AccordionContent className="flex flex-col gap-2 mt-2">
          {item.items.map((subItem) => (
            <a key={subItem.title} href={subItem.url}>
              {subItem.title}
            </a>
          ))}
        </AccordionContent>
      </AccordionItem>
    );
  }

  return (
    <a key={item.title} href={item.url}>
      {item.title}
    </a>
  );
};