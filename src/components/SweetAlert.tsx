'use client'

import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useEffect } from "react"
import Swal from "sweetalert2"

function SweetAlert() {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const router = useRouter()
  const message = searchParams.get('message')
  const title = searchParams.get('title')
  const type = searchParams.get('type') as 'success' | 'error' | null

  useEffect(() => {
    if (message && type) {
      const isError = type === 'error'
      const messageArray = message.split(',')

      const titleHtml = isError && messageArray.length > 1
        ? `<p class="mb-2 text-gray-700">Please correct the following ${message.includes(',') ? 'errors' : 'error'}:</p>` : ''
      const messageHtml = messageArray.length > 1 ?
        `<ul class="list-disc list-inside space-y-1">
          ${messageArray.map((msg) => `<li>${msg.trim()}</li>`).join('')}
        </ul>` : `<p class="text-center">${messageArray[0]}</p>`

      Swal.fire({
        icon: isError ? 'error' : 'success',
        title: title || (isError ? 'Error' : 'Success'),
        html: `
          <div class="text-left">
            ${titleHtml}
            ${messageHtml}
          </div >
        `,
        customClass: {
          popup: 'rounded-lg shadow-xl border border-gray-200',
          title: `text-2xl font-bold mb-4`,
          htmlContainer: 'text-base',
          confirmButton: `${isError ? 'bg-red-500 hover:bg-red-600' : 'bg-green-500 hover:bg-green-600'} text-white font-semibold py-2 px-4 rounded`
        },
        buttonsStyling: false,
        showConfirmButton: true,
        confirmButtonText: isError ? 'Try Again' : 'OK',
        showCloseButton: false,
        timer: 8000,
        timerProgressBar: true
      })

      router.replace(pathname)
    }
  }, [message, title, type, router, pathname])

  return null
}

export default SweetAlert
