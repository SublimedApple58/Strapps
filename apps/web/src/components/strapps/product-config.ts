export type ProductVariant = "first" | "early" | "last";

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
