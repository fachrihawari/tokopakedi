import { useCallback, useEffect, useState } from "react"



type MidtransCallbacks = {
  onSuccess?: (result: any) => void;
  onPending?: (result: any) => void;
  onError?: (error: any) => void;
  onClose?: () => void;
}

export function useMidtrans({ onSuccess, onPending, onError, onClose }: MidtransCallbacks = {}) {
  const [isReady, setIsReady] = useState(false)

  useEffect(() => {
    const script = document.createElement('script')
    script.src = 'https://app.sandbox.midtrans.com/snap/snap.js'
    script.setAttribute('data-client-key', process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY)

    script.onload = () => {
      setTimeout(() => {
        setIsReady(true)
      }, 500); // make sure the script evaluation finished
    }
    document.body.appendChild(script)
    return () => {
      document.body.removeChild(script)
    }
  }, [])

  const pay = useCallback((token: string) => {
    if (isReady) {
      const callbacks: MidtransCallbacks = {}
      if (onSuccess) callbacks.onSuccess = onSuccess
      if (onPending) callbacks.onPending = onPending
      if (onError) callbacks.onError = onError
      if (onClose) callbacks.onClose = onClose
      window.snap.pay(token, callbacks)
    }
  }, [isReady, onSuccess, onPending, onError, onClose])

  return { isReady, pay }
}
