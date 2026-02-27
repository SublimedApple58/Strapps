import { notFound } from "next/navigation";
import { CheckoutScreen, type CheckoutVariant } from "@/components/strapps/checkout-screen";

const validVariants: CheckoutVariant[] = ["first", "early", "last"];

type CheckoutPageProps = {
  params: Promise<{ variant: string }>;
};

export default async function CheckoutVariantPage({ params }: CheckoutPageProps) {
  const { variant } = await params;

  if (!validVariants.includes(variant as CheckoutVariant)) {
    notFound();
  }

  return <CheckoutScreen variant={variant as CheckoutVariant} />;
}
