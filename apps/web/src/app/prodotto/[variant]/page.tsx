import { notFound } from "next/navigation";
import { type ProductVariant, PRODUCT_CONFIGS } from "@/components/strapps/product-config";
import { ProductScreen } from "@/components/strapps/product-screen";
import { getSaleCount, initSalesTable } from "@/lib/sales-counter";

const TIER_CAPACITY: Record<string, number> = {
  first: 60,
  early: 140,
  last: 90,
};

const TIER_CAP: Record<string, number> = {
  first: 29,
};

export const revalidate = 60;

type ProductPageProps = {
  params: Promise<{ variant: string }>;
};

export default async function ProductVariantPage({ params }: ProductPageProps) {
  const { variant } = await params;

  if (!(variant in PRODUCT_CONFIGS)) {
    notFound();
  }

  let rimasti: number | undefined;
  if (variant === "first") {
    try {
      await initSalesTable();
      const sold = await getSaleCount("acquisto", "first");
      const cap = TIER_CAP[variant] ?? TIER_CAPACITY[variant];
      rimasti = Math.min(cap, Math.max(0, TIER_CAPACITY[variant] - sold));
    } catch {
      // fallback: non mostrare il contatore
    }
  }

  return <ProductScreen variant={variant as ProductVariant} rimasti={rimasti} />;
}
