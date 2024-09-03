import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function RootLayout({ children }: Readonly<Props>) {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  );
}

type Props = {
  children: React.ReactNode
}
