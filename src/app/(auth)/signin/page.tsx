
"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { toast } from "react-toastify";


type SocialProvider = "google" | "github";

const SignInPage = () => {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [socialLoading, setSocialLoading] =
    useState<SocialProvider | null>(null);

  // Email and Password Sign In
  const handleSignIn = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!email.trim() || !password) {
      toast.error("ইমেইল ও পাসওয়ার্ড লিখুন!");
      return;
    }

    try {
      setLoading(true);

      const { error } = await authClient.signIn.email({
        email: email.trim(),
        password,
        callbackURL: "/",
      });

      if (error) {
        toast.error(error.message || "Sign in failed!");
        return;
      }

      toast.success("সফলভাবে সাইন ইন হয়েছে!");

      router.push("/");
      router.refresh();
    } catch (error) {
      console.error("Sign in error:", error);
      toast.error("Something went wrong. Please try again!");
    } finally {
      setLoading(false);
    }
  };

  // Google and GitHub Sign In
  const handleSocialSignIn = async (provider: SocialProvider) => {
    try {
      setSocialLoading(provider);

      const { error } = await authClient.signIn.social({
        provider,
        callbackURL: "/",
      });

      if (error) {
        toast.error(error.message || "Social sign in failed!");
        setSocialLoading(null);
      }
    } catch (error) {
      console.error(`${provider} sign in error:`, error);
      toast.error("Something went wrong. Please try again!");
      setSocialLoading(null);
    }
  };

  const isBusy = loading || !!socialLoading;

  return (
    <main className="min-h-screen flex items-center justify-center bg-base-200 px-4 py-10">
      <div className="w-full max-w-sm">
        {/* Heading */}
        <div className="text-center mb-5">
          <h1 className="text-2xl font-bold">
            আবার স্বাগতম!
          </h1>

          <p className="text-sm text-base-content/60 mt-2">
            আপনার অ্যাকাউন্টে সাইন ইন করে বিস্তারিত বাজারদর দেখুন।
          </p>
        </div>

        {/* Signin Form */}
        <fieldset className="fieldset bg-base-100 border-base-300 rounded-box w-full border p-5 sm:p-6 shadow-sm">

          <form onSubmit={handleSignIn} className="space-y-2">
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
              placeholder="আপনার পাসওয়ার্ড লিখুন"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
              required
            />

            {/* Signin Button */}
            <button
              type="submit"
              disabled={isBusy}
              className="btn btn-success w-full mt-4"
            >
              {loading ? (
                <span className="loading loading-spinner loading-sm" />
              ) : (
                "সাইন ইন করুন"
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="divider text-xs text-base-content/60">
            অথবা
          </div>

          {/* Google Signin */}
          <button
            type="button"
            disabled={isBusy}
            onClick={() => handleSocialSignIn("google")}
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

          {/* GitHub Signin */}
          <button
            type="button"
            disabled={isBusy}
            onClick={() => handleSocialSignIn("github")}
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

          {/* Signup Link */}
          <p className="text-center text-sm mt-5">
            নতুন অ্যাকাউন্ট তৈরি করতে চান?{" "}
            <Link
              href="/signup"
              className="link link-success font-semibold"
            >
              সাইন আপ করুন
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

export default SignInPage;
