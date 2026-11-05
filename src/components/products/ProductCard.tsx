import type { Product } from "@/types/bazardor";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  let changeText = "কোনো পরিবর্তন নেই";
  let changeClass = "badge-ghost";

  if (product.change.dir === "up") {
    changeText = `↑ ${product.change.pct}%`;
    changeClass = "badge-error";
  } else if (product.change.dir === "down") {
    changeText = `↓ ${product.change.pct}%`;
    changeClass = "badge-success";
  }

  let unitText = `প্রতি ${product.unit}`;

  if (product.unit === "kg") {
    unitText = "প্রতি কেজি";
  } else if (product.unit === "liter") {
    unitText = "প্রতি লিটার";
  } else if (product.unit === "piece") {
    unitText = "প্রতি পিস";
  } else if (product.unit === "dozen") {
    unitText = "প্রতি ডজন";
  }

  return (
    <article className="card h-full border border-base-200 bg-base-100 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
      <div className="card-body gap-3 p-4 sm:p-5">
        <div className="flex items-start justify-between gap-2">
          <div className="grid size-16 shrink-0 place-items-center rounded-2xl bg-green-50 text-4xl">
            {product.image || product.categoryIcon || "🛒"}
          </div>

          <span className={`badge ${changeClass} whitespace-nowrap`}>
            {changeText}
          </span>
        </div>

        <div>
          <h2 className="text-lg font-bold text-base-content">
            {product.nameBn}
          </h2>

          <p className="mt-1 text-sm text-base-content/60">{unitText}</p>
        </div>

        <div className="mt-auto flex items-end justify-between gap-2 border-t border-base-200 pt-3">
          <div>
            <p className="text-xs text-base-content/60">আজকের বাজারদর</p>

            <p className="mt-1 text-xl font-extrabold text-green-700">
              ৳{product.today.toLocaleString("bn-BD")}
            </p>
          </div>

          <span className="text-xs text-base-content/50">
            গতকাল: ৳{product.yesterday.toLocaleString("bn-BD")}
          </span>
        </div>
      </div>
    </article>
  );
}
