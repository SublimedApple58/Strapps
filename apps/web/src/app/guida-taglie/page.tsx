import { SiteNavMenu } from "@/components/strapps/site-nav-menu";

// Dati dalla guida Figma — SNDR = EU size
const SIZE_DATA = [
  { eu: 35, usM: "-",   usW: "5 – 5.5",   uk: "4.0", cm: "Up to 23.6", inch: "9.3"  },
  { eu: 36, usM: "-",   usW: "6 – 6.5",   uk: "5.0", cm: "23.7 – 24.3", inch: "9.6"  },
  { eu: 37, usM: "-",   usW: "7 – 7.5",   uk: "5.5", cm: "24.4 – 25.0", inch: "9.8"  },
  { eu: 38, usM: "-",   usW: "8 – 8.5",   uk: "6.5", cm: "25.1 – 25.6", inch: "10.0" },
  { eu: 39, usM: "8.0", usW: "9 – 9.5",   uk: "7.0", cm: "25.7 – 26.3", inch: "10.4" },
  { eu: 40, usM: "9.0", usW: "10 – 10.5", uk: "8.0", cm: "26.4 – 27.0", inch: "10.6" },
  { eu: 41, usM: "10.0",usW: "-",         uk: "9.0", cm: "27.1 – 27.7", inch: "10.9" },
  { eu: 42, usM: "10.5",usW: "-",         uk: "9.5", cm: "27.8 – 28.3", inch: "11.2" },
  { eu: 43, usM: "11.5",usW: "-",         uk: "10.5",cm: "28.4 – 29.0", inch: "11.4" },
  { eu: 44, usM: "12.0",usW: "-",         uk: "11.0",cm: "29.1 – 29.7", inch: "11.7" },
  { eu: 45, usM: "13.0",usW: "-",         uk: "12.0",cm: "29.8 – 30.3", inch: "11.9" },
  { eu: 46, usM: "14.0",usW: "-",         uk: "13.0",cm: "30.4 – 31.0", inch: "12.2" },
  { eu: 47, usM: "15.0",usW: "-",         uk: "14.0",cm: "31.0 – 31.6", inch: "12.5" },
];

// Taglie disponibili sul prodotto
const AVAILABLE_EU = new Set([38, 39, 40, 41, 42, 43, 44]);

const COLS = [
  { key: "eu",   label: "EU"   },
  { key: "usM",  label: "US M" },
  { key: "usW",  label: "US W" },
  { key: "uk",   label: "UK"   },
  { key: "cm",   label: "CM"   },
  { key: "inch", label: "INCH" },
] as const;

export default function GuidaTagliePage() {
  return (
    <main className="min-h-screen bg-black pb-20 text-white">
      <div className="mx-auto w-full max-w-[390px] px-[20px] pt-8">

        <SiteNavMenu />

        {/* Header */}
        <p className="font-azeret mt-[37px] text-[15px] tracking-[-0.333px]">
          <span className="font-black italic text-[#f00707]">STRAPPS </span>
          <span className="font-light">GUIDA ALLE TAGLIE</span>
        </p>

        <p className="font-azeret mt-[16px] text-[11px] font-light leading-[1.4] tracking-[-0.333px] text-white/60">
          Le taglie disponibili per STRAPPS V1 sono indicate in EU (38–44).
          Usa la tabella per trovare la tua conversione.
        </p>

        {/* Legenda disponibilità */}
        <div className="mt-[20px] flex items-center gap-[10px]">
          <div className="h-[10px] w-[10px] rounded-full bg-[#f00707]" />
          <p className="font-azeret text-[10px] font-light tracking-[-0.333px] text-white/60">
            = taglia disponibile su STRAPPS V1
          </p>
        </div>

        {/* Tabella — scrollabile orizzontalmente */}
        <div className="mt-[28px] w-full overflow-x-auto">
          <table className="w-full min-w-[340px] border-collapse">
            <thead>
              <tr>
                {COLS.map((col) => (
                  <th
                    key={col.key}
                    className="font-azeret border border-[#f00707] px-[6px] py-[10px] text-center text-[10px] font-medium tracking-[-0.333px] text-white"
                  >
                    {col.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {SIZE_DATA.map((row) => {
                const available = AVAILABLE_EU.has(row.eu);
                return (
                  <tr
                    key={row.eu}
                    className={available ? "bg-[#f00707]/10" : ""}
                  >
                    {COLS.map((col) => (
                      <td
                        key={col.key}
                        className={`font-azeret border border-[#f00707]/40 px-[6px] py-[10px] text-center text-[11px] font-light tracking-[-0.333px] ${
                          col.key === "eu"
                            ? available
                              ? "font-medium text-[#f00707]"
                              : "text-white/50"
                            : available
                            ? "text-white"
                            : "text-white/40"
                        }`}
                      >
                        {row[col.key]}
                      </td>
                    ))}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Nota misura piede */}
        <div className="mt-[32px] rounded-[16px] bg-[#111111] px-[16px] py-[14px]">
          <p className="font-azeret text-[11px] font-medium tracking-[-0.333px] text-white">
            Come misurare il piede
          </p>
          <p className="font-azeret mt-[8px] text-[10px] font-light leading-[1.5] tracking-[-0.333px] text-white/60">
            Metti il piede su un foglio, traccia la lunghezza dal tallone alla punta
            e misura in cm. Se sei tra due taglie, scegli la più grande.
          </p>
        </div>

      </div>
    </main>
  );
}
