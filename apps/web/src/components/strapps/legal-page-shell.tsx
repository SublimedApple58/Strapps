import { type ReactNode } from "react";
import { SiteNavMenu } from "@/components/strapps/site-nav-menu";

type LegalPageShellProps = {
  title: string;
  children: ReactNode;
};

export function LegalPageShell({ title, children }: LegalPageShellProps) {
  return (
    <main className="min-h-screen overflow-x-hidden bg-black text-white">
      <div className="mx-auto w-full max-w-6xl px-4 pb-16 pt-8 sm:px-6 lg:px-8 lg:pt-12">
        <section className="mx-auto w-full max-w-[760px]">
          <SiteNavMenu />

          <h1 className="font-impact mt-10 text-[20px] font-normal tracking-[-0.333px] text-[#f00707]">{title}</h1>

          <article className="font-azeret mt-8 space-y-7 text-[12px] font-normal leading-[1.4] tracking-[-0.333px]">
            {children}
          </article>
        </section>
      </div>
    </main>
  );
}
