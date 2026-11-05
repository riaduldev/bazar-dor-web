import Link from "next/link";
import MarqueeText from "react-marquee-text";

interface Product {
  id: number | string;
  slug: string;
  nameBn: string;
  image?: string;
  unit?: string;
  today: number;
  change?: {
    dir: "up" | "down" | "flat";
    pct: number;
  };
}

const API_URL = "https://openapi.programming-hero.com/api/bazardor/products";

const formatNumber = (value: number) =>
  new Intl.NumberFormat("bn-BD", {
    maximumFractionDigits: 1,
  }).format(value);

async function getProducts(): Promise<Product[]> {
  try {
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
      const data = result as {
        data?: unknown;
        products?: unknown;
      };

      if (Array.isArray(data.data)) {
        return data.data as Product[];
      }

      if (Array.isArray(data.products)) {
        return data.products as Product[];
      }
    }

    return [];
  } catch (error) {
    console.error("Price marquee error:", error);
    return [];
  }
}

function PriceItems({
  products,
  duplicate = false,
}: {
  products: Product[];
  duplicate?: boolean;
}) {
  return (
    <div
      className="price-marquee-group flex shrink-0 items-center"
      aria-hidden={duplicate || undefined}
    >
      {products.map((product) => {
        const direction = product.change?.dir;

        const isUp = direction === "up";
        const isDown = direction === "down";

        const arrow = isUp ? "▲" : isDown ? "▼" : "—";

        // বাজারদর বাড়লে লাল, কমলে সবুজ
        const color = isUp
          ? "text-red-600"
          : isDown
            ? "text-green-600"
            : "text-gray-500";

        return (
          <Link
            key={`${duplicate ? "copy-" : ""}${product.id}`}
            href={`/product/${product.slug}`}
            tabIndex={duplicate ? -1 : undefined}
            className="price-marquee-item flex shrink-0 items-center gap-1.5 whitespace-nowrap text-[11px] sm:gap-2 sm:text-xs"
          >
            <span aria-hidden="true">{product.image || "🛒"}</span>

            <span className="font-medium text-gray-700">{product.nameBn}</span>

            <span className="text-gray-500">
              {formatNumber(product.today)} টাকা
              {product.unit ? `/${product.unit}` : ""}
            </span>

            <span className={`flex items-center gap-1 font-bold ${color}`}>
              <span aria-hidden="true">{arrow}</span>
              {formatNumber(Math.abs(product.change?.pct ?? 0))}%
            </span>
          </Link>
        );
      })}
    </div>
  );
}

const PriceMarquee = async () => {
  const products = await getProducts();

  if (!products.length) return null;

  return (
    <MarqueeText duration={15} pauseOnHover={true} direction="right">
      <section
        aria-label="আজকের বাজারদরের আপডেট"
        className="overflow-hidden border-y py-2 border-gray-200 bg-[#f8faf8]"
      >
        <div className="price-marquee-track flex w-max items-center">
          <PriceItems products={products} />
          <PriceItems products={products} duplicate />
        </div>
      </section>
    </MarqueeText>
  );
};

export default PriceMarquee;
