import { NextResponse } from "next/server";
import sql from "@/lib/db";

export const runtime = "nodejs";

export async function GET() {
  try {
    const rows = await sql`SELECT COUNT(*)::int AS count FROM drop_sales`;
    return NextResponse.json({ ok: true, total_sales: rows[0]?.count ?? 0 });
  } catch (err) {
    return NextResponse.json(
      { ok: false, error: err instanceof Error ? err.message : String(err) },
      { status: 500 },
    );
  }
}
