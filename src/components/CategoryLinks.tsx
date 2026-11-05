"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ICategory } from "./Navbar";

const CategoryLinks = ({ categories }: { categories: ICategory[] }) => {
  const pathname = usePathname();

  const activeClass = "bg-success text-white shadow-sm";

  const inactiveClass = "text-gray-600 hover:bg-success/10 hover:text-success";

  return (
    <div className="border-t border-gray-100">
      <nav
        aria-label="Product categories"
        className="mx-auto max-w-6xl px-2 sm:px-4"
      >
        <div className="flex w-full items-center gap-1 overflow-x-auto py-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:flex-wrap md:justify-center">
          {categories?.map((item) => {
            const href = `/category/${item.slug}`;

            const isActive =
              pathname === href || pathname.startsWith(`${href}/`);

            return (
              <Link
                key={item.id || item.slug}
                href={href}
                aria-current={isActive ? "page" : undefined}
                className={`flex shrink-0 items-center gap-1 whitespace-nowrap rounded-full px-3 py-2 text-xs font-semibold transition-all sm:px-4 sm:text-sm ${
                  isActive ? activeClass : inactiveClass
                }`}
              >
                <span>{item.icon}</span>
                <span>{item.nameBn}</span>
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
};

export default CategoryLinks;
