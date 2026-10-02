import { NextResponse } from "next/server";

export function middleware(request) {
  const isMaintenance =
    process.env.MAINTENANCE_MODE === "false";

  const isMaintenancePage =
    request.nextUrl.pathname === "/maintenance";

  if (isMaintenance && !isMaintenancePage) {
    return NextResponse.redirect(
      new URL("/maintenance", request.url)
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next|favicon.ico).*)"],
};