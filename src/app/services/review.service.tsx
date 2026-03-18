"use client";

import { useEffect, useState } from "react";

interface Review {
  id: string;
  rating: number;
  comment: string;
  createdAt: string;
  student: { name: string };
}

interface Props {
  tutorId: string;
}

export default function ReviewServicesPage({ tutorId }: Props) {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchReviews = async () => {
    try {
      const res = await fetch(`/api/reviews/${tutorId}`);
      const data = await res.json();
      if (data.success) setReviews(data.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, [tutorId]);

  if (loading) return <p>Loading reviews...</p>;
  if (reviews.length === 0) return <p>No reviews yet</p>;

  return (
    <div className="space-y-4">
      {reviews.map((r) => (
        <div key={r.id} className="p-4 border rounded shadow-sm">
          <p className="font-semibold">{r.student.name}</p>
          <p>Rating: {r.rating}/5</p>
          <p>{r.comment}</p>
          <p className="text-gray-500 text-sm">{new Date(r.createdAt).toLocaleString()}</p>
        </div>
      ))}
    </div>
  );
}
