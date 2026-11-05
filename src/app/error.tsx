"use client";

import { useEffect } from "react";
import Link from "next/link";
import { toast } from "react-toastify";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    toast.error(`BazarDor Error: ${error.message}`);
    console.error("BazarDor Error:", error);
  }, [error]);

  return (
    <main className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <div className="max-w-lg w-full text-center">
        <div className="w-24 h-24 mx-auto rounded-full bg-red-50 flex items-center justify-center mb-6">
          <span className="text-5xl">⚠️</span>
        </div>

        <h1 className="text-2xl sm:text-3xl font-bold text-base-content">
          Oops! Something went wrong.
        </h1>

        <p className="text-base-content/60 mt-3 leading-relaxed">
          দুঃখিত! পেজটি লোড করার সময় একটি সমস্যা হয়েছে। অনুগ্রহ করে আবার চেষ্টা
          করুন।
        </p>

        {error.digest && (
          <p className="text-xs text-base-content/40 mt-3">
            Error ID: {error.digest}
          </p>
        )}

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-8">
          <button
            onClick={reset}
            className="btn bg-green-600 hover:bg-green-700 text-white border-none rounded-xl w-full sm:w-auto"
          >
            <span>↻</span>
            Try Again
          </button>

          <Link
            href="/"
            className="btn btn-outline border-green-600 text-green-700 hover:bg-green-600 hover:text-white rounded-xl w-full sm:w-auto"
          >
            Go Home
          </Link>
        </div>

        <p className="text-xs text-base-content/40 mt-8">
          BazarDor — আপনার প্রতিদিনের বাজার দর
        </p>
      </div>
    </main>
  );
}
