"use client";

import { useEffect, useState } from "react";
import TutorCard from "@/app/components/TutorCard";
import { searchTutors } from "../services/tutor.service";


interface Tutor {
    id: string;
    name: string;
    category: string;
    price: number;
    rating: number;
}

export default function TutorsSearchPage() {
    const [tutors, setTutors] = useState<Tutor[]>([]);
    const [loading, setLoading] = useState(false);

    const [filters, setFilters] = useState({
        search: "",
        price: "",
        rating: "",
        category: "",
    });

    // Fetch tutors when filters change
    useEffect(() => {
        const fetchTutors = async () => {
            try {
                setLoading(true);
                const data = await searchTutors(filters);
                setTutors(Array.isArray(data) ? data : []);
            } catch (error) {
                console.error(error);
                setTutors([]);
            } finally {
                setLoading(false);
            }
        };

        fetchTutors();
    }, [filters]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFilters({ ...filters, [e.target.name]: e.target.value });
    };

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-2xl font-bold mb-6">Search Tutors</h1>

            {/* 🔍 Filters */}
            <div className="grid gap-4 md:grid-cols-4 mb-6">
                <input
                    type="text"
                    name="search"
                    placeholder="Search by name"
                    className="border p-2 rounded"
                    onChange={handleChange}
                />

                <input
                    type="number"
                    name="price"
                    placeholder="Max Price"
                    className="border p-2 rounded"
                    onChange={handleChange}
                />

                <select
                    name="rating"
                    className="border p-2 rounded"
                    onChange={handleChange}
                >
                    <option value="">Rating</option>
                    <option value="5">5+</option>
                    <option value="4">4+</option>
                    <option value="3">3+</option>
                </select>

                <select
                    name="category"
                    className="border p-2 rounded"
                    onChange={handleChange}
                >
                    <option value="">Category</option>
                    <option value="Mathematics">Mathematics</option>
                    <option value="Physics">Physics</option>
                    <option value="English">English</option>
                </select>
            </div>

            {/* 📦 Results */}
            {loading && <p className="text-gray-500">Loading tutors...</p>}

            {!loading && tutors.length === 0 && (
                <p className="text-gray-500">No tutors found</p>
            )}

            <div className="grid gap-6 md:grid-cols-3">
                {tutors.map((tutor) => (
                    <TutorCard key={tutor.id} tutor={tutor} />
                ))}
            </div>
        </div>
    );
}
