"use client";

import { useState } from "react";
import { updateTutorProfile } from "../services/tutor.service";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function TutorProfileForm() {
  const router = useRouter();

  const [bio, setBio] = useState("");
  const [pricePerHr, setPrice] = useState("");
  const [categoryIds, setCategoryIds] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const submitHandler = async () => {
    if (!bio || !pricePerHr) {
      toast.error("Bio and price are required");
      return;
    }

    setLoading(true);
    const toastId = toast.loading("Updating profile...");

    try {
      await updateTutorProfile({
        bio,
        pricePerHr: Number(pricePerHr),
        categoryIds,
      });

      toast.success("Profile updated successfully", { id: toastId });

      // Redirect after 0.5s for better UX
      setTimeout(() => {
        router.push("/tutors");
      }, 500);

    } catch (err: any) {
      toast.error(err.message || "Something went wrong", {
        id: toastId,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl space-y-4">
      {/* BIO */}
      <textarea
        className="w-full border rounded p-3"
        placeholder="Write your bio..."
        value={bio}
        onChange={(e) => setBio(e.target.value)}
      />

      {/* PRICE */}
      <input
        type="number"
        className="w-full border rounded p-3"
        placeholder="Price per hour"
        value={pricePerHr}
        onChange={(e) => setPrice(e.target.value)}
      />

      {/* CATEGORY IDS */}
      <input
        className="w-full border rounded p-3"
        placeholder="Category IDs (comma separated)"
        onChange={(e) =>
          setCategoryIds(
            e.target.value
              .split(",")
              .map((id) => id.trim())
              .filter(Boolean)
          )
        }
      />

      {/* BUTTON */}
      <button
        onClick={submitHandler}
        disabled={loading}
        className="w-full px-4 py-3 bg-primary text-white rounded hover:opacity-90 disabled:opacity-50"
      >
        {loading ? "Saving..." : "Save Profile"}
      </button>
    </div>
  );
}
