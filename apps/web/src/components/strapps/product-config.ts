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

const F = (id: string) => `https://www.figma.com/api/mcp/asset/${id}`;

// ─── Foto HOME (sfondo bianco, studio) ─────────────────────────────────────
// [right, left, front, back]
export const PRODUCT_IMAGES: Record<ShoeColor, Record<StrapColor, [string, string, string, string]>> = {
  bianco: {
    bianco: [
      F("02ae812a-517f-44a5-af2c-d96a288dd9c8"), // right
      F("a1a3568b-a734-4e64-9f2d-93dfc7b8ddc0"), // left
      F("012610d4-3e29-441f-8c2d-7b1dc217c27f"), // front
      F("abb7b0aa-d69b-4448-af28-5935cc78bb8f"), // back
    ],
    nero: [
      F("e14d943b-9d51-4bfc-b436-7e07308da0d2"), // right
      F("a4e51ba0-047c-4409-bf14-d5b5d1b7c743"), // left
      F("281e78d3-09f2-41c8-bb2a-1da6a39cc080"), // front
      F("b6bc4f80-9f63-446f-b435-e514472821e1"), // back
    ],
  },
  nero: {
    bianco: [
      F("c310b611-86a6-4b47-a5d9-40a461cfcc00"), // right
      F("f259cbb4-37b6-428f-9f5e-9e9a4e3a655e"), // left
      F("1a4af4dd-02d7-4558-a12b-064a421d1bd2"), // front
      F("52d35bf1-b0ca-40e4-a54e-fa632f3c84b6"), // back
    ],
    nero: [
      F("f81abb4f-1dc1-4f50-a5b5-93c7d2e33dc5"), // right
      F("40667c0b-de86-4267-9aa5-6ad1b2937718"), // left
      F("d107d434-81d4-4cb1-9b6d-6970f5f725eb"), // front
      F("6460948f-ac1c-42fc-be6a-85a55689676f"), // back
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
