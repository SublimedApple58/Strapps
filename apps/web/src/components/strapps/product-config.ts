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
      F("456bd3ca-7d56-4665-8b09-45e9596b15aa"), // right
      F("2f4908ed-79e6-4bbb-aee4-7c3fddea67f7"), // left
      F("e9e3181e-3139-496c-abe9-ad21e675b2b3"), // front
      F("f916a114-3604-478c-96e3-740d5cdfd3fc"), // back
    ],
    nero: [
      F("47ccb31c-7e7c-4fab-8558-96856c94d08e"), // right
      F("6b53f22d-a3c4-4cff-885a-772989816f93"), // left
      F("2583edb8-d088-4f6c-8fb8-a98417d95e86"), // front
      F("4064a126-0778-4f78-93c8-4448754fe25c"), // back
    ],
  },
  nero: {
    bianco: [
      F("811e9bd6-cae5-44a0-8f06-4dc16601abdf"), // right
      F("6e9803be-4cfc-4ad1-b5e2-00034eb85e48"), // left
      F("af468051-6242-4d4c-a566-1c93a609266c"), // front
      F("98f0a818-021d-43ea-9535-8c14b24ae0f7"), // back
    ],
    nero: [
      F("da35c585-ba37-47e5-9ebe-acadc6c962c2"), // right
      F("a5594520-c8ec-472d-85a5-dced557c5778"), // left
      F("1dcdb8cd-b4cd-497c-83f4-3cad3dd20be1"), // front
      F("bb81e721-2697-46c1-8cc0-7eb7508f7266"), // back
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
