import Image from "next/image";
import Link from "next/link";

import UserDropdown from "./UserDropdown";
import CategoryLinks from "./CategoryLinks";

export interface ICategory {
  id: string;
  slug: string;
  nameBn: string;
  icon?: string;
}

const todayDate = new Intl.DateTimeFormat("bn-BD", {
  dateStyle: "full",
  timeZone: "Asia/Dhaka",
}).format(new Date());

// Fetch Categories
const getCategories = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/categories`, {
    next: { revalidate: 60 },
  });

  return res.json();
};


const Navbar = async () => {
  const categories = await getCategories();
  // console.log(categories);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-100 bg-white/95 shadow-sm backdrop-blur-md">
      {/* Top Navbar */}
      <nav className="mx-auto max-w-6xl px-3 sm:px-4">
        <div className="flex min-h-[68px] items-center justify-between gap-2 sm:min-h-[76px]">
          {/* Logo + Brand */}
          <Link href="/" className="flex min-w-0 items-center gap-2 sm:gap-3">
            <Image
              src="/logo-icon.png"
              alt="বাজার দর লোগো"
              width={42}
              height={42}
              priority
              className="h-9 w-9 shrink-0 object-contain sm:h-11 sm:w-11"
            />

            <div className="min-w-0">
              <h1 className="truncate text-lg font-extrabold tracking-tight text-gray-900 sm:text-xl">
                বাজার দর
              </h1>

              <p className="hidden truncate text-[11px] text-gray-500 min-[360px]:block sm:text-xs">
                {todayDate}
              </p>
            </div>
          </Link>

          {/* User Account */}
          <div className="shrink-0">
            <UserDropdown />
          </div>
        </div>
        </nav>
      {/* Categories Links*/}
      <div>
        <CategoryLinks categories={categories} />
      </div>
    </header>
  );
};

export default Navbar;
