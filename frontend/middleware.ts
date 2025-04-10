import { MiddlewareConfig, NextRequest, NextResponse } from "next/server";

interface publicRoute {
  path: string;
  whenAuthenticated: "next" | "redirect";
}

const publicRoutes: publicRoute[] = [
  { path: "/", whenAuthenticated: "next" },
  { path: "/login", whenAuthenticated: "redirect" },
  { path: "/signup", whenAuthenticated: "redirect" },
];

const REDIRECT_WHEN_NOT_AUTHENTICATED_ROUTE = "/login";

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const publicRoute = publicRoutes.find((route) => route.path === path);
  const authToken = request.cookies.get("JSESSIONID");

  if (!authToken && publicRoute) {
    return NextResponse.next();
  }

  if (!authToken && !publicRoute) {
    const redirectURL = request.nextUrl.clone();
    redirectURL.pathname = REDIRECT_WHEN_NOT_AUTHENTICATED_ROUTE;

    return NextResponse.redirect(redirectURL);
  }

  if (
    authToken &&
    publicRoute &&
    publicRoute.whenAuthenticated === "redirect"
  ) {
    const redirectURL = request.nextUrl.clone();

    redirectURL.pathname = "/dashboard";

    return NextResponse.redirect(redirectURL);
  }

  if (authToken && !publicRoute) {
    // Check if token is expired

    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config: MiddlewareConfig = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt (metadata files)
     */
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};
