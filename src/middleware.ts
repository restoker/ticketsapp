import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(request: NextRequest) {
    // 1. Get user's role (e.g., from a cookie, session, or JWT)
    const session = await getToken({ req: request, secret: process.env.AUTH_SECRET });
    console.log(session);
    // console.log(session?.role);
    // 2. Define protected routes and required roles
    const protectedRoutes = {
        '/dashboard/task': ['user'],
        '/dashboard/users': ['admin'],
        '/dashboard/agent': ['agent'],
        '/dashboard/task/:path*': ['user', 'agent'],
    };

    // 3. Check if the current path is a protected route
    const path = request.nextUrl.pathname;
    if (session?.role) {
        if (Object.keys(protectedRoutes).includes(path)) {
            const requiredRoles = protectedRoutes[path];

            // 4. If user's role is not in the required roles, redirect or deny access
            if (!session.role || !requiredRoles.includes(session.role)) {
                return NextResponse.redirect(new URL('/unauthorized', request.url));
            }
        }
    }
    // if (Object.keys(protectedRoutes).includes(path)) {
    //     const requiredRoles = protectedRoutes[path];

    //     // 4. If user's role is not in the required roles, redirect or deny access
    //     if (!userRole || !requiredRoles.includes(userRole)) {
    //         return NextResponse.redirect(new URL('/unauthorized', request.url));
    //     }
    // }

    return NextResponse.next();
}

// 5. Optionally, define a matcher to specify which paths the middleware should run on
export const config = {
    matcher: [
        '/dashboard/task/:path*', // Protect all paths under /dashboard/task
        '/dashboard/users/:path*', // Protect all paths under /dashboard/users
    ],
};