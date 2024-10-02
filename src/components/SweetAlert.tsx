'use client'

import { swal, SwalOption } from "@/lib/utils/swal"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useEffect } from "react"

function SweetAlert() {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const router = useRouter()
  const message = searchParams.get('message') as string
  const title = searchParams.get('title') as string
  const type = searchParams.get('type') as SwalOption['type']

  useEffect(() => {
    swal({ type, title, message })
    router.replace(pathname)
  }, [message, title, type, router, pathname])

  return null
}

export default SweetAlert
