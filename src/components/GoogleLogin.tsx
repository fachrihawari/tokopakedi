'use client'
import { googleLogin } from "@/lib/actions/users";
import { GoogleOAuthProvider, useGoogleLogin } from "@react-oauth/google";
import { FcGoogle } from "react-icons/fc";

export default function GoogleLogin() {
  const login = useGoogleLogin({
    flow: 'auth-code',
    onSuccess: tokenResponse => {
      console.log(JSON.stringify(tokenResponse, null, 2))
      googleLogin(tokenResponse.code)
    },
  });

  return (
    <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}>
      <button onClick={() => login()} className="w-full flex items-center justify-center py-3 px-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition duration-300">
        <FcGoogle className="mr-2" size={20} />
        <span className="text-sm font-medium">Google</span>
      </button>
    </GoogleOAuthProvider>
  )
}
