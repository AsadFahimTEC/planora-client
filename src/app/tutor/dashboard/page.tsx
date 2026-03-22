"use client";

/* eslint-disable @typescript-eslint/no-explicit-any */

import { useEffect, useState } from "react";
import { getTutorDashboard } from "@/app/services/tutor.service";
import { useSession } from "@/hooks/useSession";

interface TutorDashboard {
  totalSessions: number;
  totalStudents: number;
  totalEarnings?: number;
}

export default function TutorDashboardPage() {
  const { user, loading: sessionLoading } = useSession();

  const [dashboard, setDashboard] = useState<TutorDashboard | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!user?.id) return;

    const fetchDashboard = async () => {
      try {
        const data = await getTutorDashboard(user.id);
        setDashboard(data);
      } catch (err: any) {
        setError(err.message || "Failed to load dashboard");
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, [user?.id]);

  if (sessionLoading || loading) {
    return <p className="p-6 text-gray-500">Loading dashboard...</p>;
  }

  if (error) {
    return <p className="p-6 text-red-500">{error}</p>;
  }

  if (!dashboard) {
    return <p className="p-6 text-gray-500">No dashboard data</p>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Tutor Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="border rounded p-4">
          <p className="text-sm text-gray-500">Total Sessions</p>
          <p className="text-2xl font-bold">{dashboard.totalSessions}</p>
        </div>

        <div className="border rounded p-4">
          <p className="text-sm text-gray-500">Total Students</p>
          <p className="text-2xl font-bold">{dashboard.totalStudents}</p>
        </div>

        {dashboard.totalEarnings !== undefined && (
          <div className="border rounded p-4">
            <p className="text-sm text-gray-500">Total Earnings</p>
            <p className="text-2xl font-bold">
              ৳{dashboard.totalEarnings}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
