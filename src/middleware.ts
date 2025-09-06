import { NextRequest, NextResponse } from 'next/server'
import { decrypt } from '@/app/lib/session'
import { cookies } from 'next/headers'

// 1. Specify protected and public routes
const protectedRoutes = ['/', '/history', '/templates']
const publicRoutes = ['/login', '/signup']

export default async function middleware(req: NextRequest) {

    const path = req.nextUrl.pathname
    const isProtectedRoute = protectedRoutes.includes(path)
    const isPublicRoute = publicRoutes.includes(path)

    const cookie = (await cookies()).get('session')?.value

    const session = await decrypt(cookie)
    console.log(session)

    if (isProtectedRoute && !session?.userId) {
        return NextResponse.redirect(new URL('/login', req.nextUrl))
    }
    console.log(isPublicRoute, session?.userId, !req.nextUrl.pathname.startsWith('/'))

    if (
        isPublicRoute &&
        session?.userId
    ) {
        return NextResponse.redirect(new URL('/', req.nextUrl))
    }
    const requestHeaders = new Headers(req.headers);
    requestHeaders.set('x-url', req.url);

    return NextResponse.next({
        request: {
            // Apply new request headers
            headers: requestHeaders,
        }
    })

}

// Routes Middleware should not run on
export const config = {
    matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
}