import { NextRequest, NextResponse } from "next/server";

const STUDIO_HOST = "studio.binhakim.dev";
const PORTFOLIO_HOSTS = new Set(["www.binhakim.dev", "binhakim.dev"]);
const STUDIO_PRODUCTS = new Set(["marginsync", "videx", "cerebro", "commit", "orbit"]);

export function proxy(request: NextRequest) {
  const host = request.headers.get("host")?.split(":")[0];

  if (host && PORTFOLIO_HOSTS.has(host) && (request.nextUrl.pathname === "/studio" || request.nextUrl.pathname.startsWith("/studio/"))) {
    const url = request.nextUrl.clone();
    url.protocol = "https:";
    url.host = STUDIO_HOST;
    url.pathname = request.nextUrl.pathname === "/studio" ? "/" : request.nextUrl.pathname.replace(/^\/studio/, "");
    return NextResponse.redirect(url, 308);
  }

  if (host !== STUDIO_HOST) return NextResponse.next();

  const { pathname } = request.nextUrl;
  if (pathname.startsWith("/studio") || pathname.startsWith("/_next")) return NextResponse.next();

  if (pathname === "/" || pathname === "/opengraph-image") {
    const url = request.nextUrl.clone();
    url.pathname = `/studio${pathname === "/" ? "" : pathname}`;
    return NextResponse.rewrite(url);
  }

  const [segment] = pathname.split("/").filter(Boolean);
  if (segment === "hakim") {
    const url = request.nextUrl.clone();
    url.pathname = "/studio/marginsync";
    return NextResponse.rewrite(url);
  }

  if (segment && STUDIO_PRODUCTS.has(segment)) {
    const url = request.nextUrl.clone();
    url.pathname = `/studio${pathname}`;
    return NextResponse.rewrite(url);
  }

  return NextResponse.next();
}

export const config = { matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"] };
