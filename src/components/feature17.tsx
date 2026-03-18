"use client";

import {
  GraduationCap,
  Code,
  Palette,
  BarChart,
  Languages,
  UserCheck,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface FeaturedItem {
  heading: string;
  description: string;
  icon: React.ReactNode;
}

interface FeaturedTutorsProps {
  label?: string;
  title?: string;
  description?: string;
  items?: FeaturedItem[];
  buttonText?: string;
  buttonUrl?: string;
  className?: string;
}

const FeaturedTutors = ({
  label = "Featured",
  title = "Featured Tutors & Skills",
  description = "Learn from top-rated tutors across the most in-demand skills. Handpicked experts to help you grow faster.",
  items = [
    {
      heading: "Web Development",
      description:
        "Master modern web technologies like React, Next.js, Node.js, and full-stack development from industry professionals.",
      icon: <Code className="size-5 md:size-6" />,
    },
    {
      heading: "UI / UX Design",
      description:
        "Learn user-centered design, Figma, design systems, and real-world product design techniques.",
      icon: <Palette className="size-5 md:size-6" />,
    },
    {
      heading: "Data & Analytics",
      description:
        "Understand data analysis, SQL, Power BI, and data-driven decision making with expert guidance.",
      icon: <BarChart className="size-5 md:size-6" />,
    },
    {
      heading: "Language Learning",
      description:
        "Improve communication skills with experienced language tutors for English and more.",
      icon: <Languages className="size-5 md:size-6" />,
    },
    {
      heading: "Career Mentorship",
      description:
        "Get 1-on-1 mentorship for interviews, career growth, and professional development.",
      icon: <UserCheck className="size-5 md:size-6" />,
    },
    {
      heading: "Academic Subjects",
      description:
        "Math, science, and academic support from qualified tutors for all levels.",
      icon: <GraduationCap className="size-5 md:size-6" />,
    },
  ],
  buttonText = "Explore All Tutors",
  buttonUrl = "/tutors",
  className,
}: FeaturedTutorsProps) => {
  return (
    <section className={cn("py-20 sm:py-24 lg:py-32", className)}>
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-12 max-w-3xl space-y-4">
          <Badge variant="secondary">{label}</Badge>
          <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl">
            {title}
          </h2>
          <p className="text-muted-foreground text-base sm:text-lg">
            {description}
          </p>
        </div>

        {/* Grid */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item, idx) => (
            <div
              key={idx}
              className="flex gap-4 rounded-xl border bg-background p-6 transition hover:shadow-md"
            >
              <div className="flex size-12 shrink-0 items-center justify-center rounded-full bg-accent">
                {item.icon}
              </div>

              <div className="space-y-2">
                <h3 className="text-lg font-medium">{item.heading}</h3>
                <p className="text-sm text-muted-foreground">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        {buttonUrl && (
          <div className="mt-14 flex justify-center">
            <Button size="lg" asChild>
              <a href={buttonUrl}>{buttonText}</a>
            </Button>
          </div>
        )}
      </div>
    </section>
  );
};

export { FeaturedTutors };