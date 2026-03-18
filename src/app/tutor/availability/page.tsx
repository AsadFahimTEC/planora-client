"use client";

/* eslint-disable @typescript-eslint/no-explicit-any */

import { useEffect, useState } from "react";
import { getTutorDashboard, updateTutorProfile } from "@/app/services/tutor.service";
import { useSession } from "@/hooks/useSession";
import { Button } from "@/components/ui/button";

interface Availability {
  day: string;
  startTime: string;
  endTime: string;
}

export default function TutorAvailabilityPage() {
  const { user, loading: sessionLoading } = useSession();

  const [availability, setAvailability] = useState<Availability[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch tutor dashboard
  useEffect(() => {
    if (!user?.id) return;

    const fetchTutor = async () => {
      try {
        const data = await getTutorDashboard(user.id);
        setAvailability(data?.availability || []);
      } catch (err: any) {
        setError(err.message || "Failed to load availability");
      } finally {
        setLoading(false);
      }
    };

    fetchTutor();
  }, [user?.id]);

  const handleChange = (
    index: number,
    field: keyof Availability,
    value: string
  ) => {
    const updated = [...availability];
    updated[index][field] = value;
    setAvailability(updated);
  };

  const addSlot = () => {
    setAvailability([
      ...availability,
      { day: "", startTime: "", endTime: "" },
    ]);
  };

  const saveAvailability = async () => {
    try {
      setSaving(true);
      await updateTutorProfile({ availability });
      alert("Availability updated successfully");
    } catch (err: any) {
      alert(err.message || "Failed to save availability");
    } finally {
      setSaving(false);
    }
  };

  if (sessionLoading || loading) {
    return <p className="p-6 text-gray-500">Loading availability...</p>;
  }

  if (error) {
    return <p className="p-6 text-red-500">{error}</p>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">My Availability</h1>

      <div className="space-y-4">
        {availability.map((slot, index) => (
          <div
            key={index}
            className="grid grid-cols-1 md:grid-cols-4 gap-4 border p-4 rounded-md"
          >
            <input
              className="border rounded px-3 py-2"
              placeholder="Day (e.g. Monday)"
              value={slot.day}
              onChange={(e) => handleChange(index, "day", e.target.value)}
            />

            <input
              type="time"
              className="border rounded px-3 py-2"
              value={slot.startTime}
              onChange={(e) =>
                handleChange(index, "startTime", e.target.value)
              }
            />

            <input
              type="time"
              className="border rounded px-3 py-2"
              value={slot.endTime}
              onChange={(e) =>
                handleChange(index, "endTime", e.target.value)
              }
            />

            <div className="flex items-center text-sm text-gray-500">
              Slot #{index + 1}
            </div>
          </div>
        ))}
      </div>

      <div className="flex gap-4 mt-6">
        <Button variant="outline" onClick={addSlot}>
          + Add Slot
        </Button>

        <Button onClick={saveAvailability} disabled={saving}>
          {saving ? "Saving..." : "Save Availability"}
        </Button>
      </div>
    </div>
  );
}
