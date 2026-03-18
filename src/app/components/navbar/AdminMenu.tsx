"use client";

import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import Link from "next/link";

interface MenuProps {
  refreshSession: () => void;
}

export default function AdminMenu({ refreshSession }: MenuProps) {
  const handleLogout = async () => {
    await authClient.signOut();
    refreshSession();
  };

  return (
    <div className="flex gap-4 items-center">
      <Link href="/">Dashboard</Link>
      <Link href="/admin/users">Users</Link>
      <Link href="/admin/bookings">Bookings</Link>
      <Link href="/admin/categories">Categories</Link>
      <Button onClick={handleLogout}>Logout</Button>
    </div>
  );
}
