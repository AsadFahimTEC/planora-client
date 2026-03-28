import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import { Toaster } from "sonner";
import Navbar1 from "@/components/navbar1";
import HeroSection from "@/components/HeroSection";
import EventCategories from "@/app/components/sections/EventCategories";
import UpcomingEventsSlider from "@/components/UpcomingEventsSlider";
import CallToActionSection from "./components/call/CallToActionSection";
import Footer from "@/components/footer2";
import ClientWrapper from "./components/ClientWrapper";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Planora 📅",
  description: "Smart Event Management",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Navbar1 />
        <ClientWrapper>
          {children}
          <HeroSection />
          <UpcomingEventsSlider />
          <EventCategories />
          <CallToActionSection />
        </ClientWrapper>

        <Toaster richColors />
        <Footer />
      </body>
    </html>
  );
}