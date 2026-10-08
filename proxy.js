import { NextResponse } from "next/server";

export function proxy(request) {
  const isMaintenance = process.env.MAINTENANCE_MODE === "true";
  const isMaintenancePage = request.nextUrl.pathname === "/maintenance";

  if (isMaintenance && !isMaintenancePage) {
    return NextResponse.redirect(
      new URL("/maintenance", request.url)
    );
  }

  if (!isMaintenance && isMaintenancePage) {
    return NextResponse.redirect(
      new URL("/", request.url)
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
}