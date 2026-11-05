
import Link from "next/link";

interface Product {
  id: number;
  slug: string;
  nameBn: string;
  category: string;
  categoryNameBn: string;
  categoryIcon: string;
  unit: string;
  image: string;
  today: number;
  yesterday: number;
  lastWeek: number;
  lastMonth: number;
  change: {
    dir: "up" | "down" | "flat";
    pct: number;
  };
}

const API_URL =
  "https://openapi.programming-hero.com/api/bazardor/products";

// Bengali number formatter
const formatPrice = (price: number) =>
  new Intl.NumberFormat("bn-BD").format(price);

// Unit formatter
const formatUnit = (unit: string) => {
  const units: Record<string, string> = {
    kg: "প্রতি কেজি",
    liter: "প্রতি লিটার",
    litre: "প্রতি লিটার",
    dozen: "প্রতি ডজন",
    piece: "প্রতি পিস",
    pcs: "প্রতি পিস",
    gram: "প্রতি গ্রাম",
  };

  return units[unit.toLowerCase()] || `প্রতি ${unit}`;
};

// Fetch products
async function getProducts(): Promise<Product[]> {
  const res = await fetch(API_URL, {
    next: { revalidate: 300 },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }

  const result: unknown = await res.json();

  if (Array.isArray(result)) {
    return result as Product[];
  }

  if (result && typeof result === "object") {
    const response = result as {
      data?: unknown;
      products?: unknown;
    };

    if (Array.isArray(response.data)) {
      return response.data as Product[];
    }

    if (Array.isArray(response.products)) {
      return response.products as Product[];
    }
  }

  return [];
}

// Product Card
const ProductCard = ({ product }: { product: Product }) => {
  const isUp = product.change.dir === "up";
  const isDown = product.change.dir === "down";
  const isFlat = product.change.dir === "flat";

  const badgeColor = isUp
    ? "bg-green-100 text-green-700"
    : isDown
      ? "bg-red-100 text-red-700"
      : "bg-gray-100 text-gray-600";

  const arrow = isUp ? "▲" : isDown ? "▼" : "—";

  return (
    <Link
      href={`/product/${product.slug}`}
      className="group flex h-full flex-col rounded-xl border border-base-300 bg-base-100 p-4 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-green-400 hover:shadow-md sm:p-5"
    >
      {/* Product Image */}
      <div className="mb-4 flex h-28 items-center justify-center rounded-lg bg-base-200 text-5xl transition-transform duration-300 group-hover:scale-105 sm:h-32 sm:text-6xl">
        {product.image || product.categoryIcon || "🛒"}
      </div>

      {/* Product Information */}
      <div className="flex flex-1 flex-col">
        <div className="mb-2">
          <span className="text-xs font-medium text-base-content/50">
            {product.categoryIcon} {product.categoryNameBn}
          </span>

          <h3 className="mt-1 line-clamp-1 text-base font-bold text-base-content sm:text-lg">
            {product.nameBn}
          </h3>

          <p className="mt-1 text-xs text-base-content/60">
            {formatUnit(product.unit)}
          </p>
        </div>

        <div className="mt-auto border-t border-base-300 pt-3">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div>
              <p className="text-xs text-base-content/60">
                আজকের দাম
              </p>

              <p className="mt-1 text-lg font-bold text-base-content sm:text-xl">
                {formatPrice(product.today)} টাকা
              </p>
            </div>

            {/* Price Change Badge */}
            <span
              className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-bold ${badgeColor}`}
            >
              {arrow}
              {formatPrice(Math.abs(product.change.pct))}%
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

// Reusable Product Section
const ProductGrid = ({
  title,
  products,
  subtitle,
  icon,
  iconColor,
}: {
  title: string;
  products: Product[];
  subtitle?: string;
  icon?: string;
  iconColor?: string;
}) => {
  if (!products.length) return null;

  return (
    <section className="py-8 sm:py-10">
      <div className="mb-5 flex flex-col gap-2 sm:mb-6">
        <h2 className="text-xl font-bold text-base-content sm:text-2xl">
          <span className={iconColor}>{icon}</span>{" "}
          {title}
        </h2>

        {subtitle && (
          <p className="text-sm text-base-content/60">
            {subtitle}
          </p>
        )}
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3 xl:grid-cols-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
};

const ProductSections = async () => {
  const products = await getProducts();

  // Top 6 price risers
  const risers = products
    .filter((product) => product.change.dir === "up")
    .sort((a, b) => b.change.pct - a.change.pct)
    .slice(0, 6);

  // Top 6 price fallers
  const fallers = products
    .filter((product) => product.change.dir === "down")
    .sort((a, b) => a.change.pct - b.change.pct)
    .slice(0, 6);

  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-6 sm:py-8">

      {/* Section A: Price Rises */}
      <ProductGrid
        title="আজ দাম বেড়েছে"
        icon="▲"
        iconColor="text-red-600"
        products={risers}
      />

      {/* Section B: Price Falls */}
      <ProductGrid
        title="আজ দাম কমেছে"
        icon="▼"
        iconColor="text-green-600"
        products={fallers}
      />

      {/* Section C: All Products */}
      <section id="সব-পণ্য" className="scroll-mt-40">
        <ProductGrid
          title="সব পণ্য"
          products={products}
          subtitle="সকল নিত্যপ্রয়োজনীয় পণ্যের আজকের বাজারদর এক জায়গায়।"
        />
      </section>

    </main>
  );
};

export default ProductSections;
