import { fetcher } from "./api";

export const allUsers = async () => {
  const res = await fetcher("/admin/users");
  return res.data; // ✅ return only array
};

export const getAdminBookings = async () => {
  const res = await fetcher("/admin/bookings");
  return res.data; // ✅ return only array
};

// Get all categories
export const getAdminCategories = async () => {
  const res = await fetcher("/admin/categories");
  return res.data ?? []; // ensure array
};
