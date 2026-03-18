/* eslint-disable @typescript-eslint/no-explicit-any */
import { fetcher } from "./api";

/**
 * Get all tutors (public)
 * GET /tutors
 */
export const getTutors = async () => {
  const res = await fetcher("/tutors");
  return res.data;
};


/**
 * Search tutors with filters
 * GET /tutors?price=&rating=&category=&search=
 */
export const searchTutors = async (params: {
  price?: string;
  rating?: string;
  category?: string;
  search?: string;
}) => {
  const query = new URLSearchParams(
    Object.entries(params).filter(([_, v]) => v && v !== "")
  ).toString();

  const res = await fetcher(`/tutors?${query}`);
  return res.data;
};


/**
 * Get tutor dashboard data
 * GET /tutors/:id
 */
export const getTutorDashboard = async (id: string) => {
  if (!id) throw new Error("Tutor ID is required");

  const res = await fetcher(`/tutors/${id}`);
  return res.data;
};

/**
 * Update tutor profile (availability, bio, etc.)
 * PUT /tutors/profile
 */
export const updateTutorProfile = async (data: any) => {
  const res = await fetcher("/tutors/profile", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return res.data;
};
