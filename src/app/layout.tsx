import "./globals.css";
import type { Metadata } from "next";
import { Poppins } from "next/font/google";

export default function RootLayout({ children }: Readonly<Props>) {
  return (
    <html lang="en">
      <body className={`${poppins.variable} font-sans`}>
        {children}
      </body>
    </html>
  );
}

const poppins = Poppins({
  subsets: ["latin"],
  variable: '--font-poppins',
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900',]
});

export const metadata: Metadata = {
  title: "tokopakedi",
  description: "a marketplace",
};

type Props = {
  children: React.ReactNode
}
