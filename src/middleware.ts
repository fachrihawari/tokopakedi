import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "./lib/utils/jwt";

function captureCurrentUrl(request: NextRequest) {
  const headers = new Headers(request.headers)
  headers.set('x-current-url', request.url)
  return headers
}

async function auth(request: NextRequest) {
  const token = request.cookies.get('token')
  if (!token) {
    throw new Error("Unauthorized")
  }
  const payload = await verifyToken(token.value)

  const headers = new Headers(request.headers)
  headers.set('x-user-id', String(payload.sub))
  return headers
}

export async function middleware(request: NextRequest) {
  try {
    let headers = captureCurrentUrl(request)

    if (request.nextUrl.pathname.startsWith('/api/carts')) {
      headers = await auth(request)
    }

    return NextResponse.next({
      request: {
        headers: headers
      }
    })
  } catch (error) {
    return NextResponse.json({ errors: ["Unauthorized"] }, { status: 401 })
  }
}
