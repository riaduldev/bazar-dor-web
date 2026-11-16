
import CategoryProducts from "./CategoryProducts";

import type { Category, Product } from "@/types/bazardor";

const API_URL = process.env.NEXT_PUBLIC_API_URL as string;

function extractProducts(result: unknown): Product[] {
  if (Array.isArray(result)) {
    return result as Product[];
  }

  if (result && typeof result === "object") {
    const payload = result as { data?: unknown; products?: unknown };

    if (Array.isArray(payload.data)) {
      return payload.data as Product[];
    }

    if (Array.isArray(payload.products)) {
      return payload.products as Product[];
    }
  }

  return [];
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  let category: Category | null = null;
  let products: Product[] = [];
  let isError = false;

  try {
    const categoryRes = await fetch(`${API_URL}/categories/${slug}`, {
      cache: "no-store",
    });

    const productsRes = await fetch(`${API_URL}/products?category=${slug}`, {
      cache: "no-store",
    });

    if (categoryRes.ok) {
      category = await categoryRes.json();
    }

    if (productsRes.ok) {
      products = extractProducts(await productsRes.json());
    } else {
      isError = true;
    }
  } catch {
    isError = true;
  }

  return (
    <CategoryProducts category={category} products={products} isError={isError} />
  );
}
