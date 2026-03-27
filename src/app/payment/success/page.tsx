"use client";

import Link from "next/link";

export default function PaymentSuccess() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-green-50">
      <h1 className="text-4xl font-bold text-green-600 mb-4">
        Payment Successful 🎉
      </h1>
      <p className="mb-6">Your payment has been completed successfully.</p>
      <Link
        href="/dashboard"
        className="px-6 py-3 bg-green-600 text-white rounded-full"
      >
        Go Back to Dashboard
      </Link>
    </div>
  );
}