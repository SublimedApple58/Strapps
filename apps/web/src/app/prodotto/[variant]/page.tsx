import { notFound } from "next/navigation";
import { type ProductVariant, PRODUCT_CONFIGS } from "@/components/strapps/product-config";
import { ProductScreen } from "@/components/strapps/product-screen";

type ProductPageProps = {
  params: Promise<{ variant: string }>;
};

export default async function ProductVariantPage({ params }: ProductPageProps) {
  const { variant } = await params;

  if (!(variant in PRODUCT_CONFIGS)) {
    notFound();
  }

  return <ProductScreen variant={variant as ProductVariant} />;
}
