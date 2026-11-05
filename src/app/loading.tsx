export default function Loading() {
  return (
    <main className="min-h-[70vh] flex items-center justify-center px-4">
      <div className="w-full max-w-md text-center space-y-6">
        <div className="flex justify-center">
          <div className="w-16 h-16 rounded-2xl bg-green-100 flex items-center justify-center">
            <span className="text-3xl">🛒</span>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-bold text-green-700">বাজার দর</h2>
          <p className="text-sm text-base-content/60 mt-2">
            Loading your experience...
          </p>
        </div>

        <div className="flex justify-center">
          <span className="loading loading-spinner loading-lg text-green-600"></span>
        </div>

        <p className="text-sm text-base-content/50">
          অনুগ্রহ করে অপেক্ষা করুন...
        </p>

        <div className="space-y-3 pt-4">
          <div className="skeleton h-4 w-3/4 mx-auto"></div>
          <div className="skeleton h-4 w-1/2 mx-auto"></div>
          <div className="skeleton h-24 w-full rounded-xl"></div>
        </div>
      </div>
    </main>
  );
}
