import { notFound } from "next/navigation";
import { type ProductVariant, PRODUCT_CONFIGS } from "@/components/strapps/product-config";
import { ProductScreen } from "@/components/strapps/product-screen";
import { verifyAccessToken } from "@/lib/access-token";

type ProductPageProps = {
  params: Promise<{ variant: string }>;
  searchParams: Promise<{ t?: string }>;
};

export default async function ProductVariantPage({ params, searchParams }: ProductPageProps) {
  const { variant } = await params;
  const { t } = await searchParams;

  if (!(variant in PRODUCT_CONFIGS)) {
    notFound();
  }

  // Verifica il token dall'email di accesso/estensione
  const verified = t ? verifyAccessToken(decodeURIComponent(t)) : null;
  const defaultEmail = verified?.email ?? undefined;

  return <ProductScreen variant={variant as ProductVariant} defaultEmail={defaultEmail} />;
}
