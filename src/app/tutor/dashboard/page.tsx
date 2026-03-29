"use client";

import { useEffect, useState } from "react";
import { getTutorDashboard } from "@/app/services/tutor.service"; // Your API service
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
        setLoading(true);
        const data = await getTutorDashboard(user.id); // Fetch from API
        setDashboard(data);
      } catch (err: any) {
        setError(err.message || "Failed to load dashboard");
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, [user?.id]);

  // Show loading spinner while fetching session or dashboard
  if (sessionLoading || loading) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <div className="w-16 h-16 border-4 border-indigo-500 border-dashed rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error) {
    return <p className="p-6 text-red-500 text-center">{error}</p>;
  }

  if (!dashboard) {
    return <p className="p-6 text-gray-500 text-center">No dashboard data available</p>;
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl md:text-4xl font-bold mb-6 text-center">Tutor Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Total Sessions */}
        <div className="bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-2xl p-6 shadow-md hover:shadow-lg transition">
          <p className="text-sm text-gray-500 dark:text-gray-400">Total Sessions</p>
          <p className="text-3xl font-bold mt-2">{dashboard.totalSessions}</p>
        </div>

        {/* Total Students */}
        <div className="bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-2xl p-6 shadow-md hover:shadow-lg transition">
          <p className="text-sm text-gray-500 dark:text-gray-400">Total Students</p>
          <p className="text-3xl font-bold mt-2">{dashboard.totalStudents}</p>
        </div>

        {/* Total Earnings */}
        {dashboard.totalEarnings !== undefined && (
          <div className="bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-2xl p-6 shadow-md hover:shadow-lg transition">
            <p className="text-sm text-gray-500 dark:text-gray-400">Total Earnings</p>
            <p className="text-3xl font-bold mt-2">৳{dashboard.totalEarnings}</p>
          </div>
        )}
      </div>
    </div>
  );
}