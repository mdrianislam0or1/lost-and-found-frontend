import { jwtDecode } from "jwt-decode";
import { cookies } from "next/headers";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { authKey } from "./constants/authKey";

const AuthRoutes = ["/login", "/register"];
const protectedRoutes = [
  "/dashboard",
  "/dashboard/:page*",
  "/claimItem",
  "/profile",
  "/search",
  "/submitLostItem",
  "/submitFoundItem",
  "/foundItem",
  "/changePassword",
];
const roleBasedPrivateRoutes = {
  admin: [/^\/dashboard\/admin/],
  user: [/^\/dashboard\/user/],
};

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  console.log(" pathname:", pathname);

  console.log("protected route", protectedRoutes.includes(pathname));

  const accessToken = cookies().get(authKey)?.value;
  console.log(accessToken);
  if (!accessToken) {
    if (AuthRoutes.includes(pathname)) {
      return NextResponse.next();
    } else {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  if (!accessToken) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (accessToken && protectedRoutes.includes(pathname)) {
    return NextResponse.next();
  }
  let decodedData = null;

  if (accessToken) {
    decodedData = jwtDecode(accessToken) as any;
  }

  const role = decodedData?.role;

  if (role === "admin" && pathname.startsWith("/dashboard/admin")) {
    return NextResponse.next();
  }

  if (role === "user" && pathname.startsWith("/dashboard/user")) {
    return NextResponse.next();
  }

  return NextResponse.redirect(new URL("/", request.url));
}

export const config = {
  matcher: [
    "/login",
    "/register",
    "/dashboard",
    "/dashboard/:page*",
    "/claimItem",
    "/profile",
    "/search",
    "/submitLostItem",
    "/submitFoundItem",
    "/foundItem",
    "/changePassword",
  ],
};
