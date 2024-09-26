
declare module 'midtrans-client'

type MidtransCallbacks = {
  onSuccess?: (result: any) => void;
  onPending?: (result: any) => void;
  onError?: (error: any) => void;
  onClose?: () => void;
}

interface Window {
  snap: {
    embed: (token: string, options: MidtransCallbacks & { embedId: string }) => void;
    pay: (token: string, options: MidtransCallbacks) => void;
  }
}
