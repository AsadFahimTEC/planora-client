"use client";

import { Menu } from "lucide-react";
import { cn } from "@/lib/utils";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";

import StudentMenu from "@/app/components/navbar/StudentMenu";
import TutorMenu from "@/app/components/navbar/TutorMenu";
import AdminMenu from "@/app/components/navbar/AdminMenu";
import { useSession } from "@/hooks/useSession";

interface MenuItem {
  title: string;
  url: string;
  description?: string;
  icon?: React.ReactNode;
  items?: MenuItem[];
}

interface NavbarProps {
  className?: string;
  logo?: {
    url: string;
    src: string;
    alt: string;
    title: string;
    className?: string;
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
    src: "https://i.ibb.co/5gKqm97r/360-F-1562833067-i-MUS3-W5-R1z355geljjd-FWbg-F7g-Qv-Je0l-removebg-preview.png",
    alt: "logo",
    title: "SkillBridge 🎓",
  },
  menu = [
    { title: "Home", url: "/" },
    { title: "Tutors", url: "/tutors" },
    { title: "Profile", url: "/profile" },
  ],
  auth = {
    login: { title: "Login", url: "/login" },
    signup: { title: "Sign up", url: "/register" },
  },
  className,
}: NavbarProps) {
  const { user, loading, refreshSession } = useSession();

  if (loading) return null; // Wait for session to load

  const isLoggedIn = Boolean(user);

  // Render role menus dynamically
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
    <section className={cn("py-4 bg-white dark:bg-gray-900 shadow-sm", className)}>
      <div className="container mx-auto px-4">
        {/* Desktop Navbar */}
        <nav className="hidden lg:flex items-center justify-between">
          {/* Logo */}
          <a href={logo.url} className="flex items-center gap-2">
            <img src={logo.src} alt={logo.alt} className="max-h-8 dark:invert" />
            <span className="text-lg font-semibold tracking-tighter">{logo.title}</span>
          </a>

          {/* Center Menu */}
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

          {/* Auth Buttons */}
          {!isLoggedIn && (
            <div className="flex gap-2">
              <Button asChild variant="outline" size="sm">
                <a href={auth.login.url}>{auth.login.title}</a>
              </Button>
              <Button asChild size="sm">
                <a href={auth.signup.url}>{auth.signup.title}</a>
              </Button>
            </div>
          )}
        </nav>

        {/* Mobile Navbar */}
        <div className="flex items-center justify-between lg:hidden">
          <a href={logo.url} className="flex items-center gap-2">
            <img src={logo.src} alt={logo.alt} className="max-h-8 dark:invert" />
          </a>

          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-72 sm:w-80">
              <SheetHeader>
                <SheetTitle>
                  <a href={logo.url} className="flex items-center gap-2">
                    <img src={logo.src} alt={logo.alt} className="max-h-8 dark:invert" />
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
                    <Button asChild variant="outline">
                      <a href={auth.login.url}>{auth.login.title}</a>
                    </Button>
                    <Button asChild>
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

// Desktop Menu Helper
const renderMenuItem = (item: MenuItem) => {
  if (item.items) {
    return (
      <NavigationMenuItem key={item.title}>
        <NavigationMenuTrigger>{item.title}</NavigationMenuTrigger>
        <NavigationMenuContent className="bg-popover text-popover-foreground">
          {item.items.map((subItem) => (
            <NavigationMenuLink asChild key={subItem.title} className="w-80">
              <a>{subItem.title}</a>
            </NavigationMenuLink>
          ))}
        </NavigationMenuContent>
      </NavigationMenuItem>
    );
  }

  return (
    <NavigationMenuItem key={item.title}>
      <NavigationMenuLink href={item.url}>{item.title}</NavigationMenuLink>
    </NavigationMenuItem>
  );
};

// Mobile Menu Helper
const renderMobileMenuItem = (item: MenuItem) => {
  if (item.items) {
    return (
      <AccordionItem key={item.title} value={item.title} className="border-b-0">
        <AccordionTrigger className="text-md py-0 font-semibold">{item.title}</AccordionTrigger>
        <AccordionContent className="mt-2 flex flex-col gap-2">
          {item.items.map((subItem) => (
            <a key={subItem.title} href={subItem.url} className="text-md font-semibold">
              {subItem.title}
            </a>
          ))}
        </AccordionContent>
      </AccordionItem>
    );
  }

  return (
    <a key={item.title} href={item.url} className="text-md font-semibold">
      {item.title}
    </a>
  );
};