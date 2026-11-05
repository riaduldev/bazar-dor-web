
export default function ProductDetailsLoading() {
  return (
    <main className="mx-auto min-h-screen max-w-6xl animate-pulse px-4 py-8 sm:px-6 lg:px-8">

     
      <div className="mb-8 h-4 w-52 rounded bg-base-300" />

      
      <div className="mb-6 flex items-center gap-5 rounded-2xl border border-base-200 p-6">

        <div className="size-24 rounded-2xl bg-base-300" />

        <div className="flex-1 space-y-3">

          <div className="h-7 w-48 rounded bg-base-300" />

          <div className="h-4 w-32 rounded bg-base-300" />

          <div className="h-4 w-56 rounded bg-base-300" />

        </div>

      </div>

      
      <div className="mb-8 h-36 rounded-2xl bg-green-100" />

     
      <div className="mb-10 grid grid-cols-1 gap-4 sm:grid-cols-3">

        <div className="h-28 rounded-2xl bg-base-300" />

        <div className="h-28 rounded-2xl bg-base-300" />

        <div className="h-28 rounded-2xl bg-base-300" />

      </div>

      
      <div className="space-y-3">

        <div className="h-7 w-52 rounded bg-base-300" />

        {Array.from({ length: 5 }).map((_, index) => (
          <div
            key={index}
            className="h-14 rounded-lg bg-base-300"
          />
        ))}

      </div>

    </main>
  );
}
