export type ProductVariant = "first" | "early" | "last";
export type ShoeColor = "bianco" | "nero";
export type StrapColor = "bianco" | "nero";

type ProductConfig = {
  tier: string;
  price: string;
  checkoutHref: string;
};

export const PRODUCT_CONFIGS: Record<ProductVariant, ProductConfig> = {
  first: { tier: "FIRST 60", price: "189,99€", checkoutHref: "/checkout/first" },
  early: { tier: "EARLY 140", price: "219,99€", checkoutHref: "/checkout/early" },
  last: { tier: "LAST 90", price: "239,99€", checkoutHref: "/checkout/last" },
};

export const PRODUCT_IMAGES: Record<ShoeColor, Record<StrapColor, [string, string]>> = {
  bianco: {
    bianco: ["/scarpa_strappo_bianco.png", "/scarpa_strappo_bianco_2.png"],
    nero: ["/scarpa_bianca_strappo_nero.png", "/scarpa_bianca_strappo_nero_2.png"],
  },
  nero: {
    bianco: ["/scarpa_nera_strappo_bianco.png", "/scarpa_nera_strappo_bianco_2.png"],
    nero: ["/scarpa_strappo_nero.png", "/scarpa_strappo_nero_2.png"],
  },
};
