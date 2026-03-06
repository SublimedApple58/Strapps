import { notFound } from "next/navigation";
import { CheckoutScreen, type CheckoutVariant } from "@/components/strapps/checkout-screen";

const validVariants: CheckoutVariant[] = ["first", "early", "last"];

type CheckoutPageProps = {
  params: Promise<{ variant: string }>;
  searchParams: Promise<{ scarpa?: string; strappo?: string; taglia?: string; email?: string }>;
};

export default async function CheckoutVariantPage({ params, searchParams }: CheckoutPageProps) {
  const { variant } = await params;
  const { scarpa, strappo, taglia, email } = await searchParams;

  if (!validVariants.includes(variant as CheckoutVariant)) {
    notFound();
  }

  return (
    <CheckoutScreen
      variant={variant as CheckoutVariant}
      scarpa={scarpa}
      strappo={strappo}
      taglia={taglia}
      defaultEmail={email}
    />
  );
}
