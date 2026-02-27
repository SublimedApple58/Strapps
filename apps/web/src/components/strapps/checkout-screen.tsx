import { FrameViewport } from "./frame-viewport";
import { StrappsTopBar } from "./common";

const imgLine22 = "/figma/shop/line-22.svg";
const imgLine23 = "/figma/shop/line-23.svg";
const imgLine24 = "/figma/shop/line-24.svg";

export type CheckoutVariant = "first" | "early" | "last";

type CheckoutConfig = {
  sku: string;
  price: string;
};

const CHECKOUT_CONFIGS: Record<CheckoutVariant, CheckoutConfig> = {
  first: { sku: "111333444", price: "189,99€" },
  early: { sku: "222333444", price: "189,99€" },
  last: { sku: "333333444", price: "189,99€" },
};

type CheckoutScreenProps = {
  variant: CheckoutVariant;
};

const customerFields = [
  { label: "Email*", top: 885, labelTop: 865, type: "email" },
  { label: "Nome*", top: 969, labelTop: 949, type: "text" },
  { label: "Cognome*", top: 1061, labelTop: 1041, type: "text" },
  { label: "N. telefono*", top: 1143, labelTop: 1123, type: "tel" },
] as const;

const deliveryFields = [
  { label: "Paese/Regione*", top: 1294, labelTop: 1273, type: "text" },
  { label: "Indirizzo*", top: 1376, labelTop: 1357, type: "text" },
  { label: "Citta*", top: 1457, labelTop: 1438, type: "text" },
  { label: "Regione*", top: 1538, labelTop: 1519, type: "text" },
  { label: "CAP*", top: 1619, labelTop: 1599, type: "text" },
] as const;

export function CheckoutScreen({ variant }: CheckoutScreenProps) {
  const cfg = CHECKOUT_CONFIGS[variant];
  const frameHeight = 1763;

  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-[#1f2024] px-2 py-6 sm:px-6 sm:py-10">
      <FrameViewport designHeight={frameHeight - 44}>
        <div
          className="relative w-[375px] -translate-y-[44px] overflow-hidden bg-black text-white"
          style={{ height: `${frameHeight}px` }}
        >
          <StrappsTopBar top={64} left={21} />

          <div className="absolute left-[23px] top-[133px] flex items-center gap-2">
            <p className="font-azeret text-[15px] font-black italic tracking-[-0.333px] text-[#f00707]">STRAPPS</p>
            <p className="font-azeret text-[15px] font-extralight tracking-[-0.333px]">CHECKOUT</p>
          </div>

          <p className="font-azeret absolute left-[21px] top-[188px] text-[12px] font-extrabold tracking-[-0.333px]">
            Riepilogo dell&apos;ordine <span className="font-light">(1 articolo)</span>
          </p>
          <p className="font-azeret absolute left-[75px] top-[235px] text-[12px] font-extrabold tracking-[-0.333px]">STRAPPS V1</p>
          <p className="font-azeret absolute left-[304px] top-[233px] text-[15px] tracking-[-0.333px]">{cfg.price}</p>
          <p className="font-azeret absolute left-[75px] top-[271px] text-[12px] font-light tracking-[-0.333px]">SKU: {cfg.sku}</p>

          <p className="font-azeret absolute left-[21px] top-[325px] w-[335px] text-[12px] tracking-[-0.333px]">
            Subtotale <span className="float-right font-bold">{cfg.price}</span>
          </p>
          <p className="font-azeret absolute left-[21px] top-[361px] w-[335px] text-[12px] tracking-[-0.333px]">
            Consegna <span className="float-right text-[#00ff1e]">Gratis</span>
          </p>
          <p className="font-azeret absolute left-[21px] top-[403px] w-[335px] text-[12px] font-black tracking-[-0.333px]">
            Totale <span className="float-right">{cfg.price}</span>
          </p>

          <img src={imgLine22} alt="" aria-hidden className="absolute left-0 top-[470px] h-px w-[375px]" />

          <p className="font-azeret absolute left-1/2 top-[511px] -translate-x-1/2 text-[15px] font-black italic tracking-[-0.333px]">
            Checkout rapido
          </p>

          <button
            type="button"
            className="font-azeret absolute left-[65px] top-[566px] h-[40px] w-[247px] rounded-[20px] bg-[#d9d9d9] text-[15px] font-black italic tracking-[-0.333px] text-black"
          >
            APPLE PAY
          </button>
          <button
            type="button"
            className="font-azeret absolute left-[66px] top-[643px] h-[40px] w-[247px] rounded-[20px] bg-[#d9d9d9] text-[15px] font-black italic tracking-[-0.333px] text-black"
          >
            GOOGLE PAY
          </button>

          <img src={imgLine23} alt="" aria-hidden className="absolute left-[-2px] top-[737px] h-[2px] w-[155px]" />
          <img src={imgLine24} alt="" aria-hidden className="absolute left-[218px] top-[737px] h-[2px] w-[155px]" />
          <p className="font-azeret absolute left-1/2 top-[726px] -translate-x-1/2 text-[15px] font-black italic tracking-[-0.333px]">
            oppure
          </p>

          <p className="font-rounded absolute left-[23px] top-[802px] text-[16px] tracking-[-0.333px]">Dettagli cliente</p>

          {customerFields.map((field) => (
            <div key={field.label}>
              <p
                className="font-azeret absolute left-[42px] text-[12px] font-extralight tracking-[-0.333px]"
                style={{ top: `${field.labelTop}px` }}
              >
                {field.label}
              </p>
              <div
                className="absolute left-[24px] h-[40px] w-[326px] rounded-[20px] border border-[#f00707]"
                style={{ top: `${field.top}px` }}
              >
                <input
                  type={field.type}
                  aria-label={field.label}
                  className="font-azeret h-full w-full bg-transparent px-4 text-[12px] text-white outline-none"
                />
              </div>
            </div>
          ))}

          <p className="font-rounded absolute left-[23px] top-[1231px] text-[16px] tracking-[-0.333px]">Dettagli di consegna</p>

          {deliveryFields.map((field) => (
            <div key={field.label}>
              <p
                className="font-azeret absolute left-[42px] text-[12px] font-extralight tracking-[-0.333px]"
                style={{ top: `${field.labelTop}px` }}
              >
                {field.label}
              </p>
              <div
                className="absolute left-[24px] h-[40px] w-[326px] rounded-[20px] border border-[#f00707]"
                style={{ top: `${field.top}px` }}
              >
                <input
                  type={field.type}
                  aria-label={field.label}
                  className="font-azeret h-full w-full bg-transparent px-4 text-[12px] text-white outline-none"
                />
              </div>
            </div>
          ))}

          <button
            type="button"
            className="font-azeret absolute left-[26px] top-[1700px] h-[40px] w-[326px] rounded-[20px] bg-[#f00707] text-[15px] font-extrabold tracking-[-0.333px]"
          >
            Continua
          </button>

          <div className="absolute bottom-[12px] left-1/2 h-[5px] w-[135px] -translate-x-1/2 rounded-[10px] bg-[#dadada]" />
        </div>
      </FrameViewport>
    </div>
  );
}
