import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "./lib/utils/jwt";
import { cookies } from "next/headers";

function captureCurrentUrl(request: NextRequest) {
  const headers = new Headers(request.headers)
  headers.set('x-current-url', request.url)
  return headers
}

async function auth(headers: Headers) {
  const token = cookies().get('token')
  if (!token) {
    throw new Error("Unauthorized")
  }
  const payload = await verifyToken(token.value)

  const newHeaders = new Headers(headers)
  newHeaders.set('x-user-id', String(payload.sub))
  return newHeaders
}

export async function middleware(request: NextRequest) {
  try {
    let headers = captureCurrentUrl(request)

    if (request.nextUrl.pathname.startsWith('/api/cart')) {
      headers = await auth(headers)
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
