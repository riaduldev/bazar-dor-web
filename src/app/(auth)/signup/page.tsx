
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

  // Email and Password Signup
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

  // Google / GitHub Signup
  const handleSocialSignup = async (
    provider: "google" | "github"
  ) => {
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

        {/* Heading */}
        <div className="text-center mb-5">
          <h1 className="text-2xl font-bold">
            অ্যাকাউন্ট তৈরি করুন
          </h1>

          <p className="text-sm text-base-content/60 mt-2">
            বিনামূল্যে সাইন আপ করে সব বিস্তারিত দাম দেখুন।
          </p>
        </div>

        {/* Signup Form */}
        <fieldset className="fieldset bg-base-100 border-base-300 rounded-box w-full border p-5 sm:p-6 shadow-sm">


          <form onSubmit={handleSignUp} className="space-y-2">

            {/* Name */}
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

            {/* Email */}
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

            {/* Password */}
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

            {/* Confirm Password */}
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

            {/* Signup Button */}
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

          {/* Divider */}
          <div className="divider text-xs text-base-content/60">
            অথবা
          </div>

          {/* Google Signup */}
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
                <span className="text-lg font-bold text-red-500">G</span>
                Google দিয়ে চালিয়ে যান
              </>
            )}
          </button>

          {/* GitHub Signup */}
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
                <svg
                  viewBox="0 0 24 24"
                  className="w-5 h-5 fill-current"
                  aria-hidden="true"
                >
                  <path d="M12 .8a11.2 11.2 0 0 0-3.54 21.82c.56.1.77-.24.77-.54v-2.08c-3.14.68-3.8-1.33-3.8-1.33-.5-1.3-1.24-1.65-1.24-1.65-1.02-.7.08-.69.08-.69 1.13.08 1.73 1.16 1.73 1.16 1 .1 2.01.14 3.03.14-.78.15-1.48.6-1.9 1.28-.8-.42-1.67-.63-2.57-.63-.56 0-.98.3-.98.82 0 .52.42.83.98.83 1.12 0 2.02-.3 2.02-.3s.18-.06.36.14c.18.2.1.4.1.4v1.72c0 .35.2.65.77.54A11.2 11.2 0 0 0 12 .8Z" />
                </svg>
                GitHub দিয়ে চালিয়ে যান
              </>
            )}
          </button>

          {/* Signin Link */}
          <p className="text-center text-sm mt-5">
            অ্যাকাউন্ট আছে?{" "}
            <Link
              href="/signin"
              className="link link-success font-semibold"
            >
              সাইন ইন করুন
            </Link>
          </p>
        </fieldset>

        {/* Back to Home */}
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
