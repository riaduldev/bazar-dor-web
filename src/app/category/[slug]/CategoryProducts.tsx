"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Category, Product } from "@/types/bazardor";
import ProductCard from "@/components/products/ProductCard";

type SortOption = "default" | "low-to-high" | "high-to-low";

interface CategoryProductsProps {
  category: Category | null;
  products: Product[];
  isError: boolean;
}

export default function CategoryProducts({
  category,
  products,
  isError,
}: CategoryProductsProps) {
  const [sortBy, setSortBy] = useState<SortOption>("default");

  const sortedProducts = useMemo(() => {
    const sorted = [...products];

    if (sortBy === "low-to-high") {
      sorted.sort((a, b) => a.today - b.today);
    }

    if (sortBy === "high-to-low") {
      sorted.sort((a, b) => b.today - a.today);
    }

    return sorted;
  }, [products, sortBy]);

  const categoryName = category?.nameBn ?? "অজানা ক্যাটাগরি";
  const categoryIcon = category?.icon ?? "🔎";

  return (
    <main className="mx-auto min-h-screen w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-4">
          <div className="grid size-16 shrink-0 place-items-center rounded-2xl border border-green-200 bg-green-50 text-4xl sm:size-20 sm:text-5xl">
            {categoryIcon}
          </div>

          <div>
            <h1 className="text-2xl font-extrabold sm:text-3xl">
              {categoryName}
            </h1>

            <p className="mt-1 text-sm text-base-content/60 sm:text-base">
              {categoryName} ক্যাটাগরির সকল পণ্যের আজকের বাজারদর।
            </p>
          </div>
        </div>

        <div className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row sm:items-center">
          <label
            htmlFor="product-sort"
            className="text-sm font-semibold whitespace-nowrap"
          >
            সাজান:
          </label>

          <select
            id="product-sort"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as SortOption)}
            className="select select-bordered w-full bg-base-100 sm:w-64 flex justify-center items-center"
          >
            <option value="default">ডিফল্ট</option>
            <option value="low-to-high">দাম: কম থেকে বেশি</option>
            <option value="high-to-low">দাম: বেশি থেকে কম</option>
          </select>
        </div>
      </div>

      {!isError && products.length > 0 && (
        <p className="mb-5 text-sm text-base-content/60">
          মোট {products.length.toLocaleString("bn-BD")} টি পণ্য পাওয়া গেছে
        </p>
      )}

      {isError ? (
        <div className="flex min-h-[350px] flex-col items-center justify-center rounded-3xl border border-dashed border-base-300 px-5 text-center">
          <span className="text-6xl">⚠️</span>

          <h2 className="mt-5 text-xl font-bold">তথ্য লোড করা যায়নি!</h2>

          <p className="mt-2 text-sm text-base-content/60">
            ইন্টারনেট সংযোগ পরীক্ষা করে আবার চেষ্টা করুন।
          </p>

          <Link href="/" className="btn btn-success mt-6 text-white">
            হোম পেজে ফিরে যান
          </Link>
        </div>
      ) : products.length === 0 ? (
        <div className="flex min-h-[400px] flex-col items-center justify-center rounded-3xl border border-dashed border-base-300 bg-base-200/30 px-5 text-center">
          <div className="grid size-24 place-items-center rounded-full bg-base-200 text-5xl">
            {categoryIcon}
          </div>

          <h2 className="mt-6 text-xl font-bold sm:text-2xl">
            কোনো পণ্য পাওয়া যায়নি!
          </h2>

          <p className="mt-2 max-w-md text-sm leading-7 text-base-content/60">
            {category
              ? `${categoryName} ক্যাটাগরিতে বর্তমানে কোনো পণ্য নেই। অন্য ক্যাটাগরি থেকে পণ্য দেখতে পারেন।`
              : "আপনার খোঁজা ক্যাটাগরিটি পাওয়া যায়নি। অনুগ্রহ করে হোম পেজে ফিরে যান।"}
          </p>

          <Link
            href="/"
            className="btn btn-success mt-6 px-7 text-white shadow-md transition hover:scale-105"
          >
            হোম পেজে ফিরে যান
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3 xl:grid-cols-4">
          {sortedProducts.map((product) => (
            <Link key={product.id} href={`/products/${product.slug}`}>
              <ProductCard product={product} />
            </Link>
          ))}
        </div>
      )}
    </main>
  );
}
