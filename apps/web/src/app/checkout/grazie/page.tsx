import { SiteNavMenu } from "@/components/strapps/site-nav-menu";
import { SiteFooter } from "@/components/strapps/site-footer";

export default function GraziePage() {
  return (
    <div className="flex min-h-screen flex-col bg-black text-white">
      <div className="mx-auto w-full max-w-[390px] flex-1 px-[42px] pb-20 pt-8">
        <SiteNavMenu />

        <div className="mt-[80px] flex flex-col">
          <p className="font-azeret text-[12px] font-normal tracking-[-0.333px] text-[#00ff1e]">
            Non ti è stato addebitato alcun importo
          </p>

          <p className="font-azeret mt-[28px] text-[11px] font-normal leading-relaxed tracking-[-0.333px] text-white">
            Le scarpe sono ancora in fase di sviluppo, in questo periodo ci interessava solo scoprire chi fossero i nostri primi fan.
          </p>

          <p className="font-azeret mt-[28px] text-[11px] font-normal leading-relaxed tracking-[-0.333px] text-white">
            Quando le scarpe saranno pronte, potrai avere accesso ai carrelli prima di tutti.
          </p>

          <div className="font-azeret mt-[28px] text-[11px] font-normal leading-relaxed tracking-[-0.333px] text-white">
            <p>future has no lace. A presto.</p>
            <p>STRAPPS</p>
          </div>
        </div>
      </div>

      <SiteFooter />
    </div>
  );
}
