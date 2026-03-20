import { NextRequest, NextResponse } from "next/server";
import sql from "@/lib/db";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json() as {
      email?: string;
      nome?: string;
      cognome?: string;
      telefono?: string;
      indirizzo?: string;
      citta?: string;
      regione?: string;
      cap?: string;
      paese?: string;
      tier?: string;
      scarpa?: string;
      strappo?: string;
      taglia?: string;
    };

    const { email, nome, cognome, telefono, indirizzo, citta, regione, cap, paese, tier, scarpa, strappo, taglia } = body;

    if (!email || !nome || !cognome) {
      return NextResponse.json({ error: "Dati mancanti" }, { status: 400 });
    }

    await sql`
      CREATE TABLE IF NOT EXISTS waitlist (
        id SERIAL PRIMARY KEY,
        email TEXT NOT NULL,
        nome TEXT,
        cognome TEXT,
        telefono TEXT,
        indirizzo TEXT,
        citta TEXT,
        regione TEXT,
        cap TEXT,
        paese TEXT,
        tier TEXT,
        scarpa TEXT,
        strappo TEXT,
        taglia TEXT,
        created_at TIMESTAMPTZ DEFAULT NOW()
      )
    `;

    await sql`
      INSERT INTO waitlist (email, nome, cognome, telefono, indirizzo, citta, regione, cap, paese, tier, scarpa, strappo, taglia)
      VALUES (${email}, ${nome ?? null}, ${cognome ?? null}, ${telefono ?? null}, ${indirizzo ?? null}, ${citta ?? null}, ${regione ?? null}, ${cap ?? null}, ${paese ?? null}, ${tier ?? null}, ${scarpa ?? null}, ${strappo ?? null}, ${taglia ?? null})
    `;

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[fake-checkout]", err);
    return NextResponse.json({ error: "Errore interno" }, { status: 500 });
  }
}
