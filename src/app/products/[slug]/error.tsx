
"use client";

export default function ProductError({
  reset,
}: {
  reset: () => void;
}) {
  return (
    <main className="flex min-h-[70vh] flex-col items-center justify-center px-4 text-center">

      <div className="text-6xl">⚠️</div>

      <h1 className="mt-5 text-2xl font-bold">
        তথ্য লোড করা যায়নি!
      </h1>

      <p className="mt-3 text-sm text-base-content/60">
        আবার চেষ্টা করুন অথবা কিছুক্ষণ পর ফিরে আসুন।
      </p>

      <button
        onClick={reset}
        className="btn btn-success mt-6 text-white"
      >
        আবার চেষ্টা করুন
      </button>

    </main>
  );
}
