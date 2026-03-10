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

// ─── Foto HOME (sfondo bianco, studio) ─────────────────────────────────────
// [right, left, front, back]
export const PRODUCT_IMAGES: Record<ShoeColor, Record<StrapColor, [string, string, string, string]>> = {
  bianco: {
    bianco: [
      "/home/bianco_bianco_right.jpg",
      "/home/bianco_bianco_left.jpg",
      "/home/bianco_bianco_front.jpg",
      "/home/bianco_bianco_back.jpg",
    ],
    nero: [
      "/home/bianco_nero_right.jpg",
      "/home/bianco_nero_left.jpg",
      "/home/bianco_nero_front.jpg",
      "/home/bianco_nero_back.jpg",
    ],
  },
  nero: {
    bianco: [
      "/home/nero_bianco_right.jpg",
      "/home/nero_bianco_left.jpg",
      "/home/nero_bianco_front.jpg",
      "/home/nero_bianco_back.jpg",
    ],
    nero: [
      "/home/nero_nero_right.jpg",
      "/home/nero_nero_left.jpg",
      "/home/nero_nero_front.jpg",
      "/home/nero_nero_back.jpg",
    ],
  },
};

// ─── Foto PRODUCT PAGE (sfondo scuro, foto editorial) ──────────────────────
// [first, right, left, front]
export const PRODUCT_PAGE_IMAGES: Record<ShoeColor, Record<StrapColor, string[]>> = {
  bianco: {
    bianco: [
      "/product/bianco_bianco_first.jpg",
      "/product/bianco_bianco_right.jpg",
      "/product/bianco_bianco_left.jpg",
      "/product/bianco_bianco_front.jpg",
    ],
    nero: [
      "/product/bianco_nero_first.jpg",
      "/product/bianco_nero_right.jpg",
      "/product/bianco_nero_left.jpg",
      "/product/bianco_nero_front.jpg",
    ],
  },
  nero: {
    bianco: [
      "/product/nero_bianco_first.jpg",
      "/product/nero_bianco_right.jpg",
      "/product/nero_bianco_left.jpg",
      "/product/nero_bianco_front.jpg",
    ],
    nero: [
      "/product/nero_nero_first.jpg",
      "/product/nero_nero_right.jpg",
      "/product/nero_nero_left.jpg",
      "/product/nero_nero_front.jpg",
    ],
  },
};
