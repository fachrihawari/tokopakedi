'use client'

import { useMidtrans } from "@/lib/hooks/useMidtrans"
import { setQueryParams } from "@/lib/utils/url"
import { useEffect } from "react"
import { useRouter } from "next/navigation"
type PaymentPageProps = {
  params: {
    token: string
  }
}

export default function PaymentPage({ params }: PaymentPageProps) {
  const { token } = params
  const router = useRouter()
  const { isReady, pay } = useMidtrans({
    onPending: () => {
      console.log("pending")
    },
    onError: () => {
      console.log("error")
      router.back()
    },
    onSuccess: () => {
      console.log("success")
      const successQuery = setQueryParams({ type: 'success', title: "Payment successful", message: "Thank you for your payment" });
      router.push('/orders?' + successQuery)
    },
    onClose: () => {
      console.log("close")
      const infoQuery = setQueryParams({ type: 'info', title: "Pending payment", message: "Please pay your order" });
      router.push('/orders?' + infoQuery)
    }
  })

  useEffect(() => {
    if (isReady) {
      pay(token)
    }
  }, [isReady, pay, token])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      {!isReady && (
        <div className="bg-white p-8 rounded-lg shadow-md text-center">
          <h1 className="text-2xl font-bold mb-4">Preparing Payment</h1>
          <p className="mb-4">Please wait for the payment window to appear...</p>
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
        </div>
      )}
    </div >
  )
}
