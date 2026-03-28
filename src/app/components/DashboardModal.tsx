"use client";

import { useState } from "react";
import { toast } from "sonner";

interface DashboardModalProps {
  onClose: () => void;
}

export default function DashboardModal({ onClose }: DashboardModalProps) {
  // Dummy default event data
  const defaultEvent = {
    title: "Digital Marketing Masterclass 2026",
    startDate: "2026-11-15T10:00:00.000Z",
    endDate: "2026-11-15T16:00:00.000Z",
    venue: "BRAC CDM, Savar",
    description: "Advanced strategies for SEO, Ads, and Social Media Growth",
    type: "Public",
    feeType: "Paid",
    registrationFee: 1800,
    organizer: "Marketing Experts BD",
    maxParticipants: 300,
    category: "Marketing",
    status: "Upcoming",
  };

  const [formData, setFormData] = useState(defaultEvent);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("http://localhost:5000/api/events", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message || "Failed to create event");

      toast.success("Event created successfully!");
      onClose(); // close modal
    } catch (err: any) {
      toast.error(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 w-full max-w-4xl shadow-xl relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-500 hover:text-slate-800 dark:hover:text-white font-bold text-xl"
        >
          ×
        </button>

        <h2 className="text-2xl font-bold mb-4 text-slate-900 dark:text-white">Create Event</h2>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left side - dummy data */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold mb-1 text-slate-700 dark:text-slate-300">Title</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-lg bg-slate-100 dark:bg-slate-800 border-slate-300 dark:border-slate-700"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-1 text-slate-700 dark:text-slate-300">Start Date</label>
              <input
                type="datetime-local"
                name="startDate"
                value={new Date(formData.startDate).toISOString().slice(0, 16)}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-lg bg-slate-100 dark:bg-slate-800 border-slate-300 dark:border-slate-700"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-1 text-slate-700 dark:text-slate-300">End Date</label>
              <input
                type="datetime-local"
                name="endDate"
                value={new Date(formData.endDate).toISOString().slice(0, 16)}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-lg bg-slate-100 dark:bg-slate-800 border-slate-300 dark:border-slate-700"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-1 text-slate-700 dark:text-slate-300">Venue</label>
              <input
                type="text"
                name="venue"
                value={formData.venue}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-lg bg-slate-100 dark:bg-slate-800 border-slate-300 dark:border-slate-700"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-1 text-slate-700 dark:text-slate-300">Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-lg bg-slate-100 dark:bg-slate-800 border-slate-300 dark:border-slate-700"
                rows={3}
                required
              />
            </div>
          </div>

          {/* Right side - other details */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold mb-1 text-slate-700 dark:text-slate-300">Type</label>
              <select
                name="type"
                value={formData.type}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-lg bg-slate-100 dark:bg-slate-800 border-slate-300 dark:border-slate-700"
              >
                <option>Public</option>
                <option>Private</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold mb-1 text-slate-700 dark:text-slate-300">Fee Type</label>
              <select
                name="feeType"
                value={formData.feeType}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-lg bg-slate-100 dark:bg-slate-800 border-slate-300 dark:border-slate-700"
              >
                <option>Free</option>
                <option>Paid</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold mb-1 text-slate-700 dark:text-slate-300">Registration Fee</label>
              <input
                type="number"
                name="registrationFee"
                value={formData.registrationFee}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-lg bg-slate-100 dark:bg-slate-800 border-slate-300 dark:border-slate-700"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-1 text-slate-700 dark:text-slate-300">Organizer</label>
              <input
                type="text"
                name="organizer"
                value={formData.organizer}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-lg bg-slate-100 dark:bg-slate-800 border-slate-300 dark:border-slate-700"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-1 text-slate-700 dark:text-slate-300">Max Participants</label>
              <input
                type="number"
                name="maxParticipants"
                value={formData.maxParticipants}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-lg bg-slate-100 dark:bg-slate-800 border-slate-300 dark:border-slate-700"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-1 text-slate-700 dark:text-slate-300">Category</label>
              <input
                type="text"
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-lg bg-slate-100 dark:bg-slate-800 border-slate-300 dark:border-slate-700"
              />
            </div>
          </div>

          {/* Submit button full width */}
          <div className="md:col-span-2 text-right mt-4">
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 transition font-semibold"
            >
              {loading ? "Submitting..." : "Submit Event"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}