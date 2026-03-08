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
// [hero, right, left, back]
export const PRODUCT_PAGE_IMAGES: Record<ShoeColor, Record<StrapColor, string[]>> = {
  bianco: {
    bianco: [
      F("9ab2f21e-4183-4c68-b4c8-979cf4803ca2"), // hero
      F("ddab77c2-dbae-407d-ab71-c04fb5008576"), // right
      F("8e79e159-7384-4954-a5dc-d4d4d4ce3f2f"), // left
      F("1ce72d47-fdc9-4fba-ad6a-879368a088c2"), // front
      F("cb4488ff-ab6d-4504-96db-406f3eaad06c"), // back
    ],
    nero: [
      F("74472e32-f1d0-46b5-bb44-fb8d546c9b6e"), // hero
      F("499525a8-ac77-43dd-b4a4-27f799b1583f"), // right
      F("8d7b9cf6-5b67-4ee9-ae00-b033910387b8"), // left
      F("afbd2eda-ddcd-4d77-9482-0cd466b2dc47"), // front
      F("6756ce89-db34-4e5b-be23-1e3618e13d0a"), // back
    ],
  },
  nero: {
    bianco: [
      F("801c5b39-0553-421d-97df-de63cdf60762"), // hero
      F("0dcb4875-bc15-40e9-aedd-aef4f5628bbf"), // right
      F("d3205a2a-e54f-42fa-893e-e18baa4187a5"), // left
      F("755dbe2a-e6d4-4653-a325-3ec934b9f568"), // back
    ],
    nero: [
      F("b0897a52-a2e2-485c-b182-7e7b0b9f53b4"), // hero
      F("3eb2c2de-eaf4-40b0-8db8-668fa523e531"), // right
      F("a7152f87-2db7-4cea-b4fb-d4b1c061b8a7"), // left
      F("4a6272ea-de3e-4028-ae4f-f014c1457875"), // front
      F("6a169faa-3a89-402d-8031-3064d5fa087d"), // back
    ],
  },
};
