import sql from "@/lib/db";

export type SaleType = "accesso" | "acquisto" | "estendi";
export type SaleTier = "first" | "early" | "last";

export async function initSalesTable(): Promise<void> {
  await sql`
    CREATE TABLE IF NOT EXISTS drop_sales (
      id SERIAL PRIMARY KEY,
      type TEXT NOT NULL,
      tier TEXT NOT NULL,
      created_at TIMESTAMPTZ DEFAULT NOW()
    )
  `;
}

export async function recordSale(type: SaleType, tier: SaleTier): Promise<void> {
  await sql`INSERT INTO drop_sales (type, tier) VALUES (${type}, ${tier})`;
}

export async function getSaleCount(type: SaleType, tier: SaleTier): Promise<number> {
  const rows = await sql`
    SELECT COUNT(*)::int AS count FROM drop_sales
    WHERE type = ${type} AND tier = ${tier}
  `;
  return rows[0]?.count ?? 0;
}

export async function getAllSaleCounts(): Promise<Record<string, Record<string, number>>> {
  const rows = await sql`
    SELECT type, tier, COUNT(*)::int AS count
    FROM drop_sales
    GROUP BY type, tier
  `;
  const result: Record<string, Record<string, number>> = {};
  for (const row of rows) {
    if (!result[row.type]) result[row.type] = {};
    result[row.type][row.tier] = row.count;
  }
  return result;
}
