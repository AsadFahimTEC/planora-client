"use client";

import Link from "next/link";

export default function PaymentCancel() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-red-50">
      <h1 className="text-4xl font-bold text-red-600 mb-4">
        Payment Cancelled ❌
      </h1>
      <p className="mb-6">Your payment was not completed.</p>
      <Link
        href="/dashboard"
        className="px-6 py-3 bg-red-600 text-white rounded-full"
      >
        Try Again
      </Link>
    </div>
  );
}