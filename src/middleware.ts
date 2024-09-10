import { NextRequest, NextResponse } from "next/server";


function captureCurrentUrl(request: NextRequest) {
  const headers = new Headers(request.headers)
  headers.set('x-current-url', request.url)
  return headers
}

export function middleware(request: NextRequest) {
  const headers = captureCurrentUrl(request)
  const response = NextResponse.next({
    request: {
      headers: headers
    }
  })
  return response
}
