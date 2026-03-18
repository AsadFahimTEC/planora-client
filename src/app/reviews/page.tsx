"use client";

import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";

interface Props {
  tutorId: string;
  refreshReviews?: () => void; // optional: refresh the review list
}

export default function ReviewPage({ tutorId, refreshReviews }: Props) {
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!comment || rating < 1 || rating > 5) {
      toast.error("Please provide a valid rating (1-5) and comment");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ tutorId, rating, comment }),
      });

      const data = await res.json();

      if (data.success) {
        toast.success("Review submitted successfully!");
        setComment("");
        setRating(5);
        refreshReviews?.(); // refresh the list if provided
      } else {
        toast.error(data.message || "Failed to submit review");
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong while submitting the review");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 border rounded max-w-md">
      {/* Toast container */}
      <Toaster position="top-right" />

      <h2 className="text-xl font-bold mb-4">Write a Review</h2>

      <form onSubmit={handleSubmit} className="space-y-3">
        <div>
          <label className="block mb-1">Rating (1-5)</label>
          <input
            type="number"
            min={1}
            max={5}
            value={rating}
            onChange={(e) => setRating(Number(e.target.value))}
            className="border px-2 py-1 w-full rounded"
          />
        </div>

        <div>
          <label className="block mb-1">Comment</label>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="border px-2 py-1 w-full rounded"
            rows={4}
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? "Submitting..." : "Submit Review"}
        </button>
      </form>
    </div>
  );
}
