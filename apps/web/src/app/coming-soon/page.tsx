import Image from "next/image";

export default function ComingSoon() {
  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-black text-white px-6">

      {/* Foto scarpa — sfumata verso il basso */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <div className="relative w-[420px] max-w-full opacity-30">
          <Image
            src="/hero_image.png"
            alt="STRAPPS V1"
            width={1487}
            height={1845}
            className="w-full h-auto"
            priority
          />
          {/* gradiente che sfuma sopra e sotto */}
          <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black" />
        </div>
      </div>

      {/* Contenuto */}
      <div className="relative z-10 flex flex-col items-center">
        <p className="font-azeret text-[11px] font-medium tracking-[0.15em] text-[#f00707] uppercase mb-6">
          Stiamo lavorando
        </p>
        <h1 className="font-alumni text-[52px] font-extrabold leading-none tracking-[-0.5px] text-center">
          STRAPPS
        </h1>
        <p className="font-azeret mt-5 text-center text-[13px] font-light leading-relaxed tracking-[-0.2px] text-white/60 max-w-[280px]">
          Il sito è in manutenzione.<br />Torna presto.
        </p>
      </div>
    </main>
  );
}
