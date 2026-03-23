"use client";

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
    <section
      className={cn(
        "py-4 bg-slate-100 dark:bg-slate-900 border-b border-slate-300 dark:border-slate-700",
        className
      )}
    >
      <div className="max-w-7xl mx-auto px-6">
        {/* Desktop */}
        <nav className="hidden lg:flex items-center justify-between">
          
          {/* ✅ LOGO (UNCHANGED STYLE) */}
          <a href={logo.url} className="flex items-center gap-2">
            <img
              src={logo.src}
              alt={logo.alt}
              className="max-h-18 dark:invert"
            />
            <span className="text-lg font-semibold tracking-tighter text-slate-800 dark:text-white">
              {logo.title}
            </span>
          </a>

          {/* Menu */}
          <div className="flex items-center gap-6">
            {!isLoggedIn && (
              <NavigationMenu>
                <NavigationMenuList>
                  {menu.map((item) => renderMenuItem(item))}
                </NavigationMenuList>
              </NavigationMenu>
            )}

            {renderRoleMenu()}
          </div>

          {/* Auth */}
          {!isLoggedIn && (
            <div className="flex gap-3">
              <Button
                asChild
                variant="outline"
                className="border-slate-400 text-slate-700 hover:bg-slate-200 dark:border-slate-600 dark:text-slate-300 dark:hover:bg-slate-800"
              >
                <a href={auth.login.url}>{auth.login.title}</a>
              </Button>

              <Button
                asChild
                className="bg-indigo-600 hover:bg-indigo-700 text-white"
              >
                <a href={auth.signup.url}>{auth.signup.title}</a>
              </Button>
            </div>
          )}
        </nav>

        {/* Mobile */}
        <div className="flex items-center justify-between lg:hidden">
          
          {/* ✅ LOGO (UNCHANGED STYLE) */}
          <a href={logo.url} className="flex items-center gap-2">
            <img
              src={logo.src}
              alt={logo.alt}
              className="max-h-8 dark:invert"
            />
          </a>

          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="border-slate-400 dark:border-slate-600"
              >
                <Menu className="h-5 w-5 text-slate-800 dark:text-white" />
              </Button>
            </SheetTrigger>

            <SheetContent
              side="right"
              className="w-72 sm:w-80 bg-slate-100 dark:bg-slate-900"
            >
              <SheetHeader>
                <SheetTitle>
                  <a href={logo.url} className="flex items-center gap-2">
                    <img
                      src={logo.src}
                      alt={logo.alt}
                      className="max-h-8 dark:invert"
                    />
                    <span className="font-semibold text-slate-800 dark:text-white">
                      {logo.title}
                    </span>
                  </a>
                </SheetTitle>
              </SheetHeader>

              <div className="flex flex-col gap-6 p-4">
                {!isLoggedIn && (
                  <Accordion type="single" collapsible className="flex flex-col gap-4">
                    {menu.map((item) => renderMobileMenuItem(item))}
                  </Accordion>
                )}

                {renderRoleMenu()}

                {!isLoggedIn && (
                  <div className="flex flex-col gap-3">
                    <Button
                      asChild
                      variant="outline"
                      className="border-slate-400 dark:border-slate-600"
                    >
                      <a href={auth.login.url}>{auth.login.title}</a>
                    </Button>

                    <Button
                      asChild
                      className="bg-indigo-600 hover:bg-indigo-700 text-white"
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
    </section>
  );
}

/* Desktop Menu */
const renderMenuItem = (item: MenuItem) => {
  if (item.items) {
    return (
      <NavigationMenuItem key={item.title}>
        <NavigationMenuTrigger className="text-slate-800 dark:text-white">
          {item.title}
        </NavigationMenuTrigger>

        <NavigationMenuContent className="bg-slate-100 dark:bg-slate-800">
          {item.items.map((subItem) => (
            <NavigationMenuLink
              asChild
              key={subItem.title}
              className="w-72 hover:text-indigo-600"
            >
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
        className="text-slate-700 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition"
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
        <AccordionTrigger className="font-semibold text-slate-800 dark:text-white">
          {item.title}
        </AccordionTrigger>

        <AccordionContent className="flex flex-col gap-2 mt-2">
          {item.items.map((subItem) => (
            <a
              key={subItem.title}
              href={subItem.url}
              className="text-slate-600 dark:text-slate-400 hover:text-indigo-600"
            >
              {subItem.title}
            </a>
          ))}
        </AccordionContent>
      </AccordionItem>
    );
  }

  return (
    <a
      key={item.title}
      href={item.url}
      className="font-semibold text-slate-800 dark:text-white hover:text-indigo-600"
    >
      {item.title}
    </a>
  );
};