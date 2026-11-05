
import CategoryProducts from "./CategoryProducts";

import type { Category, Product } from "@/types/bazardor";

const API_URL = process.env.NEXT_PUBLIC_API_URL as string;

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
    
    const categoryRes = await fetch(`${API_URL}/categories/${slug}`);

    
    const productsRes = await fetch(`${API_URL}/products?category=${slug}`);

    
    if (categoryRes.ok) {
      category = await categoryRes.json();
    }

    
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
