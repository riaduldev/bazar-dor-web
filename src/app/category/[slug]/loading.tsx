
export default function CategoryLoading() {
  return (
    <main className="mx-auto min-h-screen w-full max-w-7xl animate-pulse px-4 py-8 sm:px-6 lg:px-8">

      {/* Header Skeleton */}
      <div className="mb-8 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">

        <div className="flex items-center gap-4">
          <div className="size-16 rounded-2xl bg-base-300 sm:size-20" />

          <div className="space-y-3">
            <div className="h-7 w-36 rounded-lg bg-base-300 sm:w-48" />
            <div className="h-4 w-48 rounded-lg bg-base-300 sm:w-64" />
          </div>
        </div>

        <div className="h-12 w-full rounded-xl bg-base-300 sm:w-64" />
      </div>

      {/* Loading Text */}
      <p className="mb-5 text-sm font-medium text-base-content/60">
        পণ্য লোড হচ্ছে...
      </p>

      {/* Product Skeleton */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3 xl:grid-cols-4">

        {Array.from({ length: 8 }).map((_, index) => (
          <div
            key={index}
            className="rounded-2xl border border-base-200 bg-base-100 p-5 shadow-sm"
          >
            <div className="mb-5 flex items-center justify-between">
              <div className="size-16 rounded-2xl bg-base-300" />
              <div className="h-6 w-20 rounded-full bg-base-300" />
            </div>

            <div className="mb-3 h-5 w-32 rounded bg-base-300" />
            <div className="mb-6 h-4 w-24 rounded bg-base-300" />

            <div className="border-t border-base-200 pt-4">
              <div className="mb-2 h-3 w-20 rounded bg-base-300" />
              <div className="h-7 w-28 rounded bg-base-300" />
            </div>
          </div>
        ))}

      </div>
    </main>
  );
}
