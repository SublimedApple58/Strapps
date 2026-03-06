import { notFound } from "next/navigation";
import { EstendiCheckoutScreen, type EstendiTier } from "@/components/strapps/estendi-checkout-screen";

const validTiers: EstendiTier[] = ["first", "early", "last"];

type EstendiPageProps = {
  params: Promise<{ tier: string }>;
  searchParams: Promise<{ scarpa?: string; strappo?: string }>;
};

export default async function EstendiCheckoutPage({ params, searchParams }: EstendiPageProps) {
  const { tier } = await params;
  const { scarpa, strappo } = await searchParams;

  if (!validTiers.includes(tier as EstendiTier)) {
    notFound();
  }

  return (
    <EstendiCheckoutScreen
      tier={tier as EstendiTier}
      scarpa={scarpa}
      strappo={strappo}
    />
  );
}
