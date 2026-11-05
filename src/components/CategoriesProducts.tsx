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

const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/products`;

const formatPrice = (price: number) =>
  new Intl.NumberFormat("bn-BD").format(price);

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

const ProductCard = ({ product }: { product: Product }) => {
  const isUp = product.change.dir === "up";
  const isDown = product.change.dir === "down";

  const badgeColor = isUp
    ? "bg-green-100 text-green-700"
    : isDown
      ? "bg-red-100 text-red-700"
      : "bg-gray-100 text-gray-600";

  const arrow = isUp ? "▲" : isDown ? "▼" : "—";

  return (
    <Link
      href={`/products/${product.slug}`}
      className="group flex h-full min-w-0 flex-col overflow-hidden rounded-xl border border-base-300 bg-base-100 p-3 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-green-400 hover:shadow-md sm:p-4 lg:p-5"
    >
      <div className="mb-3 flex h-24 min-w-0 items-center justify-center overflow-hidden rounded-lg bg-base-200 text-4xl transition-transform duration-300 group-hover:scale-[1.02] sm:mb-4 sm:h-32 sm:text-5xl lg:text-6xl">
        <span className="max-w-full truncate">
          {product.image || product.categoryIcon || "🛒"}
        </span>
      </div>

      <div className="flex min-w-0 flex-1 flex-col">
        <div className="mb-3 min-w-0">
          <span className="block truncate text-[11px] font-medium text-base-content/50 sm:text-xs">
            {product.categoryIcon} {product.categoryNameBn}
          </span>

          <h3 className="mt-1 line-clamp-2 break-words text-sm font-bold leading-snug text-base-content sm:text-base lg:text-lg">
            {product.nameBn}
          </h3>

          <p className="mt-1 text-[11px] text-base-content/60 sm:text-xs">
            {formatUnit(product.unit)}
          </p>
        </div>

        <div className="mt-auto border-t border-base-300 pt-3">
          <div className="flex min-w-0 flex-col items-start justify-between gap-2 min-[420px]:flex-row min-[420px]:items-center">
            <div className="min-w-0">
              <p className="text-[11px] text-base-content/60 sm:text-xs">
                আজকের দাম
              </p>

              <p className="mt-1 break-words text-base font-bold leading-tight text-base-content sm:text-lg lg:text-xl">
                {formatPrice(product.today)} টাকা
              </p>
            </div>

            <span
              className={`inline-flex max-w-full shrink-0 items-center gap-1 rounded-full px-2 py-1 text-[10px] font-bold sm:px-2.5 sm:text-xs ${badgeColor}`}
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
    <section className="py-6 sm:py-8 lg:py-10">
      <div className="mb-4 min-w-0 space-y-2 sm:mb-6">
        <h2 className="flex flex-wrap items-center gap-2 text-lg font-bold text-base-content sm:text-xl lg:text-2xl">
          <span className={iconColor}>{icon}</span>
          {title}
        </h2>

        {subtitle && (
          <p className="max-w-2xl text-xs leading-relaxed text-base-content/60 sm:text-sm">
            {subtitle}
          </p>
        )}
      </div>

      <div className="grid min-w-0 grid-cols-1 gap-3 min-[360px]:grid-cols-2 sm:gap-4 md:grid-cols-3 xl:grid-cols-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
};

const ProductSections = async () => {
  const products = await getProducts();

  const risers = products
    .filter((product) => product.change.dir === "up")
    .sort((a, b) => b.change.pct - a.change.pct)
    .slice(0, 6);

  const fallers = products
    .filter((product) => product.change.dir === "down")
    .sort((a, b) => a.change.pct - b.change.pct)
    .slice(0, 6);

  return (
    <main className="mx-auto w-full max-w-7xl min-w-0 px-3 py-5 sm:px-5 sm:py-7 lg:px-6 lg:py-8">
      <ProductGrid
        title="আজ দাম বেড়েছে"
        icon="▲"
        iconColor="text-red-600"
        products={risers}
      />

      <ProductGrid
        title="আজ দাম কমেছে"
        icon="▼"
        iconColor="text-green-600"
        products={fallers}
      />

      <section id="সব-পণ্য" className="scroll-mt-24 sm:scroll-mt-32">
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
