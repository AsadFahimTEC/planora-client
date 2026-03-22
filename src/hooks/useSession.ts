"use client";

import { useState, useEffect } from "react";
import { UserRole } from "@/constants/roles";
import { authClient } from "@/lib/auth-client";

export type SessionUser = {
  id: string;
  email: string;
  name?: string;
  image?: string | null;
  role?: UserRole;
};

export const useSession = () => {
  const [user, setUser] = useState<SessionUser | null>(null);
  const [loading, setLoading] = useState(true);

  const loadSession = async () => {
    try {
      setLoading(true);

      const res = await authClient.getSession();

      // Only update state if component is still mounted
      setUser(res?.data?.user ?? null);
    } catch (error) {
      console.error("Error loading session:", error);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let isMounted = true;

    const fetchSession = async () => {
      try {
        const res = await authClient.getSession();
        if (isMounted) {
          setUser(res?.data?.user ?? null);
          setLoading(false);
        }
      } catch (error) {
        if (isMounted) {
          setUser(null);
          setLoading(false);
        }
        console.error(error);
      }
    };

    fetchSession();

    return () => {
      isMounted = false; // prevent state update if component unmounted
    };
  }, []);

  return { user, loading, refreshSession: loadSession };
};