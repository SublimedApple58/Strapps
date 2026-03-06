import { notFound } from "next/navigation";
import { AccessoCheckoutScreen, type AccessoTier } from "@/components/strapps/accesso-checkout-screen";

const validTiers: AccessoTier[] = ["first", "early", "last"];

type AccessoCheckoutPageProps = {
  params: Promise<{ tier: string }>;
};

export default async function AccessoCheckoutPage({ params }: AccessoCheckoutPageProps) {
  const { tier } = await params;

  if (!validTiers.includes(tier as AccessoTier)) {
    notFound();
  }

  return <AccessoCheckoutScreen tier={tier as AccessoTier} />;
}
