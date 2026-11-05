import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <div className="max-w-lg w-full text-center">
        <div className="relative mb-6">
          <h1 className="text-[120px] sm:text-[160px] font-black leading-none text-green-100">
            404
          </h1>
          <span className="absolute inset-0 flex items-center justify-center text-5xl">
            🛒
          </span>
        </div>

        <h2 className="text-2xl sm:text-3xl font-bold text-base-content">
          পেজটি খুঁজে পাওয়া যায়নি!
        </h2>

        <p className="text-base-content/60 mt-3 leading-relaxed">
          দুঃখিত! আপনি যে পেজটি খুঁজছেন সেটি পাওয়া যাচ্ছে না। হয়তো পেজটি সরানো
          হয়েছে অথবা URL ভুল হয়েছে।
        </p>

        <div className="flex justify-center mt-8">
          <Link
            href="/"
            className="btn bg-green-600 hover:bg-green-700 text-white border-none px-8 rounded-xl"
          >
            <span>←</span>
            হোম পেজে ফিরে যান
          </Link>
        </div>

        <p className="text-xs text-base-content/40 mt-8">
          BazarDor — আপনার প্রতিদিনের বাজার দর
        </p>
      </div>
    </main>
  );
}
