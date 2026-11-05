"use client";

import { useState } from "react";
import Link from "next/link";

import { updateUser, useSession } from "@/lib/auth-client";
import { toast } from "react-toastify";

export default function UpdateInfoPage() {
  const { data: session, isPending } = useSession();

  if (isPending) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center">
        <span className="loading loading-spinner loading-lg text-success"></span>
      </div>
    );
  }

  if (!session) {
    return (
      <div className="flex min-h-[70vh] flex-col items-center justify-center gap-4 px-4 text-center">
        <h2 className="text-xl font-bold">প্রথমে লগইন করুন</h2>

        <Link href="/signin" className="btn btn-success text-white">
          লগইন করুন
        </Link>
      </div>
    );
  }

  return <UpdateNameForm currentName={session.user.name} />;
}

function UpdateNameForm({ currentName }: { currentName: string }) {
  const [name, setName] = useState(currentName);

  const [isSaving, setIsSaving] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleUpdateName = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!name.trim()) {
      toast.info("আপনার নাম লিখুন");
      return;
    }

    if (name.trim() === currentName) {
      toast.info("আপনি নতুন কোনো নাম দেননি");
      return;
    }

    setIsSaving(true);
    setError("");
    setSuccess("");

    try {
      const { error } = await updateUser({
        name: name.trim(),
      });

      if (error) {
        toast.error(error.message);
      } else {
        toast.success("আপনার নাম সফলভাবে পরিবর্তন হয়েছে!");
      }
    } catch {
      toast.error("কিছু একটা সমস্যা হয়েছে। আবার চেষ্টা করুন।");
    }

    setIsSaving(false);
  };

  return (
    <main className="flex min-h-[80vh] items-center justify-center px-4 py-10">
      <div className="w-full max-w-lg rounded-2xl border border-base-200 bg-base-100 p-5 shadow-lg sm:p-8">
        <div className="mb-7 text-center">
          <div className="mx-auto mb-4 grid size-16 place-items-center rounded-full bg-green-100 text-3xl">
            👤
          </div>

          <h1 className="text-2xl font-extrabold">তথ্য পরিবর্তন করুন</h1>

          <p className="mt-2 text-sm text-base-content/60">
            আপনার নাম পরিবর্তন করতে নিচের ফর্মটি পূরণ করুন।
          </p>
        </div>

        <div className="mb-5 rounded-xl bg-base-200/60 p-4">
          <p className="text-xs text-base-content/60">বর্তমান নাম</p>

          <p className="mt-1 font-semibold">{currentName}</p>
        </div>

        <form onSubmit={handleUpdateName}>
          <label htmlFor="name" className="mb-2 block text-sm font-semibold">
            নতুন নাম
          </label>

          <input
            id="name"
            type="text"
            placeholder="আপনার নতুন নাম লিখুন"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="input input-bordered w-full focus:border-green-600"
          />

          {success && (
            <p className="mt-3 text-sm font-medium text-success">✓ {success}</p>
          )}

          {error && (
            <p className="mt-3 text-sm font-medium text-error">{error}</p>
          )}

          <button
            type="submit"
            disabled={isSaving || !name.trim() || name.trim() === currentName}
            className="btn btn-success mt-6 w-full text-white"
          >
            {isSaving ? (
              <>
                <span className="loading loading-spinner loading-sm"></span>
                পরিবর্তন হচ্ছে...
              </>
            ) : (
              "নাম পরিবর্তন করুন"
            )}
          </button>
        </form>
      </div>
    </main>
  );
}
