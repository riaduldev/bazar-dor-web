
import Link from "next/link";

export default function ProductNotFound() {
  return (
    <main className="flex min-h-[70vh] flex-col items-center justify-center px-4 text-center">

      <div className="text-7xl">🔎</div>

      <h1 className="mt-6 text-2xl font-bold sm:text-3xl">
        পণ্যটি খুঁজে পাওয়া যায়নি!
      </h1>

      <p className="mt-3 max-w-md text-sm text-base-content/60">
        দুঃখিত, আপনি যে পণ্যটি খুঁজছেন সেটি পাওয়া যাচ্ছে না।
      </p>

      <Link
        href="/"
        className="btn btn-success mt-6 px-7 text-white"
      >
        হোম পেজে ফিরে যান
      </Link>

    </main>
  );
}
