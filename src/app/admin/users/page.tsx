"use client";

import { useEffect, useState } from "react";
import { allUsers } from "@/app/services/admin.service";

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  createdAt: string;
}

export default function AdminUsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await allUsers();
        if (Array.isArray(data)) setUsers(data);
        else setUsers([]);
      } catch (err: any) {
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) return <p className="p-6 text-gray-500">Loading users...</p>;
  if (error) return <p className="p-6 text-red-500">{error}</p>;
  if (users.length === 0) return <p className="p-6 text-gray-500">No users found.</p>;

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">All Users</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-200 divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">ID</th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Name</th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Email</th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Role</th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Created At</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {users.map((user) => (
              <tr key={user.id}>
                <td className="px-4 py-2 text-sm text-gray-600">{user.id}</td>
                <td className="px-4 py-2 text-sm text-gray-600">{user.name}</td>
                <td className="px-4 py-2 text-sm text-gray-600">{user.email}</td>
                <td className="px-4 py-2 text-sm font-semibold">{user.role}</td>
                <td className="px-4 py-2 text-sm text-gray-500">{new Date(user.createdAt).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
