import Link from "next/link";
import { headers } from "next/headers";
import { notFound, redirect } from "next/navigation";

import { auth } from "@/lib/auth";

import type { Product } from "@/types/bazardor";
import { toast } from "react-toastify";

const API_URL = process.env.NEXT_PUBLIC_API_URL as string;

export default async function ProductDetailsPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/signin");
  }

  const productsResponse = await fetch(`${API_URL}/products`, {
    cache: "no-store",
  });

  if (!productsResponse.ok) {
    throw new Error("Products fetch failed");
  }

  const allProducts: Product[] = await productsResponse.json();

  const selectedProduct = allProducts.find((item) => item.slug === slug);

  if (!selectedProduct) {
    notFound();
  }

  const productResponse = await fetch(
    `${API_URL}/products/${selectedProduct.id}`,
    { cache: "no-store" },
  );

  if (productResponse.status === 404) {
    notFound();
  }

  if (!productResponse.ok) {
    toast.warning("Product details fetch failed");
  }

  const product: Product = await productResponse.json();

  let unitText = `প্রতি ${product.unit}`;

  if (product.unit === "kg") {
    unitText = "প্রতি কেজি";
  } else if (product.unit === "liter" || product.unit === "ltr") {
    unitText = "প্রতি লিটার";
  } else if (product.unit === "piece" || product.unit === "pcs") {
    unitText = "প্রতি পিস";
  } else if (product.unit === "dozen") {
    unitText = "প্রতি ডজন";
  }

  let minPrice = 0;
  let maxPrice = 0;
  let totalAverage = 0;

  if (product.markets.length > 0) {
    minPrice = product.markets[0].min;
    maxPrice = product.markets[0].max;

    for (const market of product.markets) {
      if (market.min < minPrice) {
        minPrice = market.min;
      }

      if (market.max > maxPrice) {
        maxPrice = market.max;
      }

      const marketAverage = (market.min + market.max) / 2;

      totalAverage = totalAverage + marketAverage;
    }
  }

  let averagePrice = 0;

  if (product.markets.length > 0) {
    averagePrice = totalAverage / product.markets.length;
  }

  const priceDifference = product.today - product.yesterday;

  let priceChangeText = "গতকালের তুলনায় আজ দাম অপরিবর্তিত";
  let priceChangeClass = "text-base-content/60";
  let priceIcon = "—";

  if (priceDifference > 0) {
    priceChangeText = `গতকালের তুলনায় আজ দাম বেড়েছে · ৳${priceDifference.toLocaleString("bn-BD")}`;
    priceChangeClass = "text-error";
    priceIcon = "↑";
  } else if (priceDifference < 0) {
    const decreasedPrice = product.yesterday - product.today;

    priceChangeText = `গতকালের তুলনায় আজ দাম কমেছে · ৳${decreasedPrice.toLocaleString("bn-BD")}`;
    priceChangeClass = "text-success";
    priceIcon = "↓";
  }

  return (
    <main className="mx-auto min-h-screen w-full max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-6 flex flex-wrap items-center gap-2 text-sm">
        <Link href="/" className="text-base-content/60 hover:text-green-700">
          হোম
        </Link>

        <span className="text-base-content/40">/</span>

        <Link
          href={`/category/${product.category}`}
          className="text-base-content/60 hover:text-green-700"
        >
          {product.categoryNameBn}
        </Link>

        <span className="text-base-content/40">/</span>

        <span className="font-semibold text-green-700">{product.nameBn}</span>
      </div>

      <section className="mb-6 rounded-2xl border border-base-200 bg-base-100 p-5 shadow-sm sm:p-7">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
          <div className="grid size-24 shrink-0 place-items-center rounded-2xl bg-green-50 text-6xl">
            {product.image || product.categoryIcon || "🛒"}
          </div>

          <div className="flex-1">
            <h1 className="text-2xl font-extrabold sm:text-3xl">
              {product.nameBn}
            </h1>

            <div className="mt-3 flex flex-wrap items-center gap-2">
              <span className="badge badge-success badge-outline">
                {product.categoryNameBn}
              </span>

              <span className="text-sm text-base-content/60">{unitText}</span>
            </div>

            <p className="mt-3 text-sm text-base-content/60">
              {product.markets.length.toLocaleString("bn-BD")} টি বাজারের আজকের
              দাম এক জায়গায় তুলনা করুন।
            </p>

            <p className={`mt-3 text-sm font-semibold ${priceChangeClass}`}>
              {priceIcon} {priceChangeText}
            </p>
          </div>
        </div>
      </section>

      <section className="mb-8 rounded-2xl border border-green-200 bg-green-50 p-5 sm:p-7">
        <p className="text-sm font-semibold text-green-800">আজকের দাম</p>

        <h2 className="mt-2 text-3xl font-extrabold text-green-700 sm:text-4xl">
          ৳{product.today.toLocaleString("bn-BD")}
        </h2>

        <p className="mt-1 text-sm text-green-800">{unitText}</p>

        <p className={`mt-3 text-sm font-medium ${priceChangeClass}`}>
          {priceIcon} {priceChangeText}
        </p>
      </section>

      <section className="mb-10">
        <h2 className="mb-5 text-xl font-bold sm:text-2xl">দামের সারসংক্ষেপ</h2>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {/* Minimum Price */}
          <div className="rounded-2xl border border-base-200 bg-base-100 p-5 shadow-sm">
            <p className="text-sm font-medium text-base-content/60">
              সর্বনিম্ন দাম
            </p>

            <h3 className="mt-3 text-2xl font-extrabold text-green-700">
              {product.markets.length > 0
                ? `৳${minPrice.toLocaleString("bn-BD")}`
                : "তথ্য নেই"}
            </h3>

            <p className="mt-1 text-xs text-base-content/50">{unitText}</p>
          </div>

          <div className="rounded-2xl border border-base-200 bg-base-100 p-5 shadow-sm">
            <p className="text-sm font-medium text-base-content/60">
              সর্বাধিক দাম
            </p>

            <h3 className="mt-3 text-2xl font-extrabold text-error">
              {product.markets.length > 0
                ? `৳${maxPrice.toLocaleString("bn-BD")}`
                : "তথ্য নেই"}
            </h3>

            <p className="mt-1 text-xs text-base-content/50">{unitText}</p>
          </div>

          <div className="rounded-2xl border border-base-200 bg-base-100 p-5 shadow-sm">
            <p className="text-sm font-medium text-base-content/60">গড় দাম</p>

            <h3 className="mt-3 text-2xl font-extrabold text-green-700">
              {product.markets.length > 0
                ? `৳${averagePrice.toLocaleString("bn-BD", {
                    maximumFractionDigits: 2,
                  })}`
                : "তথ্য নেই"}
            </h3>

            <p className="mt-1 text-xs text-base-content/50">{unitText}</p>
          </div>
        </div>
      </section>

      <section className="mb-10">
        <div className="mb-5">
          <h2 className="text-xl font-bold sm:text-2xl">
            বাজারভিত্তিক আজকের দাম
          </h2>

          <p className="mt-2 text-sm text-base-content/60">
            বিভিন্ন বাজারে এই পণ্যের সর্বনিম্ন ও সর্বাধিক দাম তুলনা করুন।
          </p>
        </div>

        {product.markets.length > 0 ? (
          <div className="overflow-x-auto rounded-2xl border border-base-200 bg-base-100 shadow-sm">
            <table className="table table-zebra">
              <thead>
                <tr className="bg-base-200 text-base-content">
                  <th>বাজার</th>
                  <th>বিভাগ</th>
                  <th>সর্বনিম্ন</th>
                  <th>সর্বাধিক</th>
                  <th>গড়</th>
                </tr>
              </thead>

              <tbody>
                {product.markets.map((market, index) => {
                  const marketAverage = (market.min + market.max) / 2;

                  return (
                    <tr key={index}>
                      <td className="font-semibold whitespace-nowrap">
                        {market.market}
                      </td>

                      <td className="whitespace-nowrap">{market.division}</td>

                      <td className="font-semibold text-success whitespace-nowrap">
                        ৳{market.min.toLocaleString("bn-BD")}
                      </td>

                      <td className="font-semibold text-error whitespace-nowrap">
                        ৳{market.max.toLocaleString("bn-BD")}
                      </td>

                      <td className="font-semibold whitespace-nowrap">
                        ৳
                        {marketAverage.toLocaleString("bn-BD", {
                          maximumFractionDigits: 2,
                        })}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-base-300 p-10 text-center">
            <p className="text-base-content/60">
              এই পণ্যের বাজারভিত্তিক কোনো তথ্য পাওয়া যায়নি।
            </p>
          </div>
        )}
      </section>

      <div className="text-center">
        <Link href="/" className="btn btn-success px-7 text-white">
          হোম পেজে ফিরে যান
        </Link>
      </div>
    </main>
  );
}
