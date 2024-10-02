import SweetAlert from "@/components/SweetAlert";
import "./globals.css";
import type { Metadata } from "next";
import { Suspense } from "react";

export default function RootLayout({ children }: Readonly<Props>) {
  return (
    <html lang="en">
      <body className='font-sans'>
        <Suspense>
          <SweetAlert />
        </Suspense>
        {children}
      </body>
    </html>
  );
}

export const metadata: Metadata = {
  title: "tokopakedi",
  description: "a marketplace",
};

type Props = {
  children: React.ReactNode
}
