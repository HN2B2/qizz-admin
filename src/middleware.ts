import { NextRequest, NextResponse } from "next/server"
import { verifyAuth } from "./lib/auth"
import { UserResponse } from "./types/user"
import { UserRole } from "./types/users/UserRole"

export const config = {
    // runtime: "experimental-edge",
    matcher: [
        "/",
        "/auth/:path*",
        "/404",
        "/user/:path*",
        "/category/:path*",
        "/notification/:path*",
    ],
}

export const publicRoutes: string[] = [
    "/404",
    "/auth/forgot-password",
    "/auth/reset-password",
]
export const authRoutes = [
    "/auth/login",
    "/auth/register",
    "/auth/forgot-password",
    "/auth/reset-password",
]
export const protectedRoutes = [
    {
        path: "/",
        roles: [UserRole.ADMIN, UserRole.STAFF],
    },
    {
        path: "/user",
        roles: [UserRole.ADMIN, UserRole.STAFF],
    },
    {
        path: "/category",
        roles: [UserRole.ADMIN, UserRole.STAFF],
    },
    {
        path: "/notification",
        roles: [UserRole.ADMIN, UserRole.STAFF],
    },
]

export const middleware = async (req: NextRequest, res: NextResponse) => {
    const token = req.cookies.get("token")?.value
    const userData = req.cookies.get("user")?.value
    const decodedUserData: UserResponse =
        userData && JSON.parse(decodeURIComponent(userData.replace(/\+/g, " ")))

    const verifiedToken =
        token &&
        (await verifyAuth(token).catch((error) => {
            console.error(error)
        }))
    if (req.nextUrl.pathname === "/auth/profile") {
        if (!userData) {
            return null
        }
        if (verifiedToken) {
            return NextResponse.json({
                user: decodedUserData,
                token,
            })
        }
    }

    const protectedRoute = protectedRoutes.find((route) =>
        req.nextUrl.pathname.startsWith(route.path)
    )
    const isProtectedRoute = !!protectedRoute

    const isAuthRoute = authRoutes.includes(req.nextUrl.pathname)

    const isPublicRoute =
        publicRoutes.some((route) => req.nextUrl.pathname.startsWith(route)) &&
        !isAuthRoute &&
        !isProtectedRoute

    if (isPublicRoute) {
        return NextResponse.next()
    }

    if (isAuthRoute && !verifiedToken) {
        return NextResponse.next()
    } else if (isAuthRoute && verifiedToken) {
        return NextResponse.redirect(new URL("/", req.url))
    }

    if (!token) {
        return NextResponse.redirect(
            new URL(` /auth/login?r=${req.nextUrl.pathname}`, req.url)
        )
    }

    if (isProtectedRoute) {
        if (protectedRoute.roles.includes(decodedUserData.role)) {
            return NextResponse.next()
        } else {
            return NextResponse.redirect(
                new URL(`/auth/logout?r=${req.nextUrl.pathname}`, req.url)
            )
        }
    }

    if (verifiedToken) {
        return NextResponse.next()
    }

    return NextResponse.redirect(
        new URL(`/auth/login?r=${req.nextUrl.pathname}`, req.url)
    )
}
