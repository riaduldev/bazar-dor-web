import Image from "next/image";
import Link from "next/link";

import UserDropdown from "./UserDropdown";
import CategoryLinks from "./CategoryLinks";
import PriceMarquee from "./PriceMarquee";

export interface ICategory {
  id: string;
  slug: string;
  nameBn: string;
  icon?: string;
}

const getCategories = async (): Promise<ICategory[]> => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/categories`, {
      next: { revalidate: 60 },
    });

    if (!res.ok) {
      return [];
    }

    const result: unknown = await res.json();

    if (Array.isArray(result)) {
      return result as ICategory[];
    }

    if (result && typeof result === "object") {
      const payload = result as { data?: unknown; categories?: unknown };

      if (Array.isArray(payload.data)) {
        return payload.data as ICategory[];
      }

      if (Array.isArray(payload.categories)) {
        return payload.categories as ICategory[];
      }
    }

    return [];
  } catch {
    return [];
  }
};

const Navbar = async () => {
  const categories = await getCategories();

  const todayDate = new Intl.DateTimeFormat("bn-BD", {
    dateStyle: "full",
    timeZone: "Asia/Dhaka",
  }).format(new Date());

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-100 bg-white/95 shadow-sm backdrop-blur-md">
      {/* Top Navbar */}
      <nav className="mx-auto max-w-6xl px-3 sm:px-4">
        <div className="flex min-h-[68px] items-center justify-between gap-2 sm:min-h-[76px]">
          {/* Logo + Brand */}
          <Link href="/" className="flex min-w-0 items-center gap-2 sm:gap-3">
            <div className="shrink-0 border-green-600 bg-green-50 p-1 shadow-sm">
              <Image
                src="/logo-icon.png"
                alt="বাজার দর লোগো"
                width={42}
                height={42}
                priority
                className="h-9 w-9 object-contain sm:h-11 sm:w-11"
              />
            </div>

            <div className="min-w-0">
              <h1 className="truncate text-lg font-extrabold tracking-tight text-gray-900 sm:text-xl">
                বাজার দর
              </h1>

              <p className="hidden truncate text-[11px] text-gray-500 min-[360px]:block sm:text-xs">
                {todayDate}
              </p>
            </div>
          </Link>

          <div className="shrink-0">
            <UserDropdown />
          </div>
        </div>
      </nav>

      <div>
        <CategoryLinks categories={categories} />
      </div>

      <PriceMarquee></PriceMarquee>
    </header>
  );
};

export default Navbar;
