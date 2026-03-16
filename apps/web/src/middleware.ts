import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const COMING_SOON_PATH = "/coming-soon";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Lascia passare la pagina coming soon e le risorse statiche
  if (
    pathname === COMING_SOON_PATH ||
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.match(/\.(ico|png|jpg|jpeg|svg|webp|gif|woff|woff2|ttf)$/)
  ) {
    return NextResponse.next();
  }

  return NextResponse.redirect(new URL(COMING_SOON_PATH, request.url));
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
