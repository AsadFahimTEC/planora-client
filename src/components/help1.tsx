"use client";

import {
  ChevronRight,
  CreditCard,
  HelpCircle,
  Package,
  RotateCcw,
  Search,
  ShoppingBag,
  Truck,
  User,
} from "lucide-react";
import { useState } from "react";

import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

interface HelpCategory {
  icon: React.ReactNode;
  title: string;
  description: string;
  articles: number;
}

interface PopularTopic {
  title: string;
  href: string;
}

interface HelpCenterProps {
  title?: string;
  subtitle?: string;
  categories?: HelpCategory[];
  popularTopics?: PopularTopic[];
  className?: string;
}

const DEFAULT_CATEGORIES: HelpCategory[] = [
  {
    icon: <Package className="size-6" />,
    title: "Bookings & Sessions",
    description: "Manage, reschedule, or cancel your sessions",
    articles: 12,
  },
  {
    icon: <Truck className="size-6" />,
    title: "Live Classes",
    description: "Join classes, schedules, and technical setup",
    articles: 8,
  },
  {
    icon: <RotateCcw className="size-6" />,
    title: "Refunds & Cancellations",
    description: "Refund policy and cancellation rules",
    articles: 15,
  },
  {
    icon: <CreditCard className="size-6" />,
    title: "Payments & Billing",
    description: "Payment methods and billing issues",
    articles: 10,
  },
  {
    icon: <User className="size-6" />,
    title: "Account Settings",
    description: "Profile, password, and security",
    articles: 7,
  },
  {
    icon: <ShoppingBag className="size-6" />,
    title: "Tutors & Skills",
    description: "Finding tutors and choosing skills",
    articles: 9,
  },
];

const DEFAULT_TOPICS: PopularTopic[] = [
  { title: "How to book a tutor?", href: "#" },
  { title: "Cancel or reschedule a session", href: "#" },
  { title: "Payment failed, what to do?", href: "#" },
  { title: "Reset my password", href: "#" },
  { title: "Refund eligibility", href: "#" },
  { title: "Become a tutor", href: "#" },
];

const HelpCenter = ({
  title = "Help Center",
  subtitle = "Find answers to common questions and get support when you need it.",
  categories = DEFAULT_CATEGORIES,
  popularTopics = DEFAULT_TOPICS,
  className,
}: HelpCenterProps) => {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <section className={cn("py-16 sm:py-20 lg:py-24", className)}>
      <div className="container mx-auto max-w-5xl px-4">
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            {title}
          </h1>
          <p className="mt-2 text-base text-muted-foreground sm:text-lg">
            {subtitle}
          </p>

          {/* Search */}
          <div className="mx-auto mt-6 max-w-lg">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 size-5 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search help articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="h-12 pl-12 text-base"
              />
            </div>
          </div>
        </div>

        {/* Categories */}
        <div className="mb-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((category, index) => (
            <Card
              key={index}
              className="group cursor-pointer transition hover:shadow-md"
            >
              <CardContent className="p-5">
                <div className="flex items-start gap-4">
                  <div className="flex size-12 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    {category.icon}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold">{category.title}</h3>
                      <ChevronRight className="size-4 text-muted-foreground transition-transform group-hover:translate-x-0.5" />
                    </div>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {category.description}
                    </p>
                    <p className="mt-2 text-xs text-muted-foreground">
                      {category.articles} articles
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Popular Topics */}
        <div className="rounded-lg border bg-muted/30 p-6">
          <h2 className="mb-4 flex items-center gap-2 font-semibold">
            <HelpCircle className="size-5" />
            Popular Topics
          </h2>
          <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
            {popularTopics.map((topic, index) => (
              <a
                key={index}
                href={topic.href}
                className="flex items-center gap-2 rounded-md p-2 text-sm transition-colors hover:bg-background"
              >
                <ChevronRight className="size-4 text-muted-foreground" />
                {topic.title}
              </a>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="mt-8 text-center">
          <p className="text-muted-foreground">
            Still need help?
          </p>
          <Button className="mt-3">Contact Support</Button>
        </div>
      </div>
    </section>
  );
};

export { HelpCenter };