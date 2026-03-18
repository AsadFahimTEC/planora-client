"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { cn } from "@/lib/utils";

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQProps {
  title?: string;
  description?: string;
  faqs?: FAQItem[];
  className?: string;
}

const DEFAULT_FAQS: FAQItem[] = [
  {
    question: "How do I book a tutor session?",
    answer:
      "To book a session, search for a tutor in your desired skill area, select a time slot that works for you, and confirm your booking with your payment method.",
  },
  {
    question: "Can I reschedule or cancel a session?",
    answer:
      "Yes! Visit 'My Sessions' and choose the session you want to modify. You may reschedule or cancel based on our policy.",
  },
  {
    question: "What payment methods are supported?",
    answer:
      "We accept major credit/debit cards and secure online payments through modern payment gateways.",
  },
  {
    question: "Are the tutors verified?",
    answer:
      "Yes, all tutors are vetted for expertise and credibility in their respective fields before they are listed on our platform.",
  },
  {
    question: "How do I become a tutor?",
    answer:
      "You can apply to be a tutor by visiting the 'Become a Tutor' section and completing the application form. Our team will review and notify you shortly.",
  },
];

export default function FAQ({
  title = "Frequently Asked Questions",
  description = "Find answers to the most commonly asked questions about SkillBridge, bookings, payments, and more.",
  faqs = DEFAULT_FAQS,
  className,
}: FAQProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className={cn("py-16 sm:py-20 lg:py-24", className)}>
      <div className="container mx-auto px-4">
        {/* Heading */}
        <div className="mb-10 text-center">
          <h2 className="text-3xl font-bold sm:text-4xl lg:text-5xl">
            {title}
          </h2>
          <p className="mt-3 text-base text-muted-foreground sm:text-lg">
            {description}
          </p>
        </div>

        {/* FAQ List */}
        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <div
              key={idx}
              className="rounded-lg border bg-background p-5 shadow-sm"
            >
              <button
                className="flex w-full items-center justify-between text-left"
                onClick={() => toggle(idx)}
              >
                <span className="font-medium text-lg">{faq.question}</span>
                {openIndex === idx ? (
                  <ChevronUp className="h-5 w-5 text-primary" />
                ) : (
                  <ChevronDown className="h-5 w-5 text-primary" />
                )}
              </button>

              {openIndex === idx && (
                <p className="mt-3 text-sm text-muted-foreground">
                  {faq.answer}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
