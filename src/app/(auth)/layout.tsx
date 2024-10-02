import { GoogleOAuthProvider } from "@react-oauth/google";

export default function AuthLayout({ children }: Readonly<Props>) {
  return (
    <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}>
      {children}
    </GoogleOAuthProvider>
  );
}

type Props = {
  children: React.ReactNode
}
