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
  const allRimasti: Partial<Record<ProductVariant, number>> = {};

  try {
    await initSalesTable();
    for (const t of ["first", "early", "last"] as ProductVariant[]) {
      const sold = await getSaleCount("acquisto", t);
      const cap = TIER_CAP[t] ?? TIER_CAPACITY[t];
      const r = Math.min(cap, Math.max(0, TIER_CAPACITY[t] - sold));
      allRimasti[t] = r;
      if (t === (variant as ProductVariant)) rimasti = r;
    }
  } catch {
    // fallback: non mostrare i contatori
  }

  return (
    <ProductScreen
      variant={variant as ProductVariant}
      rimasti={rimasti}
      allRimasti={allRimasti}
    />
  );
}
