"use client";

export function ScrollCta({ targetId }: { targetId: string }) {
  function handleClick(e: React.MouseEvent<HTMLAnchorElement>) {
    e.preventDefault();
    document.getElementById(targetId)?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <a
      href={`#${targetId}`}
      onClick={handleClick}
      className="font-alumni mx-auto mt-[13px] flex h-[42px] w-[170px] items-center justify-center gap-[8px] rounded-[40px] bg-[#f00707] text-[20px] font-black leading-none tracking-[-0.333px] text-white"
    >
      SCOPRI IL DROP
      <span className="flex h-[32px] w-[32px] items-center justify-center rounded-full bg-black/30">
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
          <path d="M7 2v10M3 8l4 4 4-4" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
    </a>
  );
}
