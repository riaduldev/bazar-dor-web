
"use client";

import Link from "next/link";
import { useSession } from "@/lib/auth-client";

const ProfilePage = () => {
  const { data: session, isPending } = useSession();

  const user = session?.user;

  // Loading state
  if (isPending) {
    return (
      <main className="min-h-screen bg-base-200 px-4 py-10">
        <div className="mx-auto max-w-lg">
          <div className="skeleton mb-5 h-8 w-40 mx-auto" />
          <div className="card bg-base-100 shadow-sm">
            <div className="card-body items-center gap-4">
              <div className="skeleton size-20 rounded-full" />
              <div className="skeleton h-5 w-40" />
              <div className="skeleton h-4 w-52" />
            </div>
          </div>
        </div>
      </main>
    );
  }

  // Not logged in
  if (!user) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-base-200 px-4">
        <div className="card w-full max-w-sm bg-base-100 shadow-sm">
          <div className="card-body items-center text-center">
            <h2 className="text-xl font-bold">
              Please Sign In
            </h2>

            <p className="text-sm text-base-content/60">
              আপনার প্রোফাইল দেখতে প্রথমে সাইন ইন করুন।
            </p>

            <Link href="/signin" className="btn btn-success mt-3 w-full">
              Sign In
            </Link>
          </div>
        </div>
      </main>
    );
  }

  const userName = user.name || "User";
  const initial = userName.charAt(0).toUpperCase();

  return (
    <main className="min-h-screen bg-base-200 px-4 py-10">
      <div className="mx-auto max-w-lg">
        {/* Heading */}
        <div className="mb-6 text-center">
          <h1 className="text-2xl font-bold">
            আমার প্রোফাইল
          </h1>

          <p className="mt-2 text-sm text-base-content/60">
            আপনার অ্যাকাউন্টের তথ্য এখানে দেখতে পারবেন।
          </p>
        </div>

        {/* Profile Card */}
        <div className="card border border-base-300 bg-base-100 shadow-sm">
          <div className="card-body items-center p-6 sm:p-8">
            {/* Avatar */}
            <div className="avatar placeholder">
              <div className="flex size-24 items-center justify-center rounded-full bg-success text-3xl font-bold text-success-content">
                {initial}
              </div>
            </div>

            <h2 className="text-xl font-bold">
              {userName}
            </h2>

            <p className="text-sm text-base-content/60">
              BazarDor Member
            </p>

            <div className="divider my-2" />

            {/* User Information */}
            <div className="w-full space-y-4">
              <div>
                <label className="mb-2 block text-sm font-semibold text-base-content/70">
                  Name
                </label>

                <div className="flex items-center gap-3 rounded-lg border border-base-300 bg-base-200/50 px-4 py-3">
                  <span>👤</span>
                  <p className="break-all text-sm font-medium">
                    {user.name || "Not available"}
                  </p>
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-base-content/70">
                  Email Address
                </label>

                <div className="flex items-center gap-3 rounded-lg border border-base-300 bg-base-200/50 px-4 py-3">
                  <span>✉️</span>
                  <p className="break-all text-sm font-medium">
                    {user.email || "Not available"}
                  </p>
                </div>
              </div>
            </div>

            {/* Back Home */}
            <Link
              href="/"
              className="btn btn-success mt-5 w-full"
            >
              ← হোম পেজে ফিরে যান
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ProfilePage;
