"use client";

import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import Link from "next/link";

interface MenuProps {
  refreshSession: () => void;
}

export default function TutorMenu({ refreshSession }: MenuProps) {
  const handleLogout = async () => {
    await authClient.signOut();
    refreshSession();
  };

  return (
    <div className="flex gap-4 items-center">
      <Link href="/tutors/dashboard">Dashboard</Link>
      <Link href="/tutors/profile">Profile</Link>
      <Link href="/tutors/availability">Availability</Link>
      <Link href="/tutors">Browse Tutors</Link>
      <Button onClick={handleLogout}>Logout</Button>
    </div>
  );
}
