"use client";

/* eslint-disable @typescript-eslint/no-explicit-any */

import { useEffect, useState } from "react";
import TutorCard from "../components/TutorCard";
import { getTutors } from "../services/tutor.service";

export default function TutorsPage() {
  const [tutors, setTutors] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTutors = async () => {
      try {
        const data = await getTutors(); // ✅ already array
        setTutors(data ?? []);
      } catch (err: any) {
        setError(err.message || "Failed to load tutors");
      } finally {
        setLoading(false);
      }
    };

    fetchTutors();
  }, []);

  if (loading) {
    return <p className="p-6 text-gray-500">Loading tutors...</p>;
  }

  if (error) {
    return <p className="p-6 text-red-500">{error}</p>;
  }

  if (tutors.length === 0) {
    return <p className="p-6 text-gray-500">No tutors found</p>;
  }

  return (
    <div className="p-6 grid gap-6 sm:grid-cols-2 md:grid-cols-3">
      {tutors.map((tutor) => (
        <TutorCard key={tutor.id} tutor={tutor} />
      ))}
    </div>
  );
}
