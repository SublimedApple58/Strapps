import Image from "next/image";
import Link from "next/link";

const HERO_MENU_ICON = "/figma/home-v2/menu.svg";

const navItems = [
  { href: "/", label: "home page" },
  { href: "/privacy-policy", label: "privacy policy" },
  { href: "/termini-e-condizioni", label: "termini e condizioni" },
  { href: "/resi-rimborsi-e-taglie", label: "resi rimborsi e taglie" },
  { href: "/cookie-policy", label: "cookie policy" },
];

export function SiteNavMenu() {
  return (
    <details className="hero-menu group relative z-[500]">
      <summary
        className="relative flex h-[42px] cursor-pointer list-none items-center rounded-[10px] bg-[#f00707] px-4 [&::-webkit-details-marker]:hidden"
        aria-label="Apri menu"
      >
        <p className="font-rounded text-[13px] tracking-[-0.333px] text-white">STRAPPS</p>
        <Image
          src={HERO_MENU_ICON}
          alt=""
          width={24}
          height={6}
          aria-hidden
          className="absolute left-1/2 top-1/2 h-[6px] w-[24px] -translate-x-1/2 -translate-y-1/2"
        />
      </summary>

      <nav className="hero-menu-panel font-azeret absolute left-0 right-0 top-[46px] z-[600] rounded-[10px] border border-[#f00707] bg-[#f00707] p-2 text-[12px] tracking-[-0.333px] text-white shadow-[0_12px_28px_rgba(0,0,0,0.45)]">
        {navItems.map((item) => (
          <Link key={item.href} href={item.href} className="block rounded-[8px] px-3 py-2 hover:bg-black/15">
            {item.label}
          </Link>
        ))}
      </nav>
    </details>
  );
}
