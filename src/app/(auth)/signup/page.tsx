"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { authClient, signIn } from "@/lib/auth-client";
import { toast } from "react-toastify";

const SignUpPage = () => {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [socialLoading, setSocialLoading] = useState<
    "google" | "github" | null
  >(null);

  const handleSignUp = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (password.length < 8) {
      return toast.error("পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে");
    }

    if (password !== confirmPassword) {
      return toast.error("পাসওয়ার্ড দুটি মিলছে না!");
    }

    setLoading(true);

    try {
      const { error } = await authClient.signUp.email({
        name: name.trim(),
        email: email.trim(),
        password,
      });

      if (error) {
        toast.error(error.message || "অ্যাকাউন্ট তৈরি করা যায়নি!");
        return;
      }

      toast.success("অ্যাকাউন্ট সফলভাবে তৈরি হয়েছে!");
      router.push("/signin");
    } catch {
      toast.error("কিছু একটা সমস্যা হয়েছে!");
    } finally {
      setLoading(false);
    }
  };

  const handleSocialSignup = async (provider: "google" | "github") => {
    setSocialLoading(provider);

    try {
      const { error } = await signIn.social({
        provider,
        callbackURL: "/",
      });

      if (error) {
        toast.error(error.message || "সাইন আপ করা যায়নি!");
      }
    } catch {
      toast.error("কিছু একটা সমস্যা হয়েছে!");
    } finally {
      setSocialLoading(null);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-base-200 px-4 py-10">
      <div className="w-full max-w-sm">
        <div className="text-center mb-5">
          <h1 className="text-2xl font-bold">অ্যাকাউন্ট তৈরি করুন</h1>

          <p className="text-sm text-base-content/60 mt-2">
            বিনামূল্যে সাইন আপ করে সব বিস্তারিত দাম দেখুন।
          </p>
        </div>

        <fieldset className="fieldset bg-base-100 border-base-300 rounded-box w-full border p-5 sm:p-6 shadow-sm">
          <form onSubmit={handleSignUp} className="space-y-2">
            <label className="label">নাম</label>
            <input
              type="text"
              className="input input-bordered w-full"
              placeholder="যেমন: রহিম উদ্দিন"
              value={name}
              onChange={(e) => setName(e.target.value)}
              autoComplete="name"
              required
            />

            <label className="label">ইমেইল</label>
            <input
              type="email"
              className="input input-bordered w-full"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
              required
            />

            <label className="label">পাসওয়ার্ড</label>
            <input
              type="password"
              className="input input-bordered w-full"
              placeholder="কমপক্ষে ৮ অক্ষর"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="new-password"
              minLength={8}
              required
            />

            <label className="label">পাসওয়ার্ড নিশ্চিত করুন</label>
            <input
              type="password"
              className="input input-bordered w-full"
              placeholder="আবার লিখুন"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              autoComplete="new-password"
              required
            />

            <button
              type="submit"
              disabled={loading || !!socialLoading}
              className="btn btn-success w-full mt-4"
            >
              {loading ? (
                <span className="loading loading-spinner loading-sm" />
              ) : (
                "অ্যাকাউন্ট তৈরি করুন"
              )}
            </button>
          </form>

          <div className="divider text-xs text-base-content/60">অথবা</div>

          <button
            type="button"
            disabled={loading || !!socialLoading}
            onClick={() => handleSocialSignup("google")}
            className="btn btn-outline w-full"
          >
            {socialLoading === "google" ? (
              <span className="loading loading-spinner loading-sm" />
            ) : (
              <>
                
                Google দিয়ে চালিয়ে যান
              </>
            )}
          </button>

          <button
            type="button"
            disabled={loading || !!socialLoading}
            onClick={() => handleSocialSignup("github")}
            className="btn btn-outline w-full mt-2"
          >
            {socialLoading === "github" ? (
              <span className="loading loading-spinner loading-sm" />
            ) : (
              <>
                
                GitHub দিয়ে চালিয়ে যান
              </>
            )}
          </button>

          <p className="text-center text-sm mt-5">
            অ্যাকাউন্ট আছে?{" "}
            <Link href="/signin" className="link link-success font-semibold">
              সাইন ইন করুন
            </Link>
          </p>
        </fieldset>

        <div className="text-center mt-5">
          <Link
            href="/"
            className="text-sm text-base-content/50 hover:text-success"
          >
            ← হোম পেজে ফিরে যান
          </Link>
        </div>
      </div>
    </main>
  );
};

export default SignUpPage;
