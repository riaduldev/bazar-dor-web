import CategoryProducts from "./CategoryProducts";

import type { Category, Product } from "@/types/bazardor";

const API_URL = "https://openapi.programming-hero.com/api/bazardor";

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  // URL থেকে slug নেওয়া
  const { slug } = await params;

  // Category এবং Products রাখার variable
  let category: Category | null = null;
  let products: Product[] = [];
  let isError = false;

  try {
    // Category fetch
    const categoryRes = await fetch(`${API_URL}/categories/${slug}`);

    // Products fetch
    const productsRes = await fetch(`${API_URL}/products?category=${slug}`);

    // Category data
    if (categoryRes.ok) {
      category = await categoryRes.json();
    }

    // Products data
    if (productsRes.ok) {
      products = await productsRes.json();
    } else {
      isError = true;
    }
  } catch {
    isError = true;
  }

  return (
    <CategoryProducts
      category={category}
      products={products}
      isError={isError}
    />
  );
}
