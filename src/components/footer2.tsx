import Link from "next/link";
import { cn } from "@/lib/utils";
import { Logo, LogoImage, LogoText } from "@/components/logo";

interface MenuItem {
  title: string;
  links: {
    text: string;
    url: string;
  }[];
}

interface Footer2Props {
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

const Footer2 = ({
  logo = {
    src: "https://i.ibb.co.com/fdW6xxg4/eventtwo.png",
    alt: "Planora Logo",
    title: "Planora 📅",
    url: "/",
  },
  className,
  tagline = "Smart Event Management",
  menuItems = [
    {
      title: "All Events",
      links: [
        { text: "About", url: "/about" },
        { text: "Contact", url: "/contact" },
        { text: "Privacy Policy", url: "/privacy" },
      ],
    },
    {
      title: "Company",
      links: [
        { text: "Login", url: "/login" },
        { text: "Register", url: "/register" },
      ],
    },
    {
      title: "Social",
      links: [
        { text: "Twitter", url: "#" },
        { text: "Instagram", url: "#" },
        { text: "LinkedIn", url: "#" },
      ],
    },
  ],
  copyright = "© 2026 Planora 📅 All rights reserved.",
  bottomLinks = [
    { text: "Terms and Conditions", url: "#" },
    { text: "Privacy Policy", url: "#" },
  ],
}: Footer2Props) => {
  return (
    <section className={cn("py-16 sm:py-20", className)}>
      <div className="container">
        <footer>
          {/* Grid layout for responsive design */}
          <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-6">
            {/* Logo + Tagline */}
            <div className="col-span-1 lg:col-span-2">
              <div className="flex items-center gap-3">
                <Link href={logo.url} aria-label="SkillBridge Home" className="flex items-center gap-2">
                  <LogoImage
                    src={logo.src}
                    alt={logo.alt}
                    title={logo.title}
                    className="h-18 w-18 rounded-md object-cover"
                  />
                  <LogoText className="text-xl font-bold">
                    {logo.title}
                  </LogoText>
                </Link>

              </div>

              <p className="mt-4 text-sm font-medium text-muted-foreground">
                {tagline}
              </p>
            </div>

            {/* Menu Sections */}
            {menuItems.map((section, sectionIdx) => (
              <div key={sectionIdx}>
                <h3 className="mb-4 text-base font-bold">{section.title}</h3>
                <ul className="space-y-3 text-sm text-muted-foreground">
                  {section.links.map((link, linkIdx) => (
                    <li key={linkIdx} className="font-medium">
                      <Link
                        href={link.url}
                        className="hover:text-primary transition-colors"
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
          <div className="mt-14 border-t pt-6 text-sm font-medium text-muted-foreground">
            <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <p>{copyright}</p>
              <ul className="flex flex-wrap gap-4">
                {bottomLinks.map((link, linkIdx) => (
                  <li key={linkIdx} className="underline hover:text-primary">
                    <Link href={link.url}>
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

export { Footer2 };