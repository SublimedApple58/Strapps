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

// ─── Data di chiusura per ogni tier (aggiorna qui con le date reali) ────────
const TIER_CLOSE_AT: Partial<Record<string, Date>> = {
  // first: new Date("2026-04-01T23:59:00+02:00"),
  // early: new Date("2026-05-01T23:59:00+02:00"),
  // last:  new Date("2026-06-01T23:59:00+02:00"),
};

function calcChiudeTra(closeAt: Date): string | undefined {
  const diffMs = closeAt.getTime() - Date.now();
  if (diffMs <= 0) return undefined;
  const totalMin = Math.floor(diffMs / 60_000);
  const days  = Math.floor(totalMin / 1440);
  const hours = Math.floor((totalMin % 1440) / 60);
  const mins  = totalMin % 60;
  if (days > 0)  return `${days}g ${hours}h ${mins}m`;
  if (hours > 0) return `${hours}h ${mins}m`;
  return `${mins}m`;
}

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

  const closeAt = TIER_CLOSE_AT[variant];
  const chiudeTra = closeAt ? calcChiudeTra(closeAt) : undefined;

  return (
    <ProductScreen
      variant={variant as ProductVariant}
      rimasti={rimasti}
      allRimasti={allRimasti}
      chiudeTra={chiudeTra}
    />
  );
}
