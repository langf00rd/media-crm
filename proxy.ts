import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

const publicPaths = ["/auth/sign-in", "/auth/sign-up", "/auth/business", "/book", "/"];
const protectedRoutes = ["/activity", "/dashboard", "/packages", "/contracts", "/settings"];

function isPublicPath(pathname: string) {
  if (publicPaths.some((p) => pathname === p || pathname.startsWith(p + "/"))) {
    return true;
  }
  const segments = pathname.split("/").filter(Boolean);
  if (segments.length === 1 && !protectedRoutes.includes("/" + segments[0])) {
    return true;
  }
  return false;
}

export async function proxy(request: NextRequest) {
  let { pathname } = request.nextUrl;
  const url = request.nextUrl.clone();

  // Subdomain rewrite: <slug>.site.com -> site.com/<slug>
  const hostname = request.headers.get("host") || "";
  const subdomain = hostname.split(".")[0];
  if (
    subdomain &&
    subdomain !== "www" &&
    subdomain !== "localhost" &&
    !hostname.startsWith("localhost") &&
    !hostname.startsWith("127.0.0.1") &&
    !hostname.startsWith("0.0.0.0")
  ) {
    url.pathname = `/${subdomain}${pathname === "/" ? "" : pathname}`;
    pathname = url.pathname;
    if (isPublicPath(pathname)) {
      return NextResponse.rewrite(url);
    }
    return NextResponse.rewrite(url);
  }

  if (isPublicPath(pathname)) {
    return NextResponse.next();
  }

  let supabaseResponse = NextResponse.next({ request });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value),
          );
          supabaseResponse = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options),
          );
        },
      },
    },
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    const url = request.nextUrl.clone();
    url.pathname = "/auth/sign-in";
    return NextResponse.redirect(url);
  }

  return supabaseResponse;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)"],
};
