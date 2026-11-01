
"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSession, signOut } from "@/lib/auth-client";
import { toast } from "react-toastify";

const UserDropdown = () => {
  const router = useRouter();

  const { data: session, isPending } = useSession();
  const [isSigningOut, setIsSigningOut] = useState(false);

  const user = session?.user;

  const displayName = user?.name?.trim() || user?.email || "User";

  const initials = displayName.charAt(0).toUpperCase();

  // Sign out handler
  const handleSignOut = async () => {
    if (isSigningOut) return;

    setIsSigningOut(true);

    try {
      const { error } = await signOut();

      if (error) {
        toast.error(error.message || "Sign out failed!");
        return;
      }

      toast.success("Successfully signed out!");

      router.push("/");
      router.refresh();
    } catch {
      toast.error("Something went wrong!");
    } finally {
      setIsSigningOut(false);
    }
  };

  // Loading state
  if (isPending) {
    return (
      <div className="flex items-center justify-center px-3">
        <span className="loading loading-spinner loading-sm text-success" />
      </div>
    );
  }

  return (
    <div className="dropdown dropdown-end">
      {/* Dropdown Trigger */}
      <button
        type="button"
        tabIndex={0}
        className="btn btn-ghost btn-sm sm:btn-md flex max-w-[170px] items-center gap-2 rounded-full px-2 sm:px-3"
        aria-label="Account menu"
      >
        {user ? (
          <>
            {/* User Image */}
            <div className="shrink-0">
              {user.image ? (
                <Image
                  src={user.image}
                  alt={displayName}
                  width={36}
                  height={36}
                  unoptimized
                  className="h-9 w-9 rounded-full border border-base-300 object-cover"
                />
              ) : (
                <div className="avatar placeholder">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-success text-white">
                    <span className="text-sm font-bold">{initials}</span>
                  </div>
                </div>
              )}
            </div>

            {/* User Name */}
            <span className="hidden truncate text-sm font-semibold sm:block">
              {displayName}
            </span>

            <span className="text-xs text-base-content/60">▼</span>
          </>
        ) : (
          <>
            <span className="text-base">👤</span>
            <span className="text-xs font-semibold sm:text-sm">
              Account
            </span>
            <span className="text-xs">▼</span>
          </>
        )}
      </button>

      {/* Dropdown Menu */}
      <ul
        tabIndex={0}
        className="dropdown-content menu z-50 mt-3 w-60 max-w-[calc(100vw-24px)] rounded-2xl border border-base-300 bg-base-100 p-2 shadow-xl"
      >
        {user ? (
          <>
            {/* User Information */}
            <li className="menu-title px-3 py-3">
              <div className="flex min-w-0 flex-col gap-1">
                <span className="truncate text-sm font-bold text-base-content">
                  {displayName}
                </span>

                <span className="truncate text-xs font-normal text-base-content/50">
                  {user.email}
                </span>
              </div>
            </li>

            <div className="divider my-0" />

            {/* Profile */}
            <li>
              <Link
                href="/profile"
                className="rounded-lg py-3 text-sm font-medium"
              >
                <span>👤</span>
                আমার প্রোফাইল
              </Link>
            </li>

            {/* Sign Out */}
            <li>
              <button
                type="button"
                onClick={handleSignOut}
                disabled={isSigningOut}
                className="rounded-lg py-3 text-sm font-medium text-error disabled:opacity-60"
              >
                {isSigningOut ? (
                  <span className="loading loading-spinner loading-xs" />
                ) : (
                  <span>↪️</span>
                )}

                {isSigningOut ? "Signing out..." : "সাইন আউট"}
              </button>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link
                href="/signin"
                className="rounded-lg py-3 text-sm font-medium"
              >
                <span>🔐</span>
                সাইন ইন
              </Link>
            </li>

            <li>
              <Link
                href="/signup"
                className="btn btn-success mt-2 text-white"
              >
                <span>✨</span>
                সাইন আপ
              </Link>
            </li>
          </>
        )}
      </ul>
    </div>
  );
};

export default UserDropdown;
